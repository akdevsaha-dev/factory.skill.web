import { readFile, writeFile } from 'node:fs/promises';
const source = new URL('../public/demo-static.svg', import.meta.url);
const palette = {
  // Keep the light transcript neutral while retaining dark-mode syntax accents.
  '#e6edf3': '#262626', '#c9d1d9': '#555', '#8b949e': '#6b6b6b',
  '#79c0ff': '#757575', '#d2a8ff': '#3f3f3f',
  '#7ee787': '#757575', '#3fb950': '#3f3f3f',
  '#141414': '#fafafa', '#101010': '#f7f7f7', '#ebebeb': '#262626',
  '#aaa': '#555', '#777': '#6b6b6b', '#686868': '#757575',
  '#d4d4d4': '#3f3f3f', '#262626': '#e3e3e3',
  '#1b1b1b': '#ededed', '#2b2b2b': '#d5d5d5',
};
const dark = await readFile(source, 'utf8');
const light = dark.replace(/#[a-f0-9]{6}\b|#[a-f0-9]{3}\b/gi, color => palette[color] ?? color);
await writeFile(new URL('../public/demo-static-light.svg', import.meta.url), light);
