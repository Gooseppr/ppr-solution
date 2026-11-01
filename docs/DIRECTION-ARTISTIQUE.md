# Phase B — Direction artistique (jalon de validation)

Concept : **l'atelier visuel du web**. Le site explique et situe les problèmes avec une famille d'objets techniques dessinés pour lui, posés sur une « planche » quadrillée comme un tapis de découpe d'atelier.

## Décisions

- **Palette** : celle du brief. Le vermillon `#F05B3F` n'est utilisé qu'en aplat (boutons, repères) avec du texte encre (5,4:1). Pour du texte, variante `#B8391F` (5,4:1 sur ivoire). Le gris `#B7B7B2` n'est jamais utilisé pour du texte (1,9:1).
- **Sémantique** : avertissement = ambre (le problème signalé par l'hébergeur), succès = vert, erreur = framboise `#A3194A`. Le vermillon signifie « action / intervention de PPR-Solution », jamais « erreur ».
- **Typographie** : Bricolage Grotesque (titres seulement) + IBM Plex Sans (texte) + IBM Plex Mono (valeurs techniques). Polices auto-hébergées, 148 ko au total.
- **Formes** : rayons hiérarchisés 6 → 32 px, capsules, nœuds circulaires, traits encre 1,5 px.
- **Langage graphique** : domaine = capsule, DNS = nœud, hébergement = environnement à modules, configuration = fenêtre technique à barre sombre, site = navigateur miniature, problème = repère ambre localisé, intervention = fenêtre/étape vermillon. HTTPS est représenté comme une **couche sur la connexion navigateur ↔ serveur** (certificat installé sur l'hébergement), pas comme une étape de la chaîne.
- **Motifs XML** : (1) eyebrows-balises utilisés sur 2 sections sur 4 ; (2) fenêtres techniques (« Panneau d'hébergement › PHP », `zone-dns`). Rien d'autre.
- **Hero** : composition absolue sur une planche 600 × 560 dont le texte suit la largeur (unités `cqi`) ; sous 640 px, réorganisation verticale (message → hébergement → panneau) avec une chaîne résumée en capsules.
- **Animation** : CSS uniquement, une lecture. L'état final est l'état par défaut (sans JS ou avec mouvement réduit).
- **Prestations** : index éditorial (glyphe, problème, « ce que nous pouvons faire », limites, lien présélectionnant la catégorie), PHP mis en avant avec l'avertissement de compatibilité.
- **Schéma** : 4 étapes numérotées (vraie séquence) + bandeau HTTPS ; boutons « Votre problème concerne plutôt… » qui mettent en évidence la zone, affichent des signes fréquents et adaptent le CTA. Sans JS : schéma et textes complets, commandes masquées.

## Exactitude technique

- Hero : PHP 7.4 (fin des mises à jour le 28/11/2022, source php.net/eol.php), ton volontairement plus alarmant à la demande du propriétaire. Versions proposées 8.4 / 8.5 (maintenues jusqu'en 2028 / 2029).
- La compatibilité est présentée comme « à vérifier » ; l'étape suivante est une étude préalable puis un devis, jamais une réparation automatique.
- Exemple DNS du guide de style : adresse IP de documentation `203.0.113.10` (RFC 5737).

## Retours du propriétaire intégrés (1er novembre 2026)

- Direction artistique validée.
- Cinq parties : Accueil, Prestations, Blog, À propos, Contact.
- Menu : « Obtenir de l'aide » ; « Décrire mon problème » réservé au hero ; libellés d'action adaptés à chaque contexte (voir le guide de style).
- Ton plus alarmant sur les anciennes versions de PHP (7, 5, 4) : tableau des fins de support sur la page Prestations.
