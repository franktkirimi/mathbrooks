// Root cause, found by direct production testing across many isolated
// deploys: Vercel's Node function build for this project transpiles the
// entrypoint file (api/audit-analysis.ts) but does not transpile local
// TypeScript files it imports via a relative path — even same-directory
// ones under api/_lib/. Those files land in the deployment bundle as raw
// .ts source, which plain Node can't execute, so the function crashes with
// FUNCTION_INVOCATION_FAILED on every real invocation. Proof: importing an
// npm package (zod) worked fine; importing any local .ts file — same
// directory, a sibling api/_lib file, or a file crossing into src/ — all
// failed identically, regardless of vercel.json's `includeFiles` or
// whether the copy was gitignored-and-generated vs. committed directly.
//
// Fix: don't ship raw .ts for anything api/audit-analysis.ts imports
// locally. This script transpiles (not just copies) the pure,
// dependency-free audit domain logic it needs (engine.ts, questions.ts,
// terminology.ts, aiReport.ts — no React, no browser APIs) from
// src/lib/audit/ into plain, already-valid api/_lib/audit/*.js via esbuild,
// so what actually lands in the function bundle is executable JavaScript
// regardless of how Vercel's builder treats non-entrypoint files.
// api/audit-analysis.ts and api/_lib/aiProvider.ts import the .js output.
//
// src/lib/audit/ remains the single source of truth. The compiled output
// IS committed (not gitignored) — a purely build-artifact, gitignored
// version of this same idea was tried first and still failed, consistent
// with the possibility that Vercel's dashboard has an explicit Build
// Command override that bypasses package.json's `vercel-build` convention
// (unverifiable without Vercel account access in this environment); a
// committed copy is guaranteed to be present regardless of which build
// command actually runs. Run `npm run sync:api-lib` after changing
// anything in src/lib/audit/{engine,questions,terminology,aiReport}.ts,
// before committing — it's also wired into predev/pretest/typecheck so it
// stays fresh in normal workflows.
import { existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import * as esbuild from "esbuild";

const rootDir = path.resolve(fileURLToPath(new URL("..", import.meta.url)));
const sourceDir = path.join(rootDir, "src", "lib", "audit");
const targetDir = path.join(rootDir, "api", "_lib", "audit");

const FILES_TO_SYNC = ["engine.ts", "questions.ts", "terminology.ts", "aiReport.ts"];

rmSync(targetDir, { recursive: true, force: true });
mkdirSync(targetDir, { recursive: true });

for (const file of FILES_TO_SYNC) {
  const from = path.join(sourceDir, file);
  if (!existsSync(from)) {
    console.error(`sync-api-lib: expected source file missing: ${from}`);
    process.exit(1);
  }

  const outFile = path.join(targetDir, file.replace(/\.ts$/, ".js"));
  const result = esbuild.buildSync({
    entryPoints: [from],
    bundle: false,
    platform: "node",
    format: "esm",
    target: "node20",
    write: false,
  });

  const banner =
    `// GENERATED FILE — do not edit directly.\n` +
    `// Source of truth: src/lib/audit/${file}\n` +
    `// Regenerate with: npm run sync:api-lib\n\n`;

  // esbuild leaves the sibling relative specifiers (./questions, ./engine,
  // ./terminology) exactly as written in the source, but Node's ESM
  // resolver requires an explicit extension — every other file here is
  // transpiled side by side into the same target directory under the same
  // name, just with a .js extension, so appending it is always correct.
  const transpiled = result.outputFiles[0].text;
  const withExplicitExtensions = transpiled.replace(/from\s+"(\.\/[^"]+)"/g, (match, importPath) =>
    importPath.endsWith(".js") ? match : `from "${importPath}.js"`,
  );

  writeFileSync(outFile, banner + withExplicitExtensions);
}

console.log(`sync-api-lib: transpiled ${FILES_TO_SYNC.length} files into api/_lib/audit/*.js`);
