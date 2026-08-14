function absolute(path, site) {
  try {
    return new URL(path || "/", site.url).toString();
  } catch {
    return site.url;
  }
}

function personIri(site) {
  return `${absolute(site.author.path, site)}#person`;
}

function websiteIri(site) {
  return `${site.url}/#website`;
}

function blogIri(site) {
  return `${site.url}/#blog`;
}

function personNode(site) {
  return {
    "@type": "Person",
    "@id": personIri(site),
    name: site.author.name,
    givenName: site.author.givenName,
    additionalName: site.author.additionalName,
    familyName: site.author.familyName,
    alternateName: ["Brendan Nforbi", "Brendan Ngwa"],
    url: absolute(site.author.path, site),
    identifier: absolute(site.author.path, site),
    description: site.author.description,
    jobTitle: "Writer",
    knowsAbout: [
      "Christian meditation",
      "the Bible",
      "Scripture",
      "the Book of Proverbs",
      "the Epistle to the Romans",
    ],
    mainEntityOfPage: absolute(site.author.path, site),
  };
}

function websiteNode(site) {
  return {
    "@type": "WebSite",
    "@id": websiteIri(site),
    name: site.title,
    alternateName: [site.shortTitle, site.author.name],
    url: `${site.url}/`,
    inLanguage: site.lang,
    description: site.description,
    publisher: { "@id": personIri(site) },
    author: { "@id": personIri(site) },
    copyrightHolder: { "@id": personIri(site) },
    creator: { "@id": personIri(site) },
    mainEntity: { "@id": personIri(site) },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${site.url}/search/?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

function blogNode(site, meditations = []) {
  return {
    "@type": "Blog",
    "@id": blogIri(site),
    name: site.title,
    alternateName: site.author.name,
    url: `${site.url}/`,
    inLanguage: site.lang,
    description: site.description,
    author: { "@id": personIri(site) },
    publisher: { "@id": personIri(site) },
    creator: { "@id": personIri(site) },
    issn: undefined,
    blogPost: meditations.map((post) => ({
      "@type": "BlogPosting",
      "@id": `${absolute(post.url, site)}#post`,
      headline: post.data.title,
      url: absolute(post.url, site),
      datePublished: post.date?.toISOString?.() || post.date,
      author: { "@id": personIri(site) },
      publisher: { "@id": personIri(site) },
    })),
  };
}

function breadcrumb(site, items) {
  return {
    "@type": "BreadcrumbList",
    "@id": `${items[items.length - 1].url}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function buildSchema({ site, page, title, description, tags = [], scripture, passage, citation, content, meditations = [] }) {
  const pageUrl = absolute(page.url, site);
  const isMeditation = Array.isArray(tags) && tags.includes("meditation");
  const isAuthorPage = page.url === site.author.path;
  const isHome = page.url === "/";
  const isMeditationsIndex = page.url === "/meditations/";

  const graph = [personNode(site), websiteNode(site), blogNode(site, meditations)];

  if (isMeditation) {
    const keywords = (tags || []).filter((tag) => tag !== "meditation");
    graph.push({
      "@type": ["BlogPosting", "Article"],
      "@id": `${pageUrl}#post`,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": pageUrl,
      },
      headline: title,
      name: title,
      description,
      url: pageUrl,
      inLanguage: site.lang,
      datePublished: page.date?.toISOString?.() || page.date,
      dateModified: page.date?.toISOString?.() || page.date,
      author: { "@id": personIri(site) },
      creator: { "@id": personIri(site) },
      publisher: { "@id": personIri(site) },
      copyrightHolder: { "@id": personIri(site) },
      copyrightNotice: `© ${site.author.name}`,
      isPartOf: { "@id": blogIri(site) },
      keywords: keywords.join(", "),
      articleSection: "Meditations",
      wordCount: String(content || "")
        .replace(/<[^>]*>/g, " ")
        .trim()
        .split(/\s+/)
        .filter(Boolean).length,
      about: passage
        ? {
            "@type": "CreativeWork",
            name: citation || passage,
            description: scripture || passage,
          }
        : {
            "@type": "Thing",
            name: "Holy Scripture",
          },
      speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: [".page-title", ".e-content"],
      },
    });
    graph.push(
      breadcrumb(site, [
        { name: site.title, url: `${site.url}/` },
        { name: "Meditations", url: absolute("/meditations/", site) },
        { name: title, url: pageUrl },
      ]),
    );
  } else {
    const pageNode = {
      "@type": isAuthorPage ? "ProfilePage" : isMeditationsIndex ? "CollectionPage" : "WebPage",
      "@id": pageUrl,
      url: pageUrl,
      name: title || site.title,
      headline: title || site.title,
      description: description || site.description,
      inLanguage: site.lang,
      isPartOf: { "@id": websiteIri(site) },
      author: { "@id": personIri(site) },
      publisher: { "@id": personIri(site) },
      copyrightHolder: { "@id": personIri(site) },
      about: { "@id": personIri(site) },
      mainEntity: isAuthorPage || isHome ? { "@id": personIri(site) } : undefined,
    };
    graph.push(pageNode);

    if (isAuthorPage || isMeditationsIndex || isHome) {
      graph.push({
        "@type": "ItemList",
        "@id": `${pageUrl}#meditations`,
        name: `Meditations by ${site.author.name}`,
        itemListOrder: "https://schema.org/ItemListOrderDescending",
        numberOfItems: meditations.length,
        itemListElement: meditations.map((post, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: absolute(post.url, site),
          name: post.data.title,
          author: { "@id": personIri(site) },
        })),
      });
    }

    graph.push(
      breadcrumb(site, [
        { name: site.title, url: `${site.url}/` },
        ...(isHome ? [] : [{ name: title || "Page", url: pageUrl }]),
      ]),
    );
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph.filter(Boolean).map((node) => {
      const cleaned = { ...node };
      Object.keys(cleaned).forEach((key) => {
        if (cleaned[key] === undefined) delete cleaned[key];
      });
      return cleaned;
    }),
  };
}
