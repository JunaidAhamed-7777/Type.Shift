const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { JSDOM } = require("jsdom");

const publicDirectory = path.resolve(__dirname, "../public");
const canonical = "https://typeshiftt.vercel.app/";
const title = "Type.Shift — Free Typing Speed Test";
const read = (filename) => fs.readFileSync(path.join(publicDirectory, filename));

function one(document, selector) {
  const matches = document.querySelectorAll(selector);
  assert.equal(matches.length, 1, `Expected one ${selector}`);
  return matches[0];
}

function asset(url) {
  const resolved = new URL(url.replace("%PUBLIC_URL%", ""), canonical);
  assert.equal(resolved.origin, new URL(canonical).origin, `Local asset: ${url}`);
  const filename = path.resolve(
    publicDirectory,
    `.${decodeURIComponent(resolved.pathname)}`,
  );
  assert.ok(
    filename.startsWith(`${publicDirectory}${path.sep}`),
    `Asset must stay inside public: ${url}`,
  );
  assert.ok(fs.statSync(filename).isFile(), `Missing asset: ${url}`);
  return fs.readFileSync(filename);
}

function pngDimensions(buffer) {
  assert.equal(buffer.subarray(0, 8).toString("hex"), "89504e470d0a1a0a");
  assert.equal(buffer.subarray(12, 16).toString("ascii"), "IHDR");
  return [buffer.readUInt32BE(16), buffer.readUInt32BE(20)];
}

function jpegDimensions(buffer) {
  assert.equal(buffer.readUInt16BE(0), 0xffd8, "Expected a JPEG image");
  const frameMarkers = new Set([
    0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7,
    0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf,
  ]);
  let offset = 2;
  while (offset + 3 < buffer.length) {
    assert.equal(buffer[offset], 0xff, "Invalid JPEG marker");
    while (buffer[offset] === 0xff) offset += 1;
    const marker = buffer[offset++];
    if (marker === 0xda || marker === 0xd9) break;
    const length = buffer.readUInt16BE(offset);
    assert.ok(length >= 2 && offset + length <= buffer.length);
    if (frameMarkers.has(marker)) {
      return [buffer.readUInt16BE(offset + 5), buffer.readUInt16BE(offset + 3)];
    }
    offset += length;
  }
  assert.fail("JPEG has no readable dimensions");
}

const document = new JSDOM(read("index.html").toString()).window.document;
const meta = (name) => one(document, `meta[name="${name}"]`).content;
const og = (property) => one(document, `meta[property="og:${property}"]`).content;
const description = meta("description");
assert.equal(document.documentElement.lang, "en");
assert.equal(one(document, "title").textContent, title);
assert.equal(one(document, 'link[rel="canonical"]').getAttribute("href"), canonical);
assert.equal(og("url"), canonical);
assert.equal(og("site_name"), "Type.Shift");
assert.equal(og("type"), "website");
assert.equal(og("title"), title);
assert.equal(meta("twitter:title"), title);
assert.ok(description.length > 0 && description.length <= 160);
assert.equal(og("description"), description);
assert.equal(meta("twitter:description"), description);
assert.equal(meta("twitter:card"), "summary_large_image");
assert.equal(meta("application-name"), "Type.Shift");
assert.equal(meta("author"), "Junaid");
assert.ok(!/noindex/i.test(meta("robots")), "Homepage must be indexable");

const socialImage = og("image");
assert.ok(socialImage.startsWith(canonical), "Social image must be an absolute URL");
assert.equal(meta("twitter:image"), socialImage);
assert.equal(og("image:type"), "image/jpeg");
assert.deepEqual([Number(og("image:width")), Number(og("image:height"))], [1200, 630]);
assert.deepEqual(jpegDimensions(asset(socialImage)), [1200, 630]);
assert.ok(og("image:alt").trim().length > 0);
assert.equal(meta("twitter:image:alt"), og("image:alt"));

for (const [selector, size] of [
  ['link[rel="icon"]', 32],
  ['link[rel="apple-touch-icon"]', 180],
]) {
  const link = one(document, selector);
  assert.equal(link.getAttribute("sizes"), `${size}x${size}`);
  assert.deepEqual(pngDimensions(asset(link.getAttribute("href"))), [size, size]);
}

const schema = JSON.parse(one(document, 'script[type="application/ld+json"]').textContent);
assert.equal(schema["@context"], "https://schema.org");
const website = schema["@graph"].find((entry) => entry["@type"] === "WebSite");
const application = schema["@graph"].find((entry) => entry["@type"] === "WebApplication");
assert.ok(website && application, "Website and application structured data required");
assert.equal(website["@id"], `${canonical}#website`);
assert.equal(application["@id"], `${canonical}#app`);
assert.equal(website.mainEntity["@id"], application["@id"]);
assert.equal(application.isPartOf["@id"], website["@id"]);
for (const entry of [website, application]) {
  assert.equal(entry.url, canonical);
  assert.equal(entry.name, "Type.Shift");
  assert.equal(entry.description, description);
  assert.equal(entry.inLanguage, "en");
  assert.equal(entry.isAccessibleForFree, true);
  assert.equal(entry.author.name, "Junaid");
}
assert.equal(application.operatingSystem, "Any");
assert.equal(application.image, socialImage);

const manifestLink = one(document, 'link[rel="manifest"]').getAttribute("href");
const manifest = JSON.parse(asset(manifestLink));
assert.equal(manifest.name, title);
assert.equal(manifest.short_name, "Type.Shift");
assert.equal(manifest.description, description);
assert.equal(manifest.lang, "en");
assert.equal(manifest.dir, "ltr");
assert.equal(manifest.display, "standalone");
for (const field of ["id", "start_url", "scope"]) assert.equal(manifest[field], "/");
const iconSizes = new Set();
for (const icon of manifest.icons) {
  assert.equal(icon.type, "image/png");
  const dimensions = icon.sizes.split("x").map(Number);
  assert.deepEqual(pngDimensions(asset(icon.src)), dimensions);
  assert.equal(dimensions[0], dimensions[1], "App icons must be square");
  assert.ok(icon.purpose.split(" ").includes("any"));
  iconSizes.add(dimensions[0]);
}
assert.ok(iconSizes.has(192) && iconSizes.has(512));

const robots = read("robots.txt").toString();
assert.match(robots, /^User-agent:\s*\*\s*$/m);
assert.match(robots, /^Allow:\s*\/\s*$/m);
assert.match(robots, /^Sitemap:\s*https:\/\/typeshiftt\.vercel\.app\/sitemap\.xml\s*$/m);
assert.doesNotMatch(robots, /^Disallow:\s*\/\s*$/m);
const sitemap = new JSDOM(read("sitemap.xml").toString(), { contentType: "text/xml" }).window.document;
assert.equal(sitemap.documentElement.namespaceURI, "http://www.sitemaps.org/schemas/sitemap/0.9");
assert.deepEqual([...sitemap.querySelectorAll("loc")].map((loc) => loc.textContent), [canonical]);
const notFound = new JSDOM(read("404.html").toString()).window.document;
assert.match(one(notFound, 'meta[name="robots"]').content, /\bnoindex\b/i);
for (const link of notFound.querySelectorAll('link[rel="icon"], link[rel="apple-touch-icon"]')) {
  asset(link.getAttribute("href"));
}

console.log("Metadata verified: canonical, search/social cards, structured data, actual image dimensions, manifest, sitemap, robots, and 404 noindex.");
