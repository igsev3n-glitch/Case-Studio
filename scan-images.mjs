/** Scan assets/images and create editable starter catalogue entries. Run: node scripts/scan-images.mjs */
import fs from 'node:fs';
import path from 'node:path';
const dir = path.resolve('assets/images');
const files = fs.readdirSync(dir).filter(f => /\.(jpe?g|png|webp|avif)$/i.test(f)).sort((a,b)=>a.localeCompare(b,undefined,{numeric:true}));
const products = files.map((file,i)=>({id:`design-${String(i+1).padStart(3,'0')}`,name:`Design ${String(i+1).padStart(3,'0')}`,image:`assets/images/${file}`,images:[],collection:'Unsorted',category:'Phone case',colors:[],tags:[],description:'',price:null,compareAtPrice:null,featured:false,isNew:false,active:true,compatibility:[],slug:`design-${String(i+1).padStart(3,'0')}`,sourceFilename:file}));
const js = `/* Generated starter entries. Review and edit metadata before launch. */\nwindow.CASE_CATALOG = {\n  brand: { name: 'CASE STUDIO', announcement: '', email: '', instagram: '', currency: 'INR', enquiryMode: true },\n  products: [\n${products.map(p=>'    '+JSON.stringify(p)).join(',\n')}\n  ]\n};\n`;
fs.writeFileSync(path.resolve('catalog.js'),js);
console.log(`Wrote ${products.length} editable entries to catalog.js`);
