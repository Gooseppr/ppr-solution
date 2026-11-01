/* Gabarit commun : <head>, en-tête, sprite graphique, pied de page.
   Une seule source pour toutes les pages générées (pages et articles). */
const fs = require("node:fs");
const path = require("node:path");

const SITE = {
  name: "PPR-Solution",
  // Domaine définitif prévu. Canonicals et indexation activés seulement quand preprod = false.
  baseUrl: "https://ppr-solution.fr",
  email: "contact@ppr-solution.fr",
  // Préproduction : noindex partout, pas de canonical, bandeau visible, robots.txt bloquant.
  preprod: true
};

const NAV = [
  { key: "prestations", href: "prestations.html", label: "Prestations" },
  { key: "blog", href: "blog.html", label: "Blog" },
  { key: "a-propos", href: "a-propos.html", label: "À propos" }
];

const SPRITE = fs.readFileSync(path.join(__dirname, "..", "src", "partials", "sprite.html"), "utf8").trimEnd();

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

function absoluteUrl(outputPath) {
  return `${SITE.baseUrl}/${outputPath === "index.html" ? "" : outputPath.replace(/index\.html$/, "")}`;
}

function head({ title, description, output, prefix = "", type = "website", published, updated, robots, schema }) {
  const url = absoluteUrl(output);
  const indexable = !SITE.preprod && robots !== "noindex";
  const lines = [
    `<meta charset="utf-8">`,
    `<meta name="viewport" content="width=device-width, initial-scale=1">`,
    `<title>${escapeHtml(title)}</title>`,
    `<meta name="description" content="${escapeHtml(description)}">`,
    indexable ? `<link rel="canonical" href="${escapeHtml(url)}">` : `<meta name="robots" content="noindex, nofollow">`,
    `<meta name="theme-color" content="#F8F7F3">`,
    `<link rel="icon" href="${prefix}assets/img/favicon.svg" type="image/svg+xml">`,
    `<link rel="preload" href="${prefix}assets/fonts/bricolage-grotesque-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin>`,
    `<link rel="preload" href="${prefix}assets/fonts/ibm-plex-sans-latin-400-normal.woff2" as="font" type="font/woff2" crossorigin>`,
    `<link rel="stylesheet" href="${prefix}assets/css/style.css">`,
    `<meta property="og:type" content="${type}">`,
    `<meta property="og:site_name" content="${SITE.name}">`,
    `<meta property="og:locale" content="fr_FR">`,
    `<meta property="og:title" content="${escapeHtml(title)}">`,
    `<meta property="og:description" content="${escapeHtml(description)}">`,
    `<meta property="og:url" content="${escapeHtml(url)}">`,
    `<meta name="twitter:card" content="summary">`,
    published ? `<meta property="article:published_time" content="${escapeHtml(published)}">` : "",
    published ? `<meta property="article:modified_time" content="${escapeHtml(updated || published)}">` : "",
    schema ? `<script type="application/ld+json">${JSON.stringify(schema).replace(/</g, "\\u003c")}</script>` : "",
    `<script>document.documentElement.classList.replace("no-js", "js");</script>`,
    `<script src="${prefix}assets/js/main.js" defer></script>`
  ];
  return lines.filter(Boolean).map((line) => `  ${line}`).join("\n");
}

function header(prefix, current) {
  const home = prefix || "./";
  const links = NAV.map((item) => `        <a href="${prefix}${item.href}"${item.key === current ? ' aria-current="page"' : ""}>${item.label}</a>`).join("\n");
  const banner = SITE.preprod
    ? `  <div class="preview-banner" role="note"><div class="container">Préproduction — site non publié, aucune demande réelle n'est traitée.</div></div>\n`
    : "";
  return `  <a class="skip-link" href="#contenu">Aller au contenu</a>
${banner}  <header class="site-header" data-header>
    <div class="container nav-inner">
      <a class="brand" href="${home}"${current === "accueil" ? ' aria-current="page"' : ""}>
        <svg class="brand-mark" viewBox="0 0 48 26" aria-hidden="true">
          <rect x="1" y="5" width="26" height="16" rx="8" fill="#fff" stroke="#171717" stroke-width="2"/>
          <circle cx="9" cy="13" r="3.2" fill="#F05B3F"/>
          <path d="M27 13h9" stroke="#171717" stroke-width="2"/>
          <circle cx="41" cy="13" r="5.5" fill="#171717"/>
        </svg>
        <span>
          <span class="brand-name">PPR-Solution</span>
          <span class="brand-sub">assistance technique web</span>
        </span>
        <span class="sr-only">(accueil)</span>
      </a>
      <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="navigation" data-nav-toggle>
        <span class="nav-icon" aria-hidden="true"></span>
        <span class="sr-only">Ouvrir le menu</span>
      </button>
      <nav class="primary-nav" id="navigation" aria-label="Navigation principale" data-nav-menu>
${links}
        <a class="btn btn-primary btn-sm" href="${prefix}contact.html"${current === "contact" ? ' aria-current="page"' : ""}>Obtenir de l'aide</a>
      </nav>
    </div>
  </header>`;
}

function footer(prefix) {
  const home = prefix || "./";
  return `  <footer class="site-footer">
    <div class="container footer-grid">
      <div>
        <p><strong>PPR-Solution</strong><br>Assistance technique · Hébergement web · Configuration</p>
        <p><a class="link" href="mailto:${SITE.email}">${SITE.email}</a></p>
      </div>
      <div>
        <h2>Le site</h2>
        <ul class="footer-links">
          <li><a href="${home}">Accueil</a></li>
          <li><a href="${prefix}prestations.html">Prestations</a></li>
          <li><a href="${prefix}blog.html">Blog</a></li>
          <li><a href="${prefix}a-propos.html">À propos</a></li>
          <li><a href="${prefix}contact.html">Contact</a></li>
        </ul>
      </div>
      <div>
        <h2>Informations</h2>
        <ul class="footer-links">
          <li><a href="${prefix}mentions-legales.html">Mentions légales</a></li>
          <li><a href="${prefix}confidentialite.html">Confidentialité</a></li>
          <li><a href="${prefix}cgv.html">Conditions générales de vente</a></li>
        </ul>
      </div>
    </div>
  </footer>`;
}

function renderPage({ meta, body, prefix = "" }) {
  const scripts = (meta.scripts || []).map((src) => `  <script src="${prefix}${src}" defer></script>`).join("\n");
  return `<!DOCTYPE html>
<html lang="fr" class="no-js">
<head>
${head({ ...meta, prefix })}
${scripts}
</head>
<body>
${header(prefix, meta.nav)}
${SPRITE}

  <main id="contenu">
${body.trim()}
  </main>

${footer(prefix)}
</body>
</html>
`.replace(/\n\s*\n(\s*\n)+/g, "\n\n");
}

module.exports = { SITE, NAV, escapeHtml, absoluteUrl, renderPage };
