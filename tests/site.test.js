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

test("préproduction : aucune page indexable, robots.txt bloquant", () => {
  for (const file of htmlFiles) assert.match(outputs.get(file), /<meta name="robots" content="noindex, nofollow">/, file);
  assert.match(fs.readFileSync(path.join(ROOT, "robots.txt"), "utf8"), /Disallow: \//);
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
