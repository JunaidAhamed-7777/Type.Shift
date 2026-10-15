import fs from "fs";
import path from "path";
import PARAGRAPHS from "./paragraphs";

test("provides the four supported typing difficulties", () => {
  expect(Object.keys(PARAGRAPHS).sort()).toEqual(["code", "easy", "hard", "medium"]);
});

test.each(["easy", "medium", "hard", "code"])("%s passages have usable, unique text and source credits", (difficulty) => {
  const passages = PARAGRAPHS[difficulty];
  expect(passages.length).toBeGreaterThan(0);
  expect(new Set(passages.map(({ text }) => text)).size).toBe(passages.length);
  passages.forEach(({ text, source }) => {
    expect(typeof text).toBe("string");
    expect(text.trim().length).toBeGreaterThan(0);
    expect(typeof source).toBe("string");
    expect(source.trim().length).toBeGreaterThan(0);
  });
});

test.each(["easy", "medium", "hard"])("%s book covers point to existing public assets", (difficulty) => {
  const publicRoot = path.resolve(process.cwd(), "public");
  PARAGRAPHS[difficulty].forEach(({ image }) => {
    expect(image).toMatch(/^\/assets\//);
    const coverPath = path.resolve(publicRoot, `.${image}`);
    expect(coverPath.startsWith(`${publicRoot}${path.sep}`)).toBe(true);
    expect(fs.statSync(coverPath).isFile()).toBe(true);
  });
});

test("code passages intentionally have no book-cover images", () => {
  expect(PARAGRAPHS.code.every(({ image }) => image === undefined)).toBe(true);
});
