import { readFile, writeFile } from 'node:fs/promises';
import sharp from 'sharp';
const mark = await readFile(new URL('../public/brand/factory-mark.svg', import.meta.url), 'utf8');
const white = mark.replace(/<style>.*?<\/style>/s, '').replaceAll('currentColor', '#eeeef0');
const output = new URL('../public/', import.meta.url);

const touch = `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180"><rect width="180" height="180" rx="36" fill="#101012"/>${white.replace('<svg ', '<svg x="30" y="30" ').replace('width="64" height="64"','width="120" height="120"')}</svg>`;
await sharp(Buffer.from(touch)).resize(32,32).png().toFile(new URL('brand/favicon-32.png', output).pathname);
await sharp(Buffer.from(touch)).png().toFile(new URL('brand/apple-touch-icon.png', output).pathname);
const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="#0a0a0b"/>${white.replace('<svg ', '<svg x="80" y="66" ').replace('width="64" height="64"','width="43" height="43"')}<text x="138" y="100" font-family="Arial,sans-serif" font-size="29" fill="#ededf0" font-weight="bold">factory<tspan fill="#919199"> skills</tspan></text><text x="80" y="270" font-family="Arial,sans-serif" font-size="76" font-weight="bold" letter-spacing="-3" fill="#ededf0">Your agent.</text><text x="80" y="365" font-family="Arial,sans-serif" font-size="65" letter-spacing="-2" fill="#9b9ba3">With an engineering standard.</text><path d="M80 475 H1120" stroke="#303034"/><text x="80" y="530" font-family="Arial,sans-serif" font-size="19" fill="#9b9ba3">Open-source skills for Claude Code, Codex, and more.</text></svg>`;
await sharp(Buffer.from(og)).png().toFile(new URL('opengraph-image.png', output).pathname);

// Multi-resolution ICO for browsers that request /favicon.ico directly.
const sizes = [16, 32, 48];
const images = await Promise.all(sizes.map(size => sharp(Buffer.from(touch)).resize(size, size).png().toBuffer()));
const header = Buffer.alloc(6 + sizes.length * 16);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(sizes.length, 4);
let offset = header.length;
images.forEach((image, index) => {
  const entry = 6 + index * 16;
  header[entry] = sizes[index];
  header[entry + 1] = sizes[index];
  header.writeUInt16LE(1, entry + 4);
  header.writeUInt16LE(32, entry + 6);
  header.writeUInt32LE(image.length, entry + 8);
  header.writeUInt32LE(offset, entry + 12);
  offset += image.length;
});
await writeFile(new URL('../app/favicon.ico', import.meta.url), Buffer.concat([header, ...images]));
