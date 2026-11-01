/* Formulaire de contact — adapté du formulaire de l'ancien site PPR-Solution.
   Garanties : validation accessible, état d'envoi, anti double-envoi, délai maximal,
   succès affiché uniquement si le service répond { ok: true }.
   L'URL du service est lue dans l'attribut data-endpoint du formulaire ; vide = désactivé. */
(() => {
  const form = document.querySelector("[data-contact-form]");
  if (!form) return;

  const TIMEOUT_MS = 15000;
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const SUJETS = ["hebergement", "php", "dns", "https", "migration", "configuration", "autre"];
  const endpoint = (form.dataset.endpoint || "").trim();
  const statusNode = form.querySelector("[data-form-status]");
  const submit = form.querySelector('button[type="submit"]');
  const submitHtml = submit.innerHTML;
  const loadedAt = Date.now();
  let sending = false;

  const MESSAGES = {
    disabled: "Le formulaire n'est pas encore activé. Écrivez-nous directement à contact@ppr-solution.fr : votre message n'a pas été envoyé.",
    timeout: "Le service n'a pas répondu à temps. Votre demande n'est pas considérée comme envoyée : réessayez ou écrivez à contact@ppr-solution.fr.",
    network: "La connexion au service a échoué. Vérifiez votre accès à Internet et réessayez. Votre demande n'a pas été envoyée.",
    server: "Le service n'a pas pu confirmer la réception. Réessayez dans quelques minutes ou écrivez à contact@ppr-solution.fr.",
    success: "Votre demande a bien été envoyée. Nous vous répondrons par email ; pensez à vérifier vos courriers indésirables."
  };

  // Présélection du sujet depuis l'URL (?sujet=php), utilisée par les liens des prestations.
  const requested = new URLSearchParams(window.location.search).get("sujet");
  if (SUJETS.includes(requested)) {
    const radio = form.querySelector(`input[name="sujet"][value="${requested}"]`);
    if (radio) radio.checked = true;
  }

  function setStatus(message, type) {
    statusNode.textContent = message;
    if (type) statusNode.dataset.status = type; else delete statusNode.dataset.status;
  }

  function setError(field, message) {
    const node = form.querySelector(`#${field.id}-error`);
    if (node) node.textContent = message || "";
    if (message) field.setAttribute("aria-invalid", "true"); else field.removeAttribute("aria-invalid");
  }

  function validate() {
    const checks = [
      ["contact-name", (v) => v.length >= 2, "Indiquez votre nom."],
      ["contact-email", (v) => EMAIL_RE.test(v), "Indiquez une adresse email valide, par exemple nom@exemple.fr."],
      ["contact-message", (v) => v.length >= 20, "Décrivez la situation en quelques phrases (20 caractères minimum)."]
    ];
    let first = null;
    for (const [id, test, message] of checks) {
      const field = form.querySelector(`#${id}`);
      const ok = test(field.value.trim());
      setError(field, ok ? "" : message);
      if (!ok && !first) first = field;
    }
    return first;
  }

  function setSending(state) {
    sending = state;
    submit.disabled = state;
    submit.setAttribute("aria-busy", String(state));
    submit.innerHTML = state ? "Envoi en cours…" : submitHtml;
  }

  async function send(payload) {
    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), TIMEOUT_MS);
    try {
      let response;
      try {
        response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
          body: new URLSearchParams(payload),
          signal: controller.signal
        });
      } catch (error) {
        throw new Error(error && error.name === "AbortError" ? "timeout" : "network");
      }
      if (!response.ok) throw new Error("server");
      const json = await response.json().catch(() => null);
      if (!json || json.ok !== true) throw new Error("server");
    } finally {
      window.clearTimeout(timer);
    }
  }

  form.querySelectorAll("input, textarea").forEach((field) => {
    field.addEventListener("input", () => { if (field.getAttribute("aria-invalid")) setError(field, ""); });
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (sending) return;

    const invalid = validate();
    if (invalid) {
      setStatus("Le formulaire contient des erreurs : corrigez les champs signalés.", "error");
      invalid.focus();
      return;
    }

    const data = new FormData(form);
    // Piège à robots : un humain ne voit pas ce champ.
    if (data.get("website")) {
      setStatus(MESSAGES.success, "success");
      form.reset();
      return;
    }

    if (!endpoint) {
      setStatus(MESSAGES.disabled, "info");
      statusNode.focus();
      return;
    }

    const payload = {
      name: String(data.get("name") || "").trim(),
      email: String(data.get("email") || "").trim(),
      sujet: String(data.get("sujet") || "autre"),
      message: String(data.get("message") || "").trim(),
      site: String(data.get("site") || "").trim(),
      hebergeur: String(data.get("hebergeur") || "").trim(),
      website: "",
      elapsed: String(Math.round((Date.now() - loadedAt) / 1000))
    };

    setSending(true);
    setStatus("Envoi en cours…", "pending");
    try {
      await send(payload);
      setStatus(MESSAGES.success, "success");
      form.reset();
    } catch (error) {
      setStatus(MESSAGES[error.message] || MESSAGES.network, "error");
    } finally {
      setSending(false);
      statusNode.focus();
    }
  });
})();
