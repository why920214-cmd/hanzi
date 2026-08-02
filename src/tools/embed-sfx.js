// Embed the P0 sound effects into hanzi.html as base64 data URIs.
// Rerunnable — replaces the /*<SFX>*/ marker block each time.
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const dir = path.join(root, '素材', 'sfx');
const map = { stamp: 'sfx-stamp.mp3', chime: 'sfx-chime.mp3', tile: 'sfx-tile.mp3', wrong: 'sfx-wrong.mp3', scroll: 'sfx-scroll.mp3' };

const o = {};
let total = 0;
for (const k of Object.keys(map)) {
  const b = fs.readFileSync(path.join(dir, map[k]));
  total += b.length;
  o[k] = 'data:audio/mpeg;base64,' + b.toString('base64');
}

const file = path.join(root, 'hanzi.html');
let html = fs.readFileSync(file, 'utf8');
const re = /\/\*<SFX>\*\/[\s\S]*?\/\*<\/SFX>\*\//;
if (!re.test(html)) throw new Error('SFX marker missing in hanzi.html');
html = html.replace(re, '/*<SFX>*/var SFX=' + JSON.stringify(o) + ';/*</SFX>*/');
fs.writeFileSync(file, html, 'utf8');
console.log('embedded ' + Object.keys(o).length + ' sfx (' + Math.round(total / 1024) + 'KB raw)');
console.log('now run: node tools/build.js');
