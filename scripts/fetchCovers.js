import fs from 'fs';
import path from 'path';
import axios from 'axios';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to your paragraphs.js
const PARAGRAPHS_PATH = path.join(__dirname, '../src/data/paragraphs.js');

// Where images are stored (relative to project root)
const ASSETS_ROOT = path.join(__dirname, '../public/assets');

// Read the paragraphs.js file (as a string)
const fileContent = fs.readFileSync(PARAGRAPHS_PATH, 'utf8');

// Extract the PARAGRAPHS object using eval (or better: use a module loader)
// Since it's a JS module, we can use dynamic import if you're using ESM,
// but for simplicity we'll parse it as text and extract the object.
// A safer way: use a temporary module loader.

// We'll use a function to evaluate the file content in a sandbox.
// Alternatively, you can export PARAGRAPHS separately, but we'll parse.
function getParagraphs() {
  // We'll use a simple regex to extract the object definition after 'const PARAGRAPHS = '
  // This is a bit hacky but works for this structure.
  const match = fileContent.match(/const PARAGRAPHS = ({[\s\S]*?});\s*export default PARAGRAPHS/);
  if (!match) throw new Error('Could not find PARAGRAPHS definition');
  // Use Function constructor to safely evaluate
  const func = new Function(`return ${match[1]}`);
  return func();
}

const PARAGRAPHS = getParagraphs();

// Helper to parse source field: format is " Title · Author · Section" (sometimes different)
function parseSource(source) {
  // Remove leading space
  const clean = source.trim();
  // Split by '·' (or '•') and take first part as title, second as author
  const parts = clean.split('·').map(s => s.trim());
  let title = parts[0] || '';
  let author = parts[1] || '';
  // Sometimes the source is just "Title · Author" without section
  return { title, author };
}

// Build the OpenLibrary cover URL
// Available sizes: S, M, L (small, medium, large)
function getCoverUrl(title, author, size = 'M') {
  // Use OpenLibrary cover API: https://covers.openlibrary.org/b/title/{title}?default=false
  // We can also include author for better matching: b/title/{title}?author={author}
  const base = 'https://covers.openlibrary.org/b/title/';
  const query = new URLSearchParams({ default: 'false', size });
  if (author) query.set('author', author);
  return `${base}${encodeURIComponent(title)}?${query.toString()}`;
}

// Download a file and save it
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
  // Collect all entries from all categories
  const allEntries = [];
  for (const [category, entries] of Object.entries(PARAGRAPHS)) {
    if (!Array.isArray(entries)) continue;
    // Only process if they have an image property (code doesn't)
    entries.forEach(entry => {
      if (entry.image) {
        allEntries.push({
          ...entry,
          category,
          // Remove leading slash for path building
          imagePath: entry.image.startsWith('/') ? entry.image.slice(1) : entry.image,
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

    // Build local file path
    const filePath = path.join(ASSETS_ROOT, entry.imagePath);
    const dir = path.dirname(filePath);

    // Check if file already exists
    if (fs.existsSync(filePath)) {
      console.log(`File exists: ${entry.imagePath}, skipping.`);
      skipped++;
      continue;
    }

    // Create directory if it doesn't exist
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const url = getCoverUrl(title, author);
    try {
      await downloadImage(url, filePath);
      console.log(`Downloaded: ${entry.imagePath} (${title})`);
      success++;
    } catch (err) {
      console.error(`Failed to download for ${entry.imagePath}: ${err.message}`);
      failed++;
      // Optionally create a placeholder or fallback
    }

    // Add a small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 200));
  }

  console.log(`Done. Success: ${success}, Skipped (already exist): ${skipped}, Failed: ${failed}`);
}

fetchAllCovers().catch(console.error);