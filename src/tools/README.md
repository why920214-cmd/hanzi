# 内容工作流

内容和代码已经分开了。改内容不用碰 `hanzi.html`。

```
content.json          ← 唯一的内容源，改这个
     ↓  node tools/build.js
hanzi.html            ← 游戏（单文件，可离线）
hanzi-site/index.html ← 部署用，同内容
```

## 三个命令

```bash
node tools/extract.js   # hanzi.html → content.json（只在初始化时用一次）
node tools/build.js     # content.json → hanzi.html + hanzi-site/index.html
git -C hanzi-site add -A && git -C hanzi-site commit -m "..." && git -C hanzi-site push
```

`build.js` 只替换 `hanzi.html` 里被标记的四个数据块（`/*<Q>*/`、`/*<EX>*/`、`/*<DIFF>*/`、`/*<LAY>*/`），
游戏逻辑一行都不会动，而且可以反复执行（幂等）。

## 审核台

用本地服务器打开 `tools/audit.html`，会自动读 `content.json`。

```bash
python3 -m http.server 8899   # 然后开 localhost:8899/tools/audit.html
```

* 顶部是内容体检数字：待补字源、文案待改、难度分布、猜字/猜词配比
* 点任意一行打开编辑器，改难度、排布、谜面、四语释义、四语字源
* 改完点「导出 content.json」，覆盖根目录那份，再跑 `build.js`
* 没有服务器时，把 `content.json` 拖进页面也能用

## 自动检查的规则

这些是从前面的内容讨论里固化下来的判据：

| 标记 | 含义 |
|---|---|
| **没有字源** | `lore` 是空的 |
| **没锚定英语** | 字源里没出现 English / Latin / Greek / 日语 之类的跨语言对照 —— 这是写给外国人的硬要求 |
| **疑似别的字的冷知识** | 出现 鑫/淼/犇/人名 这类词，通常意味着在讲别的字而不是这一个 |
| **字源太短** | 英文少于 70 字符，基本讲不出一件完整的事 |
| **释义太短** | 英文少于 25 字符 |
| **缺 xx 释义 / 字源** | 四语没写全 |
| **后期章节还是简单题** | 第 4 章之后还有难度 1，梯度断了 |
| **缺英文谜面** | 数据损坏，游戏会崩 |

新增判据直接改 `audit.html` 里的 `audit()` 函数，几行就够。
