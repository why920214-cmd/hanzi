// Re-cut the embedded fonts to exactly what the game shows.
// Run whenever content.json gains new characters, before build.js.
//   'Hanzi Serif' 400 + 900  — Noto Serif SC subset (all game hanzi + UI hanzi)
//   'Clue Serif'  italic     — Cormorant Garamond subset (EN/ES clues + pinyin)
// The whole block lives between /*<FONTS>*/ markers so reruns are idempotent.
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const d = JSON.parse(fs.readFileSync(path.join(root, 'content.json'), 'utf8'));

// hanzi set
const EXTRA_HAN = '墨新对惜？';
const need = new Set(EXTRA_HAN);
for (const p of d.puzzles) {
  for (const c of p.word) need.add(c);
  for (const part of p.parts) for (const c of part) need.add(c);
  for (const t of p.tiles || []) for (const c of t) need.add(c);
}
for (const k of Object.keys(d.blocks)) for (const c of k) need.add(c);
const hanzi = [...need].filter((c) => /[㐀-鿿？]/.test(c)).sort().join('');

// latin set: clues + pinyin + safety
const latinSet = new Set("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 .,;:!?¿¡'’\"“”()·—–-áéíóúüñÁÉÍÓÚÜÑ");
for (const p of d.puzzles) {
  for (const c of (p.clue.en || '') + (p.clue.es || '') + (p.pinyin || '')) latinSet.add(c);
}
const latin = [...latinSet].filter((c) => c.charCodeAt(0) > 32 || c === ' ').sort().join('');

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36';

async function grab(family, text) {
  const api = 'https://fonts.googleapis.com/css2?family=' + family + '&text=' + encodeURIComponent(text);
  const css = await (await fetch(api, { headers: { 'User-Agent': UA } })).text();
  const url = (css.match(/url\((https:[^)]+)\)/) || [])[1];
  if (!url) throw new Error('no woff2 url for ' + family + ':\n' + css.slice(0, 300));
  const buf = Buffer.from(await (await fetch(url, { headers: { 'User-Agent': UA } })).arrayBuffer());
  return buf;
}

(async () => {
  console.log('hanzi glyphs: ' + hanzi.length + ' · latin glyphs: ' + latin.length);
  const [b400, b900, bClue, bBrush] = await Promise.all([
    grab('Noto+Serif+SC:wght@400', hanzi),
    grab('Noto+Serif+SC:wght@900', hanzi),
    grab('Cormorant+Garamond:ital,wght@1,500', latin),
    grab('Ma+Shan+Zheng', hanzi), // 书法体：毛笔供奉物解锁的字体皮肤
  ]);
  console.log('woff2: 400=' + b400.length + 'B · 900=' + b900.length + 'B · clue=' + bClue.length + 'B · brush=' + bBrush.length + 'B');

  fs.mkdirSync(path.join(__dirname, 'font'), { recursive: true });
  fs.writeFileSync(path.join(__dirname, 'font', 'hanzi-400.woff2'), b400);
  fs.writeFileSync(path.join(__dirname, 'font', 'hanzi-900.woff2'), b900);
  fs.writeFileSync(path.join(__dirname, 'font', 'clue-italic.woff2'), bClue);

  const face = (fam, style, weight, buf) =>
    "@font-face{font-family:'" + fam + "';font-style:" + style + ';font-weight:' + weight +
    ';font-display:swap;\nsrc:url(data:font/woff2;base64,' + buf.toString('base64') + ')}';

  const block = '/*<FONTS>*/\n' +
    '/* Noto Serif SC subset — SIL OFL 1.1, © Adobe (source-han-serif)\n' +
    '   Cormorant Garamond subset — SIL OFL 1.1, © Catharsis Fonts */\n' +
    face('Hanzi Serif', 'normal', 400, b400) + '\n' +
    face('Hanzi Serif', 'normal', 900, b900) + '\n' +
    face('Clue Serif', 'italic', '100 900', bClue) + '\n' +
    face('Brush Hanzi', 'normal', '100 900', bBrush) + '\n/*</FONTS>*/';

  const file = path.join(root, 'hanzi.html');
  let html = fs.readFileSync(file, 'utf8');

  if (html.includes('/*<FONTS>*/')) {
    html = html.replace(/\/\*<FONTS>\*\/[\s\S]*?\/\*<\/FONTS>\*\//, block);
  } else {
    // legacy: single @font-face right after <style>; replace comment + face
    const s = html.indexOf('<style>') + '<style>'.length;
    const b64 = html.indexOf('src:url(data:font/woff2');
    const end = html.indexOf('}', b64);
    if (b64 < 0 || end < 0) throw new Error('legacy font-face not found');
    html = html.slice(0, s) + '\n' + block + html.slice(end + 1);
  }
  fs.writeFileSync(file, html, 'utf8');
  console.log('embedded ' + Math.round((b400.length + b900.length + bClue.length) / 1024) + 'KB of fonts');
  console.log('now run: node tools/build.js');
})().catch((e) => { console.error(e.message); process.exit(1); });
