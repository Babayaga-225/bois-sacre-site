# 04 · Décisions techniques Bois Sacré

Décisions d'architecture engageantes pour le projet Premium. Chaque décision est motivée (Why) et reste modifiable jusqu'à la fin de la S2, verrouillée en S3.

---

## 1. Stack global

| Couche | Choix | Motivation |
|---|---|---|
| Frontend statique | HTML/CSS/JS vanilla, zéro framework | Zéro build step, zéro dépendance externe hors Google Fonts, performance native, alignement standards MyComm |
| Hébergement | **Vercel** (auto-deploy `main`) | Gratuit pour le trafic prévu, edge CDN inclus, SSL auto, intégration GitHub native |
| Backend | **Google Apps Script** (Sheet source de vérité) | Réutilisation savoir-faire LOÏS HAIR / NAT Outlet, gratuit, admin Sheet auto-géré par client, quota suffisant pour < 1000 commandes/mois |
| Base de données | **Google Sheets** (7 onglets) | Idem — le Sheet est la source de vérité, Coulibaly peut y accéder directement |
| Paiement | **Kadev PAY** (Wave + OM + CB unifié) | Marché CI, seule solution qui unifie Wave (leader mobile) + OM + CB en une intégration |
| Webhook paiement | **Cloudflare Worker** dédié (HMAC-SHA512) | Leçon SEC-C2 LOÏS HAIR : ne jamais recevoir un webhook direct Apps Script (URL trop exposée, pas de validation propre) |
| Admin | **PWA installable** (service worker + manifest) | Coulibaly veut consulter depuis son téléphone comme une vraie app, sans coût App Store |
| Fonts | **Fraunces** (serif titres) + **Manrope** (sans corps) via Google Fonts | Fraunces = alternative Kave Home-like au Playfair (plus chaleureuse), Manrope = alternative Inter conforme charte MyComm (Inter banni) |
| Domaine | `boissacre.ci` ou `atelierboissacre.ci` (à confirmer avec Coulibaly) | Extension `.ci` pour légitimité locale + SEO local |

---

## 2. Structure du Sheet CRM (7 onglets)

Le Sheet est **la source de vérité**. Toute lecture/écriture depuis le site passe par Apps Script.

### Onglet 1 · `Produits`

Colonnes (constantes `COL.PRODUCTS.*` dans le code, jamais d'index numérique dur — leçon `feedback_sheet_column_refactor.md`) :

| Col | Nom | Type | Notes |
|---|---|---|---|
| A | `id` | string | UUID v4 généré à la création |
| B | `slug` | string | URL-safe, unique, généré depuis le titre |
| C | `titre` | string | Nom affiché fiche produit |
| D | `categorie` | string | Salon / Chambre / etc. |
| E | `sous_categorie` | string | Canapés / Tables basses / etc. |
| F | `description_courte` | string | 200 caractères max, meta description |
| G | `description_longue` | string | HTML light autorisé (h3, p, ul, li, strong) |
| H | `prix` | number | FCFA, entier, pas de décimales |
| I | `prix_promo` | number \| null | Si présent = actif, sinon prix normal |
| J | `cout_interne` | number | Coût matière + main d'œuvre, jamais exposé public |
| K | `stock` | number | Quantité disponible temps réel |
| L | `seuil_alerte` | number | Seuil bas pour alerte admin dashboard |
| M | `variantes` | JSON | Array de `{sku, coloris, dimensions, prix_delta, stock_delta, photo_url}` |
| N | `photos` | JSON | Array d'URLs Cloudinary/Drive (ordre = ordre affichage) |
| O | `tags` | JSON | Array strings (matiere, couleur, style, piece) |
| P | `dimensions` | JSON | `{longueur, largeur, hauteur, poids}` |
| Q | `matiere_principale` | string | Filtre catalogue |
| R | `delai_livraison_jours` | number | Standard 5 jours, sur-mesure 21 jours |
| S | `statut` | enum | `brouillon` / `publie` / `archive` |
| T | `date_creation` | ISO date | |
| U | `date_modification` | ISO date | |
| V | `prix_precedent` | number \| null | Historique dernière modif prix |
| W | `nb_vues` | number | Compteur incrémenté à chaque hit fiche |
| X | `nb_ventes` | number | Compteur incrémenté à chaque commande soldée |

### Onglet 2 · `Commandes`

| Col | Nom | Type | Notes |
|---|---|---|---|
| A | `id` | string | Format `B26-0001` (année-numéro), généré serveur |
| B | `date_creation` | ISO date | |
| C | `client_id` | string | UUID (peut être guest, préfixé `guest_`) |
| D | `client_email` | string | |
| E | `client_nom` | string | |
| F | `client_tel` | string | Format +225 XX XX XX XX XX |
| G | `adresse_livraison` | JSON | `{ligne1, ligne2, zone, indications}` |
| H | `items` | JSON | Array `{produit_id, sku, quantite, prix_unitaire, titre_snapshot}` |
| I | `sous_total_items` | number | Somme prix × quantité |
| J | `zone_livraison` | string | Nom zone |
| K | `mode_livraison` | enum | `standard` / `etage` / `montage` |
| L | `frais_livraison` | number | Calculé serveur selon zone + mode |
| M | `remise_pro` | number | 0 si non-pro, sinon % du sous_total_items |
| N | `total_ttc` | number | sous_total_items + frais_livraison - remise_pro |
| O | `mode_paiement` | enum | `wave` / `orange_money` / `cb_kadev` |
| P | `type_paiement` | enum | `integral` / `acompte_30` |
| Q | `montant_acompte` | number | 30% du total si acompte, sinon 0 |
| R | `montant_solde` | number | 70% du total si acompte, sinon 0 |
| S | `kadev_reference` | string | Référence unique Kadev pour idempotence webhook |
| T | `statut` | enum | `pending` / `paid_deposit` / `paid_full` / `preparing` / `delivered` / `solde_paid` / `cancelled` / `payment_timeout` |
| U | `date_paiement_acompte` | ISO date \| null | |
| V | `date_livraison` | ISO date \| null | |
| W | `date_paiement_solde` | ISO date \| null | |
| X | `notes_internes` | string | Notes admin, invisibles client |
| Y | `bon_livraison_url` | string \| null | URL PDF généré |
| Z | `rappels_envoyes` | JSON | Array `{type, date}` pour éviter spam |

### Onglet 3 · `Clients`

| Col | Nom | Type | Notes |
|---|---|---|---|
| A | `id` | string | UUID v4 |
| B | `email` | string | Unique, sert d'ID login |
| C | `mot_de_passe_hash` | string | bcrypt cost 12 |
| D | `nom` | string | |
| E | `prenom` | string | |
| F | `tel` | string | |
| G | `adresses` | JSON | Array `{ligne1, ligne2, zone, indications, defaut}` |
| H | `wishlist` | JSON | Array `{produit_id, sku}` |
| I | `panier_courant` | JSON | Array items (sync entre appareils) |
| J | `statut_pro` | enum | `non` / `en_attente` / `valide` / `refuse` |
| K | `pro_entreprise` | string \| null | |
| L | `pro_rccm` | string \| null | |
| M | `pro_niveau_remise` | number \| null | % remise selon palier |
| N | `newsletter_optin` | boolean | |
| O | `nospam` | boolean | Client a demandé à ne plus être contacté |
| P | `date_creation` | ISO date | |
| Q | `derniere_connexion` | ISO date | |
| R | `nb_commandes` | number | Compteur |
| S | `ca_total` | number | CA cumulé pour segmentation |

### Onglet 4 · `Config`

Format clé/valeur, 2 colonnes seulement :

| clé | valeur (JSON) |
|---|---|
| `bandeau_annonce` | `{"actif": true, "texte": "...", "couleur": "olive", "lien": "..."}` |
| `zones_livraison` | Array `{"nom", "tarif_standard", "tarif_etage", "tarif_montage", "actif"}` |
| `coordonnees` | `{"adresse", "tel", "whatsapp", "email", "instagram", "facebook"}` |
| `horaires_showroom` | `{"lundi": "9h-18h", ...}` |
| `kadev_config` | `{"public_key_id": "...", "webhook_url": "...", "return_url": "..."}` (secrets vivent dans PropertiesService, jamais ici) |
| `paliers_b2b` | Array `{"seuil_ca", "remise_pct"}` |
| `templates_emails` | Objet `{"confirmation_commande", "acompte_recu", "solde_impaye_j3", ...}` |
| `frais_livraison_defaut` | number (fallback si zone non trouvée) |
| `min_commande_livraison_offerte` | number (FCFA, seuil bandeau) |

### Onglet 5 · `Stock`

Journal des mouvements stock (audit trail, pas les valeurs actuelles qui vivent dans `Produits.stock`).

| Col | Nom | Type |
|---|---|---|
| A | `date` | ISO date |
| B | `produit_id` | string |
| C | `sku` | string (variante) |
| D | `type_mouvement` | enum : `vente` / `retour` / `reappro` / `ajustement` / `perte` |
| E | `quantite` | number (négatif pour sortie) |
| F | `commande_id` | string \| null |
| G | `admin_id` | string \| null (si action manuelle) |
| H | `stock_avant` | number |
| I | `stock_apres` | number |
| J | `notes` | string |

### Onglet 6 · `Journal`

Log audit toutes actions admin. Immutable (append only).

| Col | Nom | Type |
|---|---|---|
| A | `timestamp` | ISO date + heure |
| B | `admin_id` | string |
| C | `admin_role` | enum |
| D | `action` | string (ex: `commande.marquer_livree`, `produit.creer`, `config.zones.modifier`) |
| E | `entite_type` | string (ex: `commande`, `produit`) |
| F | `entite_id` | string |
| G | `avant` | JSON (snapshot état avant) |
| H | `apres` | JSON (snapshot état après) |
| I | `ip` | string |
| J | `user_agent` | string |

### Onglet 7 · `Historique`

Archive commandes anciennes (> 12 mois) pour alléger l'onglet `Commandes` actif. Même schéma que `Commandes`. Migration mensuelle automatique.

---

## 3. Endpoints Apps Script (Web App)

Publiés en tant que **Web App** (`ScriptApp.newBlob` + `doGet` / `doPost`), exécution en tant que « moi » (Coulibaly ou admin technique MyComm), accès « anonyme autorisé ».

**Format de réponse standard** :

```json
{
  "ok": true|false,
  "data": { ... },
  "error": null | { "code": "...", "message": "..." },
  "meta": { "duration_ms": 42, "quota_used": "..." }
}
```

### Endpoints publics (GET)

| Endpoint | Params | Réponse | Notes |
|---|---|---|---|
| `?action=getProducts` | `categorie?`, `sous_categorie?`, `filtres[]?`, `tri?`, `page?`, `limit?` | Array produits + pagination | Filtres serveur, jamais client |
| `?action=getProduct` | `id` ou `slug` | Object produit détaillé | Incrémente `nb_vues` |
| `?action=search` | `q`, `limit?` | `{produits[], categories[], articles[]}` | Fuzzy match Levenshtein ≤ 2 |
| `?action=getConfig` | — | Object config public (bandeau, zones, coordonnées) | Cache 5 min |
| `?action=getMoodboards` | — | Array moodboards |  |
| `?action=getMoodboard` | `slug` | Object moodboard + produits |  |
| `?action=getArticles` | `page?`, `categorie?` | Array articles + pagination |  |
| `?action=getArticle` | `slug` | Object article |  |
| `?action=getCategorySitemap` | — | Structure catégories/sous-catégories | Pour construction méga-menu |

### Endpoints publics (POST)

| Endpoint | Body | Réponse | Notes |
|---|---|---|---|
| `?action=createOrder` | `{items, adresse, mode_livraison, mode_paiement, type_paiement, client_id?}` | `{order_id, kadev_redirect_url}` | Crée commande statut `pending`, retourne URL Kadev |
| `?action=subscribeNewsletter` | `{email}` | `{ok}` | Ajoute à Brevo + Clients (optin) |
| `?action=notifyStock` | `{produit_id, email}` | `{ok}` | Enregistre pour notif remise en stock |
| `?action=createReview` | `{produit_id, commande_id, note, texte}` | `{review_id, statut: "pending_moderation"}` | Vérif commande client_id |
| `?action=submitContact` | `{nom, email, tel, message, sujet}` | `{ok}` | Email admin + notif WhatsApp |
| `?action=submitProApplication` | `{entreprise, rccm, tel, email, ...}` | `{ok}` | Statut `en_attente` + notif admin |

### Endpoints compte (POST, cookie session obligatoire)

| Endpoint | Body | Notes |
|---|---|---|
| `?action=register` | `{email, mot_de_passe, nom, prenom, tel, cgv_ok}` | Hash bcrypt cost 12, cookie session |
| `?action=login` | `{email, mot_de_passe}` | Rate limit 5/15min/IP (SEC-C5) |
| `?action=logout` | — | Invalide cookie session |
| `?action=magicLink` | `{email}` | Envoie lien 1h expiration |
| `?action=validateMagicLink` | `{token}` | Login sans mot de passe |
| `?action=resetPassword` | `{email}` | Envoie lien reset 1h |
| `?action=updateProfile` | `{nom?, prenom?, tel?, email?, mot_de_passe?}` | |
| `?action=updateWishlist` | `{action: add|remove, produit_id, sku?}` | Sync wishlist serveur |
| `?action=updatePanier` | `{items}` | Sync panier serveur (multi-device) |
| `?action=getMyOrders` | — | Array commandes du client connecté |
| `?action=getMyOrder` | `id` | Détail (vérif ownership) |
| `?action=downloadReceipt` | `commande_id` | PDF stream |

### Endpoints admin (POST, cookie session admin obligatoire + rôle)

| Endpoint | Body | Rôle min |
|---|---|---|
| `?action=admin.login` | `{admin_id, mot_de_passe}` | — |
| `?action=admin.logout` | — | tous |
| `?action=admin.getDashboard` | — | gérant |
| `?action=admin.listOrders` | `filtres, page` | livreur (uniquement ses commandes) |
| `?action=admin.getOrder` | `id` | gérant / livreur (ownership route) |
| `?action=admin.updateOrderStatus` | `{id, statut, notes?}` | gérant |
| `?action=admin.markPaid` | `{id, montant, mode}` | gérant |
| `?action=admin.cancelOrder` | `{id, raison}` | admin |
| `?action=admin.listClients` | `filtres, page` | gérant |
| `?action=admin.getClient` | `id` | gérant |
| `?action=admin.listProducts` | `filtres, page` | gérant |
| `?action=admin.createProduct` | `{...}` | gérant |
| `?action=admin.updateProduct` | `{id, ...}` | gérant |
| `?action=admin.deleteProduct` | `{id}` | admin (soft delete) |
| `?action=admin.updateStock` | `{produit_id, sku, delta, raison}` | gérant |
| `?action=admin.uploadPhoto` | multipart | gérant (Drive upload) |
| `?action=admin.listArticles` | `filtres, page` | gérant |
| `?action=admin.upsertArticle` | `{...}` | gérant |
| `?action=admin.listMoodboards` | — | gérant |
| `?action=admin.upsertMoodboard` | `{...}` | gérant |
| `?action=admin.getConfig` | `cle` | admin |
| `?action=admin.setConfig` | `{cle, valeur}` | admin |
| `?action=admin.listProApplications` | — | admin |
| `?action=admin.validateProApplication` | `{client_id, decision, palier?}` | admin |
| `?action=admin.exportCsvMonthly` | `{mois, annee}` | admin |
| `?action=admin.sendMonthlyReport` | — | admin |
| `?action=admin.listAuditLog` | `filtres, page` | admin |

### Webhook Kadev (Cloudflare Worker, PAS Apps Script)

- URL : `https://boissacre-kadev-webhook.workers.dev/`
- Méthode : POST
- Validation HMAC-SHA512 avec secret Kadev (env var Worker)
- Idempotence : dédup par `kadev_reference`
- Action : appelle Apps Script `?action=internal.processKadevWebhook` avec token interne partagé
- Worker ne stocke rien, juste valide + relaie

---

## 4. Pattern acompte 30 % + solde 70 % (LOÏS HAIR-like)

Réplique du pattern éprouvé sur LOÏS HAIR Phase 5 (v1.3.1).

### Flow acompte

1. Client passe commande → serveur crée `Commandes` row avec statut `pending`, calcule `montant_acompte = round(total * 0.30)` et `montant_solde = total - montant_acompte`
2. Serveur génère `kadev_reference = uuid.v4()` unique, la stocke sur la commande
3. Serveur appelle Kadev API `POST /payment/create` avec `{amount: montant_acompte, reference: kadev_reference, return_url, webhook_url}`
4. Kadev retourne `payment_url` → serveur renvoie au client → redirect
5. Client paie sur Kadev (Wave / OM / CB) → Kadev appelle notre webhook Worker
6. Worker valide HMAC → appelle Apps Script `internal.processKadevWebhook` avec `{reference, statut, montant_verifie}`
7. Apps Script :
   - Idempotence : si `Commandes.date_paiement_acompte` déjà set pour cette reference → ignore (rejeu)
   - Vérifie `montant_verifie == montant_acompte` (anti-tampering)
   - Update statut `paid_deposit`, set `date_paiement_acompte`
   - Décrémente `Produits.stock` pour chaque item (transaction atomique via LockService)
   - Écrit ligne `Stock` (mouvement `vente`, quantité négative)
   - Envoie email confirmation client + notif WhatsApp admin
8. Client redirigé sur `/checkout/confirmation` avec `?order=B26-0001` → affiche récap + reçu

### Flow solde à la livraison

1. Livreur (rôle `livreur`) ouvre commande dans PWA admin
2. Marque « Livrée » → dialog demande mode de paiement solde (Wave / OM / Cash)
3. Enregistre montant reçu = `montant_solde` (contrôle exact)
4. Update statut `solde_paid`, set `date_paiement_solde`, `date_livraison`
5. Génère reçu A5 final (avec breakdown complet)
6. Trigger job avis client J+7

### Cas dégradés

- **Client abandonne redirect Kadev** : commande reste `pending`. Job cleanup (trigger horaire) marque `payment_timeout` après 72h. Stock jamais décrémenté (rien à libérer).
- **Webhook Kadev perdu** : job rapprochement quotidien (04h) fetch Kadev backoffice, compare avec Sheet, marque les commandes `pending` avec paiement Kadev réussi comme `paid_deposit`.
- **Client change d'avis après acompte** : politique CGV à trancher au RDV (avoir vs remboursement). MVP : avoir uniquement (remboursement Kadev complexe côté admin).
- **Solde non payé J+3** : rappel semi-auto (F14). J+7 : rappel + note relance. J+15 : décision admin (annuler + reprendre item ? conserver acompte comme dédommagement ?).

---

## 5. Cloudflare Worker pour webhook Kadev

### Pourquoi un Worker et pas Apps Script direct

Leçon SEC-C2 LOÏS HAIR :
- URL Apps Script Web App est **publique et devinable** (pattern `script.google.com/macros/s/AKfyc.../exec`) → risque de flood / DoS / probing
- Apps Script n'a pas de **rate limiting** natif → toute requête consomme quota (6 min max total daily)
- Impossible de **valider HMAC** proprement avant que le script ne traite (déjà consommé quota)
- Aucune **isolation** : un webhook piégé peut planter tout le script

### Architecture Worker

```
Kadev → HTTPS → CF Worker (edge)
                  ├─ Vérifie HMAC-SHA512 (secret env var)
                  ├─ Vérifie IP allowlist Kadev
                  ├─ Vérifie idempotence (KV cache reference)
                  ├─ Rate limit 10 req/s/IP
                  ├─ Log audit KV
                  └─ Relaie à Apps Script (POST, timeout 10s)
                        └─ Apps Script → Sheet
```

### Code Worker (esquisse)

```js
export default {
  async fetch(request, env) {
    // 1. Method + content-type check
    if (request.method !== 'POST') return new Response('Method not allowed', {status: 405});

    const body = await request.text();
    const signature = request.headers.get('X-Kadev-Signature');
    if (!signature) return new Response('Missing signature', {status: 401});

    // 2. HMAC-SHA512 validation
    const expected = await hmacSha512(env.KADEV_WEBHOOK_SECRET, body);
    if (!timingSafeEqual(signature, expected)) {
      return new Response('Invalid signature', {status: 401});
    }

    // 3. IP allowlist Kadev
    const ip = request.headers.get('CF-Connecting-IP');
    if (!env.KADEV_ALLOWED_IPS.split(',').includes(ip)) {
      return new Response('IP not allowed', {status: 403});
    }

    // 4. Idempotence via KV
    const payload = JSON.parse(body);
    const reference = payload.reference;
    if (await env.WEBHOOK_KV.get(`processed:${reference}`)) {
      return new Response('Already processed', {status: 200});
    }

    // 5. Relaie à Apps Script
    const resp = await fetch(env.APPS_SCRIPT_INTERNAL_URL, {
      method: 'POST',
      headers: {'Content-Type': 'application/json', 'X-Internal-Token': env.INTERNAL_TOKEN},
      body: JSON.stringify({action: 'internal.processKadevWebhook', payload})
    });

    if (resp.ok) {
      await env.WEBHOOK_KV.put(`processed:${reference}`, '1', {expirationTtl: 86400 * 30}); // 30j
    }

    return new Response('OK', {status: 200});
  }
};
```

### Secrets Worker (`wrangler secret put`)

- `KADEV_WEBHOOK_SECRET` : HMAC secret partagé avec Kadev
- `KADEV_ALLOWED_IPS` : liste IPs Kadev (à récupérer support Kadev)
- `APPS_SCRIPT_INTERNAL_URL` : URL Apps Script interne (jamais publique)
- `INTERNAL_TOKEN` : token partagé Worker ↔ Apps Script (rotation trimestrielle)

---

## 6. Fonts · Fraunces + Manrope

### Choix motivé

- **Fraunces** (titres) : serif variable Google Fonts. Chaleureuse, éditoriale, sans être précieuse. Excellent contraste avec Manrope. Alternative libre à Playfair (surexposée).
- **Manrope** (corps) : sans-serif humaniste variable Google Fonts. Lisibilité 14-18px optimale, formes rondes qui adoucissent l'ensemble. Alternative libre à Inter (banni MyComm).

### Fallbacks

- Fraunces → `Georgia, 'Times New Roman', serif`
- Manrope → `system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`

### Intégration HTML `<head>`

```html
<!-- Preconnect (performance) -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<!-- Fonts avec swap pour éviter FOIT -->
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Manrope:wght@400;500;600;700&display=swap">
```

### Poids utilisés

- Fraunces : 400 (light title), 500 (h3), 600 (h2), 700 (h1 hero)
- Manrope : 400 (corps), 500 (label / prix), 600 (bouton / lien fort), 700 (rare, badge)

### Justification zéro-dépendance ailleurs

Aucun autre CDN, aucun npm package. Le seul externe est Google Fonts (jugé acceptable : universel, cachable navigateur, performance edge).

---

## 7. Sécurité (checklist SEC héritée)

Rappel des règles appliquées dès la S1 dans tout code écrit :

| Code | Règle | Comment appliquer |
|---|---|---|
| **SEC-C1** | Aucune règle prix/stock/zone en JS client | Tout calcul via endpoint Apps Script, jamais de `if (zone === 'Cocody') frais = 5000` en JS |
| **SEC-C2** | Webhook via Worker HMAC-SHA512 uniquement | Jamais d'URL Apps Script exposée à Kadev |
| **SEC-C3** | Escape HTML systématique | Helper `esc(str)` centralisé, utilisé sur toute interpolation depuis données dynamiques |
| **SEC-C4** | Cookies session httpOnly + secure + SameSite=Strict | Config Apps Script `HtmlService` + custom headers |
| **SEC-C5** | Rate limiting login (5 tentatives / 15 min / IP) | Cache Apps Script (CacheService) avec compteur IP |
| **SEC-M1** | Validation stricte types entrées serveur | Regex email `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`, phone `/^\+225[0-9]{10}$/`, prix `Number.isInteger && > 0` |
| **SEC-M2** | CSP headers restrictifs | `default-src 'self'; script-src 'self'; style-src 'self' fonts.googleapis.com; font-src fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' script.google.com` |
| **SEC-M3** | Zéro log de données sensibles | Pas de `console.log(client.email)` ni équivalent Apps Script Logger avec PII |
| **SEC-M4** | Audit dépendances tierces | Aucune npm dep, uniquement Google Fonts + Kadev SDK |

---

## 8. Performance & SEO

### Performance cibles

- LCP < 2.5s (mobile 4G)
- CLS < 0.1
- INP < 200ms
- Total bundle CSS < 60 KB (compressé Brotli)
- Total bundle JS < 40 KB (compressé Brotli, hors polyfills)
- Images WebP + lazy load natif (`loading="lazy"` + `decoding="async"`)
- Preconnect Google Fonts + gstatic

### SEO cibles

- Balises meta title + description sur chaque page (générées Apps Script)
- OpenGraph + Twitter Cards
- Structured data JSON-LD :
  - `Product` sur fiche produit (name, image, price, availability, brand, aggregateRating)
  - `BreadcrumbList` sur toutes les pages profondes
  - `Organization` sur homepage
  - `Article` sur articles blog
- Sitemap.xml généré au deploy
- Robots.txt : `Allow: /` + `Disallow: /admin/*` + `Disallow: /checkout/*`
- URL propres : slug produit, catégorie, article
- Canonical tag sur toutes les pages

---

## 9. Environnements & CI

- **Production** : `main` → auto-deploy Vercel `boissacre.ci`
- **Preview** : PR branches → preview Vercel `bois-sacre-site-git-<branch>.vercel.app`
- **Local** : `npm run dev` équivalent = serveur statique Python `python3 -m http.server 8080` (zéro build)
- Pre-commit hook : validation HTML (html-validate) + CSS lint (stylelint) + prettier
- CI GitHub Actions minimale (S4+) : lint + test des endpoints Apps Script (clasp push + smoke tests)

---

## 10. Décisions verrouillées vs modifiables

### Verrouillées (base du contrat mental Coulibaly)
- Stack : HTML/CSS/JS + Apps Script + Sheet + Kadev + Worker
- Palette et fonts (Fraunces + Manrope)
- Modèle acompte 30 / 70
- 8 catégories principales

### Modifiables jusqu'à fin S2
- Nombre exact de sous-catégories par catégorie
- Champs exacts du Sheet (peuvent bouger, mais toujours via constantes `COL.X`)
- Choix hébergement photos (Drive vs Cloudinary vs Vercel Blob)
- Politique remise B2B (paliers exacts)
- Choix domaine final (`.ci` vs `.com`)

### À trancher rapidement (S1-S2)
- Fournisseur mail transactionnel (Brevo vs MailerLite vs Apps Script MailApp direct)
- Compte Cloudflare pour Worker (compte MyComm ou Bois Sacré ?)
- Compte Vercel (compte MyComm avec ownership transféré ou compte Bois Sacré direct ?)
- Emails techniques (`no-reply@boissacre.ci`, `admin@boissacre.ci`) : hébergement (Google Workspace vs OVH mail)
