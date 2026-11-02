---
title: "ERR_TOO_MANY_REDIRECTS après le passage en HTTPS : quand Nginx et Apache tournent en boucle"
slug: "trop-de-redirections-https-nginx-apache"
description: "Votre site affiche « vous a redirigé à de trop nombreuses reprises » (ERR_TOO_MANY_REDIRECTS) depuis l'installation du certificat HTTPS ? Avec Nginx placé devant Apache, une règle de redirection mal placée suffit à créer une boucle sans fin. Explications et solutions."
meta_description: "ERR_TOO_MANY_REDIRECTS, « redirected you too many times », « La page n'est pas redirigée correctement » : pourquoi Nginx devant Apache ou Cloudflare crée une boucle HTTPS, et comment la corriger."
date: "2026-11-02"
category: "Guide"
tags: ["HTTPS", "Nginx", "Apache", "ERR_TOO_MANY_REDIRECTS"]
service:
  url: "prestations.html#https"
  label: "Prestation : certificat HTTPS / SSL"
contact:
  label: "Faire corriger ma boucle de redirection"
  context: "Votre site tourne en boucle depuis le passage en HTTPS et vous ne savez pas quelle règle modifier ? Décrivez-nous votre installation : le premier échange est gratuit."
  sujet: "https"
---

Votre site affichait bien ses pages, vous avez installé un certificat HTTPS, et depuis le navigateur indique « Cette page ne fonctionne pas : votre-site.fr vous a redirigé à de trop nombreuses reprises », avec le code ERR_TOO_MANY_REDIRECTS. Dans beaucoup de cas, ce n'est pas le certificat qui est en cause, mais une règle de redirection placée au mauvais endroit. C'est particulièrement fréquent quand le site tourne avec deux logiciels serveur l'un derrière l'autre, Nginx devant Apache. La correction est rapide une fois le mécanisme compris.

> **En bref**
>
> - Le message « vous a redirigé à de trop nombreuses reprises » (en anglais « redirected you too many times », code ERR_TOO_MANY_REDIRECTS) signifie que le site renvoie le visiteur d'une adresse à l'autre sans jamais s'arrêter.
> - Quand Nginx reçoit les visiteurs en HTTPS puis transmet la demande à Apache en HTTP, Apache croit que la visite n'est pas sécurisée.
> - Si le fichier .htaccess d'Apache contient une règle « rediriger vers HTTPS », il redirige à chaque fois : c'est la boucle.
> - Solution : faire la redirection vers HTTPS à un seul endroit, ou indiquer à Apache que le visiteur est déjà en HTTPS.
> - Après la correction, testez dans une fenêtre de navigation privée : les navigateurs gardent les anciennes redirections en mémoire.

## Le message que vous voyez

Selon votre navigateur et sa langue, l'erreur ne s'affiche pas avec les mêmes mots, mais elle désigne toujours le même problème.

- **Google Chrome**
  - En français : « Cette page ne fonctionne pas. votre-site.fr vous a redirigé à de trop nombreuses reprises. Essayez de supprimer vos cookies. ERR_TOO_MANY_REDIRECTS »
  - En anglais : « This page isn't working. votre-site.fr redirected you too many times. Try deleting your cookies. ERR_TOO_MANY_REDIRECTS »
- **Firefox**
  - En français : « La page n'est pas redirigée correctement »
  - En anglais : « The page isn't redirecting properly »
- **Safari**
  - En anglais : « Safari can't open the page because too many redirects occurred »

## Ce que signifie ce message

Une redirection, c'est une adresse qui renvoie automatiquement vers une autre, par exemple de `http://votre-site.fr` vers `https://votre-site.fr`. C'est normal et utile. Le problème survient quand la deuxième adresse renvoie à son tour vers la première : le navigateur tourne en rond, puis abandonne au bout d'une vingtaine d'allers-retours et affiche le message d'erreur.

Supprimer ses cookies, comme le suggère Chrome, règle parfois le problème pour un visiteur. Mais quand la boucle vient de la configuration du serveur, elle revient aussitôt, et pour tous les visiteurs : c'est le serveur qu'il faut corriger.

## Nginx et Apache : qui fait quoi ?

> **Définition : serveur web**
>
> Le logiciel qui reçoit les visites d'un site et renvoie les pages. Nginx et Apache sont les deux plus répandus.

Certains serveurs utilisent les deux à la fois. Nginx se place à l'entrée : il reçoit les visiteurs, gère le chiffrement HTTPS grâce au certificat, puis transmet chaque demande à Apache, qui fait fonctionner le site (PHP, fichier .htaccess…).

> **Définition : proxy inverse**
>
> Un serveur placé devant un autre, qui reçoit les visites à sa place et les lui transmet. Ici, Nginx joue ce rôle devant Apache.

C'est un peu comme un hôtel : la réception (Nginx) accueille les clients et vérifie leur identité, puis transmet la demande au service d'étage (Apache) par le téléphone intérieur. Le service d'étage ne voit jamais le client arriver : il ne sait que ce que la réception lui dit.

## Pourquoi la boucle se forme

1. Le visiteur arrive en **HTTPS** sur Nginx, qui possède le certificat (souvent un certificat gratuit Let's Encrypt).
2. Nginx transmet la demande à Apache en **HTTP**, à l'intérieur du serveur : le chiffrement n'est pas utile sur ce trajet interne.
3. Le fichier .htaccess d'Apache contient une règle classique : « si la visite n'est pas en HTTPS, renvoyer vers l'adresse en HTTPS ». Apache voit une demande en HTTP, il applique la règle.
4. Le navigateur revient donc en HTTPS sur Nginx… qui transmet à nouveau en HTTP à Apache, qui redirige encore. Et ainsi de suite.

> **Définition : .htaccess**
>
> Un fichier placé dans le dossier du site, qui permet de donner des consignes à Apache : redirections, protections, réécriture des adresses. Nginx, lui, ne le lit pas.

Ces lignes sont souvent ajoutées de bonne foi, parce qu'elles figurent dans de nombreux tutoriels. Elles fonctionnent parfaitement quand Apache est seul. Derrière Nginx, elles créent la boucle.

:::config .htaccess
RewriteEngine = On | Active les règles de réécriture d'adresses d'Apache.
RewriteCond %{HTTPS} = off | « Si la demande n'est pas en HTTPS… » Derrière Nginx, c'est toujours le cas.
RewriteRule ^(.*)$ = https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301] | « …renvoyer vers la même adresse en HTTPS. » D'où la boucle.
:::

> **Note**
>
> Le même problème se produit avec Cloudflare réglé en mode « Flexible » : Cloudflare reçoit le visiteur en HTTPS, mais contacte votre serveur en HTTP. Cloudflare recommande alors de retirer la redirection de votre serveur, ou de passer en mode « Full » (complet), qui suppose un certificat installé sur votre serveur.

## Comment corriger

Il existe deux bonnes solutions. Dans les deux cas, gardez une copie des fichiers avant de les modifier.

### Solution 1 : rediriger vers HTTPS à un seul endroit, dans Nginx

C'est la plus simple. Nginx étant à l'entrée, c'est lui qui renvoie les visiteurs arrivés en HTTP vers HTTPS. On **retire alors les lignes de redirection du fichier .htaccess**, qui ne servent plus à rien.

:::config nginx — bloc qui reçoit les visites en HTTP
listen = 80 | Ce bloc reçoit les visites qui arrivent sans chiffrement.
return = 301 https://$host$request_uri | Renvoie le visiteur, une seule fois, vers la même adresse en HTTPS.
:::

### Solution 2 : indiquer à Apache que le visiteur est déjà en HTTPS

Si vous préférez garder la règle dans Apache, Nginx peut lui transmettre une information supplémentaire : « ce visiteur est arrivé en HTTPS ». La règle du .htaccess se base alors sur cette information, et plus sur le trajet interne.

:::config nginx — bloc qui transmet à Apache
proxy_set_header X-Forwarded-Proto = $scheme | Indique à Apache si le visiteur est arrivé en HTTP ou en HTTPS.
proxy_set_header Host = $host | Transmet le nom du site demandé.
:::

:::config .htaccess — règle adaptée
RewriteCond %{HTTP:X-Forwarded-Proto} = !https | Ne redirige que si Nginx signale une visite qui n'est pas en HTTPS.
RewriteRule ^(.*)$ = https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301] | Renvoie alors vers l'adresse en HTTPS.
:::

> **Attention**
>
> Cette information peut être falsifiée si Apache est joignable directement depuis Internet. Dans cette installation, Apache ne doit accepter que les demandes venant de Nginx, sur le même serveur.

### Et si le site est un WordPress ?

WordPress peut, lui aussi, rediriger vers HTTPS de son côté. Sa documentation officielle signale le même risque de boucle derrière un proxy inverse et indique comment lui faire lire l'information transmise par Nginx. Si la boucle persiste après avoir corrigé le .htaccess, c'est la piste suivante.

## Vérifier que c'est réglé

- **Ouvrez une fenêtre de navigation privée** : les navigateurs gardent en mémoire les redirections « 301 » déjà rencontrées, et peuvent continuer d'afficher l'erreur alors que le problème est corrigé.
- Testez l'adresse en `http://` et en `https://`, avec et sans `www`.
- Vérifiez quelques pages internes, pas seulement l'accueil.

> **À retenir**
>
> Une boucle de redirection après le passage en HTTPS vient souvent d'une redirection faite au mauvais étage. Avec Nginx devant Apache, ou Cloudflare devant votre serveur, la redirection vers HTTPS se fait à l'entrée, ou s'appuie sur l'information transmise par l'entrée. Jamais sur le trajet interne.

## Sources

- [Cloudflare — ERR_TOO_MANY_REDIRECTS](https://developers.cloudflare.com/ssl/troubleshooting/too-many-redirects/)
- [WordPress — HTTPS et proxy inverse (documentation d'administration)](https://developer.wordpress.org/advanced-administration/security/https/)
- [Nginx — module proxy, directive proxy_set_header](https://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_set_header)
- [Nginx — variables du module principal ($scheme)](https://nginx.org/en/docs/http/ngx_http_core_module.html#variables)
- [Apache — documentation de mod_rewrite](https://httpd.apache.org/docs/2.4/mod/mod_rewrite.html)
