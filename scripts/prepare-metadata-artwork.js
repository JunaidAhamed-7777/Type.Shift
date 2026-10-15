const fs = require("node:fs");
const path = require("node:path");

// Render this local artwork at 1200×630, or ?icon at 512×512, to refresh metadata assets.
const root = path.resolve(__dirname, "..");
const font = (file) => fs.readFileSync(path.join(root, "node_modules", file)).toString("base64");
const brandFont = font("@fontsource/jetbrains-mono/files/jetbrains-mono-latin-700-normal.woff2");
const bodyFont = font("@fontsource-variable/chivo/files/chivo-latin-wght-normal.woff2");
const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="robots" content="noindex"><title>Type.Shift metadata artwork</title>
<script>document.documentElement.dataset.art = location.search === '?icon' ? 'icon' : 'social';</script>
<style>
@font-face {font-family: Brand; src:url(data:font/woff2;base64,${brandFont}) format('woff2'); font-weight:700; font-display:block}
@font-face {font-family: Chivo; src:url(data:font/woff2;base64,${bodyFont}) format('woff2'); font-weight:100 900; font-display:block}
* {box-sizing:border-box} html,body {margin:0;background:#101514;color:#e6ede9} body {width:1200px;height:630px;font-family:Chivo,sans-serif;overflow:hidden}
.green {color:#39ff14}.red {color:#ff3b3b}.wordmark {font-family:Brand,monospace;font-weight:700;letter-spacing:-.04em;white-space:nowrap}
.social {position:relative;width:1200px;height:630px;padding:58px 72px}
.social .wordmark {font-size:46px;line-height:1.2}
.free {position:absolute;right:72px;top:74px;font-size:21px;color:#a5b3aa}
h1 {margin:84px 0 0;font-size:80px;line-height:1.06;letter-spacing:-.04em;font-weight:750}
h1 span {display:block} .description {margin:23px 0 0;font-size:25px;line-height:1.5;color:#a5b3aa}
.footer {position:absolute;bottom:54px;left:72px;right:72px;display:flex;justify-content:space-between;font-size:19px;color:#a5b3aa}
.keys {position:absolute;right:74px;top:266px;width:340px;transform:rotate(-9deg);display:flex;gap:12px}
.key {width:76px;height:78px;border:1px solid #3d4b43;border-radius:13px;background:#181f1e;box-shadow:0 8px 0 #3d4b43;display:grid;place-items:center;font:25px Brand,monospace;color:#a5b3aa}
.shift {position:absolute;right:10px;top:104px;width:186px;height:64px;padding:0 22px;display:flex;align-items:center;justify-content:space-between;background:#283e28;color:#39ff14;font:18px Brand,monospace}
.icon {display:none;width:512px;height:512px;align-items:center;justify-content:center;font-size:116px;line-height:1}
:root[data-art=icon] body {width:512px;height:512px} :root[data-art=icon] .social {display:none} :root[data-art=icon] .icon {display:flex}
</style></head><body>
<main class="social"><div class="wordmark">[<span class="green">Type.</span><span class="red">Shift</span>]</div><div class="free">Free. No account required.</div>
<h1>Find your <span class="green">rhythm.</span></h1><p class="description">A typing speed test with words worth typing.</p>
<div class="keys" aria-hidden="true"><div class="key">t</div><div class="key">y</div><div class="key">p</div><div class="key">e</div><div class="key shift"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 19V5m-7 7 7-7 7 7"/></svg><span>shift</span></div></div>
<div class="footer"><span>Books, science &amp; code · WPM &amp; accuracy</span><span>15–120 second limits</span></div></main>
<div class="icon wordmark">[<span class="green">T.</span><span class="red">S</span>]</div>
</body></html>`;
fs.writeFileSync(path.join(root, "public", "metadata-preview.html"), html);
console.log("Artwork ready: /metadata-preview.html and /metadata-preview.html?icon");
