# PPR-Solution

Site statique de PPR-Solution : assistance technique, hébergement web et configuration pour les propriétaires de sites internet.

> **État : jalon de validation visuelle (phase B).** Seuls le hero, les prestations et le schéma pédagogique sont réalisés. Les autres pages sont des pages d'attente. Le site est en préproduction : `noindex` sur toutes les pages, `robots.txt` bloque tout, et aucune demande ne peut être envoyée.

## Lancer en local

```bash
python3 -m http.server 8000
```

Puis ouvrir <http://localhost:8000/>. Le guide de style est disponible sur <http://localhost:8000/styleguide.html>.

## Structure

```
index.html              accueil (hero, prestations, schéma)
styleguide.html         design system initial (document interne)
contact.html, conseils.html, a-propos.html,
mentions-legales.html, confidentialite.html   pages d'attente (phase C)
assets/css/style.css    jetons, composants, mises en page
assets/js/main.js       navigation, séquence du hero, schéma interactif
assets/fonts/           IBM Plex Sans/Mono, Bricolage Grotesque (OFL, auto-hébergées)
assets/img/favicon.svg
docs/AUDIT.md                    phase A : audit des dépôts et des skills
docs/DIRECTION-ARTISTIQUE.md     phase B : décisions graphiques
docs/preview/                    captures 320 → 1440 px
scripts/screenshots.js           captures de contrôle (Playwright, outil de dev)
```

Aucune dépendance d'exécution, aucun framework, aucun appel à un service tiers.

## Captures de contrôle

```bash
npm run serve
```

```bash
npm run screenshots
```

(nécessite Playwright, préinstallé dans l'environnement de développement ; affiche aussi le débordement horizontal à chaque largeur).
