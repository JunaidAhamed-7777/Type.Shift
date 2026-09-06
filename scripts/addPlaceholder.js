import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths
const PARAGRAPHS_PATH = path.join(__dirname, '../src/data/paragraphs.js');
const ASSETS_ROOT = path.join(__dirname, '../public');
const PLACEHOLDER_IMAGE = path.join(ASSETS_ROOT, 'assets/placeholder.png');
const LOG_DIR = path.join(__dirname, 'logs');
const LOG_FILE = path.join(LOG_DIR, 'placeholders.txt');

// Read paragraphs.js and extract the PARAGRAPHS object
const fileContent = fs.readFileSync(PARAGRAPHS_PATH, 'utf8');

function getParagraphs() {
  const match = fileContent.match(/const PARAGRAPHS = ({[\s\S]*?});\s*export default PARAGRAPHS/);
  if (!match) throw new Error('Could not find PARAGRAPHS definition');
  const func = new Function(`return ${match[1]}`);
  return func();
}

const PARAGRAPHS = getParagraphs();

// Collect all image paths (relative, e.g. "assets/easy/lionwitchwardrobe.png")
function collectAllImages() {
  const images = [];
  for (const [category, entries] of Object.entries(PARAGRAPHS)) {
    if (!Array.isArray(entries)) continue;
    entries.forEach(entry => {
      if (entry.image) {
        // Remove leading slash
        const relPath = entry.image.startsWith('/') ? entry.image.slice(1) : entry.image;
        images.push(relPath);
      }
    });
  }
  return images;
}

// Ensure log directory exists
if (!fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR, { recursive: true });
}

// Main
async function run() {
  // Check placeholder exists
  if (!fs.existsSync(PLACEHOLDER_IMAGE)) {
    console.error(`❌ Placeholder image not found at ${PLACEHOLDER_IMAGE}`);
    console.error('Please place a placeholder.png in public/assets/');
    process.exit(1);
  }

  const images = collectAllImages();
  console.log(`Found ${images.length} image entries.`);

  const created = [];

  for (const relPath of images) {
    const fullPath = path.join(ASSETS_ROOT, relPath);
    const dir = path.dirname(fullPath);

    if (fs.existsSync(fullPath)) {
      continue; // already exists, skip
    }

    // Create directory if needed
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Copy placeholder
    try {
      fs.copyFileSync(PLACEHOLDER_IMAGE, fullPath);
      console.log(`📄 Placeholder copied: ${relPath}`);
      created.push(relPath);
    } catch (err) {
      console.error(`❌ Failed to copy placeholder to ${relPath}: ${err.message}`);
    }
  }

  if (created.length === 0) {
    console.log('No new placeholders needed.');
    return;
  }

  // Append to log
  const date = new Date().toISOString();
  let logEntry = `\nPLACEHOLDER IMAGES AS OF ${date}\n`;
  logEntry += created.join('\n') + '\n';

  // Ensure log file exists (or create)
  fs.appendFileSync(LOG_FILE, logEntry, 'utf8');
  console.log(`✅ Log updated: ${LOG_FILE}`);
}

run().catch(console.error);