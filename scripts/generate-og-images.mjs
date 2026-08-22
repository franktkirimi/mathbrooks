import { mkdir, readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { pathToFileURL } from "node:url";
import sharp from "sharp";

const projectRoot = process.cwd();
const serverEntry = await import(pathToFileURL(join(projectRoot, ".prerender", "entry-server.js")).href);
const { socialImageEntries } = serverEntry;
const font = await readFile(join(projectRoot, "node_modules/@fontsource/space-grotesk/files/space-grotesk-latin-600-normal.woff2"));
const fontData = font.toString("base64");
const outputRoot = join(projectRoot, "public", "og");

const escapeXml = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const wrapTitle = (title) => {
  const limit = title.length > 62 ? 33 : title.length > 40 ? 29 : 31;
  const words = title.split(/\s+/);
  const lines = [];
  let current = "";
  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length > limit && current) {
      lines.push(current);
      current = word;
    } else {
      current = candidate;
    }
  }
  if (current) lines.push(current);
  if (lines.length <= 3) return lines;
  return [lines[0], lines[1], `${lines.slice(2).join(" ").slice(0, limit - 1).trim()}…`];
};

const mark = (x, y, size = 17, gap = 8) => {
  const cells = [];
  for (let row = 0; row < 3; row += 1) {
    for (let column = 0; column < 3; column += 1) {
      const teal = (row === 0 && column === 2) || (row === 1 && column === 1);
      cells.push(`<rect x="${x + column * (size + gap)}" y="${y + row * (size + gap)}" width="${size}" height="${size}" rx="3" fill="${teal ? "#1F5C5C" : "#0F1626"}"/>`);
    }
  }
  return cells.join("");
};

for (const [index, entry] of socialImageEntries.entries()) {
  const lines = wrapTitle(entry.title);
  const fontSize = entry.title.length > 62 ? 54 : lines.length === 1 ? 76 : lines.length === 2 ? 70 : 60;
  const lineHeight = Math.round(fontSize * 1.02);
  const titleY = lines.length === 1 ? 330 : lines.length === 2 ? 290 : 250;
  const titleSpans = lines
    .map((line, lineIndex) => `<tspan x="88" y="${titleY + lineIndex * lineHeight}">${escapeXml(line)}</tspan>`)
    .join("");
  const offset = (index % 4) * 22;
  const group = entry.output.split("/")[0];
  const accent = group === "research" ? "#5668D8" : group === "blog" ? "#C96767" : "#2AA9B8";
  const svg = `
    <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <style>
          @font-face { font-family: 'Space Grotesk'; src: url(data:font/woff2;base64,${fontData}) format('woff2'); font-weight: 600; }
          text { font-family: 'Space Grotesk', Arial, sans-serif; }
        </style>
        <linearGradient id="accent" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#1F5C5C"/>
          <stop offset="1" stop-color="${accent}"/>
        </linearGradient>
      </defs>
      <rect width="1200" height="630" fill="#FCFCFB"/>
      <g opacity="0.28" stroke="#BFC8CE" stroke-width="1">
        <path d="M88 0V630M184 0V630M280 0V630M376 0V630M472 0V630M568 0V630M664 0V630M760 0V630M856 0V630M952 0V630M1048 0V630M1144 0V630"/>
      </g>
      <path d="M0 0H1200V122L${690 + offset} 170L${560 + offset} 0Z" fill="url(#accent)" opacity="0.18"/>
      <g transform="translate(${865 + offset} 192) rotate(-8)" opacity="0.94">
        <rect x="0" y="0" width="120" height="120" rx="10" fill="#0F1626"/>
        <rect x="140" y="0" width="120" height="120" rx="10" fill="url(#accent)"/>
        <rect x="280" y="0" width="120" height="120" rx="10" fill="#0F1626" opacity="0.82"/>
        <rect x="0" y="140" width="120" height="120" rx="10" fill="url(#accent)" opacity="0.78"/>
        <rect x="140" y="140" width="120" height="120" rx="10" fill="#0F1626" opacity="0.12"/>
        <rect x="280" y="140" width="120" height="120" rx="10" fill="url(#accent)" opacity="0.45"/>
        <rect x="0" y="280" width="120" height="120" rx="10" fill="#0F1626" opacity="0.12"/>
        <rect x="140" y="280" width="120" height="120" rx="10" fill="#0F1626" opacity="0.72"/>
        <rect x="280" y="280" width="120" height="120" rx="10" fill="url(#accent)" opacity="0.82"/>
      </g>
      <rect x="0" y="0" width="830" height="630" fill="#FCFCFB"/>
      ${mark(88, 66)}
      <text x="182" y="111" fill="#0F1626" font-size="28" font-weight="600" letter-spacing="1.4">MATHBROOKS</text>
      <text x="88" y="196" fill="#1F5C5C" font-size="17" font-weight="600" letter-spacing="3.2">${escapeXml(entry.eyebrow.toUpperCase())}</text>
      <text fill="#0F1626" font-size="${fontSize}" font-weight="600" letter-spacing="-2.2">${titleSpans}</text>
      <line x1="88" y1="552" x2="760" y2="552" stroke="#D9DEE2" stroke-width="1"/>
      <text x="88" y="590" fill="#5A6570" font-size="${entry.path.length > 48 ? 14 : 18}" font-weight="600" letter-spacing="1">mathbrooks.com${escapeXml(entry.path)}</text>
    </svg>`;

  const output = join(outputRoot, entry.output);
  await mkdir(dirname(output), { recursive: true });
  await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(output);
  const metadata = await sharp(output).metadata();
  if (metadata.width !== 1200 || metadata.height !== 630 || metadata.format !== "png") {
    throw new Error(`${entry.path}: invalid social image output ${metadata.width}x${metadata.height} ${metadata.format}`);
  }
}

console.log(`Generated ${socialImageEntries.length} route-specific OG images.`);
