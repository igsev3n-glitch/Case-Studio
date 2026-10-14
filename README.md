# CASE STUDIO — phone case catalogue

A responsive, image-first catalogue website built with plain HTML, CSS and JavaScript. It has no build step or third-party JavaScript dependencies, so it can be previewed locally or hosted as a static site. The uploaded case photos are preserved in `assets/images/` and are used as the product imagery.

## Run locally

1. Unzip the project.
2. Open a terminal in the `case-studio` folder.
3. Run a local static server, for example:

   ```bash
   python -m http.server 8000
   ```

4. Open `http://localhost:8000`.

Hash-based routes (`#/shop`, `#/collections`, `#/product/design-001`) work on static hosting without server-side route rewrites.

## What works

- Responsive homepage, catalogue, collection directory, collection-filtered pages, product details, about, enquiry, and policy placeholder pages.
- Catalogue search by name, tags, collection and colour metadata.
- Collection and colour filters, sort by featured/new/name, optional price sorting when prices exist, clear filters, and load-more pagination.
- Search overlay with matching product suggestions.
- Mobile navigation and mobile filter drawer.
- Product enquiry CTA; when an owner email is configured it prepares an email using `mailto:`. The visitor must send it in their email app.
- Accessible labels, visible focus states, reduced-motion support, lazy-loaded below-the-fold images, and missing-image fallback.
- No invented prices, reviews, stock claims, phone compatibility, shipping promises or discounts.

## Add and manage products

1. Copy the original image into `assets/images/` (keep the source image unchanged).
2. Open `catalog.js` and duplicate a product object in `products`.
3. Give it a unique `id` and `slug`, update `name`, `image`, `collection`, `colors`, `tags`, and any known `description` or `price`.
4. Keep unknown prices as `null`. Do not populate `compatibility` unless the supported brand/model combinations are confirmed. Set `active: false` to hide a design.
5. Set `featured: true` or `isNew: true` for the homepage selections.

The initial photo filenames are generic WhatsApp filenames, so products are labelled `Design 001`, etc. Collection and broad visual tags are editable starter classifications based on the supplied contact sheet; review them before launch. `sourceFilename` preserves the original filename for easy matching.

To scan the image folder and create a fresh, unclassified starter catalogue, run:

```bash
node scripts/scan-images.mjs
```

**Warning:** this replaces `catalog.js` with fresh starter entries. Back up the current file first if you have edited product data. It does not alter or resize original photos.

## Brand settings

At the top of `catalog.js`, change:

- `brand.name` — the global wordmark.
- `brand.announcement` — leave empty to hide the announcement bar.
- `brand.email` — set a real customer enquiry email to enable email draft links.
- `brand.instagram` — set the real profile URL to show the Instagram link.
- `brand.currency` — use a supported ISO currency code if you add prices.

## Before launch

- Supply final brand name/logo, product names, prices, descriptions, accurate compatibility, contact email and Instagram URL.
- Replace policy placeholder copy with the real privacy, terms, shipping and returns policies.
- The enquiry form uses `mailto:` only; no message is transmitted or stored by this website. For reliable enquiries, connect a backend/form provider and configure spam protection.
- Checkout, cart, inventory, customer accounts, payment processing, order tracking and persistent admin management are not implemented. Do not accept payments through this demo. A real store will need an ecommerce backend/payment provider and server-side configuration.
- Google Fonts are loaded remotely; the rest of the site is static. For fully offline hosting, bundle the fonts locally or remove the font import.

## Project structure

```text
case-studio/
├── index.html
├── styles.css
├── app.js
├── catalog.js
├── README.md
├── scripts/
│   └── scan-images.mjs
└── assets/
    ├── image-fallback.svg
    └── images/             # 39 supplied original product photos
```
