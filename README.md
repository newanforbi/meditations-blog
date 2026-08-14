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

## Going live (Vercel)

The site is a static Eleventy build. `vercel.json` tells Vercel to run `npm run build` and publish `_site`.

1. Import this GitHub repository at [vercel.com/new](https://vercel.com/new).
2. Leave the framework as **Eleventy**. The build command, output directory, and Node 22 version are already set in the repo.
3. Deploy. Each push to the production branch (and each pull request) will get a Vercel URL.
4. When `bookofbrendan.blog` is registered, add it under the Vercel project’s **Domains** settings, then point the domain’s DNS to Vercel.

After the domain is live, submit `https://bookofbrendan.blog/sitemap.xml` in [Google Search Console](https://search.google.com/search-console). Google cannot be forced to index; the site is built so every page names **Brendan Ngwa Nforbi** as author, with a canonical person URL at `/brendan-ngwa-nforbi/`, Schema.org Person/BlogPosting markup, and an RSS feed. Search Console is what asks Google to crawl it.

Local preview remains `npm start` → [http://localhost:8080](http://localhost:8080). `npx vercel` also works if you want a CLI deploy from this folder.

## Email copies on Substack

**bookofbrendan.blog is the book.** Substack is only email plus a second indexed copy. Do not point the `bookofbrendan.blog` domain at Substack. Do not treat Medium as the blog.

The RSS feed at `https://bookofbrendan.blog/feed.xml` already names **Brendan Ngwa Nforbi** and starts every item with “Originally published at” plus the canonical URL on this site. Use that feed when Substack asks for an import URL.

### 1. Create the publication (do not import yet)

1. Go to [substack.com](https://substack.com) and start a publication.
2. Skip mailing-list import and skip post import during signup.
3. Turn **Private mode** on: Dashboard → **Settings** → **Privacy** → Private mode. Finish the setup below before anyone sees it.
4. In the website editor, set the theme to **Custom** (not “Match profile”). That lets the publication be *Book of Brendan* while the person profile stays **Brendan Ngwa Nforbi**.

### 2. Names, URL, and website (paste these)

**Profile** (Edit profile):

- Name: `Brendan Ngwa Nforbi`
- Handle: `brendanngwanforbi` if it is free
- Bio: `Brendan Ngwa Nforbi writes daily meditations on the Word of God at bookofbrendan.blog.`
- Website: `https://bookofbrendan.blog`

**Publication** (Dashboard → Settings → Basics):

- Publication name: `Book of Brendan`
- Subdomain: `bookofbrendan.substack.com` if it is free (this is a Substack URL, not your domain)
- Description: `Daily meditations on the Word of God, written by Brendan Ngwa Nforbi. The original of every post lives at bookofbrendan.blog.`

**About page** (Dashboard → Website, or Settings → About):

```
I am Brendan Ngwa Nforbi. This newsletter is an email copy of the Book of Brendan, my daily meditations on the Word of God.

The original of every meditation is published at https://bookofbrendan.blog. That site is the book I own. This Substack is how some readers receive it by email.

Every article is written by Brendan Ngwa Nforbi. The collected writings are at https://bookofbrendan.blog/brendan-ngwa-nforbi/.
```

Leave **custom domain** empty. `bookofbrendan.blog` stays on Vercel.

### 3. Import the archive once

1. Dashboard → **Settings** → **Import / Export** → **Import posts**.
2. Paste `https://bookofbrendan.blog/feed.xml` (the feed URL, not only the homepage, if the importer is picky).
3. Confirm you own the site. Import as **free** posts, not paywalled.
4. Do **not** email the imported archive to subscribers.
5. Open each imported post:
   - First lines should say it is by Brendan Ngwa Nforbi and originally published at the `bookofbrendan.blog` URL. If the importer dropped that, paste it at the top.
   - Set the date to match the original.
   - In the post **Settings** → SEO, if there is a canonical URL field, paste the `bookofbrendan.blog` permalink (for example `https://bookofbrendan.blog/meditations/2026/rediscovering-proverbs-at-29/`).
   - Do not add a Substack subscribe banner that hides the original link.

If the importer fails, copy each meditation from the site into a Substack draft and put this at the top:

```
By Brendan Ngwa Nforbi.

Originally published at https://bookofbrendan.blog/meditations/YYYY/slug/
```

### 4. Publish new meditations (ongoing)

1. Write and ship on **bookofbrendan.blog** first (Markdown in this repo → Vercel).
2. Then on Substack: New post → paste the body → keep the “Originally published at …” line with that post’s permalink → byline **Brendan Ngwa Nforbi**.
3. Send the email from Substack if you want. The URL on this site remains the original.

Do not re-import the whole feed every time; Substack can duplicate posts. One import for the archive, then copy new entries by hand.

### 5. Go public

1. Publish one short original note on Substack if the dashboard asks for a first post before the site will index (a welcome note that points at `https://bookofbrendan.blog` is enough).
2. Turn **Private mode** off.
3. Keep posts free so the second surface can be indexed. The home Google should associate with you is still `bookofbrendan.blog`.
