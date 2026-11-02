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

Un site encore en PHP 5.6 ou 7.4 fonctionne peut-être très bien en apparence, mais il tourne sur une version qui ne reçoit plus de mises à jour de sécurité officielles depuis des années. Passer à PHP 8 est donc urgent. Ce n'est pas pour autant un simple réglage : plus l'écart est grand, plus il y a de chances que quelque chose casse. La bonne méthode : faire le point, sauvegarder, préparer le code, puis changer de version au bon moment.

> **En bref**
>
> - PHP 5.6 ne reçoit plus de mises à jour de sécurité depuis fin 2018, PHP 7.4 depuis fin 2022.
> - Entre ces versions et PHP 8, certaines instructions ont été supprimées : un site ancien peut afficher une erreur ou une page blanche.
> - On commence par un état des lieux et une sauvegarde complète.
> - On prépare le code du site avant de toucher à PHP : mises à jour de WordPress et des extensions, ou corrections pour un site plus ancien.
> - Le jour J, on met le site en maintenance, on change la version de PHP, on installe le code adapté, puis on vérifie.

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

Notez la version de PHP actuelle (dans l'espace client de votre hébergeur), le logiciel utilisé par le site et sa version, ainsi que la liste des thèmes et extensions installés. Une extension abandonnée par son auteur depuis plusieurs années est un signal d'alerte : il faudra probablement la remplacer.

### 2. Sauvegarder

Sauvegardez les fichiers du site et sa base de données, puis vérifiez que la sauvegarde est complète. Tant qu'elle n'existe pas, on ne touche à rien : c'est elle qui permet de revenir en arrière si quelque chose se passe mal.

### 3. Préparer le code du site

Avant de changer PHP, il faut que le site soit prêt à fonctionner avec la nouvelle version. Deux cas se présentent.

- **Le site utilise WordPress, PrestaShop ou Joomla, assez récent.** On met à jour le logiciel, puis les thèmes et extensions. Leurs versions récentes acceptent généralement à la fois l'ancienne et la nouvelle version de PHP : le site continue de fonctionner normalement après cette mise à jour, et il est prêt pour PHP 8. Pour WordPress, le site officiel recommande aujourd'hui PHP 8.3 ou plus récent.
- **Le site est très ancien ou fait sur mesure.** Partant de PHP 5.6, cette passerelle n'existe souvent pas : WordPress, par exemple, ne fonctionne plus en dessous de PHP 7.4. Les corrections du code sont alors préparées à l'avance, puis installées le jour même du changement de version.

### 4. Choisir le jour J et mettre le site en maintenance

> **Définition : mode maintenance**
>
> Une page temporaire qui indique aux visiteurs que le site est en cours d'intervention et revient bientôt, au lieu de leur montrer une page cassée.

Choisissez le moment le plus calme pour votre activité et prévenez vos clients réguliers si le site a une boutique. Le moment venu, activez la page de maintenance : avec une extension de maintenance, ou avec l'outil proposé par certains hébergeurs.

### 5. Changer la version de PHP et installer le code adapté

Changez la version de PHP dans l'espace client de votre hébergeur. Si des corrections ont été préparées à l'étape 3, c'est le moment de les installer. Désactivez ensuite la maintenance.

### 6. Vérifier, surveiller, et revenir en arrière si besoin

Refaites le tour des pages importantes : accueil, formulaires, panier, espace d'administration. Dans les jours qui suivent, surveillez les messages d'erreur et les retours de vos visiteurs. En cas de problème grave, remettez l'ancienne version de PHP dans l'espace client et restaurez la sauvegarde de l'étape 2.

> **À retenir**
>
> Passer de PHP 5.6 ou 7.4 à PHP 8 est urgent, mais se prépare : état des lieux, sauvegarde, code prêt pour la nouvelle version, puis changement au bon moment, site en maintenance. Si votre hébergeur vous propose une protection temporaire de votre ancienne version, voyez [ce qu'elle couvre vraiment](blog/hebergeur-protege-anciennes-versions-php/).

## Sources

- [PHP — Versions qui ne sont plus prises en charge](https://www.php.net/eol.php)
- [PHP — Migration de PHP 5.6 vers PHP 7.0 : extensions supprimées](https://www.php.net/manual/fr/migration70.removed-exts-sapis.php)
- [PHP — Migration vers PHP 8.0 : changements incompatibles](https://www.php.net/manual/fr/migration80.incompatible.php)
- [WordPress — Configuration requise](https://wordpress.org/about/requirements/)
