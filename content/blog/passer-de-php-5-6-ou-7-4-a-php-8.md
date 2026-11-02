---
title: "Passer de PHP 5.6 ou 7.4 à PHP 8 : comment s'y prendre sans casser son site"
slug: "passer-de-php-5-6-ou-7-4-a-php-8"
description: "Votre site tourne encore en PHP 5.6 ou 7.4 ? Ce qui risque de casser en passant à PHP 8, dans quel ordre procéder, et comment mettre le site en maintenance le temps de l'opération."
meta_description: "Migrer un site de PHP 5.6 ou PHP 7.4 vers PHP 8 : ce qui change, les erreurs fréquentes, les étapes dans l'ordre et la mise en maintenance du site pendant l'intervention."
date: "2026-11-02"
category: "Guide"
tags: ["PHP", "Mise à jour", "Migration"]
service:
  url: "prestations.html#php"
  label: "Prestation : PHP et compatibilité"
contact:
  label: "Faire étudier ma migration PHP"
  context: "Votre site tourne en PHP 5.6 ou 7.4 et vous ne savez pas ce qui risque de casser ? Nous pouvons analyser sa compatibilité avant toute modification."
  sujet: "php"
---

Un site encore en PHP 5.6 ou 7.4 fonctionne peut-être très bien en apparence, mais il tourne sur une version qui ne reçoit plus de mises à jour de sécurité officielles depuis des années. Passer à PHP 8 est donc urgent. Ce n'est pas pour autant un simple réglage : plus l'écart est grand, plus il y a de chances que quelque chose casse. La bonne méthode tient en trois mots : vérifier, tester, puis basculer.

> **En bref**
>
> - PHP 5.6 ne reçoit plus de mises à jour de sécurité depuis fin 2018, PHP 7.4 depuis fin 2022.
> - Entre ces versions et PHP 8, certaines instructions ont été supprimées : un site ancien peut afficher une erreur ou une page blanche.
> - On commence par mettre à jour le logiciel du site (WordPress, PrestaShop…), ses thèmes et ses extensions.
> - On teste sur une copie du site avant de toucher au site réel.
> - Le jour du changement, on sauvegarde, on met le site en maintenance, on bascule et on vérifie.

## Pourquoi c'est plus délicat qu'un simple changement de version

PHP est le langage qui fait fonctionner votre site. À chaque nouvelle version majeure, ses créateurs retirent des instructions jugées dépassées ou dangereuses. Un site écrit il y a dix ans peut encore utiliser ces instructions : il fonctionne parfaitement en PHP 5.6, mais plus du tout en PHP 8.

> **Définition : version majeure**
>
> Le premier chiffre d'une version de PHP (5, 7, 8). Passer d'une version majeure à une autre peut supprimer des fonctions existantes, contrairement aux mises à jour mineures (8.3.35 vers 8.3.36), qui corrigent sans rien retirer.

C'est un peu comme passer d'une vieille voiture à un modèle récent : on conduit toujours de la même façon, mais certains accessoires d'origine ne se branchent plus.

## Ce qui change entre ces versions

:::table Ce qui casse le plus souvent, selon la version de départ
| Étape | Ce qui peut poser problème |
| --- | --- |
| **De PHP 5.6 à PHP 7** | L'ancienne façon de se connecter à une base de données MySQL a été supprimée. Un site qui l'utilise ne peut plus lire ses données. |
| **De PHP 7 à PHP 8** | Plusieurs fonctions anciennes ont été supprimées et certaines erreurs autrefois tolérées bloquent désormais la page. Des comparaisons de valeurs donnent aussi un résultat différent. |
| **Après PHP 8** | De nouveaux avertissements « deprecated » (« obsolète ») annoncent des suppressions à venir, sans casser le site tout de suite. |
:::

Concrètement, un site incompatible peut :

- afficher une **page blanche** ou une « erreur 500 » (le message générique d'un serveur qui n'arrive pas à construire la page) ;
- perdre une fonction précise : formulaire, panier, recherche ;
- afficher des messages d'avertissement en haut des pages.

> **Attention**
>
> Si votre site part de PHP 5.6, il y a de fortes chances qu'une partie de l'application doive être modifiée ou remplacée, et pas seulement mise à jour. Mieux vaut le savoir avant de commencer.

## Les étapes, dans l'ordre

### 1. Faire l'état des lieux

Notez la version de PHP actuelle (dans l'espace client de votre hébergeur), le logiciel utilisé par le site et sa version, ainsi que la liste des thèmes et extensions installés. Pour WordPress, le site officiel recommande aujourd'hui PHP 8.3 ou plus récent.

### 2. Mettre à jour le site lui-même

Avant de changer PHP, mettez à jour WordPress, PrestaShop ou Joomla, puis les thèmes et extensions. Les versions récentes sont généralement prévues pour PHP 8. Une extension abandonnée par son auteur depuis plusieurs années est un signal d'alerte : il faudra probablement la remplacer.

### 3. Tester sur une copie du site

> **Définition : site de test**
>
> Une copie de votre site, invisible du public, sur laquelle on peut essayer une mise à jour sans risque. Beaucoup d'hébergeurs proposent d'en créer une en quelques clics, parfois sous le nom de « staging » ou « préproduction ».

Sur cette copie, passez à PHP 8 et parcourez les pages importantes : accueil, formulaires, panier, espace d'administration. Partant de PHP 5.6, il est souvent plus simple de procéder par paliers (d'abord PHP 7.4, puis PHP 8) pour savoir à quelle étape un problème apparaît.

### 4. Préparer le jour J

- **Sauvegardez** les fichiers et la base de données, et vérifiez que la sauvegarde est complète.
- **Choisissez le moment le plus calme** pour votre activité.
- **Notez comment revenir en arrière** : chez la plupart des hébergeurs, il suffit de rechoisir l'ancienne version de PHP dans l'espace client, à condition que le site n'ait pas été modifié entre-temps.

### 5. Mettre le site en maintenance pendant l'intervention

> **Définition : mode maintenance**
>
> Une page temporaire qui indique aux visiteurs que le site est en cours d'intervention et revient bientôt, au lieu de leur montrer une page cassée.

WordPress affiche automatiquement une page de maintenance pendant ses propres mises à jour. Pour un changement de version PHP, on l'active soi-même : avec une extension de maintenance, ou avec l'outil proposé par certains hébergeurs. Prévenez aussi vos clients réguliers si le site a une boutique.

### 6. Basculer, vérifier, surveiller

Changez la version de PHP dans l'espace client, désactivez la maintenance et refaites le tour des pages importantes. Dans les jours qui suivent, surveillez les messages d'erreur et les retours de vos visiteurs.

> **À retenir**
>
> Passer de PHP 5.6 ou 7.4 à PHP 8 est urgent, mais se prépare : on met à jour le site, on teste sur une copie, puis on bascule avec une sauvegarde et un plan de retour. Si votre hébergeur vous propose une protection temporaire de votre ancienne version, voyez [ce qu'elle couvre vraiment](blog/hebergeur-protege-anciennes-versions-php/).

## Sources

- [PHP — Versions qui ne sont plus prises en charge](https://www.php.net/eol.php)
- [PHP — Migration de PHP 5.6 vers PHP 7.0 : extensions supprimées](https://www.php.net/manual/fr/migration70.removed-exts-sapis.php)
- [PHP — Migration vers PHP 8.0 : changements incompatibles](https://www.php.net/manual/fr/migration80.incompatible.php)
- [WordPress — Configuration requise](https://wordpress.org/about/requirements/)
