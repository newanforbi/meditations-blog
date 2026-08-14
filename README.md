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

After the domain is live, run the Google Search Console steps below. Google cannot be forced to index or rank; Search Console is what asks it to crawl. The site is built so every page names **Brendan Ngwa Nforbi** as author, with a canonical person URL at `/brendan-ngwa-nforbi/`, Schema.org Person/BlogPosting markup, and an RSS feed.

Local preview remains `npm start` → [http://localhost:8080](http://localhost:8080). `npx vercel` also works if you want a CLI deploy from this folder.

## Google Search Console (do this once)

Use a **Domain** property so Google sees both `www.bookofbrendan.blog` and the apex redirect.

### 1. Add the property

1. Open [Google Search Console](https://search.google.com/search-console) and sign in with the Google account you want to own this site.
2. Click **Add property**.
3. Choose **Domain** (left), not URL prefix.
4. Enter exactly: `bookofbrendan.blog`
5. Click **Continue**.

### 2. Prove you own it (DNS)

Search Console shows a TXT value like `google-site-verification=…`. Keep that tab open.

1. Open [Vercel](https://vercel.com) → the meditations project → **Settings** → **Domains**.
2. Open the **bookofbrendan.blog** domain (or the team **Domains** DNS editor for that name). Because nameservers are already `ns1.vercel-dns.com` / `ns2.vercel-dns.com`, add the record in **Vercel DNS**, not at a random registrar panel.
3. **Add record**:
   - Type: `TXT`
   - Name: `@` (or leave blank — the apex)
   - Value: the full `google-site-verification=…` string Google gave you
4. Save. Wait a few minutes.
5. Back in Search Console, click **Verify**. If it fails, wait 30–60 minutes and try again. Do not delete the TXT record after it succeeds.

If you cannot add DNS, use **URL prefix** instead: `https://www.bookofbrendan.blog`. Google will give you an HTML tag. Paste the `content="…"` value into `googleSiteVerification` in `src/_data/site.json`, deploy, then verify.

### 3. Hand Google the map

1. In Search Console, select the `bookofbrendan.blog` property.
2. Left sidebar → **Sitemaps**.
3. Under **Add a new sitemap**, paste: `https://www.bookofbrendan.blog/sitemap.xml`
4. Click **Submit**. Status should become **Success** after Google fetches it.

### 4. Ask Google to crawl the name pages first

Left sidebar → **URL Inspection**. Paste each URL, wait for the check, then click **Request indexing**:

1. `https://www.bookofbrendan.blog/`
2. `https://www.bookofbrendan.blog/brendan-ngwa-nforbi/`
3. `https://www.bookofbrendan.blog/about/`
4. `https://www.bookofbrendan.blog/meditations/`
5. The latest meditation permalink (from the sitemap)

Do a few a day if Google rate-limits you. Do not request the `*.vercel.app` URL.

### 5. What “done” looks like

- **Sitemaps**: 1 sitemap, no errors.
- **Pages** (Indexing): homepage and `/brendan-ngwa-nforbi/` eventually **Indexed**.
- In a private window: `site:www.bookofbrendan.blog` starts showing URLs (often days, sometimes a couple of weeks).
- Later: search `Brendan Ngwa Nforbi`. The book should appear as Google associates the name with this domain. That is not instant.

### 6. Leave alone

- Do not add the Vercel preview URL as a property you care about.
- Do not turn on Vercel **Deployment Protection** for production (that login wall keeps Google out).
- Do not submit Medium, LinkedIn, or Substack as the home of the name.

When a new meditation ships, you can URL-inspect that permalink and request indexing again. The sitemap already updates on each deploy.
