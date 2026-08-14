# Book of Brendan Ngwa Nforbi

Daily meditations on the Word of God. Built with [Eleventy](https://www.11ty.dev/). The site is meant to live at [www.bookofbrendan.blog](https://www.bookofbrendan.blog).

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

## Going live (Vercel)

The site is a static Eleventy build. `vercel.json` tells Vercel to run `npm run build` and publish `_site`.

1. Import this GitHub repository at [vercel.com/new](https://vercel.com/new).
2. Leave the framework as **Eleventy**. The build command, output directory, and Node 22 version are already set in the repo.
3. Deploy. Each push to the production branch (and each pull request) will get a Vercel URL.
4. Add **www.bookofbrendan.blog** as the primary domain and **bookofbrendan.blog** as a redirect to it. Nameservers should stay on Vercel (`ns1.vercel-dns.com`, `ns2.vercel-dns.com`). If the Domains page shows **Proxy Status Unknown**, click **Refresh** on each custom domain. That badge is Vercel’s probe, not a second host. Do not put Cloudflare (or any other proxy) in front.

After the domain is live, submit `https://www.bookofbrendan.blog/sitemap.xml` in [Google Search Console](https://search.google.com/search-console). Google cannot be forced to index; the site is built so every page names **Brendan Ngwa Nforbi** as author, with a canonical person URL at `/brendan-ngwa-nforbi/`, Schema.org Person/BlogPosting markup, and an RSS feed. Search Console is what asks Google to crawl it.

Local preview remains `npm start` → [http://localhost:8080](http://localhost:8080). `npx vercel` also works if you want a CLI deploy from this folder.
