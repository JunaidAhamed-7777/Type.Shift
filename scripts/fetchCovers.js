import fs from 'fs';
import path from 'path';
import axios from 'axios';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to your paragraphs.js
const PARAGRAPHS_PATH = path.join(__dirname, '../src/data/paragraphs.js');
// Where images are stored – now pointing to the 'public' folder
const ASSETS_ROOT = path.join(__dirname, '../public');

// Read paragraphs.js as string
const fileContent = fs.readFileSync(PARAGRAPHS_PATH, 'utf8');

// Extract the PARAGRAPHS object
function getParagraphs() {
  const match = fileContent.match(/const PARAGRAPHS = ({[\s\S]*?});\s*export default PARAGRAPHS/);
  if (!match) throw new Error('Could not find PARAGRAPHS definition');
  const func = new Function(`return ${match[1]}`);
  return func();
}

const PARAGRAPHS = getParagraphs();

// Parse source field: "Title · Author · Section"
function parseSource(source) {
  const clean = source.trim();
  const parts = clean.split('·').map(s => s.trim());
  let title = parts[0] || '';
  let author = parts[1] || '';
  return { title, author };
}

// Search OpenLibrary for the book and return cover_id (if found)
async function findCoverId(title, author) {
  try {
    const searchUrl = 'https://openlibrary.org/search.json';
    const params = new URLSearchParams({
      title: title,
      author: author,
      limit: 1,
    });
    const response = await axios.get(`${searchUrl}?${params.toString()}`);
    const data = response.data;
    if (data.docs && data.docs.length > 0) {
      const doc = data.docs[0];
      if (doc.cover_i) {
        return doc.cover_i;
      }
    }
    return null;
  } catch (err) {
    console.warn(`Search failed for "${title}": ${err.message}`);
    return null;
  }
}

// Download image from a URL and save to filepath
async function downloadImage(url, filepath) {
  const response = await axios.get(url, { responseType: 'stream' });
  const writer = fs.createWriteStream(filepath);
  response.data.pipe(writer);
  return new Promise((resolve, reject) => {
    writer.on('finish', resolve);
    writer.on('error', reject);
  });
}

// Main function
async function fetchAllCovers() {
  const allEntries = [];
  for (const [category, entries] of Object.entries(PARAGRAPHS)) {
    if (!Array.isArray(entries)) continue;
    entries.forEach(entry => {
      if (entry.image) {
        allEntries.push({
          ...entry,
          category,
          // Keep the original image path for display, but we'll build file path differently
        });
      }
    });
  }

  console.log(`Found ${allEntries.length} entries with image paths.`);

  let success = 0, skipped = 0, failed = 0;

  for (const entry of allEntries) {
    const { title, author } = parseSource(entry.source);
    if (!title) {
      console.warn(`Skipping entry with empty title: ${entry.source}`);
      failed++;
      continue;
    }

    // Build correct file path: public/ + (image path without leading slash)
    // e.g. entry.image = "/assets/easy/littleredridinghood.png"
    //      -> removes leading "/" -> "assets/easy/littleredridinghood.png"
    const relativePath = entry.image.slice(1); // remove leading "/"
    const filePath = path.join(ASSETS_ROOT, relativePath);
    const dir = path.dirname(filePath);

    // Skip if already exists
    if (fs.existsSync(filePath)) {
      console.log(`File exists: ${relativePath}, skipping.`);
      skipped++;
      continue;
    }

    // Create directory if needed
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Try to get cover_id via search
    let coverId = await findCoverId(title, author);
    let url = null;

    if (coverId) {
      url = `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`;
    } else {
      // Fallback to old title-based endpoint (works sometimes)
      const base = 'https://covers.openlibrary.org/b/title/';
      const query = new URLSearchParams({ default: 'false', size: 'M' });
      if (author) query.set('author', author);
      url = `${base}${encodeURIComponent(title)}?${query.toString()}`;
    }

    try {
      await downloadImage(url, filePath);
      console.log(`Downloaded: ${relativePath} (${title})`);
      success++;
    } catch (err) {
      console.error(`Failed to download for ${relativePath}: ${err.message}`);
      failed++;
      // Optionally create a placeholder image here
    }

    // Delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 300));
  }

  console.log(`Done. Success: ${success}, Skipped (already exist): ${skipped}, Failed: ${failed}`);
}

fetchAllCovers().catch(console.error);