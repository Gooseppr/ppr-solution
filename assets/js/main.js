/* PPR-Solution — scripts communs.
   Amélioration progressive : chaque fonction vérifie la présence de ses éléments
   et la page reste complète et lisible sans JavaScript. */

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

/* Navigation mobile (adaptée de l'ancien site : Échap, fermeture au clic, libellé) */
function initNavigation() {
  const toggle = document.querySelector("[data-nav-toggle]");
  const menu = document.querySelector("[data-nav-menu]");
  if (!toggle || !menu) return;
  const label = toggle.querySelector(".sr-only");

  const setOpen = (open) => {
    menu.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    if (label) label.textContent = open ? "Fermer le menu" : "Ouvrir le menu";
  };

  toggle.addEventListener("click", () => setOpen(!menu.classList.contains("is-open")));
  menu.addEventListener("click", (event) => {
    if (event.target.closest("a")) setOpen(false);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menu.classList.contains("is-open")) {
      setOpen(false);
      toggle.focus();
    }
  });

  // Page courante
  const current = window.location.pathname.split("/").filter(Boolean).pop() || "index.html";
  menu.querySelectorAll("a[href]").forEach((link) => {
    const target = link.getAttribute("href").split(/[?#]/)[0];
    if (target && target === current) link.setAttribute("aria-current", "page");
  });
}

function initHeaderState() {
  const header = document.querySelector("[data-header]");
  if (!header) return;
  const update = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
  update();
  window.addEventListener("scroll", update, { passive: true });
}

/* Hero : la séquence narrative se joue une seule fois.
   L'état final est l'état par défaut du HTML/CSS ; sans JS ou avec
   prefers-reduced-motion, l'illustration est donc immédiatement complète. */
function initHeroScene() {
  const scene = document.querySelector("[data-scene]");
  if (!scene || reduceMotion.matches || !("IntersectionObserver" in window)) return;

  scene.classList.add("is-armed");
  const play = () => {
    scene.classList.remove("is-armed");
    scene.classList.add("is-playing");
  };

  const observer = new IntersectionObserver((entries) => {
    if (entries.some((entry) => entry.isIntersecting)) {
      observer.disconnect();
      // Laisse le temps au titre d'être lu avant que la scène ne s'anime.
      window.setTimeout(play, 250);
    }
  }, { threshold: 0.35 });
  observer.observe(scene);
}

/* Schéma pédagogique : mettre en évidence la zone concernée par un problème. */
const CHAIN_TOPICS = {
  domaine: {
    title: "Le nom de domaine",
    text: "Le domaine peut avoir expiré, ne pas être renouvelé automatiquement ou être géré chez un autre prestataire que l'hébergement.",
    signs: ["Le site et les emails ont cessé de fonctionner en même temps", "Un message de votre registraire parle de renouvellement", "Vous ne savez plus où le domaine a été acheté"],
    stations: ["domaine"], conns: [],
    cta: "Décrire un problème de domaine", sujet: "dns"
  },
  dns: {
    title: "Le DNS",
    text: "Les enregistrements DNS indiquent où trouver votre site et vos emails. Une modification récente ou incomplète suffit à tout interrompre, parfois avec un délai de propagation.",
    signs: ["Le site s'affiche chez certains et pas chez d'autres", "Problème apparu après un changement d'hébergeur", "Les emails n'arrivent plus, le site fonctionne"],
    stations: ["dns"], conns: ["1", "2"],
    cta: "Décrire un problème de DNS", sujet: "dns"
  },
  hebergement: {
    title: "L'hébergement",
    text: "Le serveur répond, mais quelque chose l'empêche de construire la page : configuration, accès, fichiers ou base de données.",
    signs: ["« Erreur 500 » ou page blanche", "« Erreur de connexion à la base de données »", "Vous ne parvenez plus à vous connecter en FTP"],
    stations: ["hebergement"], conns: ["2"], modules: ["fichiers", "bdd"],
    cta: "Décrire un problème d'hébergement", sujet: "hebergement"
  },
  php: {
    title: "La version PHP",
    text: "PHP est le langage qui exécute de nombreux sites (WordPress, PrestaShop…). Lorsqu'une version n'est plus prise en charge, l'hébergeur demande d'en changer ; la compatibilité doit être vérifiée avant.",
    signs: ["Un email de l'hébergeur annonce une fin de support", "Des avertissements « deprecated » s'affichent", "Le site a changé de comportement après une mise à jour"],
    stations: ["hebergement"], conns: [], modules: ["php"],
    cta: "Préparer une mise à jour PHP", sujet: "php"
  },
  https: {
    title: "Le certificat HTTPS",
    text: "Le certificat est installé sur l'hébergement. S'il expire ou ne correspond pas à l'adresse, le navigateur prévient vos visiteurs que la connexion n'est pas sécurisée.",
    signs: ["« Votre connexion n'est pas privée »", "Le cadenas a disparu de la barre d'adresse", "Le site fonctionne avec www mais pas sans, ou l'inverse"],
    stations: ["site"], conns: ["3"], https: true,
    cta: "Décrire un problème de certificat", sujet: "https"
  },
  inconnu: {
    title: "Vous ne savez pas : c'est normal",
    text: "Décrivez simplement ce que vous voyez, depuis quand, et ce qui a changé récemment. Copiez le message reçu s'il y en a un, sans y inclure de mot de passe. Nous situerons le problème pour vous.",
    signs: [],
    stations: [], conns: [],
    cta: "Décrire mon problème", sujet: "autre"
  }
};

function initChain() {
  const chain = document.querySelector("[data-chain]");
  const controls = document.querySelector("[data-chain-controls]");
  const detail = document.querySelector("[data-chain-detail]");
  if (!chain || !controls || !detail) return;

  const buttons = controls.querySelectorAll("[data-topic]");
  const title = detail.querySelector("[data-detail-title]");
  const text = detail.querySelector("[data-detail-text]");
  const signsWrap = detail.querySelector("[data-detail-signs-wrap]");
  const signs = detail.querySelector("[data-detail-signs]");
  const cta = detail.querySelector("[data-detail-cta]");

  const select = (key) => {
    const topic = CHAIN_TOPICS[key];
    if (!topic) return;
    buttons.forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.topic === key)));

    chain.querySelectorAll(".is-active").forEach((node) => node.classList.remove("is-active"));
    const focusSomething = topic.stations.length || topic.conns.length || topic.https;
    chain.classList.toggle("has-focus", Boolean(focusSomething));
    topic.stations.forEach((id) => chain.querySelector(`[data-station="${id}"]`)?.classList.add("is-active"));
    topic.conns.forEach((id) => chain.querySelector(`[data-conn="${id}"]`)?.classList.add("is-active"));
    (topic.modules || []).forEach((id) => chain.querySelector(`[data-module="${id}"]`)?.classList.add("is-active"));
    if (topic.https) chain.querySelector("[data-https]")?.classList.add("is-active");

    title.textContent = topic.title;
    text.textContent = topic.text;
    signs.replaceChildren(...topic.signs.map((sign) => {
      const li = document.createElement("li");
      li.textContent = sign;
      return li;
    }));
    signsWrap.hidden = topic.signs.length === 0;
    cta.textContent = topic.cta;
    cta.href = `contact.html?sujet=${encodeURIComponent(topic.sujet)}`;
  };

  buttons.forEach((button) => {
    button.addEventListener("click", () => select(button.dataset.topic));
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  initHeaderState();
  initHeroScene();
  initChain();
});
