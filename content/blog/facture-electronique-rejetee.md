---
title: "Facture électronique rejetée : comprendre le message et trouver la cause"
slug: "facture-electronique-rejetee"
description: "Votre facture électronique a été rejetée ? Un rejet n'est pas un refus du client : il signale un problème technique à corriger. Comment situer l'étape qui bloque, lire le message, corriger sans créer de doublon et garder les bonnes traces."
meta_description: "Facture électronique rejetée par la plateforme : différence entre rejet et refus, causes fréquentes, lecture du message, correction sans doublon. Méthode simple."
date: "2026-11-21"
category: "Guide"
tags: ["Facturation électronique", "Rejet", "Diagnostic"]
contact:
  label: "Poser une question sur un rejet de facture"
  context: "Décrivez le message de rejet affiché par votre plateforme, sans nous envoyer la facture elle-même : nous vous dirons si la cause paraît technique et à qui s'adresser en priorité."
  sujet: "autre"
---

Une facture électronique rejetée n'est pas une facture refusée par votre client. Le rejet vient d'une plateforme : elle a détecté un problème technique, par exemple une information obligatoire absente, des montants incohérents ou un client introuvable dans l'annuaire. La bonne réaction consiste à repérer l'étape qui bloque, à corriger la cause à la source, puis à renvoyer la facture sans créer de doublon.

> **En bref**
>
> - Un rejet vient d'une plateforme et signale un problème technique ; un refus vient du client et doit être motivé.
> - Situez d'abord l'étape qui bloque : export du logiciel, contrôles de votre plateforme, adressage, plateforme du client.
> - Un fichier peut être lisible et bien construit, et échouer quand même à une règle de calcul.
> - Corrigez à la source (logiciel, fiche client), jamais en retouchant le fichier à la main.
> - Gardez une trace du rejet, de sa cause et de sa correction, et évitez d'envoyer la même facture deux fois.

Cet article fait partie d'une série sur la facturation électronique. Le calendrier de la réforme est présenté dans [Facturation électronique : ce qui change pour les TPE en 2026 et 2027](blog/facturation-electronique-tpe-2026-2027/), et les formats de fichier dans [Factur-X, UBL et CII : comprendre les trois formats](blog/factur-x-ubl-cii-formats-facture-electronique/).

## Rejet, refus, litige : trois situations différentes

Chaque facture électronique a un **statut**, visible sur votre plateforme. C'est le premier endroit où regarder.

> **Définition : statut de cycle de vie**
>
> L'étape où en est une facture électronique, affichée par la plateforme et partagée entre le fournisseur et son client : par exemple rejetée, refusée ou encaissée.

Trois situations sont souvent confondues :

:::table Rejet, refus et litige
| Situation | Ce qu'elle signifie | Ce qu'il faut faire |
| --- | --- | --- |
| **Rejet**, par une plateforme (la vôtre ou celle du client) | un problème technique ou de contrôle a bloqué la facture | trouver la cause, corriger, renvoyer la même facture |
| **Refus**, par le client | il refuse la facture pour un motif prévu : erreur réglementaire, mauvais destinataire, conditions contractuelles | analyser le motif ; si le refus est fondé, émettre une nouvelle facture avec un nouveau numéro |
| **Litige**, avec le client | la facture est reçue, mais il conteste un point (prix, quantité, prestation) | échanger avec le client ; des statuts provisoires permettent de signaler le désaccord |
:::

L'administration le précise : le refus est « obligatoirement motivé » et ne doit pas servir à un simple désaccord commercial. Inversement, un rejet n'est jamais une décision de votre client : c'est un incident à corriger.

## À quelle étape le problème est-il apparu ?

Une facture électronique franchit plusieurs étapes avant d'arriver chez votre client. Repérer celle qui bloque indique déjà la cause probable, et la bonne personne à contacter.

![Schéma en cinq étapes. 1 : l'export de votre logiciel ; si le fichier est incomplet, mal formé ou dans un mauvais format, voir l'éditeur du logiciel. 2 : les contrôles de votre plateforme ; si une donnée obligatoire est absente ou incohérente, ou si les montants ne tombent pas juste, corriger à la source puis renvoyer. 3 : l'adressage par l'annuaire ; si le SIREN, le SIRET ou l'établissement du client est erroné, voir votre plateforme puis le client. 4 : la plateforme du client ; en cas de contrôle non conforme ou d'indisponibilité, voir votre plateforme. 5 : le client ; un refus motivé n'est pas un rejet technique, voir le client. Les étapes 1 à 4 relèvent d'un problème technique, l'étape 5 d'un refus.](assets/img/blog/facture-rejetee-diagnostic.svg)

Cherchez d'abord, dans le statut ou le message, qui a rejeté la facture : votre propre plateforme, dès le dépôt, ou celle de votre client, plus tard. Un rejet immédiat au dépôt pointe plutôt vers le fichier lui-même ; un rejet après l'envoi pointe plutôt vers l'adressage ou les contrôles de la plateforme d'arrivée.

## Les contrôles successifs d'une facture

Avant d'accepter une facture, une plateforme la soumet à plusieurs contrôles, du plus simple au plus fin. Comprendre leur ordre aide à lire un message de rejet.

### Le fichier est-il lisible ?

Le fichier doit être correctement écrit : chaque balise ouverte est refermée, les caractères sont bien encodés. Un fichier tronqué ou abîmé échoue dès ce premier contrôle. Cette erreur vient presque toujours du logiciel qui a produit le fichier, ou d'une manipulation du fichier.

### Le fichier respecte-t-il la structure attendue ?

Chaque format (UBL, CII, Factur-X) a une structure officielle : quelles balises existent, dans quel ordre, avec quel type de contenu (une date, un montant, un code). Un montant écrit avec une virgule là où un point est attendu, ou une balise placée au mauvais endroit, fait échouer ce contrôle.

### Les règles de gestion sont-elles respectées ?

> **Définition : règle de gestion**
>
> Une règle que doivent respecter les informations d'une facture, quel que soit son format : une information obligatoire présente, un code autorisé, des montants qui tombent juste.

C'est le contrôle le plus instructif, car un fichier peut être parfaitement lisible et bien construit, et pourtant faux. Les règles viennent de la norme européenne EN 16931, complétée par des règles propres à la France. Un prochain article de la série les présentera en détail.

> **Exemple**
>
> La facture fictive d'Atelier Martin porte sur 1 000 € hors taxes et 200 € de TVA. Le total toutes taxes comprises attendu est donc 1 200 €. Si le logiciel inscrit 1 250 € dans le fichier, celui-ci reste lisible et bien structuré, mais il échoue à la règle de cohérence des totaux : le total toutes taxes comprises doit être égal au total hors taxes augmenté de la TVA. Dans la norme européenne, cette règle porte l'identifiant BR-CO-15.

Au-delà de ces contrôles du fichier, la plateforme vérifie aussi qu'elle peut **acheminer** la facture : le client doit être identifiable dans l'annuaire, avec la plateforme qu'il a choisie.

## Les causes fréquentes d'un rejet

L'administration en donne la liste dans son guide de démarrage : « erreur de format, donnée obligatoire absente ou incohérente, identification incorrecte d'une partie, difficulté de routage, anomalie bloquante ou contrôle non conforme ». Concrètement :

- **Format ou profil non accepté** : le logiciel produit un format ou une variante que la plateforme n'accepte pas.
- **Donnée obligatoire absente** : SIREN du client, catégorie de l'opération (biens, services ou les deux), identifiants du vendeur…
- **Donnée incohérente** : totaux qui ne tombent pas juste, taux de TVA et montant de TVA qui ne correspondent pas, date impossible.
- **Client mal identifié** : SIREN erroné, mauvais établissement, client absent de l'annuaire ou pas encore rattaché à une plateforme.
- **Numéro de facture déjà utilisé** : renvoyer une facture refusée sous le même numéro peut provoquer un rejet ; après un refus, l'administration demande un nouveau numéro.
- **Incident technique** : plateforme temporairement indisponible, raccordement du logiciel interrompu.

## Lire un message de rejet

Le contenu exact d'un message dépend de votre plateforme. On y retrouve en général les mêmes éléments : la facture concernée, le contrôle qui a échoué, l'information en cause, et parfois la valeur trouvée et la valeur attendue.

:::config rejet-FAC-2026-001 | message reconstitué, illustratif
Facture = FAC-2026-001 | La facture concernée : vérifiez d'abord qu'il s'agit bien de la bonne.
Étape = dépôt | La facture a été bloquée par votre propre plateforme, dès l'envoi.
Contrôle = règle de gestion | Le fichier est lisible et bien structuré ; c'est une règle sur les données qui échoue.
Information = total TTC | L'information en cause : le montant total toutes taxes comprises.
Valeur trouvée = 1250.00 | Le montant inscrit dans le fichier.
Valeur attendue = 1200.00 | Le montant qui respecterait la règle : 1 000 € hors taxes + 200 € de TVA.
:::

Ce message est reconstitué pour l'exemple : il ne reproduit pas le message d'une plateforme réelle. Lu ainsi, il oriente directement vers la cause : le calcul du total dans le logiciel, ou une saisie erronée.

## Corriger sans créer de doublon

**Corrigez à la source.** Si l'erreur vient de vos données (fiche client, montant, mention manquante), corrigez-la dans votre logiciel et produisez à nouveau la facture. Modifier le fichier à la main pour le faire passer est risqué : une valeur peut en contredire une autre, et le logiciel garderait sa version erronée.

**Après un rejet, renvoyez la même facture une fois corrigée.** L'administration demande de traiter le rejet comme un incident : la facture corrigée est transmise de nouveau par le circuit électronique. Elle ne doit pas être enregistrée comme une nouvelle vente.

**Après un refus fondé, émettez une nouvelle facture avec un nouveau numéro**, et neutralisez la facture refusée dans votre gestion. Si vous contestez le refus, ne créez pas automatiquement une nouvelle facture ou un avoir : réglez d'abord le désaccord avec le client.

**N'envoyez pas de double par réflexe.** Si le blocage empêche le client de disposer de la facture et risque de retarder un paiement, un envoi par un autre canal (email, PDF) est possible, mais il doit être clairement rattaché à la facture d'origine, par exemple avec la mention « duplicata » ou « copie », et ne doit pas être traité comme une nouvelle facture. Quand les statuts montrent que la facture a bien été transmise, un double est inutile et peut provoquer un double paiement.

> **Attention**
>
> Une même opération ne doit jamais être payée, comptabilisée ou déclarée deux fois. C'est le principal risque d'une correction précipitée : deux factures pour une seule prestation, ou une facture renvoyée par deux canaux sans lien entre elles.

## Garder une trace

L'administration recommande de conserver les éléments qui permettent de comprendre le rejet et sa correction : la facture concernée, le statut ou le message de rejet, la cause lorsqu'elle est connue, les démarches engagées, la facture corrigée, et les échanges avec la plateforme, l'éditeur ou le client. Pendant la phase de démarrage, ces traces montrent que vous traitez les difficultés au lieu de les subir.

Une capture d'écran du message, datée, et un court historique dans un fichier ou un dossier par facture suffisent dans la plupart des cas.

## Qui contacter ?

- **L'éditeur de votre logiciel**, quand le fichier produit est incomplet, mal construit ou faux (montants, mentions) alors que vos données sont justes.
- **Votre plateforme agréée**, quand le blocage concerne l'acheminement, l'annuaire, un format non accepté, ou quand elle est indisponible. Elle peut aussi vous dire précisément quel contrôle a échoué.
- **Votre client**, pour confirmer son SIREN, son établissement ou la plateforme qu'il a choisie, ou pour traiter un refus.
- **Votre expert-comptable**, pour les questions de TVA ou de traitement comptable (avoir, régularisation).

## Si vous émettez volontairement avant 2027

Une TPE n'est obligée d'émettre ses factures électroniques qu'au 1er septembre 2027. Si vous avez commencé plus tôt et qu'un envoi échoue, l'administration admet que vous reveniez temporairement à vos modalités habituelles (PDF, papier) pour la facture concernée, le temps de régler le problème avec votre plateforme ou votre éditeur. Prévenez alors le client, évitez la double facturation, et gardez une trace de l'échec et de sa correction.

> **À retenir**
>
> Un rejet est un incident technique, pas une décision du client. Repérez l'étape qui bloque, lisez quel contrôle a échoué, corrigez la cause dans votre logiciel ou vos données, puis renvoyez la même facture. Évitez les doubles envois non maîtrisés et conservez une trace de chaque étape.

## Sources

- [DGFiP — Guide pratique de démarrage au 1er septembre 2026 (juillet 2026), questions 10 à 16, 19 et 25](https://www.impots.gouv.fr/sites/default/files/media/1_metier/2_professionnel/EV/2_gestion/290_facturation_electronique/guide_pratique_facturation_electronique.pdf)
- [DGFiP — Foire aux questions « Je découvre la facturation électronique » (version du 1er septembre 2026), question 3.2 sur le refus et les statuts](https://www.impots.gouv.fr/sites/default/files/media/1_metier/2_professionnel/EV/2_gestion/290_facturation_electronique/faq---fe_je-decouvre-la-facturation-electronique.pdf)
- [DGFiP — Les plateformes agréées](https://www.impots.gouv.fr/sites/default/files/media/1_metier/2_professionnel/EV/2_gestion/290_facturation_electronique/fiches_reforme/fiche-pdp.pdf)
