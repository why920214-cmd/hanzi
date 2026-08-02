# 墨 INK · 源码目录

线上 `index.html` 由这里的源头构建：

```
content.json                 内容唯一来源（题目/字源/积木）
tools/qing.css + qing-shell  界面层（经 reskin.js 拼接进 hanzi.html）
tools/build.js               content.json → hanzi.html/index.html（标记块替换，幂等）
tools/regen-font.js          四份字体子集重切内嵌（宋400/900、英文衬线、书法体）
tools/embed-sfx.js           音效 base64 内嵌
tools/audit.html             内容审核台（本地服务器打开）
```

工作流：改 content.json → `node tools/build.js` →（字符有增删时先 `node tools/regen-font.js`）→ 提交部署。
