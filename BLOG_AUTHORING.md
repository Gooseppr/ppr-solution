# Écrire et publier un article

Adapté du guide de l'ancien site PPR-Solution. Le générateur est le même principe : Markdown + frontmatter YAML strict → pages HTML statiques, sans JavaScript côté lecteur.

## Où écrire

Un fichier par article : `content/blog/<slug>.md`. Le nom du fichier doit être égal au slug. Ne jamais modifier les fichiers générés (`blog.html`, `blog/<slug>/index.html`, `index.html`, `sitemap.xml`).

```bash
npm run build
```

```bash
npm test
```

Puis relire en local (`npm run serve`) et commiter le Markdown **et** les fichiers générés.

## Frontmatter

```yaml
---
title: "Titre de l'article"
slug: "titre-de-l-article"
description: "Résumé visible sur les cartes (1 à 2 phrases)."
meta_description: "Description pour les moteurs de recherche (≈ 150 caractères)."
date: "2026-11-01"
updated: "2026-11-05"            # facultatif
category: "Actualité"            # "Actualité" ou "Guide"
tags: ["PHP", "Sécurité"]
service:                         # facultatif : prestation liée
  url: "prestations.html#php"
  label: "Prestation : PHP et compatibilité"
contact:                         # facultatif : bouton d'action contextuel
  label: "Faire vérifier ma version PHP"
  context: "Phrase d'accompagnement au-dessus du bouton."
  sujet: "php"                   # hebergement, php, dns, https, migration, configuration, autre
---
```

Tout champ inconnu fait échouer le build (pour détecter les fautes de frappe).

## Corps de l'article

- Le premier paragraphe devient le chapô : il répond directement à la question du titre.
- Titres `##`, `###`, `####` sans sauter de niveau. Pas de `#` (le titre génère le H1). Un sommaire apparaît dès 3 sections `##`.
- Liens internes depuis la racine logique, sans `/` initial : `[prestation](prestations.html#php)`, `[article](blog/autre-slug/)`. Ils sont vérifiés au build.
- Encadrés : une citation dont le premier paragraphe est **À retenir**, **Note**, **Attention** (encadré ambre), **Limite** ou **Exemple**.
- Tableau avec légende accessible :

```markdown
:::table Légende du tableau
| Colonne | Colonne |
| --- | --- |
| **En-tête de ligne** | valeur |
:::
```

- Réglages techniques : fenêtre de configuration, une ligne par réglage au format `réglage = valeur | explication` :

```markdown
:::config php.ini
memory_limit = 256M | Mémoire maximale qu'un script PHP peut utiliser.
:::
```

- Les blocs de code (```` ``` ```` ou indentation de 4 espaces) sont **refusés** par le build : utiliser `:::config` ou du texte.
- Le HTML brut est désactivé : il s'affiche comme du texte.

## Règles éditoriales (articles d'actualité)

1. Vérifier chaque fait sur la **source primaire** (php.net, CERT-FR, CISA, annonce officielle de l'hébergeur) et noter la date.
2. Ne jamais présenter une faille propre à une configuration précise comme un risque pour tous les sites.
3. Distinguer ce que le lecteur peut vérifier lui-même et ce qui relève de l'hébergeur.
4. Donner réellement l'information utile ; la conversion vient de la confiance, pas de la rétention.
5. Terminer par une section `## Sources` avec des liens.
