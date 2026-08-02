// Batch 2 lore: the 23 bare entries, now with usage lines and hooks into
// things the western internet already knows (Li Bai, the 木林森 meme,
// chinglish signs, the turkey map, the kangaroo myth, the Lipstick King).
// Rules unchanged: anchor to English/Greek/Latin, no invented etymology,
// admit uncertainty, myth-bust where a viral fake exists.
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const file = path.join(root, 'content.json');
const d = JSON.parse(fs.readFileSync(file, 'utf8'));

const LORE = {
'火山': {
en: "Japanese uses the exact same two characters — 火山, kazan — and Korean 화산 is the same word said aloud: half of Asia agreed this was the obvious name. English needed a Roman god (Vulcan) to say it. Bonus reading: 富士山 is a 山 — and yes, it is also a 火山.",
zh: "日语用一模一样的两个字（火山，kazan），韩语的화산也是同一个词的读音——半个亚洲都认为这是显而易见的命名。英语得先请出罗马火神 Vulcan。顺手读个真东西：富士山是一座山，而且确实是一座火山。",
ja: "日本語もそのまま「火山」、韓国語の화산も同じ語です。英語だけがローマ神話（Vulcan）を必要としました。",
es: "El japonés usa los mismos caracteres (火山, kazan) y el coreano 화산 es la misma palabra. Medio Asia coincidió. El inglés necesitó un dios romano: Vulcano." },
'山水': {
en: "Mountains-and-waters is how Chinese says landscape — and the name of a thousand-year painting tradition. Guidebooks still quote 桂林山水甲天下: 'Guilin's shanshui is first under heaven.' English landscape started as Dutch painters' jargon; Chinese just names what your eyes get: mountains, water.",
zh: "中文管风景叫「山水」，一整个绵延千年的画种也叫这个名字。旅游手册至今还在引「桂林山水甲天下」。英语的 landscape 起初是荷兰画家的行话；中文直接说眼睛看到的东西：山，和水。",
ja: "中国語で風景は「山水」。千年続く絵画の伝統の名前でもあります。「桂林山水甲天下」という決まり文句は今も現役です。",
es: "Montañas-y-aguas es paisaje en chino, y el nombre de mil años de pintura. Las guías aún citan 桂林山水甲天下: 'el shanshui de Guilin es el primero bajo el cielo'." },
'森林': {
en: "You have probably met this word as a meme — the image that says Chinese is just logic: 木 tree, 林 woods, 森 forest. It goes viral every few months, and for once the internet is right. Chinese even has a proverb ready: 独木不成林 — one tree does not make a forest. English says no man is an island; Chinese says no tree is a forest.",
zh: "你八成在梗图里见过它——那张「中文就是逻辑」的图：木、林、森。每隔几个月火一次，而且这次网上说的居然是真的。中文还有句现成的谚语：独木不成林。英语说 no man is an island，中文说：一棵树成不了林。",
ja: "「木→林→森」のミーム画像を見たことがあるはずです。数ヶ月おきにバズりますが、珍しく本当です。「独木不成林」ということわざもあります。",
es: "Seguro viste el meme: 木 árbol, 林 bosque, 森 selva. Se hace viral cada pocos meses, y por una vez internet tiene razón. Hay proverbio: 独木不成林, un árbol no hace bosque." },
'明月': {
en: "The most famous poem in the Chinese language opens with this word: 床前明月光 — 'moonlight before my bed'. Li Bai, eighth century, twenty characters — and you have already built two of them (明 and 月). In Chinese poetry the bright moon means one thing: someone far from home, looking up.",
zh: "中文里最有名的一首诗就以它开头：床前明月光。李白，八世纪，全诗二十个字——其中两个你已经亲手拼出来了（明和月）。在中国诗里，明月只有一个意思：离家的人，抬起了头。",
ja: "中国語で最も有名な詩はこの語で始まります：「床前明月光」。李白、八世紀。明月の意味はひとつ——故郷を離れた人が空を見上げること。",
es: "El poema más famoso del chino empieza con esta palabra: 床前明月光, 'luz de luna ante mi cama'. Li Bai, siglo VIII. En la poesía china la luna clara significa una cosa: alguien lejos de casa, mirando arriba." },
'明日': {
en: "There is a whole Ming-dynasty poem about procrastination built on this word: 明日复明日，明日何其多 — 'tomorrow after tomorrow, how many tomorrows are there?' Four centuries before productivity YouTube, same message. Use it tonight: 明日见 — see you tomorrow.",
zh: "有一整首明代的诗在用这个词讲拖延症：「明日复明日，明日何其多」。比效率类视频早了四百年，讲的是同一件事。今晚就能用：明日见。",
ja: "明代の詩「明日复明日，明日何其多」は先延ばしについての詩です。生産性系動画より四百年早い。今夜使えます：明日見（また明日）。",
es: "Hay un poema Ming entero sobre procrastinar con esta palabra: 明日复明日, 'mañana tras mañana, ¿cuántos mañanas hay?'. Cuatro siglos antes de YouTube. Úsala hoy: 明日见, hasta mañana." },
'尘土': {
en: "English buries its dead with 'ashes to ashes, dust to dust' — and Chinese borrowed the line back as 尘归尘，土归土, dust to dust, earth to earth. You will hear it in Chinese films. Both nouns in that liturgy are the two you just picked. Some words do the heaviest lifting a language has.",
zh: "英语葬礼说 ashes to ashes, dust to dust——中文把这句借了回来：「尘归尘，土归土」，影视剧里常听到。这句仪文里的两个名词，就是你刚选的两块。有些词，干的是一门语言里最重的活。",
ja: "英語の「ashes to ashes, dust to dust」を中国語は「尘归尘，土归土」として借りました。映画でよく聞くフレーズです。",
es: "El inglés entierra con 'polvo al polvo' — y el chino tomó prestada la frase: 尘归尘，土归土. La oirás en el cine chino. Los dos sustantivos son los que acabas de elegir." },
'人口': {
en: "A census in Chinese literally counts mouths. English quietly does the same: 'four mouths to feed', 'per capita' — Latin for by-the-head. Every language counts people in body parts; Chinese just left it visible in the word. Real usage: 中国人口 — the population of China, fourteen hundred million mouths.",
zh: "中文的人口普查，字面上数的是「嘴」。英语其实也一样：four mouths to feed、per capita（拉丁语「按头算」）。所有语言都拿身体部位数人，中文只是把它留在了词面上。真实用法：中国人口，十四亿张嘴。",
ja: "中国語の国勢調査は文字通り「口」を数えます。英語も per capita（頭あたり）と言います。どの言語も体の部位で人を数えるのです。",
es: "El censo chino cuenta bocas, literalmente. El inglés hace igual sin decirlo: 'bocas que alimentar', 'per cápita' (por cabeza en latín). El chino solo lo dejó visible." },
'小心': {
en: "If you ever laughed at a 'carefully slide' sign, this is the word behind it: 小心地滑 means 'careful — slippery floor', machine-translated into legend. You can now read the front half of the most memed sign in China. And yes: in Chinese, being careful is literally making your heart small.",
zh: "如果你在外网笑过 carefully slide 的标牌，背后就是这个词：小心地滑，被机翻成了传世梗。现在，中国被玩梗最多的标牌，前一半你已经认识了。对——在中文里，谨慎就是把心变小。",
ja: "海外で有名な誤訳看板 carefully slide の正体がこれ：「小心地滑」（足元注意）。最も有名なミーム看板の前半分が読めるようになりました。",
es: "Si te reíste de un cartel 'carefully slide', esta es la palabra: 小心地滑 significa 'cuidado, suelo resbaladizo', traducido por máquina a la leyenda. Ya puedes leer la mitad del cartel más memeado de China." },
'泪水': {
en: "A trade secret: languages borrow feelings. English coined 'crocodile tears' six centuries ago; modern Chinese imported the whole idiom — 鳄鱼的眼泪, the crocodile's tears. The character you built is sitting inside it. Words cross borders faster than people do.",
zh: "一个行业机密：语言会互相借情绪。英语六百年前发明了 crocodile tears，现代中文把整个习语搬了过来——鳄鱼的眼泪。你刚拼的那个「泪」就在里面。词过境，比人快。",
ja: "言語は感情を借用します。英語の crocodile tears を中国語は「鳄鱼的眼泪」として丸ごと輸入しました。あなたが作った「泪」がその中にいます。",
es: "Secreto del oficio: las lenguas se prestan sentimientos. El inglés acuñó 'lágrimas de cocodrilo'; el chino moderno importó el modismo entero: 鳄鱼的眼泪. Tu carácter está dentro." },
'银河': {
en: "Li Bai used this word for a waterfall: 疑是银河落九天 — 'as if the Silver River fell from the ninth heaven'. And every summer, Qixi (the 'Chinese Valentine's Day' trending on your feed) retells the legend of two lovers separated by this river, reunited once a year on a bridge of magpies. English got milk. Chinese got a love story.",
zh: "李白拿这个词写瀑布：「疑是银河落九天」。每年夏天，你时间线上的「中国情人节」七夕，讲的就是被这条河分开的两个人，一年一次靠喜鹊搭桥相见。英语分到了牛奶，中文分到了一个爱情故事。",
ja: "李白は滝をこう詠みました：「疑是銀河落九天」。七夕伝説では、この川に隔てられた二人が年に一度だけ会えます。英語はミルク、中国語は恋物語。",
es: "Li Bai la usó para una cascada: 疑是银河落九天, 'como si el Río de Plata cayera del noveno cielo'. Y cada verano, Qixi recuenta a dos amantes separados por este río. El inglés recibió leche; el chino, una historia de amor." },
'电影': {
en: "You may have seen the viral list — 'Chinese words that sound like cyberpunk': movie = electric shadow, computer = electric brain, train = fire car. This game is that list, playable. And the word is exact: a film really is shadows driven by electricity. 看电影 — 'watch a movie' — is on every first date in China.",
zh: "你可能刷到过那张疯传清单——「听起来像赛博朋克的中文词」：电影 = electric shadow，电脑 = electric brain，火车 = fire car。这个游戏就是那张清单的可玩版。而且这个词造得极准：电影确实就是被电驱动的影子。造句：看电影——中国每一场初次约会的保留节目。",
ja: "バズった例のリスト——「サイバーパンクに聞こえる中国語」：電影＝電気の影。しかも正確です。映画は本当に電気で動く影ですから。",
es: "Habrás visto la lista viral: 'palabras chinas que suenan a cyberpunk': película = sombra eléctrica, ordenador = cerebro eléctrico. Este juego es esa lista, jugable. Y es exacta: el cine es sombra movida por electricidad. 看电影: ver una película." },
'火车': {
en: "From the age when trains ran on actual fire. English train just means 'a thing dragged' — same root as trailer. The sequel word is better: today's bullet trains are 高铁, 'tall iron', and China runs more of them than the rest of the planet combined. Fire car, then tall iron. The story continues.",
zh: "来自火车真的烧火的年代。英语 train 的本义只是「被拖着走的东西」——和 trailer 同根。续集词更好：今天的高速列车叫高铁，而中国的高铁里程比全世界其他地方加起来还多。先是火车，然后是高铁。故事还在写。",
ja: "汽車が本当に火で走った時代の言葉。英語の train は「引かれるもの」という意味だけ。続編の語「高鉄」（高速鉄道）は今、中国が世界一です。",
es: "De cuando los trenes corrían con fuego real. Train en inglés solo significa 'cosa arrastrada'. La secuela es mejor: los trenes bala son 高铁, 'hierro alto', y China tiene más que el resto del planeta junto." },
'河马': {
en: "Now open up the Greek: hippo-potamus is horse-of-the-river, the very same word. Two civilisations, five thousand kilometres apart, looked at the same absurd animal and wrote the same name — one buried it in Greek, one left it readable. You already own both halves.",
zh: "把希腊语拆开看：hippo（马）-potamus（河）——一模一样的词。相隔五千公里的两个文明，看着同一只荒谬的动物，写下了同一个名字——一边把它埋进希腊语，一边留在明面上。这两半你都已经集齐了。",
ja: "ギリシャ語を開くと hippo-potamus は「川の馬」。五千キロ離れた二つの文明が同じ名前を書きました。片方は読める形で。",
es: "Abre el griego: hipo-pótamo es caballo-de-río, la misma palabra exacta. Dos civilizaciones a cinco mil kilómetros escribieron el mismo nombre; una lo enterró en griego, la otra lo dejó legible." },
'松鼠': {
en: "There is a running joke that Chinese animal names were invented by someone describing animals over a bad phone line: pine mouse, pocket mouse, river horse, bear cat. All real — all in this chapter. English squirrel is Greek for 'shadow-tail'. Prettier, but you needed Greek to see it.",
zh: "网上有个长盛不衰的段子：中文动物名像是有人隔着劣质电话线描述动物——pine mouse、pocket mouse、river horse、bear cat。全是真的，而且全在这一章。英语 squirrel 是希腊语「影子尾巴」——更美，但你得先学希腊语才看得见。",
ja: "「中国語の動物名は電話越しの説明みたいだ」というジョークがあります：松のねずみ、袋のねずみ、川の馬、熊の猫。全部本物で、全部この章にいます。",
es: "Hay un chiste recurrente: los nombres chinos de animales parecen descripciones por teléfono con mala señal: ratón de pino, ratón de bolsa, caballo de río, oso gato. Todos reales, todos en este capítulo." },
'袋鼠': {
en: "English tells a famous story about kangaroo — that it meant 'I don't understand you' in an Aboriginal language. Sadly for the story, it's debunked: gangurru really was the animal's name. Every language has its viral fake etymology (remember 忙?). Chinese ducked the whole problem: it saw the pocket, it wrote the pocket.",
zh: "英语关于 kangaroo 有个著名传说——说它在土著语里的意思是「我听不懂」。可惜传说被辟谣了：gangurru 就是那种动物的名字。每种语言都有自己的疯传伪词源（还记得「忙」吗？）。中文直接绕开了整个问题：看见口袋，写下口袋。",
ja: "kangaroo は「わからない」という意味だった——という有名な話は俗説です。どの言語にもバズる偽語源があります（「忙」を覚えていますか）。中国語は問題ごと回避：袋を見て、袋と書いた。",
es: "El inglés cuenta que kangaroo significaba 'no te entiendo' en lengua aborigen. Desmentido: gangurru era el nombre real del animal. Toda lengua tiene su falsa etimología viral (¿recuerdas 忙?). El chino esquivó el problema: vio la bolsa, escribió la bolsa." },
'海豚': {
en: "Sea pig sounds rude — until you check the receipts. English porpoise is Latin porcus + piscis, 'pig-fish'. German calls the guinea pig a little sea-pig (Meerschweinchen). Half of Europe agreed with China: round, smooth, snouted — pig. Dolphins deserved better from all of us.",
zh: "「海里的猪」听着不体面——直到你翻旧账：英语 porpoise 来自拉丁语 porcus + piscis，「猪鱼」；德语管豚鼠叫「小海猪」（Meerschweinchen）。半个欧洲和中国想到了一块儿：圆的、滑的、带吻突的——猪。海豚值得我们所有人给它起个更好的名字。",
ja: "「海の豚」は失礼に聞こえますが、英語の porpoise もラテン語で「豚魚」、ドイツ語のモルモットは「小さな海豚」です。ヨーロッパの半分が中国と同意見でした。",
es: "Cerdo de mar suena feo — hasta revisar los recibos: porpoise viene del latín porcus + piscis, 'pez-cerdo', y el alemán llama al cuy 'cerdito de mar'. Media Europa coincidió con China." },
'熊猫': {
en: "The one animal name China exported to the whole planet: panda diplomacy, Kung Fu Panda (功夫熊猫), and the eternal debate over whether it should really be 猫熊, cat-bear (Taiwan says yes). English panda was borrowed from Nepali and nobody is quite sure what it meant. 熊猫 you can read on sight — you just did.",
zh: "中国出口给全世界的那个动物名：熊猫外交、功夫熊猫，还有永恒的争论——到底该叫熊猫还是猫熊（台湾坚持后者）。英语 panda 借自尼泊尔语，本义至今没人说得清。而熊猫两个字，你看一眼就读出来了——刚刚就读了。",
ja: "中国が世界に輸出した動物名。パンダ外交、カンフーパンダ、そして「猫熊」か「熊猫」かという永遠の論争。英語の panda はネパール語からの借用で、本義は不明のままです。",
es: "El nombre animal que China exportó al planeta: diplomacia panda, Kung Fu Panda (功夫熊猫), y el eterno debate de si debería ser 猫熊, gato-oso (Taiwán dice que sí). Panda en inglés viene del nepalí y nadie sabe bien qué significaba." },
'火鸡': {
en: "Meet the world's most confused bird. English named it after Turkey; Turkish calls it hindi (India); Hindi calls it Peru; Portuguese agrees. There's a viral map of every country blaming another country. China skipped the geography fight and looked at the actual bird: red wattle. Fire chicken. Done.",
zh: "认识一下全世界最迷惑的鸟。英语拿土耳其给它命名；土耳其语叫它 hindi（印度）；印地语叫它秘鲁；葡萄牙语表示同意。有一张疯传的地图：每个国家都把锅甩给另一个国家。中国没参加这场地理大战，只是看了看鸟本身：脖子上一团红。火鸡。收工。",
ja: "世界一混乱した鳥。英語はトルコ、トルコ語はインド、ヒンディー語はペルーと呼ぶ。各国が責任を押し付け合う地図がバズりました。中国は地理戦争に参加せず、鳥を見た：首が赤い。火の鶏。以上。",
es: "El ave más confundida del mundo: el inglés la nombró por Turquía; el turco la llama hindi (India); el hindi, Perú. Hay un mapa viral de países culpándose. China miró al ave: cuello rojo. Pollo de fuego. Listo." },
'眼镜': {
en: "Keep this word — it unlocks a chain. 眼镜蛇, 'glasses-snake', is the cobra, named for the spectacle pattern on its hood. English herpetologists say spectacled cobra — the exact same idea. One word in, and you can already read a snake.",
zh: "记住这个词——它能解锁一条链。眼镜蛇，「戴眼镜的蛇」，因为颈部有一副眼镜形的斑。英语爬行学家也管它叫 spectacled cobra，一模一样的思路。才学一个词，你已经顺手认识了一条蛇。",
ja: "この語は連鎖します。「眼镜蛇」（メガネのヘビ）はコブラのこと。英語でも spectacled cobra と言います。単語ひとつで、ヘビが一匹読めるようになりました。",
es: "Guarda esta palabra: desbloquea una cadena. 眼镜蛇, 'serpiente con gafas', es la cobra, por el dibujo de anteojos en su capucha. Los herpetólogos ingleses dicen spectacled cobra: la misma idea." },
'地铁': {
en: "London named the tunnel (underground). New York named the depth (subway). Paris abbreviated a bureaucracy (métro, from 'metropolitan railway'). Chinese named the thing itself: iron under the ground. Next time you see 地铁站 on a sign you'll read all three characters — 站 is station.",
zh: "伦敦命名了隧道（underground），纽约命名了深度（subway），巴黎缩写了一个机构名（métro，来自「大都会铁路」）。中文命名了东西本身：地下的铁。下次在标牌上看到「地铁站」，三个字你全认识——「站」就是 station。",
ja: "ロンドンはトンネルを、ニューヨークは深さを、パリは役所名の略を選びました。中国語はモノ自体を命名：地下の鉄。「地铁站」の「站」は駅です。",
es: "Londres nombró el túnel (underground), Nueva York la profundidad (subway), París abrevió una burocracia (métro). El chino nombró la cosa: hierro bajo tierra. En el cartel 地铁站, 站 es estación." },
'电脑': {
en: "The finale of the cyberpunk list: electric brain. English computer describes the job (it computes); Chinese describes the organ it replaced. That's why Chinese tech slang feels alive — a crashed computer is 死机, 'the machine died'. A billion people type this word every day, and you now know both halves.",
zh: "赛博朋克清单的压轴：电的脑。英语 computer 描述职能（它计算），中文描述它替代的器官。所以中文科技俚语才那么生动——电脑崩了叫「死机」，机器死了。十几亿人每天都在敲这个词，现在它的两半你都认识。",
ja: "サイバーパンクリストの大トリ：電気の脳。英語は職能を、中国語は置き換えた器官を描写します。クラッシュは「死機」——機械が死んだ、です。",
es: "El final de la lista cyberpunk: cerebro eléctrico. Computer describe el trabajo; el chino, el órgano que reemplazó. Por eso la jerga china está viva: un ordenador colgado es 死机, 'la máquina murió'." },
'冰箱': {
en: "English used to say exactly this — icebox, a wooden cabinet with a block of ice — then the technology changed and English rebranded. Chinese kept the old name and let the meaning upgrade itself. Half of Chinese tech vocabulary works like this: new machine, old picture. Fridge magnet? 冰箱贴 — 'icebox sticker'.",
zh: "英语原来也是这么叫的——icebox，放冰块的木柜——后来技术变了，英语改了口。中文留着旧名字，让意思自己升级。一大半中文科技词都是这个路数：新机器，旧图画。冰箱贴？字面就是「贴在冰箱上的东西」。",
ja: "英語も昔は icebox（氷の箱）と言っていました。技術が変わると英語は改名し、中国語は古い名前のまま意味を更新しました。",
es: "El inglés decía exactamente esto: icebox, caja de hielo. Cambió la tecnología y el inglés cambió de marca. El chino conservó el nombre viejo y dejó que el significado se actualizara solo." },
'口红': {
en: "English named the object — a stick for lips. Chinese named the result: mouth, red. If Chinese internet culture ever crossed your feed, you've met this word: the 'Lipstick King' (口红一哥) Austin Li once sold 15,000 lipsticks in five minutes on livestream — global headlines, this exact word in them.",
zh: "英语命名物件——涂唇的棒（lip-stick）。中文命名结果：口，红。如果中国互联网文化从你时间线上路过过，你已经见过这个词：「口红一哥」李佳琦，直播五分钟卖掉一万五千支口红——上了全球新闻，标题里就是这两个字。",
ja: "英語はモノ（唇の棒）を、中国語は結果（口が赤い）を命名しました。「口紅一哥」李佳琦がライブ配信5分で口紅1万5千本を売った話は世界ニュースになりました。",
es: "El inglés nombró el objeto: un lápiz para labios. El chino nombró el resultado: boca, rojo. El 'Rey del Pintalabios' (口红一哥) vendió 15.000 en cinco minutos por livestream: titulares globales con esta palabra exacta." },
};

let set = 0;
for (const p of d.puzzles) {
  if (LORE[p.word]) {
    if (p.lore) throw new Error(p.word + ' already has lore — refusing to overwrite');
    p.lore = LORE[p.word];
    set++;
  }
}
const missing = d.puzzles.filter((p) => !p.lore).map((p) => p.word);
fs.writeFileSync(file, JSON.stringify(d, null, 2) + '\n', 'utf8');
console.log('lore added: ' + set);
console.log('still bare: ' + (missing.length ? missing.join(' ') : 'none — 41/41 done'));
