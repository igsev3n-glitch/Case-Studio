# CASE STUDIO — phone case catalogue

A responsive catalogue storefront built with plain HTML, CSS and JavaScript. It has no build step or third-party JavaScript dependencies.

## Run locally

Run a static server from the project root, then open its local URL:

```bash
python -m http.server 8000
```

The app uses hash routes such as `#/shop`, `#/collections`, and `#/product/design-001`, so it works on static hosting without server-side route rewrites.

## Project files

- `index.html` — page shell, SEO metadata and font/style references.
- `styles.css` — responsive storefront styles.
- `app.js` — hash router, catalogue, product details, enquiry and policy views.
- `catalog.js` — editable brand settings and product records.
- `IMG-*.jpg` — 39 original product photos stored in the project root.
- `image-fallback.svg` — local image fallback.
- `scan-images.mjs` — optional safe catalogue starter generator.

Product image paths are root-relative filenames (for example `IMG-20260911-WA0007.jpg`), not `assets/images/...`.

## Catalogue data

The 39 existing products and original photographs are retained. Each product supports:

- `name`, `image`, and optional `images`.
- `productType`: `Silicone Case`, `Glass Case`, `Phone Charms / Chains`, or `null` until confirmed.
- `collection`, `colors`, `tags`, and optional `description`.
- `price` and `compareAtPrice` (leave as `null` until supplied).
- `featured`, `isNew`, and `active`.
- `availability`: `available`, `unavailable`, `preorder`, or `unknown`.
- `compatibility`: confirmed `{ brand, model }` entries only.

No existing product has a confirmed silicone, glass, or charm type, so those navigation pages show a Coming Soon state. Do not classify a product based only on its photograph or collection name. Best Sellers uses `featured: true`; New Launches uses `isNew: true`.

To edit the catalogue, update the corresponding product object in `catalog.js`. Keep `id` and `slug` unique. Do not add unsupported prices, product claims, stock status, descriptions, or phone compatibility.

### Image scanner

The scanner first reports what it found and makes no changes. It replaces the catalogue only when explicitly run with:

```bash
node scan-images.mjs --write
```

Back up `catalog.js` before using `--write`; generated entries are unclassified and replace the current catalogue metadata.

## Brand settings

In `catalog.js`, set:

- `brand.email` or `brand.supportEmail` to the real customer support email.
- `brand.instagram` to the official Instagram URL, if one exists.
- `brand.currency` to the chosen ISO currency code if prices are added.
- `brand.name` and `brand.announcement` as needed.

The Instagram footer item remains a non-link placeholder until an official URL is configured.

## Enquiries and commerce

The enquiry form has client-side required-field and email validation. It does not store or submit messages to a backend. When a support email is configured, it opens an email draft; the customer must send it in their email app. Without an email, the page explains that the enquiry was not submitted. Product compatibility options only show confirmed models from `compatibility`.

There is no checkout, cart, inventory system, payment processing, customer account, order tracking, or admin interface. Do not accept payments through this static catalogue. Reliable enquiries or a full store require a secure backend or commerce provider and server-side spam protection.

## Policies

Privacy, refund, and shipping pages are structured owner-editable templates. Bracketed notes are placeholders, not final policy terms or legal review. Replace them with accurate business information and obtain appropriate review before publishing.

## SEO and deployment

The Vercel project is connected to the GitHub repository with `main` as the production branch. The configured production URL is `https://casestudio1234.vercel.app/`; no custom domain has been supplied. The project currently has Vercel SSO protection enabled for Vercel-hosted domains. Preview deployments return `X-Robots-Tag: noindex`; this preview-only protection header is intentionally not overridden in the app.

The sitemap lists the canonical homepage only because the catalogue's internal views use hash-based routes; URL fragments are not distinct crawlable pages. Remove or change SSO protection only as an explicit production access decision. A protected site is not publicly accessible to search crawlers even if its HTML contains canonical and sitemap metadata.

Google Fonts load remotely; the rest of the site is static. For offline hosting, bundle the fonts locally or remove the remote font reference.