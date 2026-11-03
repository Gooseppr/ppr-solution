/* Contrôles du site généré : build déterministe, liens internes, structure, contenus. */
const test = require("node:test");
const assert = require("node:assert");
const fs = require("node:fs");
const path = require("node:path");
const { build } = require("../scripts/build");

const ROOT = path.join(__dirname, "..");
const outputs = build(ROOT);
const htmlFiles = [...outputs.keys()].filter((f) => f.endsWith(".html"));

test("le build est déterministe", () => {
  const second = build(ROOT);
  for (const [file, content] of outputs) assert.strictEqual(second.get(file), content, file);
});

test("tous les liens et ressources internes existent", () => {
  for (const file of htmlFiles) {
    const html = outputs.get(file);
    for (const [, attr] of html.matchAll(/\s(?:href|src)="([^"]+)"/g)) {
      if (/^(https?:|mailto:|#|data:)/.test(attr)) continue;
      const [rawPath, fragment] = attr.split("#");
      const clean = rawPath.split("?")[0];
      let target = path.normalize(path.join(path.dirname(file), clean));
      if (clean === "" ) target = file;
      if (clean.endsWith("/") || clean === "./" || clean === "../../") target = path.join(target, "index.html");
      const exists = outputs.has(target) || fs.existsSync(path.join(ROOT, target));
      assert.ok(exists, `${file} → ${attr} (${target})`);
      if (fragment && target.endsWith(".html")) {
        const targetHtml = outputs.get(target) || fs.readFileSync(path.join(ROOT, target), "utf8");
        assert.ok(new RegExp(`id="${fragment}"`).test(targetHtml), `${file} → ancre manquante ${attr}`);
      }
    }
  }
});

test("chaque page a un seul h1, un titre et une description uniques", () => {
  const titles = new Set();
  const descriptions = new Set();
  for (const file of htmlFiles) {
    const html = outputs.get(file);
    assert.strictEqual((html.match(/<h1[\s>]/g) || []).length, 1, `${file} : h1`);
    const title = html.match(/<title>([^<]+)<\/title>/)[1];
    const description = html.match(/<meta name="description" content="([^"]+)"/)[1];
    assert.ok(!titles.has(title), `titre dupliqué : ${title}`);
    assert.ok(!descriptions.has(description), `description dupliquée : ${file}`);
    titles.add(title);
    descriptions.add(description);
  }
});

test("production : pages indexables avec canonical, pages internes exclues, robots.txt ouvert", () => {
  const internal = new Set(["styleguide.html", "404.html"]);
  for (const file of htmlFiles) {
    const html = outputs.get(file);
    if (internal.has(file)) {
      assert.match(html, /<meta name="robots" content="noindex, nofollow">/, file);
    } else {
      assert.doesNotMatch(html, /name="robots"/, file);
      assert.match(html, /<link rel="canonical" href="https:\/\/ppr-solution\.fr\/[^"]*">/, file);
      assert.doesNotMatch(html, /Préproduction/, file);
    }
  }
  const robots = fs.readFileSync(path.join(ROOT, "robots.txt"), "utf8");
  assert.match(robots, /Allow: \//);
  assert.match(robots, /Sitemap: https:\/\/ppr-solution\.fr\/sitemap\.xml/);
  const sitemap = outputs.get("sitemap.xml");
  assert.doesNotMatch(sitemap, /styleguide|404/);
});

test("CTA : « Décrire mon problème » réservé au hero, « Obtenir de l'aide » dans le menu", () => {
  for (const file of htmlFiles) {
    const html = outputs.get(file);
    const count = (html.match(/>(?:<[^>]+><\/span>)?Décrire mon problème</g) || []).length;
    assert.ok(count === (file === "index.html" ? 1 : 0), `${file} : ${count} bouton(s)`);
    assert.match(html, /class="btn btn-primary btn-sm" href="[^"]*contact\.html"[^>]*>Obtenir de l'aide</, file);
  }
});

test("aucune référence obsolète à l'ancien site XML ni secret", () => {
  for (const file of htmlFiles) {
    const html = outputs.get(file);
    assert.doesNotMatch(html, /gooseppr\.github\.io|S1000D|script\.google\.com\/macros\/s\/AKfycbxF8eV/i, file);
    assert.doesNotMatch(html, /gregoire\.elmacin@/i, file);
  }
});

test("le formulaire de contact garde ses champs obligatoires et son piège à robots", () => {
  const html = outputs.get("contact.html");
  for (const name of ["name", "email", "message", "sujet", "site", "hebergeur", "website"]) {
    assert.match(html, new RegExp(`name="${name}"`), name);
  }
  assert.strictEqual((html.match(/\srequired[\s>]/g) || []).length, 3);
  for (const sujet of ["hebergement", "php", "dns", "https", "migration", "configuration", "autre"]) {
    assert.match(html, new RegExp(`value="${sujet}"`), sujet);
  }
});

test("sécurité et partage : CSP, referrer et image de partage sur chaque page", () => {
  const crypto = require("node:crypto");
  for (const file of htmlFiles) {
    const html = outputs.get(file);
    const csp = html.match(/<meta http-equiv="Content-Security-Policy" content="([^"]+)">/);
    assert.ok(csp, `${file} : CSP absente`);
    assert.match(csp[1], /object-src 'none'/);
    // Chaque script en ligne exécutable doit être autorisé par son empreinte.
    for (const [, code] of html.matchAll(/<script>([\s\S]*?)<\/script>/g)) {
      const hash = crypto.createHash("sha256").update(code).digest("base64");
      assert.ok(csp[1].includes(`'sha256-${hash}'`), `${file} : script en ligne non autorisé par la CSP`);
    }
    assert.match(html, /<meta name="referrer" content="strict-origin-when-cross-origin">/, file);
    assert.match(html, /<meta property="og:image" content="https:\/\/ppr-solution\.fr\/assets\/img\/og-default\.png">/, file);
  }
  assert.ok(fs.existsSync(path.join(ROOT, "assets/img/og-default.png")));
});

test("articles : blocs de code refusés, fenêtre :::config rendue et échappée", () => {
  const { renderMarkdown } = require("../scripts/blog-markdown");
  assert.throws(() => renderMarkdown("Intro.\n\n```ini\nx = 1\n```\n", "t.md", ROOT), /code blocks are not allowed/);
  assert.throws(() => renderMarkdown("Intro.\n\n    code indenté\n", "t.md", ROOT), /code blocks are not allowed/);
  const { html } = renderMarkdown("Intro.\n\n:::config php.ini\nmemory_limit = 256M | Mémoire <maximale>\n:::\n", "t.md", ROOT);
  assert.match(html, /class="config-window"/);
  assert.match(html, /<span class="config-key">memory_limit<\/span><span class="config-value">256M<\/span>/);
  assert.match(html, /Mémoire &lt;maximale&gt;/);
});

test("typographie : pas d'espace sécable avant : ; ! ? » dans le texte des pages", () => {
  for (const file of htmlFiles) {
    const text = outputs.get(file)
      .replace(/<(script|style|code|pre|textarea)\b[\s\S]*?<\/\1>/g, "")
      .replace(/<[^>]+>/g, "");
    const bad = text.match(/.{0,20} [:;!?»]/);
    assert.ok(!bad, `${file} : espace sécable dans « ${bad && bad[0]} »`);
  }
});
