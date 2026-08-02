// content.json -> hanzi.html -> hanzi-site/index.html
// Only the marked data blocks are rewritten; all game logic is left alone.
// Round-trips safely because the markers survive every build.
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const d = JSON.parse(fs.readFileSync(path.join(root, 'content.json'), 'utf8'));
let html = fs.readFileSync(path.join(root, 'hanzi.html'), 'utf8');

const j = (v) => JSON.stringify(v).replace(/</g, '\\u003c');

function swap(name, code) {
  const re = new RegExp('/\\*<' + name + '>\\*/[\\s\\S]*?/\\*</' + name + '>\\*/');
  if (!re.test(html)) throw new Error('marker missing: ' + name + ' — run tools/extract.js against a marked source');
  html = html.replace(re, '/*<' + name + '>*/' + code + '/*</' + name + '>*/');
}

const Q = d.puzzles.map((p) => {
  const o = { a: p.parts[0], b: p.parts[1], w: p.word, py: p.pinyin, ic: p.icon, c: p.chapter, q: p.clue, s: p.body };
  if (p.tiles) o.t = p.tiles;
  return o;
});
swap('Q', 'var Q=' + j(Q) + ';');

const EX = {};
d.puzzles.filter((p) => p.lore).forEach((p) => { EX[p.word] = { k: p.type, s: p.body, x: p.lore }; });
swap('EX', 'var EX=' + j(EX) + ';');

const DIFF = {}; d.puzzles.forEach((p) => { DIFF[p.word] = p.difficulty; });
swap('DIFF', 'var DIFF=' + j(DIFF) + ';');

const LAY = {}; d.puzzles.filter((p) => p.tier === 'char').forEach((p) => { LAY[p.word] = p.layout; });
swap('LAY', 'var LAY=' + j(LAY) + ';');

fs.writeFileSync(path.join(root, 'hanzi.html'), html, 'utf8');
fs.mkdirSync(path.join(root, 'hanzi-site'), { recursive: true });
fs.writeFileSync(path.join(root, 'hanzi-site', 'index.html'), html, 'utf8');

const withLore = Object.keys(EX).length;
console.log('built ' + d.puzzles.length + ' puzzles');
console.log('  lore: ' + withLore + '/' + d.puzzles.length + (withLore < d.puzzles.length ? '  ← ' + (d.puzzles.length - withLore) + ' still bare' : ''));
console.log('  wrote hanzi.html + hanzi-site/index.html');
