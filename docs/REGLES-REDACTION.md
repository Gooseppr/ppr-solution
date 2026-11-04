# Règles de rédaction du blog PPR-Solution

À appliquer à **chaque** article, qu'il soit écrit par une personne ou par un assistant. Le format technique (frontmatter, composants) est décrit dans [`BLOG_AUTHORING.md`](../BLOG_AUTHORING.md).

## 1. Pour qui on écrit

Le lecteur type possède un site (indépendant, association, TPE, particulier). Il est intelligent mais **n'est pas informaticien** : il ne connaît pas forcément les mots PHP, DNS, serveur, certificat. Il arrive souvent inquiet, après un email de son hébergeur ou une panne.

Objectif : qu'il **comprenne sa situation** et **sache quoi faire** après la lecture, même s'il ne fait pas appel à nous.

## 2. Structure obligatoire

1. **Titre** : une question ou une situation réelle, avec les mots du lecteur (« Votre hébergeur demande de mettre à jour PHP : que faire ? »).
2. **Chapô** (premier paragraphe) : la réponse courte, en 2 à 4 phrases.
3. **Encadré « En bref »** : 3 à 5 points à retenir, juste après le chapô.
4. **Explication** : ce qui se passe, avec des mots simples et au moins une image du quotidien.
5. **Ce que vous pouvez vérifier** : les contrôles sans risque à la portée du lecteur, et ce qu'implique une correction (voir § 6).
6. Si nécessaire, une partie **« Pour les personnes qui gèrent un serveur »**, clairement séparée, pour les détails techniques.
7. **Encadré « À retenir »** en conclusion.
8. **Sources** (obligatoire pour une actualité, recommandé pour un guide).

## 3. Le jargon

- **Chaque mot technique est défini à sa première apparition**, soit entre parenthèses en quelques mots, soit dans un encadré **Définition** :

  ```markdown
  > **Définition : DNS**
  >
  > L'annuaire d'Internet : il indique à quel serveur correspond un nom de domaine.
  ```

- Une définition tient en **une ou deux phrases**, sans autre mot technique non expliqué.
- Pas plus de **quatre encadrés Définition** par article : au-delà, simplifier le texte.
- Les sigles sont développés au moins une fois (CVE, HTTPS, FTP…).
- Préférer le mot courant quand il existe : « mise à jour de sécurité » plutôt que « patch », « faille » plutôt que « vulnérabilité » dans le texte courant.

## 4. Style

- Vouvoiement, phrases courtes (20 mots en moyenne), une idée par paragraphe.
- Ton calme et factuel : on peut être alarmant quand la situation l'est (version PHP sans mise à jour depuis des années), jamais pour vendre.
- Pas de « simple », « facile », « il suffit de » si ce n'est pas vrai pour un non-spécialiste.
- Exemples concrets : `votre-site.fr`, un message d'hébergeur, une capture décrite en mots.
- Les tableaux servent à comparer (versions, symptômes) ; ils ont toujours une légende.
- **Jamais de bloc de code** (fond noir, syntaxe brute) : le build le refuse. Pour montrer des réglages, utiliser une fenêtre `:::config`, où chaque ligne est expliquée en français. Un nom de fichier ou de réglage isolé peut s'écrire en `code` dans la phrase.

## 4 bis. Messages d'erreur et cas réels

- **Citer les messages que le lecteur voit réellement** : ceux du navigateur (Chrome, Firefox, Safari), de Google, de WordPress, de l'espace client de l'hébergeur, d'un logiciel comme FileZilla. Pas les messages techniques internes (journaux PHP, traces de code) qu'un non-spécialiste ne voit jamais : ils n'amènent ni lecteurs, ni compréhension.
- Les textes de ces messages sont vérifiés mot pour mot (sources officielles, fichiers de traduction), en français et en anglais quand c'est utile.
- **Un cas réel est toujours anonymisé** : ni nom, ni domaine, ni chemin de fichier, ni chiffre permettant de le recouper, et jamais de faille de sécurité propre à un site identifiable. On décrit un scénario générique.

## 5. Exactitude (actualités)

- Chaque fait (date, version, numéro CVE, gravité) est vérifié sur la **source primaire** : php.net, CERT-FR, CISA, annonce officielle de l'éditeur ou de l'hébergeur. Les articles de presse servent seulement à repérer l'information.
- On distingue ce qui concerne **tous les sites** de ce qui ne concerne qu'**une configuration précise**.
- On n'invente ni événement, ni chiffre, ni témoignage. En cas de doute, on l'écrit.
- On date l'article et on le met à jour (`updated`) si la situation évolue.

## 6. Expliquer plutôt qu'outiller, sans retenir l'utile

- L'article fait **comprendre** le problème : ce qui se passe, comment le reconnaître, pourquoi il arrive. Il sépare clairement les différents types de problèmes.
- Les **vérifications sans risque** que le lecteur peut faire seul sont données (par exemple : ouvrir la page en navigation privée, regarder une version de PHP dans l'espace client).
- Les **interventions techniques risquées** (modifier un `.htaccess`, une configuration serveur, des fichiers d'un thème…) sont décrites dans ce qu'elles impliquent et dans leurs risques, sans tutoriel pas à pas. Exception : une partie clairement réservée « aux personnes qui gèrent un serveur » peut détailler des réglages, lorsque le sujet s'adresse aussi à elles.
- On ne cache jamais une information utile simple dans le seul but de pousser à demander de l'aide : la confiance vient de la clarté.

## 7. Honnêteté commerciale

- L'appel à l'action est en fin d'article (bloc généré) avec un libellé lié au sujet (« Faire vérifier ma version PHP »), jamais « Achetez ».
- Pas de promesse de résultat garanti.

## 8. Liste de contrôle avant publication

- [ ] Le chapô répond à la question du titre.
- [ ] Encadré « En bref » présent.
- [ ] Tous les termes techniques sont définis à leur première apparition.
- [ ] Étapes concrètes pour le lecteur.
- [ ] Sources primaires citées et dates vérifiées (actualité).
- [ ] `npm run build` et `npm test` passent.
