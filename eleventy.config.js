import rssPlugin from "@11ty/eleventy-plugin-rss";
import markdownIt from "markdown-it";
import markdownItAnchor from "markdown-it-anchor";
import { buildSchema } from "./lib/schema.js";

const MEDITATION_TAG = "meditation";

function stripDatePrefix(slug) {
  return String(slug).replace(/^\d{4}-\d{2}-\d{2}-/, "");
}

function asDate(value) {
  if (value instanceof Date) return value;
  return new Date(value);
}

function readableDate(value) {
  return asDate(value).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

function excerptFrom(content, length = 160) {
  const text = String(content || "")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (text.length <= length) return text;
  return `${text.slice(0, length).replace(/\s+\S*$/, "")}…`;
}

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(rssPlugin);

  eleventyConfig.setLibrary(
    "md",
    markdownIt({
      html: true,
      breaks: false,
      linkify: false,
      typographer: true,
    }).use(markdownItAnchor, {
      permalink: markdownItAnchor.permalink.headerLink({
        safariReaderFix: true,
      }),
      slugify: (str) =>
        str
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .trim()
          .replace(/\s+/g, "-"),
    }),
  );

  eleventyConfig.addPassthroughCopy({
    "src/assets": "assets",
    "src/CNAME": "CNAME",
  });
  eleventyConfig.addWatchTarget("src/assets/");

  eleventyConfig.addCollection("meditations", (collectionApi) => {
    return collectionApi
      .getFilteredByTag(MEDITATION_TAG)
      .sort((a, b) => b.date - a.date);
  });

  eleventyConfig.addCollection("tagList", (collectionApi) => {
    const counts = new Map();
    for (const item of collectionApi.getFilteredByTag(MEDITATION_TAG)) {
      for (const tag of item.data.tags || []) {
        if (tag === MEDITATION_TAG) continue;
        counts.set(tag, (counts.get(tag) || 0) + 1);
      }
    }
    return [...counts.entries()]
      .map(([name, count]) => ({ name, count, slug: eleventyConfig.getFilter("slugify")(name) }))
      .sort((a, b) => a.name.localeCompare(b.name));
  });

  eleventyConfig.addFilter("readableDate", readableDate);
  eleventyConfig.addFilter("htmlDateString", (value) => asDate(value).toISOString());
  eleventyConfig.addFilter("isoDate", (value) => asDate(value).toISOString());
  eleventyConfig.addFilter("getYear", (value) => asDate(value).getUTCFullYear());
  eleventyConfig.addFilter("meditationSlug", stripDatePrefix);
  eleventyConfig.addFilter("head", (arr, n) => (arr || []).slice(0, n));
  eleventyConfig.addFilter("excerpt", excerptFrom);

  eleventyConfig.addFilter("wordmarkChars", (value) => {
    return [...String(value)].map((char, index) => ({
      char,
      dim: index < 2,
    }));
  });

  eleventyConfig.addFilter("readingTime", (content) => {
    const words = String(content || "")
      .replace(/<[^>]*>/g, " ")
      .trim()
      .split(/\s+/)
      .filter(Boolean).length;
    return Math.max(1, Math.round(words / 200));
  });

  eleventyConfig.addFilter("absoluteUrl", (path, base) => {
    if (!path) return base;
    try {
      return new URL(path, base).toString();
    } catch {
      return path;
    }
  });

  eleventyConfig.addFilter("feedItemHtml", (post, site) => {
    const canonicalUrl = new URL(post.url, site.url).toString();
    const authorUrl = new URL(site.author.path, site.url).toString();
    const cite = post.data.citation || post.data.passage;
    const scripture = post.data.scripture
      ? `<blockquote><p>${post.data.scripture}</p>${cite ? `<cite>${cite}</cite>` : ""}</blockquote>`
      : "";
    const note = `<p>By <a href="${authorUrl}">${site.author.name}</a>. Originally published at <a href="${canonicalUrl}">${canonicalUrl}</a>.</p>`;
    return `${note}${scripture}${post.templateContent || ""}`;
  });

  eleventyConfig.addFilter("relatedMeditations", (collection, currentUrl, tags = [], limit = 3) => {
    const wanted = new Set((tags || []).filter((tag) => tag !== MEDITATION_TAG));
    return (collection || [])
      .filter((item) => item.url !== currentUrl)
      .map((item) => {
        const overlap = (item.data.tags || []).filter((tag) => wanted.has(tag)).length;
        return { item, overlap, date: item.date };
      })
      .sort((a, b) => b.overlap - a.overlap || b.date - a.date)
      .slice(0, limit)
      .map((entry) => entry.item);
  });

  eleventyConfig.addFilter("groupByYear", (collection) => {
    const groups = new Map();
    for (const item of collection || []) {
      const year = asDate(item.date).getUTCFullYear();
      if (!groups.has(year)) groups.set(year, []);
      groups.get(year).push(item);
    }
    return [...groups.entries()].map(([year, items]) => ({ year, items }));
  });

  eleventyConfig.addFilter("json", (value) => JSON.stringify(value));
  eleventyConfig.addFilter("buildSchema", (pageData, site, meditations) =>
    buildSchema({
      ...pageData,
      site,
      meditations: meditations || [],
    }),
  );
  eleventyConfig.addFilter("contentTags", (tags = []) =>
    (tags || []).filter((tag) => tag !== MEDITATION_TAG),
  );

  eleventyConfig.addShortcode("year", () => new Date().getUTCFullYear());

  eleventyConfig.setServerOptions({
    port: 8080,
    showAllHosts: true,
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
  };
}
