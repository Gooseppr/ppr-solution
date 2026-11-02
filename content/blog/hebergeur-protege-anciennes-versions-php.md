---
title: "Ancienne version de PHP : votre hébergeur peut-il encore protéger votre site ?"
slug: "hebergeur-protege-anciennes-versions-php"
description: "Certains hébergeurs continuent de corriger les failles de PHP 5.6 ou 7.4 alors que le projet PHP ne le fait plus. Comment c'est possible, ce que cela couvre vraiment, et les questions à leur poser."
meta_description: "PHP 5.6, 7.4 ou 8.1 sans mise à jour officielle : comment certains hébergeurs protègent encore ces versions (support étendu, correctifs rétroportés), leurs limites et quoi leur demander."
date: "2026-11-02"
category: "Guide"
tags: ["PHP", "Sécurité", "Hébergement"]
service:
  url: "prestations.html#php"
  label: "Prestation : PHP et compatibilité"
contact:
  label: "Faire le point sur ma version PHP"
  context: "Votre hébergeur vous dit que votre ancienne version de PHP est « sécurisée » et vous ne savez pas quoi en penser ? Nous pouvons vous aider à y voir clair et à préparer la suite."
  sujet: "php"
---

Oui, dans certains cas, votre hébergeur peut continuer à corriger les failles d'une ancienne version de PHP, même quand le projet PHP ne le fait plus. Il s'appuie pour cela sur des services spécialisés, souvent payants. C'est une vraie protection, mais elle est partielle et temporaire : elle laisse le temps de préparer la mise à jour, elle ne la remplace pas.

> **En bref**
>
> - Le projet PHP ne corrige plus les versions anciennes (PHP 8.1 et antérieures).
> - Des entreprises spécialisées continuent de le faire pour les hébergeurs qui s'abonnent à leur service.
> - Cette protection ne concerne que PHP : votre site lui-même (WordPress, extensions, thème) reste ancien.
> - Elle n'existe pas chez tous les hébergeurs, et vous ne pouvez pas la vérifier vous-même : il faut le leur demander.
> - C'est un sursis utile pour préparer le passage à une version récente.

## Pourquoi la question se pose

Chaque version de PHP reçoit des corrections de sécurité pendant quelques années, puis plus rien. PHP 5.6 n'est plus corrigé depuis fin 2018, PHP 7.4 depuis fin 2022, PHP 8.1 depuis fin 2025. En théorie, un site resté sur ces versions est donc exposé à toutes les failles découvertes depuis.

En pratique, c'est un peu plus nuancé, et c'est ce qui explique que certains hébergeurs annoncent que vos anciennes versions sont « sécurisées ».

## Les trois façons dont une ancienne version peut être corrigée

### 1. Exceptionnellement, par le projet PHP lui-même

Pour les failles critiques d'octobre 2026, le projet PHP a fourni, à titre exceptionnel, des correctifs minimaux pour PHP 7.4, 8.0 et 8.1. Ils ne sont pas livrés sous forme de nouvelle version : c'est à l'hébergeur de les appliquer. Rien de tel n'a été annoncé pour PHP 5.6. Voir notre article sur [les failles critiques de PHP d'octobre 2026](blog/failles-php-octobre-2026-php2shell/).

### 2. Par les distributions Linux

Le projet PHP le rappelle lui-même : certaines distributions Linux et certains prestataires de support à long terme fournissent des correctifs pour des versions qu'il ne maintient plus.

> **Définition : correctif rétroporté**
>
> Une correction de sécurité écrite pour une version récente, puis adaptée et appliquée à une version plus ancienne. On parle aussi de « backport ».

### 3. Par un service de support étendu, souvent payant

Des entreprises spécialisées vendent aux hébergeurs des versions de PHP « sécurisées » : les anciennes versions continuent de recevoir des correctifs de sécurité. C'est par exemple le cas de TuxCare, dont le service est intégré à des panneaux d'administration très répandus chez les hébergeurs, comme Plesk ou cPanel. D'après la documentation de Plesk, ce service couvre PHP 5.6 et les versions plus récentes arrivées en fin de vie, et vise une correction des failles graves sous 14 jours après leur publication.

> **Définition : support étendu**
>
> Un service qui prolonge, contre abonnement, les corrections de sécurité d'un logiciel au-delà de la date où ses créateurs arrêtent de le maintenir.

## Ce que cette protection ne couvre pas

- **Votre site lui-même.** Seul PHP est corrigé. Si votre site tourne en PHP 5.6, son logiciel (WordPress, PrestaShop…), ses extensions et son thème sont presque toujours anciens, eux aussi. Or c'est souvent par une extension non mise à jour que les pirates entrent.
- **Tous les hébergeurs.** Le service est payant pour l'hébergeur : certains le proposent, parfois avec un supplément, d'autres non.
- **Tous les systèmes.** La couverture dépend de la façon dont PHP est installé sur le serveur. Une version installée autrement que par le service n'est pas corrigée.
- **L'avenir.** Les extensions et thèmes récents ne fonctionnent plus avec les vieilles versions de PHP : votre site ne pourra plus évoluer.
- **La vérification par vous-même.** Le numéro de version affiché dans votre espace client ne dit pas, à lui seul, si cette version reçoit encore des correctifs.

> **Attention**
>
> Une ancienne version « sécurisée » réduit le risque, elle ne le supprime pas. Elle ne justifie pas de repousser indéfiniment la mise à jour de votre site.

## Les questions à poser à votre hébergeur

1. **Ma version de PHP reçoit-elle encore des correctifs de sécurité ?** Si oui, par quel moyen et jusqu'à quand ?
2. **Les failles critiques d'octobre 2026 sont-elles corrigées sur ma version ?**
3. **Ce service est-il inclus dans mon offre ou facturé en supplément ?**
4. **Jusqu'à quelle date pourrai-je garder cette version ?** Beaucoup d'hébergeurs finissent par imposer le changement.

Leurs réponses vous diront de combien de temps vous disposez pour préparer la mise à jour, en suivant par exemple notre guide pour [passer de PHP 5.6 ou 7.4 à PHP 8](blog/passer-de-php-5-6-ou-7-4-a-php-8/).

> **À retenir**
>
> Un hébergeur peut prolonger la protection d'une ancienne version de PHP, et c'est une bonne chose. Mais ce n'est qu'un sursis : il protège PHP, pas votre site, et il a un coût. Profitez-en pour préparer le passage à une version maintenue.

## Sources

- [PHP — Security advisory du 21 octobre 2026 (correctifs pour PHP 7.4, 8.0 et 8.1, rôle des distributions)](https://www.php.net/archive/2026.php#2026-10-21-5)
- [PHP — Versions qui ne sont plus prises en charge](https://www.php.net/eol.php)
- [Plesk — Sécuriser les versions de PHP obsolètes](https://doc.plesk.com/en-US/obsidian/administrator-guide/plesk-administration/securing-plesk/plesk-for-linux-securing-outdated-php-versions.80043)
- [cPanel — TuxCare Extended Lifecycle Support pour PHP](https://docs.cpanel.net/knowledge-base/third-party/tuxcare-extended-lifecycle-support-els-php/)
- [TuxCare — Support étendu pour PHP (documentation)](https://docs.tuxcare.com/els-for-runtimes/php/)
