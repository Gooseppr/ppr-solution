# Phase A — Audit initial

Date : 1er novembre 2026. Synthèse courte, destinée à cadrer la suite.

## 1. Dépôt cible `Gooseppr/ppr-solution`

Vide au démarrage (aucun commit). Travail effectué sur la branche `claude/optimistic-sagan-d9amfk`.

## 2. Dépôt de référence `Gooseppr/ppr_solution_site`

Cloné en lecture seule, **non modifié**. Site statique HTML/CSS/JS natif (≈ 3 400 lignes), positionnement XML / documentation structurée, palette bleue, IBM Plex, blog Markdown généré par Node, formulaire branché sur Google Apps Script, diagrammes Mermaid générés au build, sprite Lucide.

### Classement des éléments

| Élément | Décision | Justification |
|---|---|---|
| Principes de `DESIGN_BASELINE.md` (sémantique des couleurs, pas de dégradés, transitions courtes, règle des grilles 2 colonnes) | **Réutilisé tel quel** comme garde-fou | Toujours pertinents |
| IBM Plex Sans / Mono | **Réutilisé**, mais auto-hébergé | L'ancien site chargeait Google Fonts (transfert d'IP à un tiers) |
| Navigation mobile (`main.js` : Échap, `aria-expanded`, libellé dynamique, page courante) | **Adapté** | Logique saine, classes renommées |
| `contact.js` (timeout 12 s, `AbortController`, succès seulement si `json.ok === true`, honeypot, anti double-envoi, focus 1re erreur, messages d'erreur précis) | **À adapter en phase C** | Très bonne base ; champs à changer (nom, email, sujet, site, hébergeur, message) |
| Script Google Apps Script | **À réécrire** | Le code serveur n'est pas dans le dépôt ; l'URL existante pointe vers l'ancien projet. Nouveau script sur le compte du propriétaire, envoi vers `contact@ppr-solution.fr`, honeypot + limitation de débit côté serveur |
| Générateur de blog (`build-blog.js`, `blog-markdown.js`, tests `node --test`, frontmatter strict, sortie déterministe, HTML brut désactivé) | **À adapter en phase C** | Fiable et testé. À changer : `BASE_URL`, templates nav/footer, catégories, composants XML (pipeline) |
| `BLOG_AUTHORING.md` | **Adapté en phase C** | Contrat éditorial réutilisable |
| `.xml-window` / coloration syntaxique XML | **Référence uniquement** | Remplacé par `.tech-window` (fenêtres de configuration, motif XML n°2) |
| Mermaid CLI (build) | **Référence uniquement** | Puppeteer lourd ; les schémas du jalon sont plus lisibles en HTML/SVG dessinés à la main |
| Sprite Lucide | **Abandonné** | Les glyphes sont dessinés pour le site (langage graphique commun) |
| Validateur S1000D, démonstrations XML, PDF de prestations, articles XML | **Abandonnés** | Hors positionnement |
| Canonicals `gooseppr.github.io/ppr_solution_site` | **Abandonnés** | Le domaine définitif sera `ppr-solution.fr` |

## 3. Skills et outils disponibles

| Ressource | Emplacement | Décision |
|---|---|---|
| `frontend-design` | `/mnt/skills/public/frontend-design` | **Utilisé** : méthode plan → revue → construction → critique par captures. Ses mises en garde (ivoire + vermillon, eyebrows systématiques, mono partout) ont été pesées : la palette est imposée par le brief, donc l'identité est portée par la forme (modules arrondis, schéma) et les eyebrows restent rares. |
| Skills GSAP officiels (`gsap-timeline`, `gsap-performance`, …) | skills synchronisés du compte | **Lus, non retenus** : la séquence du hero (6 étapes, une seule lecture) tient en CSS + 20 lignes de JS. GSAP ajouterait ≈ 70 ko sans bénéfice. |
| Playwright + Chromium | préinstallés | **Utilisé** pour les captures 320 → 1440 px et le contrôle du débordement (`scripts/screenshots.js`). |
| Awesome-design, Impeccable | — | **Introuvables** dans l'environnement (ni skill, ni plugin, ni dépôt accessible). Non installés. |
| Mermaid | via l'ancien dépôt | Non utilisé pour ce jalon (voir ci-dessus). |
| Skills SEO / accessibilité dédiés | — | Aucun trouvé ; contrôles faits à la main (contraste calculé, structure des titres, clavier). |

Aucune dépendance d'exécution n'a été ajoutée au site.
