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

## LinkedIn (articles vs a link in the feed)

**bookofbrendan.blog is still the book.** LinkedIn is a network, not a host you own. A LinkedIn article lives at a `linkedin.com/pulse/…` URL you do not control. Google can index those pages. LinkedIn does **not** offer a canonical tag pointing home, which is why a full paste is closer to Medium than to a well-set Substack copy.

Default: **do not republish the full meditation as a LinkedIn article.** Publish on the site first, then share a **feed post** that links to `bookofbrendan.blog`. Feed posts are for people on LinkedIn; they are not a second blog Google should rank instead of you.

Use a LinkedIn article only when you want colleagues to read the piece *on* LinkedIn. Same rules as Substack: full name, originally-at link, site first.

### Profile (do this once)

1. Name: `Brendan Ngwa Nforbi` (not a shortened first name).
2. Headline: something that can include the site, for example `Daily meditations on the Word of God · bookofbrendan.blog`.
3. Contact / website: `https://bookofbrendan.blog`.
4. About: say you write the Book of Brendan at bookofbrendan.blog, and that every meditation is by Brendan Ngwa Nforbi. Link `https://bookofbrendan.blog/brendan-ngwa-nforbi/`.
5. Featured: pin `https://bookofbrendan.blog` and, if you want a second slot, the latest meditation.

### Prefer a feed post (usual case)

1. Publish the meditation on **bookofbrendan.blog**.
2. On LinkedIn: **Start a post**, not **Write article**.
3. Two or three sentences in your voice, then the permalink, for example `https://bookofbrendan.blog/meditations/2026/rediscovering-proverbs-at-29/`.
4. Sign the thought as yourself; the byline is your profile name.

That sends people to the URL you own. Google is not given a full duplicate on LinkedIn.

### If you still write a LinkedIn article

1. Ship the original on **bookofbrendan.blog** first. Give Google a chance to see it (hours is better than posting both in the same minute).
2. Home → **Write article**. Publish as **Brendan Ngwa Nforbi** (your personal profile), as an individual article — not as a company Page.
3. Put this at the top, with the permalink as a real hyperlink:

```
By Brendan Ngwa Nforbi.

Originally published at https://bookofbrendan.blog/meditations/YYYY/slug/
```

4. Paste the meditation. Keep the originally-at line visible; do not bury it under a cover image only.
5. **Settings**: SEO title and description can match the site. There is no canonical-URL field — the first-line link is the substitute.
6. Publish, then share that article in the feed if you want. The original is still the `bookofbrendan.blog` URL.

A LinkedIn **newsletter** edition uses the same public `/pulse/` URLs as articles. You do not need it for email if Substack is already doing that job. Skip it unless you specifically want LinkedIn’s own subscribe list.

Do not make LinkedIn (or Medium) the place you “blog.” The archive Google should attach to your name is `/meditations/` and `/brendan-ngwa-nforbi/` on bookofbrendan.blog.
