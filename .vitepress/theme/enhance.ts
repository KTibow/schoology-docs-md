export function enhanceApiHeadings() {
  const container = document.querySelector(".vp-doc") ?? document;
  const headings = container.querySelectorAll("h1, h2, h3, h4, h5, h6");

  headings.forEach((el) => {
    const h = el as HTMLElement;
    if (h.dataset.apiEnhanced === "1") return;

    // Extract text excluding the anchor link
    const anchor = h.querySelector(
      ":scope > a.header-anchor",
    ) as HTMLElement | null;
    const text = Array.from(h.childNodes)
      .filter((n) => n !== anchor)
      .map((n) => (n as HTMLElement).innerText ?? n.textContent ?? "")
      .join("")
      .trim();

    // Match "METHOD path" (PATH can be plain or was rendered from inline code)
    const m = text.match(/^(GET|POST|PUT|DELETE)\s+(.+)$/i);
    if (!m) return;

    const method = m[1].toUpperCase();
    let path = m[2].trim();

    // Clear existing non-anchor nodes
    Array.from(h.childNodes).forEach((n) => {
      if (n !== anchor) h.removeChild(n);
    });

    // Build enhanced DOM
    const methodEl = document.createElement("span");
    methodEl.className = `method-badge method ${method.toLowerCase()}`;
    methodEl.textContent = method;

    const pathEl = document.createElement("span");
    pathEl.className = "path-display";
    pathEl.textContent = path;

    const button = document.createElement("button");
    button.className = "copy-button";
    button.title = "Copy to clipboard";
    button.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24"><path/></svg>`;
    if (path.startsWith("/")) {
      console.warn("unexpected starts with /", path);
    }
    const fullUrl = `https://api.schoology.com/v1/${path.split("(")[0].trim()}`;
    button.addEventListener("click", async () => {
      await navigator.clipboard.writeText(fullUrl);
      const old = button.title;
      button.title = "Copied!";
      button.setAttribute("data-copied", "1");
      setTimeout(() => {
        button.title = old;
        button.removeAttribute("data-copied");
      }, 1200);
    });

    h.prepend(button);
    h.prepend(pathEl);
    h.prepend(" ");
    h.prepend(methodEl);

    h.classList.add("api-path");
    h.dataset.apiEnhanced = "1";
  });
}
