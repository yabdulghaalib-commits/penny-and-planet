# Penny and Planet

A modern educational platform for financial wellbeing + sustainable living, built with Next.js (App Router), React, TypeScript, Tailwind CSS, and an MDX-based content architecture.

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Stage 1 — Design system + homepage

Established the **permanent design system** and the **homepage**. Every future page and feature must reuse these tokens/components rather than introducing new ones.

### Design system

All tokens live in `tailwind.config.ts` and `app/globals.css`. Do not hardcode colors, fonts, or spacing outside of these files.

- **Color**: `forest` (primary brand), `earth` (secondary/warm accent), `gold` (sparing highlight), `sage` (soft eco accent), `sand` (warm neutral backgrounds), `ink` (text).
- **Type**: `font-display` (Fraunces, headings only), `font-body` (Inter, all body copy), `font-mono` (JetBrains Mono, eyebrows/labels/data). Custom scale: `text-display-xl/lg/md/sm`, `text-body-lg/base`, `text-eyebrow`.
- **Radius**: `rounded-sm/DEFAULT/md/lg/xl/full` — cards use `rounded-lg`, buttons/badges use `rounded-full`.
- **Shadow**: `shadow-subtle`, `shadow-card`, `shadow-raised`.
- **Motion**: `animate-fade-up`, `duration-300 ease-editorial` for hovers. Kept subtle and respects `prefers-reduced-motion`.
- **Signature element**: `SignatureGraphic` (`components/ui/SignatureGraphic.tsx`) — an abstract line that grows from a leaf curl into an ascending line-graph. Use `variant="mark"` for compact placements (nav/footer logo), default for hero-scale illustration. This is the one bold, recurring visual motif — don't introduce a second one.

## Stage 2 — Blog content architecture

Added the full publishing system behind the design system: MDX content, clean URLs, categories/tags/authors, pagination, SEO, and a component library for rich article formatting. **No homepage or design-system changes** — everything here plugs into Stage 1's components and tokens.

### Writing a new article

Add one file to `content/articles/<slug>.mdx` and fill in the frontmatter — no code changes needed:

```mdx
---
title: "Your Article Title"
metaTitle: "Optional — overrides <title> if different from title"
metaDescription: "Optional — overrides the excerpt for <meta description>"
excerpt: "One or two sentences shown on cards and as the fallback meta description."
featuredImage: "https://example.com/cover.jpg"
featuredImageAlt: "Describe the image for screen readers"
category: "budgeting"          # must match a slug in lib/data/categories.ts
tags: ["saving-money", "habits"]
author: "penny-and-planet-team" # must match a slug in content/authors/*.json
publishedAt: "2026-08-01"
updatedAt: "2026-08-03"         # optional
featured: false                 # true = eligible for the homepage Featured section
draft: false                    # true = hidden from every listing and route
publishAt: "2026-09-01"         # optional — future-dated posts stay hidden until this date
canonicalUrl: null              # optional override
ogImage: null                   # optional override, defaults to featuredImage
downloadableResource: null      # optional slug from content/resources/*.json
---

Body content here. Reading time, table of contents, and the article's URL
(`/<category>/<slug>`) are all generated automatically.
```

Invalid or missing required fields fail loudly at build time (see `lib/content/schema.ts`) with a file name and field name, rather than breaking silently.

### Formatting available in article body content

Standard Markdown — `##`/`###` headings (auto-linked, feed the table of contents), paragraphs, ordered/unordered lists, tables, fenced code blocks, images (`![alt](src)`, no caption), and links (internal links use `next/link` automatically; external links open in a new tab with an indicator icon).

Plus custom shortcodes, available directly in any `.mdx` file:

| Shortcode | Use |
| --- | --- |
| `<Callout type="tip\|note\|warning" title="...">` | Tip/note/warning box |
| `<PullQuote attribution="...">` | Large editorial pull quote |
| `<Figure src="" alt="" caption="" />` | Captioned image |
| `<YouTubeEmbed id="" title="" />` | Responsive video embed |
| `<PDFEmbed src="" title="" />` | Inline PDF viewer with a fallback link |
| `<DownloadButton href="" label="" />` | Inline download CTA |

Component implementations live in `components/mdx/`; the map from Markdown output → styled components is `components/mdx/mdx-components.tsx` — that's the one file to touch when adding a new shortcode.

### Adding an author

Add a JSON file to `content/authors/<slug>.json` matching the `authorSchema` in `lib/content/schema.ts` (name, avatar, bio, optional credentials/social links). They automatically get an archive page at `/author/<slug>`.

### Adding a downloadable resource

Add a JSON file to `content/resources/<slug>.json` (title, description, `fileUrl`, `fileType`). Reference its slug from an article's `downloadableResource` frontmatter field to show an automatic download card on that article, or link to it inline with `<DownloadButton>`. Actual files go in `public/downloads/`.

### URL structure

- Article: `/<category>/<slug>` — e.g. `/personal-finance/how-to-build-an-emergency-fund`
- Category archive: `/category/<slug>`, paginated at `/category/<slug>/page/<n>`
- Tag archive: `/tag/<slug>`, paginated at `/tag/<slug>/page/<n>`
- Author archive: `/author/<slug>`, paginated at `/author/<slug>/page/<n>`
- All articles: `/articles`, paginated at `/articles/page/<n>`

### Architecture

```
app/
  page.tsx                       Homepage (Stage 1, unchanged)
  [category]/[slug]/page.tsx     Article page — clean URL, metadata, JSON-LD
  articles/                      All-articles index + pagination
  category/[slug]/               Category archive + pagination
  tag/[slug]/                    Tag archive + pagination
  author/[slug]/                 Author archive + pagination
  api/search-index/route.ts      JSON search index (future search UI reads this)
  sitemap.ts, robots.ts          Auto-generated from content

components/
  layout/                       Navbar, Footer — site chrome (Stage 1, untouched)
  sections/                     Homepage sections (Stage 1; data source swapped to real content)
  ui/                            Reusable presentation primitives (ArticleCard, Badge, Button...)
  blog/                          Article-page-specific components (TOC, AuthorBio, Pagination...)
  mdx/                           MDX shortcodes + the tag→component map

content/
  articles/*.mdx                 One file per article — the primary content source
  authors/*.json                 Author profiles
  resources/*.json               Downloadable resource metadata

lib/
  types.ts                       Domain types — the contract any future CMS must satisfy
  constants.ts, config/site.ts   App-wide constants and site configuration
  data/categories.ts             Fixed category taxonomy (13 categories)
  content/                       Filesystem content loaders, query layer, MDX pipeline helpers
  services/                      Integration points for external services (newsletter, search)
  pagination.ts, format.ts, utils.ts   Small stateless helpers

hooks/
  useActiveHeading.ts             Scrollspy for the table-of-contents sidebar
```

### Swapping MDX for a headless CMS later

`lib/content/articles.ts`, `authors.ts`, and `resources.ts` are the only files that touch the filesystem. Replacing them with API calls to a CMS — while keeping the same exported function signatures — means zero changes to any component, page, or the query layer in `lib/content/query.ts`.

### Future-ready, not yet wired up

- **Popular / trending articles** — `getPopularArticles`/`getTrendingArticles` in `lib/content/query.ts` currently fall back to latest articles; swap the implementation once analytics exists.
- **Seasonal content** — `getSeasonalArticles()` returns `[]` until seasonal articles and a date-window rule are defined.
- **Search** — `/api/search-index` serves a lightweight JSON index; the nav search button is present but not wired to a UI yet.
- **Scheduled publication** — a `publishAt` in the future hides an article from all listings/routes until that date passes and the site is rebuilt/redeployed (no live cron in a static-export context).
- Dark/light mode toggle (button present in nav, `aria-disabled`)
- About / Contact / legal pages (footer links already point to these routes)
- Real newsletter integration (`lib/services/newsletter.ts` is the single file to edit)

## Stage 3 — Core static pages

Added every essential static page a professional site needs. No changes to the homepage, design system, or blog infrastructure from Stages 1–2 — these pages consume the existing design tokens and components only.

### Pages added

- `/about` — brand story, mission, vision, core values, editorial philosophy, trust section, CTA, and the homepage `NewsletterSection` reused as-is
- `/contact` — contact form (`components/contact/ContactForm.tsx`) with validation, loading, success, and error states, plus an FAQ built from native `<details>/<summary>` (accessible, zero extra JS)
- `/privacy-policy`, `/cookie-policy`, `/disclosure`, `/terms-of-use`, `/disclaimer` — all built on a shared `components/legal/LegalPageLayout.tsx` (sticky jump-link nav + consistent typography); add a new legal page by composing that layout with `LegalSectionBlock`s
- `app/not-found.tsx` — custom 404 with the signature illustration, a search box (currently routes to `/articles`; full query-based search is a later stage), and reused `ArticleCard`/`CategoryCard` grids for recommended articles and popular categories

### Contact form → real backend later

`lib/services/contact.ts` is the only file to touch when wiring the form to a real email service or API route — same pattern as `lib/services/newsletter.ts`. The form component never talks to a backend directly.

### Nav/footer changes

- Footer's Legal column now includes all five legal pages (added Disclaimer)
- Navbar already linked to About/Contact from Stage 1 — no change needed
- All six new static pages plus the existing article/category/tag/author routes are included in `app/sitemap.ts`

## Stage 4 — The article reading experience

Rebuilt the single-article template into a full premium reading experience. No changes to the homepage, static pages, or the design system — every addition here is new components consumed by the existing article page.

### What's new on every article

- **Breadcrumbs** (`components/blog/Breadcrumbs.tsx`) — Home → Articles → Category → Title, plus matching `BreadcrumbList` JSON-LD
- **Reading progress bar** (`components/blog/ReadingProgress.tsx`) — fixed under the navbar, tracks scroll position, respects `prefers-reduced-motion`
- **Social sharing** (`components/blog/SocialShare.tsx`) — X, Facebook, LinkedIn, Pinterest, email, and copy-link. Renders as a floating rail on very wide (`2xl+`) screens where it can never overlap content, and as an inline row under the header everywhere else — no layout ever risks overlapping the article column
- **Copy-link headings** — every H2/H3 gets a "#" anchor (`rehype-autolink-headings`); `HeadingCopyEnhancer` progressively enhances clicks into clipboard copies with a "Copied!" tooltip, one delegated listener per page
- **Table of contents** — the existing sticky, scrollspy-highlighted sidebar (`TableOfContents`) on desktop, plus a new `MobileTableOfContents` that collapses into a native `<details>` disclosure below `lg`
- **Newsletter CTA** — the homepage `NewsletterSection` reused as-is near the end of every article (same component, zero visual drift)

### New MDX shortcodes for richer educational content

| Shortcode | Use |
| --- | --- |
| `<KeyTakeaways items={["...", "..."]} />` | Summary card, use near the top or bottom of a post |
| `<ActionSteps steps={["...", "..."]} />` | Visually distinct numbered checklist for "what to do now" |
| `<Faq items={[{ question, answer }]} />` | Accessible FAQ accordion within an article |
| `<ComparisonTable columns={[...]} rows={[...]} />` | Side-by-side comparison, distinct from a plain data table |
| `<Callout type="financial-tip" \| "sustainability-tip" \| "tip" \| "note" \| "warning">` | Callout now has finance- and sustainability-specific variants alongside the original three |

### Reserved for future stages (built, registered, not yet used anywhere)

Per this stage's instructions, these stay structurally ready but inactive — no current article uses them, so today's reading experience is unchanged:

- **Tools**: `<Calculator type="budget" | "savings" | "investment" | "carbon-footprint" | "cost-comparison" />` (`components/blog/tools/CalculatorPlaceholder.tsx`) — renders an on-brand "coming soon" card with a disabled button
- **Monetization**: `<RecommendedProduct />`, `<SponsoredDisclosure />`, `<Ad position="in-article" | "sidebar" />` (`components/blog/monetization/`) — all registered as MDX shortcodes, all clearly labeled/disclosed per our Disclosure page, none inserted into any existing article

### Author bio now includes areas of expertise

`Author.expertise?: string[]` (optional) renders as tag pills in `AuthorBio`. Add an `"expertise"` array to any `content/authors/*.json` file to show it.

### Related articles now has an editorial fallback

`getRelatedArticles()` in `lib/content/query.ts` matches same-category, then shared-tag articles, and — if that still doesn't fill the quota — rounds out with featured ("editor's pick") articles rather than showing fewer cards than requested.

## Stage 5 — Content discovery system

Transformed the site into a discoverable knowledge platform: search, richer category/tag/author archives, curated collections, and cross-content recommendations. No changes to the homepage, static pages, design system, or article reading experience from prior stages — every addition here is new pages/components, plus two previously-reserved nav elements (search icon, 404 search box) now wired to real functionality.

### Search

- `/search` — instant suggestions (dropdown, keyboard-navigable combobox), live results as you type (250ms debounced), filters (category/tag/sort), loading/empty/no-results states, results rendered as the same editorial cards used everywhere else
- `lib/services/search.ts` (`searchArticles()`) — the one search implementation, matching title/excerpt/category/tags/author, shared by the `/api/search` route (used by the Search page) and available for any future filter UI
- The nav search icon and the 404 page's search box, both reserved-but-inactive since Stage 1/3, now link to real search

### Category & tag archive pages — enhanced, not rebuilt

Both already existed (Stage 2); this stage added, without touching their URLs or pagination logic:
- A featured-article highlight (page 1 only)
- Article count in the description
- A sort control (`ArticleSortControl` — Most Recent / Reading Time / Most Popular, updates the URL)
- The new `Sidebar` (search, newsletter, popular posts, collections, categories, tags, resources, reserved ad slot)
- Related Categories (category pages only, via `lib/data/category-relations.ts`)
- Breadcrumbs

`ArticleListingPage` (shared by `/articles`, category, and tag pages) gained optional `sidebar` / `controls` / `beforeGrid` / `afterGrid` / `breadcrumbs` slots — all opt-in, so `/articles` itself renders exactly as before.

### Author archive — enhanced

Added breadcrumbs, area-of-expertise tags, total published count, and the `Sidebar` (its Popular Articles block covers the "most popular articles" requirement).

### Featured Collections

`lib/data/collections.ts` defines 10 curated learning paths (Beginner's Guide to Budgeting, Emergency Fund Essentials, Investing for Beginners, etc.) as **rules** (categories and/or tags), not hand-picked article lists — `getCollectionArticles()` resolves the rule against current content, so a collection automatically gains new articles as they're published. `/collections` (index) and `/collections/[slug]` (detail) are new pages.

### Recommendation engine

`lib/content/recommendations.ts` replaces the old filter-chain with a weighted scorer (same category, shared tags, editorial/featured status, recency, and a reserved `readerInterestTags` signal for future personalization). `getRelatedArticles()` in `lib/content/query.ts` is now a thin wrapper around it — same signature, so the article page needed no changes. `getContinueLearningArticles()` is a deliberately different function: it recommends from *topically-related* categories (via `lib/data/category-relations.ts`) rather than the same one, powering the new "Continue Your Learning" section at the end of every article.

### New reusable components

- `PopularArticles` / `TrendingArticles` (`components/blog/`) — grid or compact variant, both backed by the existing analytics-ready stubs in `lib/content/query.ts`
- `Sidebar` (`components/blog/Sidebar.tsx`) — composite of Search, Newsletter, Popular Articles, Featured Collections, Categories, Tags, Resources, and a reserved `AdSlot`; used on Search, Category, Tag, and Author pages
- `ArticleSortControl` — reusable sort dropdown, URL-driven
- `Breadcrumbs` — generalized from Stage 4's article-only version to accept arbitrary `items`; now used on article, category, tag, author, collection, and search pages

### Deliberately not done this stage

- **Footer**: `PopularArticles` was not added to the global Footer, even though it's listed as a valid reuse site — Footer renders on the homepage, and every stage so far has explicitly preserved the homepage untouched. Worth revisiting explicitly in a future stage if you want it there.
- Real analytics-backed "popular"/"trending" data, advanced SEO work, monetization beyond Stage 4's placeholders, and newsletter/contact backend integration — all explicitly deferred to the next stage.

## Stage 6 — Production readiness: SEO, E-E-A-T, performance, monetization architecture

Strengthened the site technically without changing anything visual. No changes to the homepage, static pages, design system, or any existing page's layout — every addition here is new structured data, new reserved architecture, or small additive changes (a couple of footer links, a duplicate-email guard) explicitly called for by this stage.

### Structured data (schema.org)

- `components/seo/SiteJsonLd.tsx` — Organization + WebSite + Blog, rendered once sitewide in the root layout
- `components/seo/BreadcrumbJsonLd.tsx` — shared by article, category, tag, author, collection, and search pages; builds JSON-LD from the exact same `items` array the visual `Breadcrumbs` component renders, so they can't drift out of sync
- `components/seo/PersonJsonLd.tsx` — author archive pages
- `components/seo/FaqJsonLd.tsx` — renders when an article's frontmatter includes `faqItems` (see below)
- Article pages now emit `BlogPosting` (previously generic `Article`) — the more precise schema.org type for blog content

### E-E-A-T

- `ArticleDisclaimer` — renders automatically on any article in a finance category (personal-finance, budgeting, saving-money, investing, debt-management, financial-independence); no per-article authoring needed
- `<Sources items={[{ label, url }]} />` — new MDX shortcode for a references section, used "when appropriate" per article
- `faqItems` — optional article frontmatter (`[{ question, answer }]`) that both feeds `FaqJsonLd` and can be shown in-body via the existing `<Faq>` shortcode. These are authored separately (schema data vs. visual content) rather than auto-extracted from MDX, which is the standard, simpler approach most blogs use — keep them in sync by hand when both are used on the same article

### Performance

- `app/loading.tsx` — root-level skeleton, prevents a blank flash on any route without its own loading UI
- `app/error.tsx` — route-level error boundary, on-brand fallback with a retry button instead of a blank crash
- `next.config.mjs` — explicit AVIF/WebP format declaration (Next.js does this automatically; now documented, not implicit)
- Everything added this stage is a Server Component by default (only forms/interactive widgets are client components), keeping the "minimal JavaScript" principle from every prior stage intact

### Analytics — reserved, off by default

- `lib/config/env.ts` + `components/analytics/AnalyticsScripts.tsx` — GA4 and Microsoft Clarity, each only rendering once its env var is set (`.env.example` documents all of them). Google Search Console verification wired into root `metadata.verification.google`, same pattern.
- Vercel Analytics is documented but not installed (needs `@vercel/analytics` added to `package.json` first) — the exact one-line addition is commented in `AnalyticsScripts.tsx`

### Newsletter

- Added a session-level duplicate-email guard to `lib/services/newsletter.ts` (a UX nicety — real dedupe is handled by the ESP once wired up) and documented the exact MailerLite Route Handler integration path in code comments
- Newsletter now appears on: homepage (Stage 1), sidebar (Stage 5), end of every article (Stage 4), and the new resource download pages (below) — matching every location this stage asked for

### Resource Library

- `lib/data/resource-collections.ts` — 7 named collections (Budgeting, Savings, Investing, Financial Planning, Sustainable Living Guides, Eco-Friendly Checklists, Printable Planners)
- Expanded from 3 to 7 sample resources so every collection has content
- `/resources` — index grouped by collection; `/resources/[slug]` — detail page with the download plus an **optional, non-gating** newsletter signup alongside it (never blocks the download itself)
- `DownloadableResource` gained `collection` and `previewImage` fields

### Monetization — reserved and inactive, per this stage's explicit instruction

- `PromoBanner` (new) — reserved promotional banner, registered as an MDX shortcode, unused by any article
- `AdSlot` enhanced with `data-ad-position`/`data-ad-unit-id` and a code comment documenting exactly how to wire in AdSense/Mediavine/Raptive later without touching call sites
- `RecommendedProduct`, `SponsoredDisclosure`, `ComparisonTable` (Stage 4) remain the affiliate/sponsored/comparison building blocks — unchanged
- **New**: `DigitalProduct` type + `lib/content/products.ts` + `ProductCard` + `/shop` page — reserved architecture for future paid products (planners, spreadsheets, workbooks). Three sample products shown with an intentionally disabled "Coming soon" button; no checkout wired up

### Security & reliability

- Audited every `target="_blank"` link sitewide — all already carry `rel="noopener noreferrer"`
- Global error boundary (`app/error.tsx`) for graceful failure instead of a blank screen
- `.env.example` documents every environment variable the project reads (analytics, MailerLite, contact form) — nothing required, everything optional, safe defaults throughout

### Small additive changes (not visual redesigns)

- Footer's existing "Company" column gained two links: Resource Library, Featured Collections — same pattern as adding Disclaimer in Stage 3, no grid/layout change
- `layout.tsx` now sources its canonical site URL from `lib/config/site.ts` instead of a separate hardcoded constant (was accidental duplication from Stage 1; fixed to avoid drift)

### Deliberately not done this stage

- No real ad network, payment processor, or ESP is actually connected — every integration point is documented and reserved, matching "do not activate advertisements yet" and the newsletter/contact backend being explicitly out of scope until requested
- No production deployment configuration (hosting, CI/CD, CDN config) — not requested this stage

## Stage 7 — Production audit & launch readiness

A full audit pass across all 6 prior stages: consistency, dead code, broken links, accessibility, and deployment prep. No page was redesigned — every change below is a correction, a small polish, or documentation.

### Issues found and fixed

- **Two orphaned components removed/wired up**: `ArchiveHero.tsx` was built in Stage 5 but superseded during implementation by `ArticleListingPage`'s own inline hero — deleted as genuinely dead code. `TrendingArticles.tsx` was built in Stage 5 but never actually placed on any page — now shown on the `/articles` index (page 1 only) as a "Trending Now" teaser above the main grid.
- **`getPopularArticles` and `getTrendingArticles` diverged**: both were identical "latest articles" stubs — showing them near each other (as Trending now is) would have looked like a duplicate-content bug. `getTrendingArticles` now proxies on featured/editorial status instead of recency, so the two stay visibly distinct even as placeholders pending real analytics.
- **`PRODUCTS_DIR` deduplicated** into `lib/constants.ts` alongside `ARTICLES_DIR`/`AUTHORS_DIR`/`RESOURCES_DIR` — was defined locally in `lib/content/products.ts`, inconsistent with the established pattern.
- **Resource collection breadcrumb** on `/resources/[slug]` pointed at the bare `/resources` index instead of that collection's actual section — now links to `/resources#collection-<slug>`.
- **`next-env.d.ts`** (normally auto-generated by `next dev`) was missing since this environment never ran the dev server — added so the repo type-checks cleanly on a fresh clone before the first run.
- **`package.json`** bumped to `1.0.0` to reflect production-ready status.

### Verified clean (no issues found)

- **Design system consistency**: every `rounded-*`, `shadow-*`, `font-*`, and color utility across all 133 TS/TSX files stays within the tokens defined in Stage 1 — zero off-palette colors (checked against the full default Tailwind palette), zero stray font families, zero undefined shadow/radius values.
- **Dead code / unused files**: zero components or lib modules with no importers (after the two fixes above).
- **Broken links**: every hardcoded `href` and every nav/footer category link cross-checked against real routes and category slugs.
- **Heading hierarchy**: every one of the 28 routes has exactly one `<h1>` (verified directly on 19 pages, delegated to and verified in 9 shared components — `Hero`, `ArticleHeader`, `LegalPageLayout`, `ArticleListingPage`, `SearchExperience`).
- **Form accessibility**: every `<input>` across the 6 files that use them has an associated label, `aria-label`, or `sr-only` text.
- **Image alt text**: the one image per card/avatar pattern uses `alt=""` correctly (decorative, adjacent visible text already describes it); every content-significant image (article featured images, resource/product previews) carries real, specific alt text.
- **Content validation**: all 13 articles, 2 authors, 7 resources, and 3 products still parse and validate against their Zod schemas.
- **Responsive safety**: the only fixed-pixel widths in the codebase are `max-w-[...]` (safely responsive) or a table `min-w-[480px]` correctly wrapped in `overflow-x-auto`.
- **package.json**: every imported package has a matching dependency entry; no unused dependencies.
- **External link safety**: every `target="_blank"` link (4 locations) already carries `rel="noopener noreferrer"`.

### Known limitation, flagged rather than guessed at

`text-forest-500` is used for the site's small uppercase "eyebrow" labels against white/sand backgrounds — a Stage 1 design-system color, used consistently in hundreds of places. Its exact contrast ratio wasn't verified with a real contrast-checking tool (unavailable in this environment); it's a supplementary/decorative label style, not primary content, and changing an established design-system color without being certain it's actually a problem would violate this project's core "preserve the design system" directive more than it would help. **Recommend running an automated contrast check (e.g. Lighthouse, axe DevTools) on this specific color before launch** — if it does need adjusting, only `tailwind.config.ts`'s `forest.500` value needs to change; every consuming component already references the token, not a hardcoded color.

### Pre-launch checklist (cannot be verified in this environment — no network/npm access)

- [ ] `npm install && npm run build` — this project has never actually been built or type-checked end-to-end; the audit above is thorough static analysis (brace/paren balance, import resolution, dead-code detection, schema validation) but is not a substitute for a real TypeScript compile and Next.js build
- [ ] Replace all `picsum.photos` placeholder images with real photography before launch
- [ ] Replace placeholder text files in `public/downloads/` with real PDFs/spreadsheets
- [ ] Run an automated accessibility audit (Lighthouse / axe) and a contrast check on `forest.500` (see above)
- [ ] Set the env vars in `.env.example` for whichever integrations you're ready to turn on (analytics, MailerLite, contact form backend) — everything works with none of them set
- [ ] Update `siteConfig.url` in `lib/config/site.ts` if the production domain differs from the placeholder
- [ ] **Deploying**: this is a standard Next.js App Router project — Vercel auto-detects it with zero configuration (`vercel.json` isn't needed). Push to GitHub, import the repo in Vercel, set env vars in the Vercel dashboard, deploy.
