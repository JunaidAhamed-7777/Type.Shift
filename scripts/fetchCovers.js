import fs from 'fs';
import path from 'path';
import axios from 'axios';
import { fileURLToPath } from 'url';
import 'dotenv/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to your paragraphs.js
const PARAGRAPHS_PATH = path.join(__dirname, '../src/data/paragraphs.js');
// Where images are stored – pointing to the 'public' folder
const ASSETS_ROOT = path.join(__dirname, '../public');

// Google Books API key from .env
const GOOGLE_BOOKS_API_KEY = process.env.GOOGLE_BOOKS_API_KEY || '';

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

// --- OpenLibrary search ---
async function findOpenLibraryCoverId(title, author) {
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
    console.warn(`OpenLibrary search failed for "${title}": ${err.message}`);
    return null;
  }
}

// --- Google Books search (fallback) ---
async function findGoogleBooksCoverUrl(title, author) {
  try {
    // Build search query: title + author
    let query = `intitle:${encodeURIComponent(title)}`;
    if (author) {
      query += `+inauthor:${encodeURIComponent(author)}`;
    }

    const url = `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=1`;

    // Add API key if available
    const finalUrl = GOOGLE_BOOKS_API_KEY
      ? `${url}&key=${GOOGLE_BOOKS_API_KEY}`
      : url;

    const response = await axios.get(finalUrl);
    const data = response.data;

    if (data.items && data.items.length > 0) {
      const volumeInfo = data.items[0].volumeInfo;
      // Try to get larger image (extraLarge, large, medium, small, thumbnail)
      const imageLinks = volumeInfo.imageLinks;
      if (imageLinks) {
        // Prefer larger images
        const sizes = ['extraLarge', 'large', 'medium', 'small', 'thumbnail'];
        for (const size of sizes) {
          if (imageLinks[size]) {
            // Google serves HTTP images; upgrade to HTTPS
            let imgUrl = imageLinks[size];
            if (imgUrl.startsWith('http://')) {
              imgUrl = imgUrl.replace('http://', 'https://');
            }
            // Remove zoom parameter for cleaner URL
            imgUrl = imgUrl.replace('&zoom=1', '');
            return imgUrl;
          }
        }
      }
    }
    return null;
  } catch (err) {
    if (err.response && err.response.status === 403) {
      console.warn(`Google Books API key may be invalid or quota exceeded.`);
    } else {
      console.warn(`Google Books search failed for "${title}": ${err.message}`);
    }
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
        });
      }
    });
  }

  console.log(`Found ${allEntries.length} entries with image paths.`);
  if (!GOOGLE_BOOKS_API_KEY) {
    console.warn('⚠️  No Google Books API key found. Set GOOGLE_BOOKS_API_KEY in .env for better coverage.');
  }

  let success = 0, skipped = 0, failed = 0;

  for (const entry of allEntries) {
    const { title, author } = parseSource(entry.source);
    if (!title) {
      console.warn(`Skipping entry with empty title: ${entry.source}`);
      failed++;
      continue;
    }

    // Build correct file path
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

    let url = null;
    let source = '';

    // Try 1: OpenLibrary
    let coverId = await findOpenLibraryCoverId(title, author);
    if (coverId) {
      url = `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`;
      source = 'OpenLibrary';
    }

    // Try 2: Google Books (fallback)
    if (!url) {
      const googleUrl = await findGoogleBooksCoverUrl(title, author);
      if (googleUrl) {
        url = googleUrl;
        source = 'Google Books';
      }
    }

    // Try 3: OpenLibrary title-based (last resort)
    if (!url) {
      const base = 'https://covers.openlibrary.org/b/title/';
      const query = new URLSearchParams({ default: 'false', size: 'M' });
      if (author) query.set('author', author);
      url = `${base}${encodeURIComponent(title)}?${query.toString()}`;
      source = 'OpenLibrary (title fallback)';
    }

    try {
      await downloadImage(url, filePath);
      console.log(`✅ Downloaded: ${relativePath} (${title}) [${source}]`);
      success++;
    } catch (err) {
      console.error(`❌ Failed to download for ${relativePath}: ${err.message}`);
      failed++;
      // Optionally create a placeholder image here
    }

    // Delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 300));
  }

  console.log(`\n📊 Done. Success: ${success}, Skipped (already exist): ${skipped}, Failed: ${failed}`);
}

fetchAllCovers().catch(console.error);