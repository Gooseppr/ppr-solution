# Formulaire de contact — Google Apps Script

Le site est statique : le formulaire envoie ses données à un petit script Google Apps Script qui les transmet par email à `contact@ppr-solution.fr`. Aucune donnée n'est stockée.

## Déploiement (compte Google personnel du propriétaire)

1. Ouvrir <https://script.google.com>, créer un projet « PPR-Solution contact ».
2. Coller le contenu de `Code.gs`.
3. Vérifier `CONTACT_TO` (`contact@ppr-solution.fr`). Laisser `ACCEPT_REQUESTS = false` pour la préproduction.
4. **Déployer → Nouveau déploiement → Application Web** :
   - Exécuter en tant que : *moi* ;
   - Qui a accès : *tout le monde*.
5. Autoriser l'accès à l'envoi d'emails (MailApp) lors de la première exécution.
6. Copier l'URL `https://script.google.com/macros/s/…/exec` dans l'attribut `data-endpoint` du formulaire de `src/pages/contact.html`, puis lancer `npm run build`.

## Tester sans recevoir de vraies demandes

- Avec `ACCEPT_REQUESTS = false`, le service répond `{ ok: false, error: "disabled" }` : le site affiche une erreur et **n'affiche jamais de faux succès**.
- Pour un test de bout en bout, passer temporairement `ACCEPT_REQUESTS = true`, envoyer une demande avec des **données fictives**, vérifier l'email reçu, puis remettre `false`.
- Chaque modification du script nécessite un **nouveau déploiement de version** (Gérer les déploiements → Modifier → Nouvelle version), l'URL restant la même.

## Protections

| Mesure | Où |
|---|---|
| Champ piège invisible (`website`) | navigateur + serveur |
| Temps minimal passé sur la page (4 s) | serveur |
| 30 demandes / heure au total, 3 / heure par adresse email | serveur (`CacheService`) |
| Longueurs maximales, nettoyage des caractères de contrôle | navigateur + serveur |
| Pas de pièce jointe, avertissement « jamais de mot de passe » | formulaire |
| `replyTo` = email du visiteur | réponse directe depuis la boîte de contact |

## Activation commerciale

Ne passer `ACCEPT_REQUESTS = true` en production qu'après validation explicite du propriétaire (compatibilité de l'activité avec son contrat de travail, mentions légales et politique de confidentialité complétées).
