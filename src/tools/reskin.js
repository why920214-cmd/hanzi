// One-shot splice: swap the presentation layer of hanzi.html for the 青绿 theme.
// Game logic, data markers and the embedded @font-face are left untouched.
// Idempotent — the spliced regions are fully replaced each run.
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const file = path.join(root, 'hanzi.html');
let html = fs.readFileSync(file, 'utf8');

const css = fs.readFileSync(path.join(__dirname, 'qing.css'), 'utf8');
const shell = fs.readFileSync(path.join(__dirname, 'qing-shell.html'), 'utf8');

// 1 · head
html = html.replace(/<title>[^<]*<\/title>/, '<title>墨 INK — Hanzi</title>');
if (!/theme-color/.test(html)) {
  html = html.replace('<meta name="viewport"', '<meta name="theme-color" content="#081512">\n<meta name="viewport"');
}

// 2 · CSS: everything between the end of the @font-face block and </style>.
//     The font-face block ends at the first "}" that follows the base64 src line.
const styleOpen = html.indexOf('<style>');
const styleClose = html.indexOf('</style>');
if (styleOpen < 0 || styleClose < 0) throw new Error('style block not found');
const fontsEnd = html.indexOf('/*</FONTS>*/');
const cssStart = fontsEnd > -1 && fontsEnd < styleClose
  ? fontsEnd + '/*</FONTS>*/'.length
  : html.indexOf('}', html.indexOf('src:url(data:font/woff2')) + 1;
if (cssStart <= 0 || cssStart > styleClose) throw new Error('font anchor not found');
html = html.slice(0, cssStart) + '\n' + css + html.slice(styleClose);

// 3 · shell: everything between </style> and <script>.
const sc = html.indexOf('</style>');
const scriptOpen = html.indexOf('<script>');
if (scriptOpen < 0) throw new Error('script open not found');
html = html.slice(0, sc + 8) + '\n\n' + shell + '\n' + html.slice(scriptOpen);

fs.writeFileSync(file, html, 'utf8');
console.log('reskin done: ' + Math.round(html.length / 1024) + 'KB');
