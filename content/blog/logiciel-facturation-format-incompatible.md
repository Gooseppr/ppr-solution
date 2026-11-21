---
title: "Votre logiciel de facturation ne produit pas le bon format : faut-il le changer ?"
slug: "logiciel-facturation-format-incompatible"
description: "Votre logiciel de facturation ou votre logiciel métier ne sait pas produire de facture électronique ? Avant d'en changer, vérifiez ce qu'il sait déjà faire : mise à jour, export, transformation. Et ce qu'une transformation ne peut pas inventer."
meta_description: "Logiciel de facturation incompatible avec la facture électronique : solution compatible, mise à jour, export CSV, transformation vers UBL ou CII, limites et maintenance."
date: "2026-11-21"
category: "Guide"
tags: ["Facturation électronique", "Logiciel", "Formats"]
contact:
  label: "Poser une question sur les exports de mon logiciel"
  context: "Indiquez le nom de votre logiciel et ce qu'il sait exporter (fichier CSV, Excel, XML…), sans nous envoyer de factures : nous vous dirons si une adaptation paraît envisageable techniquement, ou s'il vaut mieux voir avec l'éditeur."
  sujet: "autre"
---

Un logiciel de facturation qui ne produit pas encore de facture électronique n'est pas forcément à remplacer. Trois pistes existent : une mise à jour de l'éditeur, la connexion à une plateforme agréée, ou la transformation de ce que le logiciel sait déjà exporter vers un format accepté. Cette dernière piste a une limite importante : une transformation réorganise les informations, elle ne peut pas inventer celles que le logiciel ne connaît pas.

> **En bref**
>
> - Un logiciel peut rester en place s'il devient une « solution compatible » : fonctions adaptées à la réforme et connexion à au moins une plateforme agréée.
> - Première démarche : demander à l'éditeur ce qu'il prévoit, et quand.
> - À défaut, un export du logiciel (fichier CSV, XML, interface de programmation) peut parfois être transformé vers un format accepté.
> - Une transformation ne crée pas d'information : si le SIREN du client n'est pas dans le logiciel, il ne sera pas dans la facture.
> - Toute transformation se contrôle, se documente et s'entretient, car les règles évoluent.

Cet article fait partie d'une série sur la facturation électronique. Voir aussi [ce qui change pour les TPE en 2026 et 2027](blog/facturation-electronique-tpe-2026-2027/), [les trois formats Factur-X, UBL et CII](blog/factur-x-ubl-cii-formats-facture-electronique/) et [que faire quand une facture est rejetée](blog/facture-electronique-rejetee/).

## Le cas des logiciels existants

Beaucoup de petites entreprises facturent avec un outil qui n'a pas été conçu pour la réforme : un logiciel métier ancien (garage, cabinet, atelier, commerce), un logiciel de caisse, un tableur, ou un logiciel de gestion installé depuis des années. Ces outils fonctionnent, l'équipe les connaît, et ils contiennent l'historique des clients.

L'administration ne demande pas de les remplacer. Elle demande que les factures partent **par une plateforme agréée**, au bon format. La fiche de la DGFiP destinée aux TPE le dit ainsi : si vous disposez déjà d'un logiciel, « assurez-vous qu'il soit solution compatible, ainsi vous pourrez continuer à l'utiliser ».

> **Définition : solution compatible**
>
> Un logiciel (facturation, caisse, gestion…) qui remplit deux conditions cumulées : proposer les fonctions attendues par la réforme et être connecté à au moins une plateforme agréée.

## Les questions à se poser, dans l'ordre

![Arbre de décision en trois questions. 1 : votre logiciel est-il relié à une plateforme agréée et capable de produire une facture électronique ? Si oui, c'est une solution compatible : vérifier les réglages. Sinon, 2 : l'éditeur prévoit-il une mise à jour qui le rende compatible ? Si oui, obtenir une date. Sinon, 3 : que sait-il exporter ? Avec un export structuré, une transformation est possible si les informations nécessaires existent, avec des contrôles. Sans export exploitable : autre logiciel, ou création des factures sur la plateforme. Dans tous les cas, la facture part par une plateforme agréée.](assets/img/blog/logiciel-facturation-que-faire.svg)

### 1. Votre logiciel est-il déjà une solution compatible ?

Posez la question à l'éditeur, par écrit : « Votre logiciel est-il connecté à une plateforme agréée ? Laquelle ? Peut-il émettre des factures électroniques et recevoir celles de mes fournisseurs ? » Si la réponse est oui, il reste à vérifier les réglages : coordonnées de l'entreprise, identifiants des clients, nouvelles mentions obligatoires.

### 2. Une mise à jour est-elle prévue ?

Beaucoup d'éditeurs adaptent leurs logiciels à la réforme. Demandez une **date** et ce que la mise à jour couvrira : réception seulement, ou aussi émission ? Une TPE doit pouvoir émettre au plus tard le 1er septembre 2027 : une mise à jour annoncée « pour plus tard », sans date, ne suffit pas pour décider.

### 3. Que sait exporter votre logiciel ?

Si le logiciel n'évolue plus, regardez ce qu'il sait produire comme fichiers. Les menus « Exporter », « Sauvegarde » ou « Comptabilité » proposent souvent :

- un **fichier CSV** ou un export pour tableur ;
- un fichier **XML** propre au logiciel ;
- parfois une **interface de programmation**, qui permet à un autre programme de lire les données.

> **Définition : fichier CSV**
>
> Un fichier texte en forme de tableau : une ligne par enregistrement (une facture, par exemple), et des colonnes séparées par des virgules ou des points-virgules. Il s'ouvre avec un tableur.

> **Définition : interface de programmation (API)**
>
> Une porte d'accès prévue par un logiciel pour qu'un autre programme puisse lire ou envoyer des données, sans passer par l'écran.

Si votre logiciel ne propose aucun export exploitable, la transformation n'est pas possible. Il reste alors à changer d'outil, ou à créer les factures directement sur une plateforme agréée : pour les entreprises qui n'ont pas de logiciel, l'administration indique que les plateformes agréées proposent différents modes de création de facture.

## Le principe de la transformation

Transformer un export, c'est lire le fichier produit par le logiciel, puis ranger chaque information à la bonne place dans un format accepté (UBL, CII ou Factur-X). On s'appuie pour cela sur une **table de correspondance** : pour chaque colonne de l'export, l'information de la facture qu'elle contient et son emplacement dans le format d'arrivée.

Reprenons la facture fictive d'Atelier Martin. Son ancien logiciel exporte un fichier CSV dont voici la ligne concernée :

:::config export-factures.csv | extrait du fichier, une colonne par ligne
numero = FAC-2026-001 | Le numéro de la facture.
date = 20/11/2026 | La date d'émission, écrite jour/mois/année.
montant_ht = 1000,00 | Le total hors taxes, avec une virgule décimale.
tva = 200,00 | Le montant de TVA.
montant_ttc = 1200,00 | Le total toutes taxes comprises.
:::

:::table Table de correspondance pour cet export
| Colonne de l'export | Information de la facture (terme de la norme) | Ce qu'il faut adapter |
| --- | --- | --- |
| **numero** | numéro de facture (BT-1) | rien |
| **date** | date d'émission (BT-2) | l'ordre et l'écriture de la date, selon le format d'arrivée |
| **montant_ht** | total hors taxes (BT-109) | la virgule décimale devient un point |
| **tva** | total de la TVA (BT-110) | la virgule décimale devient un point |
| **montant_ttc** | total toutes taxes comprises (BT-112) | la virgule décimale devient un point |
:::

Déjà, sur cinq colonnes, trois pièges apparaissent : la date et les montants ne s'écrivent pas comme dans le fichier d'arrivée, et une conversion naïve produirait des valeurs fausses. Le [deuxième article de la série](blog/factur-x-ubl-cii-formats-facture-electronique/) montre comment chaque format écrit ces informations.

## Ce que l'export ne contient pas

Ces cinq colonnes suffisent pour un tableau de suivi, pas pour une facture électronique. Il manque notamment :

- **le vendeur** : sa dénomination, son SIREN, son numéro de TVA, son adresse ;
- **l'acheteur** : sa dénomination, son adresse et son **SIREN**, devenu une mention obligatoire ;
- **la devise** de la facture ;
- **les lignes** : ce qui a été vendu, en quelle quantité, à quel prix ;
- **la TVA détaillée** : le taux appliqué et sa catégorie (taux normal, exonération…) ;
- **la catégorie de l'opération** : livraison de biens, prestation de services, ou les deux ;
- le cas échéant, l'**option pour le paiement de la TVA d'après les débits** et l'**adresse de livraison**.

Certaines de ces informations sont fixes et peuvent être ajoutées une fois pour toutes (les coordonnées d'Atelier Martin, la devise). D'autres changent à chaque facture et doivent venir du logiciel : si celui-ci ne les connaît pas, aucune transformation ne peut les deviner.

> **Attention**
>
> C'est la limite principale d'une transformation : elle réorganise des informations, elle n'en crée pas. Compléter « à la main » des données manquantes dans un programme de transformation (un SIREN par défaut, une catégorie de TVA supposée) produit des factures fausses, avec des conséquences fiscales. Si une information manque dans le logiciel, il faut d'abord trouver comment l'y saisir ou l'exporter.

## Vérifier le résultat

Une facture produite par transformation passe par les mêmes contrôles qu'une autre : fichier lisible, structure conforme au format, règles de gestion (informations obligatoires, totaux cohérents), puis adressage au bon client. Avant toute mise en service :

- tester la transformation sur des factures variées : avec plusieurs lignes, plusieurs taux de TVA, un avoir, un client sans établissement secondaire…
- comparer chaque fichier obtenu à la facture d'origine, montant par montant ;
- faire un premier envoi réel par la plateforme et suivre son statut.

Les erreurs les plus fréquentes et la façon de lire un message de rejet sont détaillées dans [Facture électronique rejetée : comprendre le message et trouver la cause](blog/facture-electronique-rejetee/).

## Coûts et maintenance

Une transformation sur mesure n'est pas un achat ponctuel. Avant de la choisir, il faut prévoir :

- **les évolutions des règles** : les formats, les profils et les règles de contrôle évoluent ; la norme européenne elle-même a été révisée en 2026. La transformation devra suivre ;
- **les évolutions du logiciel d'origine** : une mise à jour peut changer l'export (nom ou ordre des colonnes) et casser la transformation sans prévenir ;
- **la documentation** : la table de correspondance, les choix faits et les tests réalisés doivent être écrits, pour pouvoir être repris ;
- **une personne responsable** du suivi, en interne ou chez un prestataire.

Selon le volume de factures, une mise à jour de l'éditeur ou un changement d'outil peut finalement coûter moins cher qu'une transformation à entretenir. La comparaison mérite d'être faite avant de décider.

## Ce que vous pouvez faire dès maintenant

- **Écrire à votre éditeur** avec les questions de la partie 1, et conserver sa réponse.
- **Repérer les exports** proposés par votre logiciel, sans rien modifier : menus « Exporter », « Sauvegarde », « Comptabilité ».
- **Ouvrir un export dans un tableur** et cocher, dans la liste ci-dessus, les informations qui y figurent.
- **Vérifier que le SIREN de vos clients professionnels** est saisi dans votre logiciel : c'est une mention obligatoire depuis le 1er septembre 2026.
- **Demander à votre plateforme agréée** quels formats elle accepte et si elle propose un moyen d'importer ou de créer des factures.

> **À retenir**
>
> Un logiciel existant peut rester en place s'il devient une solution compatible, par mise à jour ou par connexion à une plateforme agréée. Une transformation de ses exports est envisageable quand les informations nécessaires existent dans le logiciel ; elle doit alors être testée, documentée et entretenue. Avant d'investir, comparez avec une mise à jour ou un changement d'outil.

## Sources

- [DGFiP — Foire aux questions « Je découvre la facturation électronique » (version du 1er septembre 2026), questions 2.3 (solution compatible) et 3.4 (nouvelles mentions)](https://www.impots.gouv.fr/sites/default/files/media/1_metier/2_professionnel/EV/2_gestion/290_facturation_electronique/faq---fe_je-decouvre-la-facturation-electronique.pdf)
- [DGFiP — Fiche 1 : que va-t-il se passer pour mon entreprise ? (juin 2026)](https://www.impots.gouv.fr/sites/default/files/media/1_metier/2_professionnel/EV/2_gestion/290_facturation_electronique/fiche-1_que-va-t-il-se-passer-pour-mon-entreprise.pdf)
- [DGFiP — Fiche 3 : à partir de quelle date mon entreprise doit-elle être prête ? (octobre 2026)](https://www.impots.gouv.fr/sites/default/files/media/1_metier/2_professionnel/EV/2_gestion/290_facturation_electronique/fiche-3_tpe_a-partir-de-quand-mon-entreprise-doit-etre-prete.pdf)
- [Commission européenne — Nouvelle version de la norme européenne de facturation électronique EN 16931](https://ec.europa.eu/newsroom/digital/items/930407/en)
