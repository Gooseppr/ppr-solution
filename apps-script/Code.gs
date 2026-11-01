/**
 * PPR-Solution — réception du formulaire de contact (Google Apps Script).
 * Déploiement : voir apps-script/README.md. Aucune donnée n'est stockée :
 * chaque demande valide est transmise par email puis oubliée.
 */

// Adresse qui reçoit les demandes.
const CONTACT_TO = 'contact@ppr-solution.fr';
// Interrupteur : tant qu'il vaut false, les demandes sont refusées (préproduction).
const ACCEPT_REQUESTS = false;
// Limites anti-abus.
const MAX_PER_HOUR_GLOBAL = 30;
const MAX_PER_HOUR_PER_EMAIL = 3;
const MIN_SECONDS_ON_PAGE = 4;

const SUJETS = {
  hebergement: "Problème d'hébergement",
  php: 'Mise à jour PHP',
  dns: 'Domaine ou DNS',
  https: 'HTTPS / certificat',
  migration: 'Migration',
  configuration: 'Configuration technique',
  autre: 'Autre / Je ne sais pas'
};

function doPost(e) {
  try {
    const p = (e && e.parameter) || {};

    if (!ACCEPT_REQUESTS) return json_({ ok: false, error: 'disabled' });

    // Robots : champ piège rempli ou envoi trop rapide → réponse neutre, aucun email.
    if (p.website) return json_({ ok: true });
    if (Number(p.elapsed || 0) < MIN_SECONDS_ON_PAGE) return json_({ ok: true });

    const data = {
      name: clean_(p.name, 120),
      email: clean_(p.email, 200),
      sujet: SUJETS[p.sujet] ? p.sujet : 'autre',
      message: clean_(p.message, 5000),
      site: clean_(p.site, 200),
      hebergeur: clean_(p.hebergeur, 120)
    };

    if (data.name.length < 2) return json_({ ok: false, error: 'name' });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email)) return json_({ ok: false, error: 'email' });
    if (data.message.length < 20) return json_({ ok: false, error: 'message' });

    if (!allow_('global', MAX_PER_HOUR_GLOBAL) || !allow_('email:' + data.email.toLowerCase(), MAX_PER_HOUR_PER_EMAIL)) {
      return json_({ ok: false, error: 'rate' });
    }

    const subject = '[PPR-Solution] ' + SUJETS[data.sujet] + ' — ' + data.name;
    const body = [
      'Nouvelle demande reçue depuis le site.',
      '',
      'Nom : ' + data.name,
      'Email : ' + data.email,
      'Sujet : ' + SUJETS[data.sujet],
      'Site : ' + (data.site || '—'),
      'Hébergeur : ' + (data.hebergeur || '—'),
      '',
      'Message :',
      data.message
    ].join('\n');

    MailApp.sendEmail({ to: CONTACT_TO, replyTo: data.email, subject: subject, body: body, name: 'Site PPR-Solution' });
    return json_({ ok: true });
  } catch (err) {
    console.error(err);
    return json_({ ok: false, error: 'server' });
  }
}

function doGet() {
  return json_({ ok: false, error: 'method' });
}

function clean_(value, max) {
  return String(value || '').replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '').trim().slice(0, max);
}

// Compteur glissant d'une heure dans le cache du script (aucune donnée personnelle persistée).
function allow_(key, limit) {
  const lock = LockService.getScriptLock();
  lock.waitLock(5000);
  try {
    const cache = CacheService.getScriptCache();
    const cacheKey = 'rl:' + Utilities.base64EncodeWebSafe(Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, key));
    const count = Number(cache.get(cacheKey) || 0);
    if (count >= limit) return false;
    cache.put(cacheKey, String(count + 1), 3600);
    return true;
  } finally {
    lock.releaseLock();
  }
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
