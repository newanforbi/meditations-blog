const form = document.querySelector("[data-search-form]");
const input = document.querySelector("[data-search-input]");
const results = document.querySelector("[data-search-results]");
const count = document.querySelector("[data-search-count]");

if (form && input && results) {
  const index = await fetch("/search-index.json").then((response) => response.json());

  const render = (items, query) => {
    if (!query) {
      results.innerHTML = "";
      if (count) count.textContent = "Start typing to search meditations.";
      return;
    }

    if (!items.length) {
      results.innerHTML = `<p class="empty-state">No meditations matched “${query}”.</p>`;
      if (count) count.textContent = "0 results";
      return;
    }

    if (count) count.textContent = `${items.length} result${items.length === 1 ? "" : "s"}`;
    results.innerHTML = items
      .map(
        (item) => `
        <article class="h-entry post-item">
          <aside class="meta">
            <time datetime="${item.date}">${item.readableDate}</time>
            <span aria-hidden="true">•</span>
            <a href="/brendan-ngwa-nforbi/">Brendan Ngwa Nforbi</a>
            ${item.passage ? `<span aria-hidden="true">•</span><span>${item.passage}</span>` : ""}
          </aside>
          <h3><a href="${item.url}">${item.title}</a></h3>
          <div class="post-summary"><p>${item.excerpt}</p></div>
        </article>
      `,
      )
      .join("");
  };

  const search = (query) => {
    const needle = query.trim().toLowerCase();
    if (!needle) return [];
    return index.filter((item) => {
      const haystack = [item.title, item.excerpt, item.passage, item.scripture, item.tags]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return haystack.includes(needle);
    });
  };

  const params = new URLSearchParams(window.location.search);
  const initial = params.get("q") || "";
  if (initial) input.value = initial;

  const run = () => {
    const query = input.value.trim();
    const next = new URL(window.location.href);
    if (query) next.searchParams.set("q", query);
    else next.searchParams.delete("q");
    window.history.replaceState({}, "", next);
    render(search(input.value), query);
  };
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    run();
  });
  input.addEventListener("input", run);
  run();
}
