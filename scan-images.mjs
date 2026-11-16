/**
 * Scan original product photos in the project root and generate an unclassified starter catalogue.
 * This is intentionally write-protected unless `--write` is supplied because it replaces catalog.js.
 * Run from the project root: node scan-images.mjs --write
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const files = fs.readdirSync(root)
  .filter(file => /\.(jpe?g|png|webp|avif)$/i.test(file))
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

if (!files.length) {
  throw new Error(`No product images found in ${root}`);
}

if (!process.argv.includes('--write')) {
  console.log(`Found ${files.length} product images. No files changed.`);
  console.log('Run `node scan-images.mjs --write` to replace catalog.js with unclassified entries.');
} else {
  const products = files.map((file, index) => {
    const id = `design-${String(index + 1).padStart(3, '0')}`;
    return {
      id,
      name: `Design ${String(index + 1).padStart(3, '0')}`,
      image: file,
      images: [],
      productType: null,
      category: 'Phone case',
      collection: 'Unsorted',
      colors: [],
      tags: [],
      description: '',
      price: null,
      compareAtPrice: null,
      featured: false,
      isNew: false,
      active: true,
      availability: 'unknown',
      compatibility: [],
      slug: id,
      sourceFilename: file,
    };
  });
  const js = `/* Generated unclassified catalogue entries. Review before publishing. */\nwindow.CASE_CATALOG = {\n  brand: { name: 'CASE STUDIO', announcement: '', email: '', supportEmail: '', instagram: '', currency: 'INR', enquiryMode: true },\n  products: [\n${products.map(product => `    ${JSON.stringify(product)}`).join(',\n')}\n  ]\n};\n`;
  fs.writeFileSync(path.join(root, 'catalog.js'), js);
  console.log(`Wrote ${products.length} unclassified entries to catalog.js`);
}
