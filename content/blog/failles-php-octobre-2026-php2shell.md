---
title: "Failles critiques de PHP (octobre 2026) : votre site est-il concerné ?"
slug: "failles-php-octobre-2026-php2shell"
description: "Deux failles critiques de PHP, surnommées « PHP2Shell », ont été corrigées en urgence le 21 octobre 2026 et sont déjà exploitées. Ce qu'il faut vérifier sur votre site, selon votre version de PHP."
meta_description: "CVE-2026-109618 et CVE-2026-109619 (PHP2Shell) : failles critiques de PHP exploitées, versions corrigées 8.2.35 à 8.5.12, situation des versions 7.4, 8.0 et 8.1, et vérifications à faire."
date: "2026-11-01"
category: "Actualité"
tags: ["PHP", "Sécurité", "Mise à jour"]
service:
  url: "prestations.html#php"
  label: "Prestation : PHP et compatibilité"
contact:
  label: "Faire vérifier ma version PHP"
  context: "Vous ne savez pas quelle version de PHP utilise votre site, ou votre hébergeur vous demande de la changer ? Décrivez-nous la situation : le premier échange est gratuit."
  sujet: "php"
---

Le 21 octobre 2026, le projet PHP a publié en urgence des correctifs pour deux failles critiques, enregistrées sous les références CVE-2026-109618 et CVE-2026-109619 et surnommées « PHP2Shell ». Elles permettent à un attaquant, sans aucun identifiant, d'exécuter du code sur le serveur qui héberge un site. Des tentatives d'exploitation ont été observées avant même la publication des correctifs. Voici ce que cela signifie pour un site internet, et ce qu'il faut vérifier.

## Ce qui s'est passé

- **17 octobre** : des tentatives d'exploitation sont repérées sur des serveurs-pièges d'AWS, quatre jours avant l'annonce publique (selon l'analyse de Datadog Security Labs).
- **20 octobre** : le projet PHP annonce une publication de sécurité critique pour le lendemain.
- **21 octobre** : publication de PHP 8.5.12, 8.4.27, 8.3.36 et 8.2.35, qui corrigent les deux failles. L'agence américaine de cybersécurité (CISA) publie le même jour une alerte demandant une mise à jour immédiate.
- **23 octobre** : le projet PHP publie un avis informatif sur une troisième faille, CVE-2026-115560, beaucoup moins probable (voir plus bas).
- **26 octobre** : la CISA ajoute les deux failles à son catalogue des vulnérabilités activement exploitées.

## Pourquoi ces failles sont sérieuses

Les deux failles sont notées 9,2 sur 10 (CVSS v4.0). Trois éléments les rendent particulièrement dangereuses :

- **aucun identifiant n'est nécessaire** : une simple requête envoyée au site suffit ;
- **l'attaque a lieu avant que le code du site ne s'exécute** : un mot de passe solide ou une extension de sécurité WordPress ne la bloquent pas ;
- **presque tous les hébergements sont concernés** : le projet PHP cite toutes les installations qui servent des pages web, qu'elles utilisent Apache avec mod_php, PHP-FPM, php-cgi, FrankenPHP ou LiteSpeed.

Un attaquant qui exécute du code sur le serveur peut modifier le site, y cacher des pages frauduleuses, lire la base de données ou s'en servir pour envoyer du spam.

## Votre site est-il concerné ?

Tout dépend de la version de PHP utilisée et de qui l'entretient.

:::table Situation selon la version de PHP
| Version de PHP | Situation |
| --- | --- |
| **8.2, 8.3, 8.4, 8.5** | Corrigée à partir de 8.2.35, 8.3.36, 8.4.27 et 8.5.12, si votre hébergeur a installé la mise à jour. |
| **7.4, 8.0, 8.1** | Plus maintenues. Le projet PHP a publié des correctifs minimaux sous forme de code source : leur application dépend entièrement de votre hébergeur ou de votre distribution. |
| **7.3 et antérieures (dont PHP 5 et PHP 4)** | Aucune mise à jour du projet PHP depuis des années, et aucun correctif publié pour ces failles. |
:::

> **Attention**
>
> PHP 8.2 ne recevra plus aucune mise à jour de sécurité après le 31 décembre 2026. Un site en PHP 8.2 est protégé contre ces failles s'il est à jour, mais son passage à une version plus récente doit être planifié dès maintenant.

## Que faire concrètement ?

### 1. Connaître votre version de PHP

Elle apparaît généralement dans l'espace client de votre hébergeur, dans une rubrique « PHP », « Configuration PHP » ou « Version PHP ». Notez si possible le numéro complet (par exemple 8.3.36), et pas seulement 8.3.

### 2. Si votre site est sur un hébergement mutualisé

C'est l'hébergeur qui installe les mises à jour de PHP. Consultez ses annonces récentes ou demandez-lui si les versions corrigées sont en place. Si votre site utilise PHP 8.1 ou une version plus ancienne, demandez-lui comment ces failles sont traitées, et prévoyez un passage à une version maintenue.

### 3. Si vous gérez vous-même un serveur (VPS, serveur dédié, conteneurs)

Installez les paquets corrigés de votre distribution, reconstruisez vos images de conteneurs, puis **redémarrez tous les processus PHP** (PHP-FPM, Apache) : tant qu'un processus lancé avant la mise à jour tourne, l'ancienne version reste active.

### 4. Si la mise à jour doit attendre

Le projet PHP propose des mesures temporaires, qui réduisent l'exposition sans protéger complètement. Elles sont à appliquer dans la configuration du serveur, pas dans le code du site :

```ini
; Atténuation seulement : la mise à jour reste la seule vraie solution.
memory_limit = -1
post_max_size = 8M          ; 32M si le site accepte des envois de fichiers
upload_max_filesize = 8M    ; doit rester inférieur à post_max_size
session.upload_progress.enabled = 0
fatal_error_backtraces = 0  ; PHP 8.5 uniquement
```

Ces réglages ont des effets de bord (par exemple sur la taille des fichiers envoyés). Sur un hébergement mutualisé, ils ne sont souvent pas modifiables : c'est alors à l'hébergeur d'agir.

## À ne pas confondre : la faille CVE-2026-115560

Deux jours après les correctifs, le projet PHP a signalé une troisième faille. Elle ne concerne qu'une combinaison de réglages rare : une application qui change à la volée la façon dont les sessions sont enregistrées, avec la fonction de suivi des envois de fichiers activée. Le projet PHP la juge peu probable en pratique et la corrigera lors d'une mise à jour ordinaire. Elle n'appelle pas d'action d'urgence pour la plupart des sites ; désactiver `session.upload_progress.enabled`, déjà recommandé ci-dessus, la neutralise.

> **À retenir**
>
> Une faille de PHP ne concerne pas toujours tous les sites de la même façon. Ici, les failles PHP2Shell touchent presque toutes les installations et sont exploitées : la priorité est de vérifier que votre version est corrigée, ou de quitter une version qui ne l'est plus.

## Sources

- [PHP — Security advisory: critical remote code execution vulnerabilities (21 octobre 2026)](https://www.php.net/archive/2026.php#2026-10-21-5)
- [PHP — Informational advisory: session upload progress (23 octobre 2026)](https://www.php.net/archive/2026.php#2026-10-23-1)
- [CISA — Critical Vulnerabilities in PHP Require Immediate Patching](https://www.cisa.gov/news-events/alerts/2026/10/21/critical-vulnerabilities-php-require-immediate-patching)
- [Datadog Security Labs — PHP2Shell: detection, analysis, and remediation](https://securitylabs.datadoghq.com/articles/php2shell-critical-vulnerabilities-in-php/)
- [PHP — Versions prises en charge](https://www.php.net/supported-versions.php)
