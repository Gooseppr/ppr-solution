---
title: "Failles critiques de PHP (octobre 2026) : votre site est-il concerné ?"
slug: "failles-php-octobre-2026-php2shell"
description: "Deux failles critiques de PHP, surnommées « PHP2Shell », ont été corrigées en urgence le 21 octobre 2026 et sont déjà exploitées. Ce qu'il faut vérifier sur votre site, selon votre version de PHP."
meta_description: "CVE-2026-109618 et CVE-2026-109619 (PHP2Shell) : failles critiques de PHP exploitées, versions corrigées 8.2.35 à 8.5.12, situation des versions 7.4, 8.0 et 8.1, et vérifications à faire."
date: "2026-11-01"
updated: "2026-11-03"
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

Le 21 octobre 2026, le projet PHP a publié en urgence des mises à jour de sécurité pour corriger deux failles très graves, surnommées « PHP2Shell ». Elles permettent à un inconnu de prendre le contrôle du serveur qui fait fonctionner un site, sans mot de passe. Des pirates s'en servaient déjà avant la publication des correctifs. Si votre site utilise PHP, il faut vérifier que votre version est à jour, ou quitter une version qui ne l'est plus.

> **En bref**
>
> - Deux failles critiques de PHP ont été corrigées le 21 octobre 2026 ; elles sont déjà exploitées par des pirates.
> - Presque tous les sites qui utilisent PHP sont concernés, y compris ceux construits avec WordPress ou PrestaShop.
> - Les versions corrigées sont PHP 8.2.35, 8.3.36, 8.4.27 et 8.5.12.
> - Les anciennes versions (PHP 8.1, 7, 5 et 4) ne reçoivent plus de mises à jour officielles : les quitter devient urgent.
> - Sur un hébergement mutualisé, c'est votre hébergeur qui installe la correction : demandez-lui confirmation.

## De quoi parle-t-on ?

PHP est le langage informatique qui fabrique les pages d'une grande partie des sites internet. À chaque visite, le serveur de votre hébergeur exécute le programme PHP de votre site pour construire la page affichée.

Une faille, c'est une erreur dans ce programme qu'un pirate peut utiliser à son avantage. Celles découvertes en octobre sont particulièrement graves : elles permettent d'envoyer au serveur une demande piégée qui lui fait exécuter des instructions choisies par le pirate. C'est comme si quelqu'un pouvait glisser ses propres ordres dans le courrier d'une entreprise et les faire appliquer sans signature.

> **Définition : CVE**
>
> Un numéro d'identification unique attribué à chaque faille de sécurité connue, pour que tout le monde parle de la même. Ici : CVE-2026-109618 et CVE-2026-109619.

## Ce qui s'est passé

- **17 octobre** : des tentatives d'attaque sont repérées sur des serveurs-pièges d'Amazon Web Services, quatre jours avant l'annonce publique (selon l'analyse de Datadog Security Labs).
- **20 octobre** : le projet PHP prévient qu'une mise à jour de sécurité critique arrive le lendemain.
- **21 octobre** : publication des versions corrigées. L'agence américaine de cybersécurité (CISA) demande le jour même de les installer immédiatement.
- **23 octobre** : le projet PHP signale une troisième faille, beaucoup moins probable (voir plus bas).
- **26 octobre** : la CISA ajoute les deux failles à sa liste officielle des failles activement exploitées.

## Pourquoi c'est grave

Les deux failles sont notées 9,2 sur 10 sur l'échelle de gravité utilisée par les spécialistes. Trois raisons :

- **Aucun mot de passe n'est nécessaire** : une simple visite piégée du site suffit.
- **L'attaque a lieu avant que votre site ne démarre** : un mot de passe solide ou une extension de sécurité WordPress ne l'arrêtent pas.
- **Presque tous les hébergements sont concernés**, quelle que soit la manière dont le serveur fait tourner PHP.

Un pirate qui contrôle le serveur peut modifier votre site, y cacher des pages d'arnaque, lire votre base de données (par exemple les comptes de vos clients) ou s'en servir pour envoyer du spam à votre nom.

## Votre site est-il concerné ?

Tout dépend de la version de PHP utilisée et de la personne qui entretient le serveur.

:::table Situation selon la version de PHP
| Version de PHP | Situation |
| --- | --- |
| **8.2, 8.3, 8.4, 8.5** | Protégée à partir des versions 8.2.35, 8.3.36, 8.4.27 et 8.5.12, si la mise à jour a été installée. |
| **7.4, 8.0, 8.1** | Plus maintenues officiellement. Le projet PHP a fourni une correction minimale, mais c'est à votre hébergeur de l'appliquer. Rien n'est garanti. |
| **7.3 et plus anciennes (dont PHP 5 et PHP 4)** | Aucune mise à jour depuis des années, et aucune correction pour ces failles. |
:::

> **Attention**
>
> PHP 8.2 ne recevra plus aucune mise à jour de sécurité après le 31 décembre 2026. Il est protégé contre ces failles s'il est à jour, mais son remplacement doit être prévu dès maintenant.

## Ce que vous pouvez faire

1. **Trouver votre version de PHP.** Elle est indiquée dans l'espace client de votre hébergeur, dans une rubrique « PHP », « Configuration PHP » ou « Version PHP ». Notez le numéro complet si possible (par exemple 8.3.36, et pas seulement 8.3).
2. **Vérifier qui entretient votre serveur.** Dans la grande majorité des cas, votre site est sur un hébergement mutualisé.
3. **Si vous êtes sur un hébergement mutualisé**, consultez les annonces de votre hébergeur ou écrivez-lui pour lui demander si les versions corrigées sont installées.
4. **Si votre site utilise PHP 8.1 ou plus ancien**, demandez à votre hébergeur comment il traite ces failles et prévoyez de passer à une version maintenue. Plus la version est ancienne, plus ce passage demande de vérifications.

> **Définition : hébergement mutualisé**
>
> Une formule où votre site partage un serveur avec d'autres sites. L'hébergeur s'occupe du serveur et de ses mises à jour ; vous ne gérez que votre site.

## Pour les personnes qui gèrent un serveur

Cette partie concerne celles et ceux qui administrent eux-mêmes un serveur privé (VPS), un serveur dédié ou des conteneurs.

> **Définition : VPS**
>
> Un serveur privé virtuel : une part de machine louée et administrée par vous-même, y compris ses mises à jour.

- Installez les paquets corrigés de votre distribution, reconstruisez vos images de conteneurs, puis **redémarrez tous les processus PHP** (PHP-FPM, Apache). Tant qu'un processus lancé avant la mise à jour tourne, l'ancienne version reste active.
- Si la mise à jour doit attendre, le projet PHP propose des réglages temporaires, à placer dans la configuration du serveur (fichier `php.ini` ou configuration PHP-FPM), puis à activer en redémarrant les processus PHP.

:::config php.ini
memory_limit = -1 | Supprime la limite de mémoire de PHP. À compléter par une limite au niveau du serveur ou du conteneur.
post_max_size = 8M | Taille maximale d'une requête envoyée au site. 32M si le site accepte des envois de fichiers.
upload_max_filesize = 8M | Taille maximale d'un fichier envoyé. Doit rester inférieure à post_max_size.
session.upload_progress.enabled = 0 | Désactive le suivi de progression des envois de fichiers, utilisé par l'une des failles.
fatal_error_backtraces = 0 | PHP 8.5 uniquement : n'ajoute plus le détail technique aux erreurs graves.
:::

> **Attention**
>
> Ces réglages réduisent le risque sans le supprimer, et ils ont des effets de bord, par exemple sur la taille des fichiers que le site accepte. Seule la mise à jour de PHP corrige réellement les failles.

## À ne pas confondre : la troisième faille

Deux jours après les correctifs, le projet PHP a signalé une troisième faille (CVE-2026-115560). Elle ne concerne qu'un réglage rare, qu'un site classique n'utilise pas. Le projet PHP la juge peu probable et la corrigera lors d'une mise à jour ordinaire : elle n'appelle pas d'action d'urgence pour la plupart des sites.

C'est un bon réflexe à garder : une faille annoncée ne concerne pas forcément tous les sites de la même façon. Ici, en revanche, les failles PHP2Shell touchent presque tout le monde.

> **À retenir**
>
> Vérifiez votre version de PHP et demandez à votre hébergeur si la correction est installée. Si votre site tourne sur une version qui n'est plus maintenue, c'est le moment de prévoir sa mise à jour.

## Sources

- [PHP — Security advisory: critical remote code execution vulnerabilities (21 octobre 2026)](https://www.php.net/archive/2026.php#2026-10-21-5)
- [PHP — Informational advisory: session upload progress (23 octobre 2026)](https://www.php.net/archive/2026.php#2026-10-23-1)
- [CISA — Critical Vulnerabilities in PHP Require Immediate Patching](https://www.cisa.gov/news-events/alerts/2026/10/21/critical-vulnerabilities-php-require-immediate-patching)
- [Datadog Security Labs — PHP2Shell: detection, analysis, and remediation](https://securitylabs.datadoghq.com/articles/php2shell-critical-vulnerabilities-in-php/)
- [PHP — Versions prises en charge](https://www.php.net/supported-versions.php)
