#!/usr/bin/env node
/* Build statique de PPR-Solution.
   - src/pages/*.html  : pages (frontmatter YAML + contenu du <main>)
   - content/blog/*.md : articles (contrat décrit dans BLOG_AUTHORING.md)
   Sorties à la racine : *.html, blog.html, blog/<slug>/index.html, sitemap.xml.
   Le build est déterministe et n'effectue aucun appel réseau. */
const fs = require("node:fs");
const path = require("node:path");
const YAML = require("yaml");
const { loadPosts, checkTarget } = require("./blog-markdown");
const { SITE, escapeHtml, absoluteUrl, renderPage } = require("./layout");

const ROOT = path.join(__dirname, "..");
const WORDS_PER_MINUTE = 220;
const PAGE_FIELDS = new Set(["title", "description", "output", "nav", "robots", "scripts", "sitemap", "prefix"]);

function formatDateFr(date) {
  return new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${date}T00:00:00Z`));
}

function decodeEntities(value) {
  return String(value).replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'");
}

function countWords(html) {
  const text = decodeEntities(String(html).replace(/<[^>]+>/g, " "));
  return (text.match(/[\p{L}\p{N}]+(?:[’'-][\p{L}\p{N}]+)*/gu) || []).length;
}

function preparePost(post) {
  const minutes = Math.max(1, Math.ceil(countWords(post.content_html) / WORDS_PER_MINUTE));
  return { ...post, reading_minutes: minutes, reading_time: `${minutes} min de lecture` };
}

function headingSlug(label) {
  return decodeEntities(label.replace(/<[^>]*>/g, " ")).normalize("NFD").replace(/[̀-ͯ]/g, "")
    .toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "section";
}

function addHeadingIds(html) {
  const used = new Set();
  const headings = [];
  const content = html.replace(/<h([2-4])>([\s\S]*?)<\/h\1>/g, (match, level, label) => {
    const base = headingSlug(label);
    let id = base;
    for (let n = 2; used.has(id); n++) id = `${base}-${n}`;
    used.add(id);
    if (level === "2") headings.push({ id, label: decodeEntities(label.replace(/<[^>]*>/g, "")) });
    return `<h${level} id="${id}">${label}</h${level}>`;
  });
  return { content, headings };
}

/* ---------- Composants de blog ---------- */

function postCard(post, prefix = "") {
  return `<li class="post-card">
          <p class="post-meta"><span class="post-kind post-kind-${post.category === "Actualité" ? "news" : "guide"}">${escapeHtml(post.category)}</span><time datetime="${post.date}">${formatDateFr(post.date)}</time></p>
          <h3><a href="${prefix}blog/${post.slug}/">${escapeHtml(post.title)}</a></h3>
          <p>${escapeHtml(post.description)}</p>
          <p class="post-reading">${escapeHtml(post.reading_time)}</p>
        </li>`;
}

function latestPosts(posts, prefix = "", count = 3) {
  return `<ul class="post-list">
        ${posts.slice(0, count).map((post) => postCard(post, prefix)).join("\n        ")}
      </ul>`;
}

function renderBlogIndex(posts) {
  const body = `    <section class="section page-intro" aria-labelledby="blog-title">
      <div class="container">
        <p class="tag-eyebrow" aria-hidden="true">blog</p>
        <h1 id="blog-title">Comprendre ce qui se passe sur votre site</h1>
        <p class="lead">Actualités vérifiées sur PHP, l'hébergement et la sécurité, et guides pour comprendre et vérifier vous-même ce qui peut l'être. Chaque article cite ses sources officielles.</p>
      </div>
    </section>
    <section class="section section-tight" aria-label="Articles">
      <div class="container">
        <ul class="post-list post-list-full">
        ${posts.map((post) => postCard(post)).join("\n        ")}
        </ul>
      </div>
    </section>`;
  const schema = {
    "@context": "https://schema.org", "@type": "Blog", name: "Blog PPR-Solution", url: absoluteUrl("blog.html"), inLanguage: "fr-FR",
    blogPost: posts.map((post) => ({ "@type": "BlogPosting", headline: post.title, url: absoluteUrl(`blog/${post.slug}/index.html`), datePublished: post.date }))
  };
  return renderPage({
    meta: { title: "Blog · Actualités PHP, hébergement et conseils · PPR-Solution", description: "Actualités vérifiées sur PHP, l'hébergement web et la sécurité des sites, et guides pratiques pour comprendre domaine, DNS, HTTPS et migrations.", output: "blog.html", nav: "blog", schema },
    body
  });
}

function renderArticle(post, others) {
  const prefix = "../../";
  const output = `blog/${post.slug}/index.html`;
  const { content, headings } = addHeadingIds(post.content_html);
  const toc = headings.length >= 3
    ? `<nav class="article-toc" aria-labelledby="toc-title"><p id="toc-title" class="article-toc-title">Dans cet article</p><ol>${headings.map((h) => `<li><a href="#${h.id}">${escapeHtml(h.label)}</a></li>`).join("")}</ol></nav>`
    : "";
  const related = others.filter((other) => other.slug !== post.slug).slice(0, 2);
  const updated = post.updated && post.updated !== post.date
    ? ` · <span>Mis à jour le <time datetime="${post.updated}">${formatDateFr(post.updated)}</time></span>` : "";
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "BlogPosting", headline: post.title, description: post.meta_description, datePublished: post.date, dateModified: post.updated || post.date, inLanguage: "fr-FR", mainEntityOfPage: absoluteUrl(output), author: { "@type": "Organization", name: SITE.name, url: absoluteUrl("index.html") }, publisher: { "@type": "Organization", name: SITE.name } },
      { "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: absoluteUrl("index.html") },
        { "@type": "ListItem", position: 2, name: "Blog", item: absoluteUrl("blog.html") },
        { "@type": "ListItem", position: 3, name: post.title, item: absoluteUrl(output) }
      ] }
    ]
  };
  const body = `    <article class="article">
      <header class="article-header">
        <div class="container article-narrow">
          <nav class="breadcrumbs" aria-label="Fil d'Ariane"><a href="${prefix}">Accueil</a><span aria-hidden="true">/</span><a href="${prefix}blog.html">Blog</a></nav>
          <p class="post-meta"><span class="post-kind post-kind-${post.category === "Actualité" ? "news" : "guide"}">${escapeHtml(post.category)}</span><span>Publié le <time datetime="${post.date}">${formatDateFr(post.date)}</time></span>${updated} · <span>${escapeHtml(post.reading_time)}</span></p>
          <h1>${escapeHtml(post.title)}</h1>
        </div>
      </header>
      <div class="container article-layout">
        ${toc ? `<aside class="article-aside">${toc}</aside>` : ""}
        <div class="article-body prose">
${content}
          <aside class="article-cta" aria-labelledby="article-cta-title">
            <h2 id="article-cta-title">Besoin d'un coup de main&nbsp;?</h2>
            <p>${escapeHtml(post.contact_context)}</p>
            <div class="article-cta-actions">
              <a class="btn btn-primary" href="${prefix}contact.html?sujet=${encodeURIComponent(post.contact_sujet)}">${escapeHtml(post.contact_label)}</a>
              <a class="link" href="${prefix}${escapeHtml(post.service_url)}">${escapeHtml(post.service_label)}</a>
            </div>
          </aside>
        </div>
      </div>
      ${related.length ? `<section class="section section-tight" aria-labelledby="related-title"><div class="container"><h2 id="related-title" class="h-small">À lire aussi</h2><ul class="post-list">${related.map((other) => postCard(other, prefix)).join("")}</ul></div></section>` : ""}
    </article>`;
  return renderPage({
    meta: { title: `${post.title} · PPR-Solution`, description: post.meta_description, output, nav: "blog", type: "article", published: post.date, updated: post.updated, schema },
    body, prefix
  });
}

/* ---------- Pages ---------- */

function loadPages() {
  const dir = path.join(ROOT, "src", "pages");
  return fs.readdirSync(dir).filter((f) => f.endsWith(".html")).sort().map((file) => {
    const source = fs.readFileSync(path.join(dir, file), "utf8");
    const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
    if (!match) throw new Error(`ERROR page "${file}": frontmatter YAML manquant`);
    const meta = YAML.parse(match[1]);
    for (const key of Object.keys(meta)) if (!PAGE_FIELDS.has(key)) throw new Error(`ERROR page "${file}": champ inconnu ${key}`);
    for (const key of ["title", "description", "output"]) if (!meta[key]) throw new Error(`ERROR page "${file}": champ obligatoire ${key}`);
    return { file, meta, body: match[2] };
  });
}

function renderSitemap(pages, posts) {
  const urls = pages.filter((p) => p.meta.sitemap !== false && p.meta.robots !== "noindex").map((p) => ({ loc: absoluteUrl(p.meta.output) }));
  urls.push({ loc: absoluteUrl("blog.html") });
  posts.forEach((post) => urls.push({ loc: absoluteUrl(`blog/${post.slug}/index.html`), lastmod: post.updated || post.date }));
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `  <url><loc>${u.loc}</loc>${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ""}</url>`).join("\n")}\n</urlset>\n`;
}

function build(root = ROOT) {
  const sources = loadPosts(root, preparePost);
  const posts = sources.map((s) => s.post).sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug));
  const outputs = new Map();

  for (const pageSource of loadPages()) {
    const body = pageSource.body.replace("<!-- build:latest-posts -->", latestPosts(posts));
    outputs.set(pageSource.meta.output, renderPage({ meta: pageSource.meta, body, prefix: pageSource.meta.prefix || "" }));
    pageSource.pageMeta = pageSource.meta;
  }
  outputs.set("blog.html", renderBlogIndex(posts));
  for (const post of posts) outputs.set(`blog/${post.slug}/index.html`, renderArticle(post, posts));
  outputs.set("sitemap.xml", renderSitemap(loadPages(), posts));

  // Valide les liens internes des articles, y compris vers les pages générées.
  for (const source of sources) {
    for (const link of source.links) checkTarget(link, source.filename, root, outputs, `blog/${source.post.slug}/index.html`);
  }

  for (const [relative, content] of outputs) {
    const target = path.join(root, relative);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, content, "utf8");
  }
  return outputs;
}

if (require.main === module) {
  try {
    const outputs = build();
    console.log(`${outputs.size} fichiers générés.`);
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}

module.exports = { build, headingSlug, addHeadingIds, countWords, preparePost };
