# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Get Good Coffee — a static site about specialty coffee featuring a roaster directory, tasting reviews, brewing guides, and a coffee glossary. Built with 11ty (Eleventy) v3, Liquid templates, vanilla JS, and hosted on Netlify with Pages CMS for content editing.

## Build & Dev Commands

- `npm start` — Local dev server with live reload (11ty `--serve`, default port 8080)
- `npm run build` — Production build (output to `public/`)

No test runner or linter is configured.

## Architecture

**Input/Output**: Source in `src/`, builds to `public/`.

**Site sections** map to top-level pages:
- **GET** (`index.md`) — Roaster directory with state filtering and modal detail views
- **MAKE** (`make.md`) — Brewing guides; pulls reusable equipment snippets from `_includes/` (brewers.md, grinders.md, kettles.md, scales.md, bundle files)
- **KNOW** (`know.md`) — Coffee glossary rendered from `_data/glossaryentries.json`
- **Coffee Posts** (`coffeeposts.liquid` + `posts/*.md`) — Tasting reviews with structured frontmatter (aroma, acidity, mouthfeel, flavor, finish, overall — each with General/Specific fields)
- **About** (`about.md`) — Contact form via Netlify Forms

**Data layer** (`src/_data/`):
- `roasters.json` — 50+ roaster entries (name, website, logo, city, state, description, extraInfo with awards/ownership/memberships, johnsSeal)
- `glossaryentries.json` — Coffee terminology definitions
- `meta.js` — Site metadata; uses `process.env.URL` for Netlify deploy URL

**Single layout**: `_includes/base.liquid` is the master template (header, nav, footer, JSON-LD structured data, OG/Twitter meta tags, Umami analytics).

**Client-side JS**: `src/script.js` — Vanilla JS handling hamburger nav, roaster modal dialog (with focus trapping and ESC-to-close), and state dropdown filter. No frameworks.

**CSS**: Modular files in `src/assets/` — `globals.css` defines design tokens (green primary, brown secondary, gray neutral palettes; 8-level modular type scale). Separate files for nav, modal, roasters, coffee posts.

## 11ty Configuration (`eleventy.config.js`)

- **Plugins**: `RenderPlugin`, `eleventyImageTransformPlugin` (auto-converts images to WebP + PNG)
- **Custom filter**: `stripImages` — removes `<img>` tags from content strings
- **Passthrough copy**: CSS, script.js, specific image directories (icons, logos, SVGs, favicons), robots.txt, sitemap.xml
- Images in passthrough directories are **not** processed by the image plugin

## Content Management

Content is managed via Netlify Pages CMS (configured in `.pages.yml`). Three collections:
1. **ggPosts** — Coffee reviews in `src/posts/` (14+ frontmatter fields)
2. **glossaryEntries** — Terms in `glossaryentries.json`
3. **roasters** — Roaster entries in `roasters.json`

New content can be added either through the CMS or by editing files directly.

## Coffee Post Frontmatter Schema

```yaml
tags: post
roaster: "Roaster Name"
title: "Coffee Name"
date: YYYY-MM-DD
coffeeImage: /img/coffeeimage-*.png
origin: "Region, Country"
varietal: "Variety"
process: "Natural/Washed/Honey"
elevation: "MASL"
notes: "Flavor descriptors"
aromaGeneral: ""
aromaSpecific: ""
acidityGeneral: ""
aciditySpecific: ""
mouthfeelGeneral: ""
mouthfeelSpecific: ""
flavorGeneral: ""
flavorSpecific: ""
finishGeneral: ""
finishSpecific: ""
overallGeneral: ""
overallSpecific: ""
```
