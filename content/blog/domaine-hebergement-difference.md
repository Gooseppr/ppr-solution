---
title: "Domaine, DNS, hébergement : qui fait quoi pour votre site ?"
slug: "domaine-hebergement-difference"
description: "Le nom de domaine, le DNS et l'hébergement sont trois choses différentes, parfois chez trois prestataires. Les distinguer permet de savoir où chercher quand le site ne répond plus."
meta_description: "Comprendre la différence entre nom de domaine, DNS et hébergement web, et savoir à qui s'adresser quand votre site ou vos emails ne fonctionnent plus."
date: "2026-10-28"
category: "Guide"
tags: ["Domaine", "DNS", "Hébergement"]
service:
  url: "prestations.html#dns"
  label: "Prestation : domaine et DNS"
contact:
  label: "Situer mon problème avec vous"
  context: "Votre site ou vos emails ont cessé de fonctionner et vous ne savez pas quel prestataire contacter ? Décrivez ce que vous constatez, nous vous aidons à situer le problème."
  sujet: "dns"
---

Quand un site ne s'affiche plus, la première question est souvent : « à qui dois-je m'adresser ? ». Pour y répondre, il faut distinguer trois éléments qui travaillent ensemble mais qui peuvent être gérés par des prestataires différents : le nom de domaine, le DNS et l'hébergement.

## Le nom de domaine : votre adresse

Le nom de domaine, c'est `votre-site.fr`. Il ne contient ni pages, ni fichiers : c'est un droit d'usage d'une adresse, loué pour une durée déterminée (souvent un an) auprès d'un **registraire**. S'il n'est pas renouvelé, il expire, et le site comme les emails associés cessent de fonctionner.

## Le DNS : l'annuaire

Le DNS fait le lien entre le nom de domaine et les serveurs. Il contient des **enregistrements** qui indiquent, par exemple :

- où se trouve le site (enregistrements `A` ou `CNAME`) ;
- quel serveur reçoit les emails (enregistrements `MX`) ;
- des informations de vérification ou de sécurité (enregistrements `TXT`).

Une erreur ou un oubli dans ces enregistrements, typiquement lors d'un changement d'hébergeur, suffit à rendre le site ou la messagerie injoignable. Après une modification, la prise en compte peut demander un certain temps : c'est la propagation.

## L'hébergement : là où vit le site

L'hébergement, c'est le serveur qui stocke les fichiers du site, exécute PHP et interroge la base de données. C'est aussi là qu'est installé le certificat HTTPS qui chiffre la connexion avec les visiteurs.

## Trois prestataires, ou un seul

Beaucoup d'hébergeurs proposent les trois services ensemble, mais ce n'est pas obligatoire. Il est fréquent que le domaine ait été acheté chez un prestataire, que le DNS soit géré ailleurs et que le site soit hébergé chez un troisième. C'est souvent ce qui complique les dépannages.

:::table Où chercher selon le symptôme
| Ce que vous constatez | Piste la plus probable |
| --- | --- |
| **Le site et les emails tombent en même temps** | Domaine expiré ou DNS modifié |
| **Le site s'affiche chez certains, pas chez d'autres** | Changement DNS récent, en cours de propagation |
| **Erreur 500 ou page blanche** | Hébergement : configuration, PHP ou fichiers |
| **« Votre connexion n'est pas privée »** | Certificat HTTPS sur l'hébergement |
| **Les emails n'arrivent plus, le site fonctionne** | Enregistrements MX du DNS |
:::

> **À retenir**
>
> Avant toute intervention, notez où sont gérés votre domaine, votre DNS et votre hébergement, ainsi que les accès correspondants. Cette simple liste fait gagner beaucoup de temps le jour où un problème survient.
