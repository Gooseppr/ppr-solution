---
title: "Votre hébergeur demande de mettre à jour PHP : que faire ?"
slug: "hebergeur-demande-mise-a-jour-php"
description: "Un email annonce la fin de prise en charge de votre version de PHP ? Pourquoi c'est important, ce que vous risquez à attendre, et comment préparer le changement sans casser votre site."
meta_description: "Fin de support d'une version PHP : comprendre l'email de l'hébergeur, connaître les risques des versions anciennes (PHP 7, 5, 4) et préparer une mise à jour sans casser son site."
date: "2026-10-30"
updated: "2026-11-02"
category: "Guide"
tags: ["PHP", "Hébergement", "Mise à jour"]
service:
  url: "prestations.html#php"
  label: "Prestation : PHP et compatibilité"
contact:
  label: "Préparer ma mise à jour PHP"
  context: "Votre hébergeur vous demande de changer de version et vous ne savez pas si votre site le supportera ? Nous pouvons étudier la compatibilité avant tout changement."
  sujet: "php"
---

Vous avez reçu un email de votre hébergeur : la version de PHP utilisée par votre site « arrive en fin de vie » ou « n'est plus prise en charge », et il vous demande d'en choisir une plus récente. Ce message n'est pas une formalité. Voici ce qu'il signifie et comment y répondre sans mettre votre site en panne.

> **En bref**
>
> - PHP est le langage qui fait fonctionner votre site ; chaque version n'est entretenue que quelques années.
> - Une version qui n'est plus entretenue ne reçoit plus de corrections de sécurité : votre site devient une cible.
> - PHP 5.6 n'est plus entretenu depuis 2018, PHP 7.4 depuis 2022 : ces sites sont à mettre à jour en priorité.
> - Changer de version peut casser un site ancien : on vérifie avant, on sauvegarde, on teste.

## PHP, c'est quoi exactement ?

PHP est le langage de programmation qui fait fonctionner une grande partie des sites internet, dont ceux construits avec WordPress, PrestaShop, Joomla ou Drupal. À chaque visite, le serveur de votre hébergeur exécute le code PHP de votre site pour fabriquer la page affichée.

Comme tout logiciel, PHP évolue par versions. Chaque version reçoit des corrections de sécurité pendant quelques années, puis plus rien.

> **Définition : fin de support**
>
> La date après laquelle les créateurs d'un logiciel ne publient plus aucune correction pour une version. Le logiciel continue de fonctionner, mais ses failles ne sont plus réparées.

## Pourquoi votre hébergeur vous le demande

Une version qui ne reçoit plus de mises à jour reste exposée à toutes les failles découvertes après sa fin de support. En octobre 2026, par exemple, des [failles critiques et déjà exploitées](blog/failles-php-octobre-2026-php2shell/) ont été corrigées dans les versions maintenues, mais pas dans les versions anciennes.

:::table Fin des mises à jour de sécurité, selon le projet PHP
| Version | Fin des mises à jour de sécurité |
| --- | --- |
| **PHP 4.4** | 7 août 2008 |
| **PHP 5.6** | 31 décembre 2018 |
| **PHP 7.4** | 28 novembre 2022 |
| **PHP 8.1** | 31 décembre 2025 |
| **PHP 8.2** | 31 décembre 2026 |
| **PHP 8.3** | 31 décembre 2027 |
| **PHP 8.4** | 31 décembre 2028 |
| **PHP 8.5** | 31 décembre 2029 |
:::

> **Attention**
>
> Des sites fonctionnent encore en PHP 5, voire en PHP 4. Ils n'ont reçu aucune correction de sécurité depuis plus de sept ans, et parfois plus de dix-huit ans. Dans ce cas, la migration est urgente, et elle demande souvent plus qu'un simple changement de réglage.

## Ce que vous risquez à attendre

- **Le piratage** : un site sur une version non maintenue est une cible facile pour les robots qui cherchent des failles connues.
- **Un changement imposé** : beaucoup d'hébergeurs finissent par basculer automatiquement les sites vers une version récente. Si le site n'est pas compatible, il peut cesser de fonctionner du jour au lendemain.
- **Un surcoût** : certains hébergeurs facturent le maintien d'une ancienne version.

## Pourquoi on ne change pas de version d'un simple clic

Chaque nouvelle version de PHP retire ou modifie certaines instructions. Un thème, une extension ou un module écrit pour une ancienne version peut alors provoquer une page blanche, une « erreur 500 » (le message générique d'un serveur qui n'arrive pas à construire la page) ou un dysfonctionnement discret.

> **Définition : extension (ou plugin)**
>
> Un module ajouté à un site WordPress, PrestaShop ou autre pour lui donner une fonction supplémentaire : formulaire, boutique, galerie… Chaque extension est écrite par un auteur différent et n'est pas toujours mise à jour. Plus l'écart entre deux versions est grand, plus le risque augmente : passer de PHP 8.2 à 8.4 est en général plus simple que de passer de PHP 5.6 à 8.4.

## Les étapes d'une mise à jour réussie

1. **Identifier la version actuelle** et celle proposée par l'hébergeur, dans votre espace client.
2. **Faire l'inventaire** : logiciel utilisé (WordPress, PrestaShop…), sa version, ses thèmes et extensions.
3. **Vérifier la compatibilité** de chacun avec la version visée, en commençant par mettre à jour le logiciel du site lui-même.
4. **Sauvegarder** les fichiers et la base de données, et vérifier que la sauvegarde est exploitable.
5. **Tester** si possible sur une copie du site, ou au moment le plus calme, en sachant comment revenir à la version précédente si quelque chose ne va pas.
6. **Changer la version**, puis vérifier les pages importantes : formulaires, panier, espace d'administration.
7. **Surveiller** les journaux d'erreurs (le fichier où le serveur note les problèmes qu'il rencontre) dans les jours suivants.

Pour un site encore en PHP 5.6 ou 7.4, voyez notre guide détaillé : [passer de PHP 5.6 ou 7.4 à PHP 8](blog/passer-de-php-5-6-ou-7-4-a-php-8/). Et si votre hébergeur vous dit que votre ancienne version reste « sécurisée », voyez [ce que cette protection couvre vraiment](blog/hebergeur-protege-anciennes-versions-php/).

> **À retenir**
>
> Si votre site est très ancien ou a été développé sur mesure, la mise à jour de PHP peut nécessiter de corriger ou de remplacer une partie de l'application. Mieux vaut le savoir avant de changer de version.

## Sources

- [PHP — Versions prises en charge](https://www.php.net/supported-versions.php)
- [PHP — Versions qui ne sont plus prises en charge](https://www.php.net/eol.php)
