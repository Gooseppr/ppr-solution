# Cahier éditorial — série « Facturation électronique »

Spécification de rédaction de cinq articles du blog sur la facturation électronique. Complète, sans les remplacer, [`REGLES-REDACTION.md`](REGLES-REDACTION.md) (règles applicables à tout article) et [`BLOG_AUTHORING.md`](../BLOG_AUTHORING.md) (format technique).

## 1. Décisions du propriétaire (20 novembre 2026)

1. **Ordre de publication : 1 → 2 → 4 → 5 → 3.** Les articles sur les rejets (4) et les logiciels incompatibles (5) sont prioritaires commercialement. L'article sur la norme EN 16931 (3) vient en dernier ; ses notions essentielles (modèle commun, contrôles successifs) sont expliquées en quelques paragraphes dans les articles 2, 4 et 5.
2. **Extraits XML et CSV : faire évoluer `:::config`** plutôt que créer un composant indépendant (voir § 4). Rendu clair, responsive, accessible, conforme à l'identité visuelle. Aucune bibliothèque supplémentaire.
3. **Schémas : SVG natifs**, sans Mermaid ni bibliothèque côté navigateur. Réutiliser les encadrés et conventions du site (Note, Attention, Limite, Exemple, À retenir, Définition, tableaux `:::table`).
4. **Formulaire de contact** : le sujet « Facturation électronique » est validé mais **reporté** jusqu'à ce que la page d'offre ou le premier service commercialisable soit prêt. Le redéploiement du script Apps Script sera fait à ce moment-là. En attendant, les articles utilisent le sujet `autre`.
5. **Normes** : ne pas confondre la norme sémantique EN 16931-1:2026 avec les versions des syntaxes (UBL, CII) et des règles de validation effectivement utilisées. Chaque exemple technique indique ses versions de référence et est vérifié avec les artefacts correspondants (voir § 5).
6. **Prestations** : aucune offre promettant une validation, une conversion ou une intégration non testée. Les articles présentent les problèmes et les solutions possibles, sans promettre de capacités indisponibles. Pas de modification des CGV pour l'instant.
7. Ce cahier sert de spécification ; il est tenu à jour quand une décision ou une version change.
8. **Article 2 sans numéros de version (décision du 20 novembre 2026, « option 3 »)** : les sources officielles (spécifications DGFiP, FNFE-MPE, artefacts de validation) n'étant pas consultables depuis l'environnement de rédaction, l'article 2 est rédigé sans numéro de version de format, de profil ni de règle. Les extraits sont annoncés comme illustratifs et incomplets, et un encadré « Limite » renvoie aux spécifications officielles. À réviser dès que les sources sont accessibles : ajout des versions de référence et validation d'exemples complets.

## 2. Principes communs aux cinq articles

### Trois fonctions

- **Informer** : répondre à une question réelle d'une TPE, d'un indépendant ou d'un responsable informatique.
- **Expliquer** : rendre compréhensible le fonctionnement, avec un exemple et au moins un schéma qui explique un mécanisme (jamais décoratif).
- **Orienter** : permettre au lecteur d'identifier un problème technique. La mention d'une aide possible vient après la démonstration, dans le bloc de contact généré en fin d'article, jamais sous forme de publicité dans le texte.

### Ce que PPR-Solution n'est pas

PPR-Solution intervient sur la **partie technique** (fichiers, exports, logiciels, transmission). Aucun article ne présente PPR-Solution comme conseil fiscal, expert-comptable, plateforme agréée ou certificateur de conformité. Les questions fiscales sont renvoyées vers l'administration, l'expert-comptable ou la plateforme agréée.

### Fil rouge : Atelier Martin (entreprise fictive)

Toujours présentée comme **fictive** dans le texte.

:::table Facture de référence de la série
| Donnée | Valeur |
| --- | --- |
| **Vendeur** | Atelier Martin, petite entreprise fictive établie en France |
| **Acheteur** | une société cliente fictive, professionnelle, établie en France |
| **Numéro** | FAC-2026-001 |
| **Montant hors taxes** | 1 000,00 € |
| **TVA** | 20 %, soit 200,00 € |
| **Montant toutes taxes comprises** | 1 200,00 € |
| **Devise** | EUR |
:::

Les identifiants (SIREN, numéro de TVA) des exemples sont **fictifs et signalés comme tels** ; ils ne doivent correspondre à aucune entreprise réelle (vérifier avant publication qu'un SIREN d'exemple n'est pas attribué, ou utiliser une valeur manifestement fictive annoncée comme telle).

### Vocabulaire à définir (encadrés Définition, quatre au plus par article)

Facture électronique, plateforme agréée, annuaire, e-reporting, données structurées, XML, format / syntaxe, profil, règle de gestion, statut de cycle de vie. Chaque article reprend la définition utile, en une ou deux phrases, sans supposer que le lecteur a lu les autres.

### Messages cités (règle § 4 bis)

On cite les messages vus par le propriétaire de l'entreprise (statuts sur la plateforme, libellés de rejet affichés), vérifiés mot pour mot sur une source officielle. Un rapport d'erreur reconstitué pour l'exemple est **annoncé comme illustratif** et ne reproduit pas un code officiel inventé.

## 3. Les cinq articles

### Article 1 — La réforme pour les TPE (priorité 1)

- **Titre** : « Facturation électronique : ce qui change pour les TPE en 2026 et 2027 »
- **Slug** : `facturation-electronique-tpe-2026-2027`
- **Chapô** : depuis le 1er septembre 2026, toute entreprise doit pouvoir recevoir des factures électroniques par une plateforme agréée ; les TPE, PME et micro-entreprises devront les émettre au plus tard le 1er septembre 2027. Un PDF envoyé par email n'est pas une facture électronique.
- **Public** : dirigeant de TPE, indépendant, micro-entrepreneur ; non technicien.
- **Niveau / longueur** : débutant, 7 à 9 minutes.
- **Objectifs pédagogiques** : distinguer réception et émission ; comprendre qu'une facture électronique est un fichier de données transmis par plateformes ; savoir si l'on est concerné (y compris en franchise en base) ; connaître les trois actions à mener.
- **Plan (H2)** :
  1. Ce qui est en vigueur depuis le 1er septembre 2026
  2. Une facture électronique, ce n'est pas un PDF envoyé par email
  3. Le calendrier : recevoir dès 2026, émettre au plus tard en 2027
  4. Qui est concerné ? (H3 : micro-entreprises et franchise en base ; clients particuliers et clients à l'étranger : le e-reporting)
  5. Le trajet d'une facture électronique
  6. Les quatre nouvelles mentions sur les factures
  7. Les erreurs fréquentes
  8. Ce que vous pouvez faire dès maintenant (checklist)
  9. Sources
- **Schémas SVG** : `facturation-electronique-calendrier.svg` (frise verticale réception / émission par taille) ; `facturation-electronique-trajet.svg` (fournisseur → plateforme agréée → plateforme agréée du client → client, annuaire, données extraites vers l'administration).
- **Exemples techniques** : aucun extrait de fichier ; facture Atelier Martin décrite en mots.
- **Sources** : FAQ DGFiP « Je découvre la facturation électronique » (version du 01/09/2026) ; fiche 1 (juin 2026) et fiche 3 (octobre 2026) ; guide pratique de démarrage (juillet 2026) ; fiche « plateformes agréées » ; question impots.gouv.fr « Franchisé en base, micro-entrepreneur… » (modifiée le 28/09/2026) ; liste des plateformes agréées.
- **Lien avec une future prestation** : vérification technique de l'existant (le logiciel exporte-t-il, est-il relié à une plateforme agréée). Non commercialisée tant que la méthode n'est pas définie ; bloc de contact neutre, sujet `autre`.

### Article 2 — Factur-X, UBL et CII (priorité 2)

- **Titre** : « Factur-X, UBL et CII : comprendre les trois formats de la facture électronique »
- **Chapô** : une même facture peut être écrite dans trois formats acceptés ; deux sont des fichiers de données (UBL, CII), le troisième (Factur-X) associe un PDF lisible et un fichier de données CII. Le bon format est celui qu'acceptent votre logiciel et votre plateforme.
- **Public** : dirigeant curieux, comptable, responsable informatique de PME, développeur débutant.
- **Niveau / longueur** : débutant → intermédiaire, 10 à 12 minutes.
- **Objectifs pédagogiques** : comprendre ce qu'est une donnée structurée et le XML ; savoir que Factur-X contient du CII ; reconnaître un fichier ; comprendre pourquoi convertir n'est pas renommer.
- **Plan (H2 / H3)** :
  1. Pourquoi plusieurs formats ?
  2. Le XML expliqué sans jargon
  3. UBL, CII, Factur-X : qui est quoi (H3 : un modèle commun, la norme EN 16931, en trois paragraphes ; profils)
  4. La facture d'Atelier Martin dans chaque format (tableau « même donnée, trois emplacements » + extraits courts)
  5. Comment reconnaître le format d'un fichier
  6. Peut-on convertir d'un format à l'autre ?
  7. Que faire si deux logiciels n'utilisent pas le même format
  8. Sources
- **Schémas SVG** : « une facture, trois représentations » (Factur-X = PDF + XML CII, UBL, CII) ; « que contient un PDF Factur-X ».
- **Exemples techniques** : extraits UBL et CII (numéro, date, devise, totaux) avec `:::config` étendu (§ 4) ; tableau de correspondance. Versions à consigner au § 5. Extraits annoncés comme incomplets.
- **Sources** : spécifications externes DGFiP en vigueur ; norme XP Z12-012 (formats et profils du socle) ; page Commission européenne sur EN 16931 et ses syntaxes ; FNFE-MPE (Factur-X).
- **Lien avec une future prestation** : analyse de compatibilité de formats (non commercialisée tant que non testée).

### Article 4 — Facture rejetée (priorité 3)

- **Titre** : « Facture électronique rejetée : comprendre le message et trouver la cause »
- **Chapô** : un rejet par une plateforme n'est pas un refus du client ; il signale une erreur de format, une donnée manquante ou incohérente, ou un problème d'adressage. La cause se trouve en général à la source (logiciel, données), pas dans le fichier à retoucher à la main.
- **Public** : dirigeant ou comptable confronté à un rejet ; technicien.
- **Niveau / longueur** : intermédiaire, 9 à 12 minutes.
- **Objectifs pédagogiques** : distinguer rejet (plateforme) et refus (client) ; situer l'étape du problème ; lire un rapport d'erreur ; savoir quoi transmettre à l'éditeur ou au technicien ; éviter les doublons lors de la régularisation.
- **Plan (H2 / H3)** :
  1. Rejet, refus, litige : trois situations différentes (statuts de cycle de vie)
  2. À quelle étape le problème est-il apparu ?
  3. Les contrôles successifs d'un fichier (H3 : fichier lisible ; structure ; règles de gestion — explication courte des notions de l'article 3)
  4. Les causes fréquentes (format, donnée obligatoire, montants, identification du destinataire, annuaire)
  5. Lire un rapport d'erreur (exemple illustratif : total TTC de 1 250 € au lieu de 1 200 €)
  6. Corriger sans créer de doublon
  7. Quand contacter l'éditeur, la plateforme ou un technicien
  8. Sources
- **Schémas SVG** : arbre de diagnostic vertical (où le problème apparaît → type d'erreur → où corriger) ; anatomie d'un rapport d'erreur.
- **Exemples techniques** : extrait de la facture d'Atelier Martin avec l'incohérence ; rapport reconstitué annoncé comme illustratif. Règle de gestion citée avec son identifiant officiel et sa version (§ 5) une fois vérifiée sur l'artefact.
- **Sources** : guide pratique DGFiP (questions sur le rejet, le refus et les doublons) ; spécifications externes (statuts) ; artefacts de validation de la version de référence.
- **Lien avec une future prestation** : diagnostic d'une facture rejetée, à partir du fichier et du message, sans garantie d'acceptation par une plateforme tierce. Non commercialisée tant que les contrôles ne sont pas reproductibles.

### Article 5 — Logiciel incompatible (priorité 4)

- **Titre** : « Votre logiciel de facturation ne produit pas le bon format : faut-il le changer ? »
- **Chapô** : un logiciel qui ne produit pas directement un format accepté n'est pas forcément à remplacer : mise à jour, connecteur existant ou transformation des exports sont possibles, à condition que les données nécessaires existent dans le logiciel.
- **Public** : TPE/PME avec un logiciel métier ancien ; responsable informatique.
- **Niveau / longueur** : intermédiaire → technique, 10 à 13 minutes.
- **Objectifs pédagogiques** : inventorier ce que sait faire le logiciel ; comprendre le principe de correspondance (« mapping ») ; savoir qu'une transformation ne crée pas les données absentes ; anticiper la maintenance.
- **Plan (H2 / H3)** :
  1. Le cas des logiciels existants
  2. Ce que votre logiciel sait déjà faire (export natif, export CSV, API, connexion à une plateforme)
  3. Trois solutions : mise à jour, connecteur, transformation
  4. Le principe de la correspondance des données (exemple CSV d'Atelier Martin)
  5. Ce que le CSV ne contient pas (vendeur, acheteur, lignes, catégories de TVA, nouvelles mentions)
  6. Vérifier le résultat (contrôles successifs, renvoi vers l'article 4)
  7. Coûts et maintenance
  8. Sources
- **Schémas SVG** : arbre « conserver son logiciel » (export disponible ? → vérification / transformation / alternative) ; schéma de correspondance colonne CSV → donnée de facture.
- **Exemples techniques** : ligne CSV d'Atelier Martin et tableau de correspondance (`:::table`) ; extrait du fichier obtenu (`:::config` étendu).
- **Sources** : FAQ DGFiP (solution compatible : deux conditions cumulées) ; spécifications externes ; outils publics existants (à évaluer avant toute recommandation).
- **Lien avec une future prestation** : étude de compatibilité des exports ; adaptateur limité seulement après tests.

### Article 3 — La norme EN 16931 (priorité 5)

- **Titre** : « Norme EN 16931 : les règles derrière la facture électronique, expliquées simplement »
- **Chapô** : la norme européenne EN 16931 définit ce que contient une facture et les règles que ses données doivent respecter, indépendamment du format du fichier. Un fichier peut être lisible et bien structuré tout en échouant à une règle de calcul.
- **Public** : responsable informatique, développeur, comptable curieux.
- **Niveau / longueur** : intermédiaire → technique, 12 à 15 minutes.
- **Objectifs pédagogiques** : distinguer signification d'une donnée et représentation ; comprendre les termes métier (BT) et groupes (BG) sur quelques exemples ; connaître les niveaux de contrôle ; savoir ce qu'une validation garantit et ne garantit pas ; comprendre la coexistence des versions (2017, 2026).
- **Plan (H2 / H3)** :
  1. Deux logiciels, deux façons d'écrire la même facture
  2. Une norme pour se comprendre : le modèle sémantique
  3. Termes et groupes métier (quelques BT/BG d'Atelier Martin)
  4. Du modèle au fichier : UBL et CII
  5. Les règles de gestion (obligations, calculs, cohérence)
  6. Les niveaux de contrôle (fichier lisible, schéma, règles, plateforme)
  7. Les règles françaises complémentaires
  8. Les versions de la norme : 2017, 2026, et ce qui est réellement appliqué
  9. Ce qu'une validation garantit, et ce qu'elle ne garantit pas
  10. Sources
- **Schémas SVG** : couches de conformité (modèle → syntaxes → contrôles) ; contrôles successifs d'un fichier.
- **Exemples techniques** : facture correcte puis incohérente (1 250 € déclarés pour 1 200 € attendus), règles citées avec identifiant et version.
- **Sources** : CEN / Commission européenne (EN 16931-1:2026, syntaxes) ; artefacts de validation officiels de la version retenue ; spécifications externes DGFiP ; XP Z12-012.
- **Lien avec une future prestation** : prévalidation technique de fichiers, uniquement après mise en place d'un processus reproductible et testé.

## 4. Évolution prévue de `:::config` (articles 2, 4 et 5)

Le composant actuel affiche « réglage = valeur | explication » avec l'étiquette « exemple de réglages ». Évolution à implémenter avec l'article 2, sans nouveau composant ni bibliothèque :

- un libellé facultatif après le nom de fichier, par exemple `:::config facture-atelier-martin.xml | extrait de fichier`, qui remplace « exemple de réglages » ;
- chaque ligne reste « emplacement = valeur | explication en français » (par exemple l'élément XML qui porte le total TTC, sa valeur, et ce qu'il signifie) ;
- rendu : mêmes couleurs, polices et comportement responsive que `:::config` (passage en pile sur mobile) ; pas de fond noir, pas de coloration syntaxique ;
- un test du build vérifie le libellé et l'échappement des caractères `<` et `>`.

Les extraits restent courts et pédagogiques ; ils ne sont jamais présentés comme des fichiers à copier-coller.

## 5. Trace des versions normatives

À compléter avant la publication de chaque article technique. Une ligne par référence réellement utilisée pour un exemple ou une affirmation.

:::table Versions de référence utilisées
| Référence | Version | Vérifiée le | Source | Utilisée dans |
| --- | --- | --- | --- | --- |
| **Calendrier et obligations (DGFiP)** | FAQ « Je découvre » du 01/09/2026 ; fiche 1 juin 2026 ; fiche 3 octobre 2026 ; guide de démarrage juillet 2026 | 20/11/2026 | impots.gouv.fr | Article 1 |
| **Franchise en base** | question impots.gouv.fr modifiée le 28/09/2026 | 20/11/2026 | impots.gouv.fr | Article 1 |
| **Norme sémantique EN 16931-1** | 2026 approuvée par le CEN au printemps 2026 ; calendrier de transition à confirmer | — | CEN / Commission européenne | Articles 2, 3 |
| **Syntaxes UBL et CII** | à déterminer ; article 2 publié sans version (décision 8), extraits limités à des éléments stables : `cbc:ID`, `cbc:IssueDate`, `cbc:DocumentCurrencyCode`, `cbc:TaxExclusiveAmount`, `cbc:TaxAmount`, `cbc:TaxInclusiveAmount` (UBL) ; `ram:ID`, `udt:DateTimeString`, `ram:InvoiceCurrencyCode`, `ram:TaxBasisTotalAmount`, `ram:TaxTotalAmount`, `ram:GrandTotalAmount` (CII) ; termes BT-1, BT-2, BT-5, BT-109, BT-110, BT-112 | — | spécifications externes DGFiP, XP Z12-012 | Articles 2, 4, 5 |
| **Factur-X** | à déterminer | — | FNFE-MPE | Article 2 |
| **Règles de validation** | à déterminer (artefacts correspondant aux versions ci-dessus) | — | publication officielle des artefacts | Articles 3, 4 |
| **Spécifications externes DGFiP** | version 3.2 du 30/04/2026 mentionnée sur impots.gouv.fr (à lire avant l'article 2) | — | impots.gouv.fr | Articles 2 à 5 |
:::

## 6. Mesure

Le site n'a pas d'outil de mesure d'audience. Indicateurs disponibles : impressions et clics dans la Google Search Console, demandes de contact mentionnant un article. Aucun outil de suivi n'est ajouté sans révision de la page de confidentialité.
