# Book of Brendan Ngwa Nforbi

Daily meditations on the Word of God. Built with [Eleventy](https://www.11ty.dev/). The site is meant to live at [bookofbrendan.blog](https://bookofbrendan.blog).

## Local development

```bash
npm install
npm start
```

The site is served at [http://localhost:8080](http://localhost:8080).

```bash
npm run build
```

writes the static site to `_site/`.

## Adding a meditation

Create a Markdown file in `src/meditations/` named `YYYY-MM-DD-short-title.md`:

```markdown
---
title: The Word became flesh
description: A one-sentence summary for listings and the feed.
passage: John 1:14
scripture: "And the Word became flesh and dwelt among us…"
tags:
  - gospel of john
  - incarnation
featured: false
---

Your meditation here. Markdown is fine. The passage and scripture fields
are shown above the body on the entry page.
```

The file date becomes the published date. The URL will be `/meditations/YYYY/short-title/`.

## Going live

The build is static HTML. Two common hosts:

1. **Netlify** — connect this repository. `netlify.toml` already sets the build command (`npm run build`) and the publish directory (`_site`). Add the custom domain `bookofbrendan.blog` in the Netlify domain settings, then point the domain’s DNS to Netlify.
2. **GitHub Pages** — `src/CNAME` already contains `bookofbrendan.blog`. Serve the `_site` output, or add a Pages deploy job after the existing build workflow.

Until the domain is purchased and DNS is attached, a Netlify or GitHub preview URL is enough to read the book.
