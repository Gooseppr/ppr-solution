# PPR-Solution

Site statique de PPR-Solution : assistance technique, hébergement web et configuration pour les propriétaires de sites internet.

> **État : en production** sur https://ppr-solution.fr (GitHub Pages, branche `main`). Formulaire actif vers contact@ppr-solution.fr.

## Commandes

```bash
npm ci
```

```bash
npm run build
```

```bash
npm test
```

```bash
npm run serve
```

Puis ouvrir <http://localhost:8000/>.

## Organisation

```
src/pages/*.html        sources des pages (frontmatter YAML + contenu du <main>)
src/partials/sprite.html glyphes SVG du langage graphique
content/blog/*.md       articles (voir BLOG_AUTHORING.md)
scripts/build.js        génère les pages, le blog et sitemap.xml (déterministe, sans réseau)
scripts/layout.js       gabarit commun + réglages du site (domaine, préproduction)
scripts/blog-markdown.js contrat Markdown (repris de l'ancien site)
assets/css/style.css    design system et composants
assets/js/main.js       navigation, récit du hero, schéma interactif
assets/js/contact.js    formulaire (validation, envoi, états)
apps-script/            script Google Apps Script du formulaire + procédure
tests/site.test.js      build, liens internes, SEO de base, CTA, formulaire
docs/                   audit, direction artistique, déploiement, captures
```

**Fichiers générés, à ne pas modifier à la main :** `*.html` à la racine, `blog/`, `sitemap.xml`. Les modifier dans `src/pages/` ou `content/blog/`, puis `npm run build`.

## Dépendances

Aucune dépendance côté navigateur. Développement uniquement : `markdown-it` et `yaml` (build du blog). Polices auto-hébergées (OFL). Playwright (préinstallé dans l'environnement de travail) sert seulement aux captures de contrôle.

## Documentation

- [docs/AUDIT.md](docs/AUDIT.md) — audit initial et skills utilisés
- [docs/DIRECTION-ARTISTIQUE.md](docs/DIRECTION-ARTISTIQUE.md) — décisions graphiques
- [docs/DEPLOIEMENT.md](docs/DEPLOIEMENT.md) — hébergement, DNS, checklist de publication
- [BLOG_AUTHORING.md](BLOG_AUTHORING.md) — écrire un article
- [apps-script/README.md](apps-script/README.md) — formulaire de contact
