// Pull every content structure out of hanzi.html into content.json.
// The game source stays the single source of truth until the first extract;
// after that, content.json is authoritative and build.js writes it back in.
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'hanzi.html'), 'utf8');

const m = html.match(/<script>\n([\s\S]*?)<\/script>/);
if (!m) throw new Error('no script block found');

const EXPORT = `globalThis.__D={L:L,B:B,IC:IC,OB:OB,TY:TY,EX:EX,LAY:LAY,CH:CH,Q:Q,DIFF:DIFF};`;
const anchor = 'function nTiles(p){';
const i = m[1].indexOf(anchor);
if (i < 0) throw new Error('anchor not found');
const end = m[1].indexOf('\n', i);
const src = m[1].slice(0, end + 1) + EXPORT + m[1].slice(end + 1);

// Minimal DOM so the runtime tail can start without blowing up before the export.
const stub = new Proxy(function () {}, {
  get: () => stub,
  set: () => true,
  apply: () => stub,
  construct: () => stub,
});
globalThis.document = stub;
globalThis.window = { matchMedia: () => ({ matches: false }) };
globalThis.navigator = { language: 'en' };
globalThis.localStorage = { getItem: () => null, setItem: () => {} };
globalThis.requestAnimationFrame = () => {};

try { eval(src); } catch (e) { /* runtime tail needs a real DOM; data is already out */ }

const D = globalThis.__D;
if (!D) throw new Error('export did not run');

const puzzles = D.Q.map((p) => {
  const ex = D.EX[p.w] || null;
  return {
    word: p.w,
    parts: [p.a, p.b],
    pinyin: p.py,
    icon: p.ic,
    chapter: p.c,
    tier: D.CH[p.c].k,
    difficulty: D.DIFF[p.w] || 2,
    layout: D.LAY[p.w] || 'lr',
    type: ex ? ex.k : 'ci',
    clue: p.q,
    tiles: p.t,
    body: ex ? ex.s : p.s,
    lore: ex ? ex.x : null,
  };
});

const out = {
  meta: {
    generatedFrom: 'hanzi.html',
    puzzles: puzzles.length,
    langs: ['en', 'zh', 'ja', 'es'],
  },
  chapters: D.CH,
  blocks: D.B,
  oracleBone: Object.keys(D.OB),
  ui: D.L,
  puzzles,
};

fs.writeFileSync(path.join(root, 'content.json'), JSON.stringify(out, null, 2) + '\n', 'utf8');
console.log('content.json written:', puzzles.length, 'puzzles');
console.log('  with lore:', puzzles.filter((p) => p.lore).length);
console.log('  with hand-authored tiles:', puzzles.filter((p) => p.tiles).length);
