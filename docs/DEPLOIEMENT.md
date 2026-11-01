# Déploiement et publication

## Recommandation : GitHub Pages + domaine Hostinger

| Option | Avantages | Inconvénients |
|---|---|---|
| **GitHub Pages** (recommandé) | Gratuit, déploiement automatique à chaque fusion sur `main`, certificat HTTPS automatique, historique et retour arrière via Git, aucune machine à maintenir | Hébergeur américain (à mentionner dans les mentions légales) |
| Hostinger (hébergement web) | Domaine, emails et site au même endroit | Un abonnement d'hébergement en plus du domaine ; déploiement par FTP ou par l'outil Git de Hostinger, moins automatisé ; le site doit être reconstruit avant chaque envoi |

Le domaine et les emails restent chez Hostinger dans tous les cas : seul l'enregistrement DNS du site change. Le site est 100 % statique et fonctionne à l'identique sur l'une ou l'autre option.

## Mise en ligne sur GitHub Pages (au lancement, pas avant)

1. Fusionner la branche dans `main`.
2. GitHub → *Settings → Pages* : source « Deploy from a branch », branche `main`, dossier `/ (root)`.
3. Dans la zone DNS de `ppr-solution.fr` chez Hostinger, **sans toucher aux enregistrements MX/TXT des emails** :
   - `A` `@` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `AAAA` `@` → `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`
   - `CNAME` `www` → `gooseppr.github.io.`
   - Supprimer l'éventuel enregistrement `A` par défaut de Hostinger sur `@`.
4. GitHub → *Settings → Pages → Custom domain* : `ppr-solution.fr` (crée le fichier `CNAME`), puis cocher *Enforce HTTPS* une fois le certificat émis.
5. Vérifier les adresses à jour dans la [documentation GitHub Pages](https://docs.github.com/fr/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site) avant de les saisir.

## Checklist de publication

- [ ] Régime de TVA confirmé (espace professionnel impots.gouv.fr) : si franchise en base, la mention « TVA non applicable, art. 293 B du CGI » des CGV est correcte et doit figurer sur chaque facture ; sinon, adapter l'article 4 des CGV.
- [ ] Adhésion à un médiateur de la consommation (obligatoire pour vendre à des particuliers) et coordonnées ajoutées à l'article 12 des CGV.
- [ ] Relecture des CGV par un professionnel du droit recommandée.
- [ ] Boîte `contact@ppr-solution.fr` créée et testée chez Hostinger.
- [ ] Apps Script déployé, URL copiée dans `src/pages/contact.html` (`data-endpoint`), test avec données fictives réussi, puis `ACCEPT_REQUESTS = true`.
- [ ] `scripts/layout.js` : `preprod: false` (retire le bandeau et le `noindex`, ajoute les canonicals).
- [ ] `robots.txt` : remplacer par `User-agent: *` / `Allow: /` / `Sitemap: https://ppr-solution.fr/sitemap.xml`.
- [ ] `npm run build && npm test`, relecture, fusion.
- [ ] DNS et domaine personnalisé configurés (ci-dessus), HTTPS actif.
- [ ] Google Search Console : propriété `ppr-solution.fr`, envoi du sitemap.
