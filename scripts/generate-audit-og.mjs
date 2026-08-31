import { readFile } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";

const projectRoot = process.cwd();
const fontsDir = join(projectRoot, "node_modules/@fontsource/space-grotesk/files");
const [bold, semibold, medium, regular] = await Promise.all(
  ["700", "600", "500", "400"].map((weight) =>
    readFile(join(fontsDir, `space-grotesk-latin-${weight}-normal.woff2`)).then((buf) => buf.toString("base64")),
  ),
);

const INK = "#0F1626";
const TEAL = "#1F5C5C";
const TEAL_LIGHT = "#2AA9B8";
const AMBER = "#C97A3A";
const MUTED = "#5A6570";
const BG = "#F8F8F6";

const mark = (x, y, cell = 15, gap = 6) => {
  const cells = [];
  for (let row = 0; row < 3; row += 1) {
    for (let column = 0; column < 3; column += 1) {
      const teal = (row === 0 && column === 2) || (row === 1 && column === 1);
      cells.push(
        `<rect x="${x + column * (cell + gap)}" y="${y + row * (cell + gap)}" width="${cell}" height="${cell}" rx="2.5" fill="${teal ? TEAL : INK}"/>`,
      );
    }
  }
  return cells.join("");
};

const score = 72;
const ringR = 54;
const ringC = 2 * Math.PI * ringR;
const ringDash = (score / 100) * ringC;

const phoneRow = (y, iconFill, iconSymbol, label, status, statusColor) => `
  <g transform="translate(0 ${y})">
    <rect x="0" y="0" width="34" height="34" rx="9" fill="${iconFill}"/>
    ${iconSymbol}
    <text x="46" y="14" font-size="12.5" font-weight="600" fill="${INK}">${label}</text>
    <text x="46" y="29" font-size="11" font-weight="500" fill="${statusColor}">${status}</text>
    <path d="M204 10L212 17L204 24" stroke="#C7CDD2" stroke-width="2.1" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  </g>`;

const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      @font-face { font-family: 'Space Grotesk'; src: url(data:font/woff2;base64,${bold}) format('woff2'); font-weight: 700; }
      @font-face { font-family: 'Space Grotesk'; src: url(data:font/woff2;base64,${semibold}) format('woff2'); font-weight: 600; }
      @font-face { font-family: 'Space Grotesk'; src: url(data:font/woff2;base64,${medium}) format('woff2'); font-weight: 500; }
      @font-face { font-family: 'Space Grotesk'; src: url(data:font/woff2;base64,${regular}) format('woff2'); font-weight: 400; }
      text { font-family: 'Space Grotesk', Arial, sans-serif; }
    </style>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${TEAL}"/>
      <stop offset="1" stop-color="${TEAL_LIGHT}"/>
    </linearGradient>
    <clipPath id="screenClip">
      <rect x="14" y="14" width="232" height="472" rx="28"/>
    </clipPath>
    <filter id="soft" x="-50%" y="-50%" width="200%" height="200%">
      <feDropShadow dx="0" dy="18" stdDeviation="24" flood-color="#0F1626" flood-opacity="0.16"/>
    </filter>
    <filter id="soft-sm" x="-50%" y="-50%" width="200%" height="200%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#0F1626" flood-opacity="0.14"/>
    </filter>
  </defs>

  <rect width="1200" height="630" fill="${BG}"/>

  <g opacity="0.95">
    <rect x="1000" y="150" width="118" height="118" rx="18" fill="${INK}" transform="rotate(10 1059 209)"/>
    <rect x="948" y="392" width="106" height="106" rx="18" fill="url(#accent)" transform="rotate(-8 1001 445)"/>
  </g>

  <!-- phone mockup -->
  <g transform="translate(818 66) rotate(6)" filter="url(#soft)">
    <rect x="0" y="0" width="260" height="500" rx="38" fill="#E7E9EB"/>
    <rect x="6" y="6" width="248" height="488" rx="33" fill="#0F1113"/>
    <rect x="14" y="14" width="232" height="472" rx="28" fill="#FFFFFF"/>

    <g clip-path="url(#screenClip)">
      <text x="130" y="42" font-size="13" font-weight="600" fill="${INK}">9:41</text>
      <g transform="translate(196 30)" fill="${INK}">
        <rect x="0" y="6" width="3" height="7" rx="1"/>
        <rect x="5" y="4" width="3" height="9" rx="1"/>
        <rect x="10" y="1" width="3" height="12" rx="1"/>
        <rect x="17" y="2" width="15" height="10" rx="2.2" fill="none" stroke="${INK}" stroke-width="1.3"/>
        <rect x="19" y="4.2" width="10" height="5.6" rx="1" fill="${INK}"/>
      </g>

      <text x="130" y="70" text-anchor="middle" font-size="16" font-weight="600" fill="${INK}">Your Digital</text>
      <text x="130" y="91" text-anchor="middle" font-size="16" font-weight="600" fill="${INK}">Efficiency Score</text>

      <g transform="translate(130 175)">
        <circle r="${ringR}" fill="none" stroke="#E9ECEE" stroke-width="11"/>
        <circle r="${ringR}" fill="none" stroke="url(#accent)" stroke-width="11" stroke-linecap="round"
          stroke-dasharray="${ringDash} ${ringC}" transform="rotate(-90)"/>
        <text x="0" y="4" text-anchor="middle" font-size="34" font-weight="700" fill="${INK}">${score}</text>
        <text x="0" y="22" text-anchor="middle" font-size="10.5" font-weight="500" fill="${MUTED}">/100</text>
      </g>

      <text x="130" y="251" text-anchor="middle" font-size="14" font-weight="600" fill="${TEAL}">Good</text>
      <text x="130" y="269" text-anchor="middle" font-size="10.5" font-weight="500" fill="${MUTED}">You're doing well.</text>
      <text x="130" y="283" text-anchor="middle" font-size="10.5" font-weight="500" fill="${MUTED}">There's still room to grow.</text>

      <g transform="translate(22 304)">
        <line x1="0" y1="-8" x2="216" y2="-8" stroke="#EEF0F1" stroke-width="1"/>
        ${phoneRow(
          0,
          "#DCEEF0",
          `<g transform="translate(8 8)" stroke="${TEAL}" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round"><rect x="0" y="0" width="18" height="13" rx="2"/><line x1="6" y1="18" x2="12" y2="18"/></g>`,
          "Website",
          "Needs Improvement",
          AMBER,
        )}
        <line x1="0" y1="42" x2="216" y2="42" stroke="#EEF0F1" stroke-width="1"/>
        ${phoneRow(
          50,
          "#0F1626",
          `<g transform="translate(8 8)" stroke="#FFFFFF" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="9" r="2.4"/><path d="M9 1V3.4M9 14.6V17M17 9H14.6M3.4 9H1M14.4 3.6L12.7 5.3M5.3 12.7L3.6 14.4M14.4 14.4L12.7 12.7M5.3 5.3L3.6 3.6"/></g>`,
          "Operations",
          "Good",
          TEAL,
        )}
        <line x1="0" y1="92" x2="216" y2="92" stroke="#EEF0F1" stroke-width="1"/>
        ${phoneRow(
          100,
          "#DCEEF0",
          `<g transform="translate(8 9)" stroke="${TEAL}" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"><circle cx="5.5" cy="3.6" r="2.5"/><path d="M0.4 12.2C0.4 9.4 2.7 7.2 5.5 7.2S10.6 9.4 10.6 12.2"/><circle cx="14" cy="5" r="2" fill="none"/><path d="M10.8 12.2C11 10.1 12.8 8.5 14.8 8.5"/></g>`,
          "Customer Experience",
          "Good",
          TEAL,
        )}
      </g>
    </g>
  </g>

  <!-- logo -->
  ${mark(88, 78)}
  <text x="176" y="120" fill="${INK}" font-size="26" font-weight="600" letter-spacing="1.2">MATHBROOKS</text>

  <!-- headline -->
  <text x="86" y="262" fill="${INK}" font-size="74" font-weight="700" letter-spacing="-2.4">Free AI</text>
  <text x="86" y="344" fill="${INK}" font-size="74" font-weight="700" letter-spacing="-2.4">Efficiency Audit</text>

  <!-- subtitle -->
  <text x="88" y="406" fill="${MUTED}" font-size="22" font-weight="500">Discover what's slowing your business down</text>
  <text x="88" y="436" fill="${MUTED}" font-size="22" font-weight="500">and how technology can fix it.</text>

  <!-- URL pill -->
  <g filter="url(#soft-sm)">
    <rect x="88" y="480" width="322" height="58" rx="29" fill="#FFFFFF" stroke="#E4E6E8" stroke-width="1.5"/>
  </g>
  <circle cx="128" cy="509" r="12" fill="none" stroke="${TEAL}" stroke-width="1.8"/>
  <path d="M116 509H140M128 497C132 501.5 132 516.5 128 521M128 497C124 501.5 124 516.5 128 521" stroke="${TEAL}" stroke-width="1.6" fill="none"/>
  <text x="152" y="515" fill="${INK}" font-size="18" font-weight="600">mathbrooks.com/audit</text>
</svg>`;

const output = join(projectRoot, "public", "og", "audit.png");
await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(output);
const metadata = await sharp(output).metadata();
if (metadata.width !== 1200 || metadata.height !== 630 || metadata.format !== "png") {
  throw new Error(`audit.png: invalid social image output ${metadata.width}x${metadata.height} ${metadata.format}`);
}

console.log("Generated public/og/audit.png");
