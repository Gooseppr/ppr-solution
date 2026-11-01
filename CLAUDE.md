# PPR-Solution — consignes pour les assistants

Site statique (HTML/CSS/JS natif) d'assistance technique pour sites internet. Domaine : https://ppr-solution.fr. Publication : GitHub Pages depuis `main`.

## Avant toute modification

- Les pages se modifient dans `src/pages/*.html`, les articles dans `content/blog/*.md`. Les `*.html` à la racine, `blog/` et `sitemap.xml` sont **générés** : ne jamais les éditer à la main.
- Après modification : `npm run build` puis `npm test`, et commiter sources + fichiers générés ensemble.
- Ne pas supprimer le fichier `CNAME`.
- Ne pas ajouter de framework ni de dépendance côté navigateur.

## Écrire un article

Suivre **obligatoirement** [`docs/REGLES-REDACTION.md`](docs/REGLES-REDACTION.md) (public non technique, encadré « En bref », jargon défini, sources primaires vérifiées) et le format de [`BLOG_AUTHORING.md`](BLOG_AUTHORING.md).

## Identité et ton

- Direction artistique : [`docs/DIRECTION-ARTISTIQUE.md`](docs/DIRECTION-ARTISTIQUE.md). Réutiliser les glyphes de `src/partials/sprite.html` et les composants existants.
- « Décrire mon problème » est réservé au bouton principal du hero ; le menu dit « Obtenir de l'aide » ; ailleurs, libellés contextuels.
- PPR-Solution se présente comme un service indépendant qui s'appuie sur un réseau de collaborateurs, avec un interlocuteur unique. Ne jamais inventer d'équipe chiffrée, de clients, d'avis, de certifications ou de partenariats.
- Ne jamais publier l'adresse email personnelle du propriétaire.
