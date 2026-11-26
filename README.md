# Ideolect

Company website for **PenSuite**, **Pencore**, and **Cortex 7.2** at [www.storive.in](https://www.storive.in/). The design adapts the supplied *Ideolect Systems Portfolio* artwork into a product-focused company website. Product descriptions represent work in development, without unverified performance, customer, or funding claims.

## Develop and build

Use the existing Node/npm versions declared in `package.json` and the repository's existing installation policy:

```sh
npm install --legacy-peer-deps
npm run dev
npm run build
npx tsc --noEmit
node scripts/verify-site.mjs
```

The production output is `dist/`. No new dependencies or runtime services are required by the redesign.

## Content and components

- `src/data/portfolio.json` contains the shared product and company copy.
- `src/components/ProductShowcase.tsx` implements the keyboard-accessible product selector.
- `src/components/SystemAtlas.tsx` controls the hero artwork gallery.
- `src/components/BriefDialog.tsx` provides native modal briefs with Escape, focus restoration and print support.
- `src/components/CompanySections.tsx` contains the company story, engineering philosophy and contact sections.
- `public/images/` contains the three supplied WebP artworks and the social sharing card.
- `public/catalogs/Ideolect-Company-Brief.pdf` is the four-page company/product document, linked from the website.

To regenerate the PDF and social card from the shared copy and supplied artwork, run `python3 scripts/generate-brand-assets.py` in a Python environment with Pillow and ReportLab installed. The script uses DejaVu fonts at `/usr/share/fonts/truetype/dejavu/`. These tools are only needed for editorial asset regeneration; deployment uses the committed assets.

## Existing hosting connections

The redesign preserves `.github/workflows/deploy.yml`, `CNAME`, `public/CNAME`, `public/.htaccess`, `public/_redirects`, `public/sitemap.xml`, `netlify.toml`, `vite.config.ts`, `.env.example`, `.npmrc`, `package.json`, and `tsconfig.json`. It also preserves the capability and permission fields in `metadata.json`, the public contact email, founder LinkedIn destination, and canonical `https://www.storive.in/` URL. No DNS records, secrets, webhooks or repository settings are modified.

Two pre-existing hosting details require attention before publishing:

- Root `CNAME` contains `storive.com`; `public/CNAME`, copied by Vite into `dist/CNAME`, contains `www.storive.in`. Both are preserved exactly.
- The existing main-branch deployment workflow includes a cleanup step that deletes external deployment records and Cloudflare webhooks and neutralizes external checks. The design branch does not trigger that workflow. Review that step before merging if those integrations must remain intact.

This change replaces only the old presentation source, imagery, and catalogs. Historical HMOS PDF paths are removed; the current document is `/catalogs/Ideolect-Company-Brief.pdf`.
