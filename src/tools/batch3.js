// Batch 3: 第六章「家常 At home」— 6 道猜字新题（会意×3 + 形声×3）。
// 内容标准同前：真实构字、英语锚定、外网梗钩子、承认学术细节（闷 的形声兼会意）。
// 同步把 batch1 就该进 blocks 的部件补进 content.json.blocks（忄亡出东西）。
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const file = path.join(root, 'content.json');
const d = JSON.parse(fs.readFileSync(file, 'utf8'));

// 补齐 blocks（与 hanzi.html 的 B 同步）
Object.assign(d.blocks, {
  '忄': ['❤️', 'heart (squeezed)', '心字旁', 'りっしんべん', 'corazón (radical)', 'xīn'],
  '亡': ['🌫️', 'to vanish', '消亡', '亡ぶ', 'desaparecer', 'wáng'],
  '出': ['🚶', 'to go out', '出去', '出る', 'salir', 'chū'],
  '东': ['🧭', 'east', '东', '東', 'este', 'dōng'],
  '西': ['🌇', 'west', '西', '西', 'oeste', 'xī'],
});

// 新章节（与 hanzi.html 的 CH 追加保持一致，仅作记录用）
if (d.chapters.length < 6) {
  d.chapters.push({ t: { en: 'At home', zh: '家常', ja: '暮らし', es: 'En casa' }, k: 'char',
    pool: ['女', '马', '口', '鸟', '火', '土', '门', '心', '人', '水', '日', '大'] });
}

const P = (o) => Object.assign({ chapter: 5, tier: 'char', tiles: null }, o);
const NEW = [
P({ word: '妈', parts: ['女', '马'], pinyin: 'mā', icon: '👩‍👧', difficulty: 1, layout: 'lr', type: 'xing',
  clue: { en: 'mom', es: 'mamá' },
  body: { en: 'Woman for the meaning, horse for the sound: mǎ bends into mā. The horse says nothing about mothers.',
    zh: '女表意，马表音：mǎ 转个调就是 mā。马和妈妈没有任何关系。',
    ja: '女が意味、馬は音（mǎ→mā）。馬に母の意味はありません。',
    es: 'Mujer da el sentido; caballo, solo el sonido: mǎ se dobla en mā.' },
  lore: { en: "Nearly every language on Earth says some version of mama — linguists say it's simply the first sound a baby can make. Chinese agreed and spelled it honestly: woman + the sound ma. If you ever see the joke that 'mom = woman + horse', you can now ruin it politely: the horse only came to say ma.",
    zh: '地球上几乎每种语言的「妈妈」都长得差不多——语言学家说，这是婴儿最容易发出的音。中文照实拼写：女＋一个 ma 音。下次刷到「妈=女人+马」的段子，你可以礼貌地拆台：那匹马只是来发音的。',
    ja: '世界中の言語で「ママ」は似ています。赤ちゃんが最初に出せる音だからです。中国語は「女＋音 ma」と正直に綴りました。馬はただ発音しに来ただけです。',
    es: 'Casi toda lengua dice algo como mamá: es el primer sonido que puede hacer un bebé. El chino lo escribió honesto: mujer + el sonido ma. El caballo solo vino a pronunciar.' } }),
P({ word: '鸣', parts: ['口', '鸟'], pinyin: 'míng', icon: '🎵', difficulty: 1, layout: 'lr', type: 'hui',
  clue: { en: 'a bird call', es: 'el canto de un ave' },
  body: { en: 'A mouth and a bird. What a bird does with its mouth.',
    zh: '口和鸟。鸟用嘴做的那件事。',
    ja: '口と鳥。鳥が口ですることです。',
    es: 'Una boca y un pájaro. Lo que hace un pájaro con la boca.' },
  lore: { en: "The idiom 一鸣惊人 — 'one cry astonishes the world' — is for quiet people who suddenly do something spectacular. It comes from a king who ignored his duties for three years, then said: this bird hasn't flown yet — when it flies it will pierce the sky; when it cries, it will astonish the world. Then he reformed overnight. A 2,300-year-old comeback story, and this character is its verb.",
    zh: '成语「一鸣惊人」，说的是平时不声不响、突然干出大事的人。典出一位三年不理朝政的君王：此鸟不飞则已，一飞冲天；不鸣则已，一鸣惊人。随后一夜改过。两千三百年前的逆袭故事，动词就是这个字。',
    ja: '「一鳴驚人」——普段は静かな者が突然大事を成すこと。三年間政務を放った王の故事から。二千三百年前の逆転劇の動詞がこの字です。',
    es: 'El modismo 一鸣惊人 — "un canto asombra al mundo" — es para gente callada que de pronto hace algo espectacular. Viene de un rey que ignoró sus deberes tres años. Una historia de remontada de hace 2.300 años.' } }),
P({ word: '吗', parts: ['口', '马'], pinyin: 'ma', icon: '🗨️', difficulty: 2, layout: 'lr', type: 'xing',
  clue: { en: 'the spoken question mark', es: 'el signo de interrogación hablado' },
  body: { en: 'Mouth for the meaning, 马 for the sound. Hang it on the end of any sentence and the sentence becomes a question.',
    zh: '口表意，马表音。挂在任何句子后面，句子就变成了问句。',
    ja: '口が意味、馬が音。文末に付けるだけで疑問文になります。',
    es: 'Boca para el sentido, 马 para el sonido. Cuélgalo al final y la frase se vuelve pregunta.' },
  lore: { en: "English flips words around (Are you—?), summons do from nowhere (Do you like—?), and keeps seven question words on staff. Chinese asks with one syllable: statement + 吗. Done. 好吗 — OK? — might be the most efficient grammar on the planet. This is the point in the course where learners of Chinese exhale with relief.",
    zh: '英语问句要倒装（Are you—?），要凭空请出 do（Do you like—?）。中文问句只要一个音节：陈述句＋吗。搞定。「好吗」可能是地球上效率最高的语法。学中文的老外，学到这里通常会如释重负地呼一口气。',
    ja: '英語は語順を入れ替え、do まで呼び出します。中国語は文末に「吗」を付けるだけ。「好吗」は地球上で最も効率的な文法かもしれません。',
    es: 'El inglés invierte el orden e invoca el do. El chino pregunta con una sílaba: frase + 吗. 好吗 — ¿vale? — quizá la gramática más eficiente del planeta.' } }),
P({ word: '灶', parts: ['火', '土'], pinyin: 'zào', icon: '♨️', difficulty: 2, layout: 'lr', type: 'hui',
  clue: { en: 'the kitchen stove', es: 'el fogón' },
  body: { en: 'Fire on earth — the earthen hearth every old kitchen was built around.',
    zh: '火加土——老厨房里那座土灶。',
    ja: '火と土。昔の台所の中心にあった竈です。',
    es: 'Fuego sobre tierra: el fogón de barro de toda cocina antigua.' },
  lore: { en: "Every Chinese kitchen used to house an informant: the Kitchen God, who filed an annual report on the family to heaven. So families smeared his paper portrait's lips with sticky sugar — so he could only say sweet things. Bribery, as folk religion. The character got renovated too: the old form 竈 was so hard to write that reformers rebuilt it as fire + earth. Same stove, better floor plan.",
    zh: '中国厨房里曾住着一位报信人：灶神，每年上天汇报这家人的表现。所以人们给他画像的嘴上抹麦芽糖——让他只能说甜话。民俗版的行贿。这个字本身也翻修过：旧写法「竈」难到没人想写，后来直接重建成火＋土。同一座灶，户型好多了。',
    ja: '中国の台所には竈神が住み、年に一度天へ家族の報告をしました。人々は絵の口に飴を塗り、甘いことしか言えなくしました。旧字「竈」は難しすぎて「火＋土」に建て替えられました。',
    es: 'Cada cocina china alojaba a un informante: el Dios del Fogón, que reportaba al cielo una vez al año. Le untaban azúcar en los labios del retrato para que solo dijera cosas dulces. El carácter también fue renovado: la forma antigua 竈 era tan difícil que la reconstruyeron como fuego + tierra.' } }),
P({ word: '闪', parts: ['门', '人'], pinyin: 'shǎn', icon: '🌩️', difficulty: 2, layout: 'en', type: 'hui',
  clue: { en: 'to dodge; a flash', es: 'esquivar; un destello' },
  body: { en: 'A person slipping through a doorway — there and gone.',
    zh: '一个人从门里侧身而过——一晃就没了。',
    ja: '人が門をすり抜ける——一瞬で消えます。',
    es: 'Una persona escurriéndose por la puerta: aparece y desaparece.' },
  lore: { en: "One picture, three meanings, all the same motion: dodge aside (闪开!), a flash of lightning (闪电 — the sky darting into view), even wrenching your back (闪腰 — a dodge gone wrong). Modern Chinese coined a fourth: 闪婚, flash marriage — wed at lightning speed. The person in that doorway has been busy for three thousand years.",
    zh: '一幅画，三个意思，同一个动作：闪开（躲避）、闪电（天空一晃）、闪了腰（一次失败的躲闪）。现代中文又造了第四个：闪婚——以闪电的速度结婚。门里那个人，三千年来一直没闲着。',
    ja: '一枚の絵に三つの意味：よける（闪开）、稲妻（闪电）、ぎっくり腰（闪腰）。現代語は四つ目を作りました：閃婚——電撃結婚。門の中の人は三千年間working。',
    es: 'Una imagen, tres sentidos, el mismo movimiento: esquivar (闪开), relámpago (闪电), lumbago (闪腰 — un esquive fallido). El chino moderno acuñó el cuarto: 闪婚, boda relámpago.' } }),
P({ word: '闷', parts: ['门', '心'], pinyin: 'mèn', icon: '😮‍💨', difficulty: 3, layout: 'en', type: 'xing',
  clue: { en: 'stuffy; bored', es: 'sofocante; aburrido' },
  body: { en: 'A heart shut inside a door. And 门 lends the sound too: mén → mèn.',
    zh: '心被关在门里。门还同时表音：mén → mèn。',
    ja: '心が門の中に。門は音も担当します（mén→mèn）。',
    es: 'Un corazón encerrado tras una puerta. Y 门 presta también el sonido.' },
  lore: { en: "A rare character where the sound part moonlights as meaning: 门 gives the pronunciation and really is the door. Scholars have a name for this double duty (xíngshēng jiān huìyì). You'll hear the word all summer (天气好闷 — the air is stuffy) and on rainy Sundays (好闷 — so bored). One character for a sealed room and a sealed mood — which is exactly how both of them feel.",
    zh: '一个少见的字：声旁兼职表意——门既给读音，又真的是那扇门。学界管这个叫「形声兼会意」。这个词你夏天会常听到（天气好闷），下雨的周日也会（好闷）。一个字同时管密闭的房间和密闭的心情——这两件事的体感，本来就是一回事。',
    ja: '珍しく音符が意味も兼ねる字：門は音でもあり、本当に扉でもあります。夏の蒸し暑さにも（天气好闷）、退屈な日曜にも（好闷）使います。密閉された部屋と心は、同じ感覚です。',
    es: 'Raro carácter donde el fonético también aporta sentido: 门 da el sonido y de verdad es la puerta. Lo oirás todo el verano (aire cargado) y los domingos de lluvia (qué tedio). Un carácter para un cuarto sellado y un ánimo sellado.' } }),
];

const have = new Set(d.puzzles.map((p) => p.word));
let added = 0;
for (const p of NEW) { if (!have.has(p.word)) { d.puzzles.push(p); added++; } }
fs.writeFileSync(file, JSON.stringify(d, null, 2) + '\n', 'utf8');
console.log('batch3: +' + added + ' puzzles, total ' + d.puzzles.length + ', chapters ' + d.chapters.length);
