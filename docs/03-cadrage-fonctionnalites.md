# 03 · Cadrage fonctionnalités Bois Sacré

Prolongement du §04 du CDC (`Bureau/Bois sacré/01-CDC-Bois-Sacre.html`) : chaque fonctionnalité est décomposée en **user story + comportement attendu + edge cases + priorité MVP / V2**.

Convention priorité :
- 🔴 **MVP** (indispensable au lancement Premium)
- 🟡 **V1.1** (livrable dans les 30 jours post-lancement)
- 🟢 **V2** (Phase 2, dans 3-6 mois)

Convention persona :
- **Client final** : particulier Abidjan/CI qui achète pour son foyer
- **Client B2B** : décorateur / architecte d'intérieur qui achète pour un projet client
- **Admin** : Coulibaly ou son délégué qui gère commandes + catalogue
- **Gérant** : rôle intermédiaire (peut voir/marquer commandes, pas config)
- **Livreur** : voit uniquement commandes à livrer sur sa route

---

## 1. Navigation & découverte

### F1 · Méga-menu catégories 🔴 MVP

**User story** : « En tant que client, je veux voir toutes les catégories du site en un survol pour aller directement à la pièce que je cherche. »

**Comportement** :
- Hover desktop sur une catégorie → méga-menu plein largeur avec sous-catégories + image mini
- Touch mobile → drawer plein écran, accordéon par catégorie
- Fermeture au click en dehors ou touche Échap

**Edge cases** :
- Menu doit tenir sur écran 1440px sans scroll horizontal
- Sous-catégories vides (0 produits) → affichées quand même, click = page « aucun produit »
- Perte de focus clavier (Tab) → traps le focus dans le menu ouvert

### F2 · Recherche produit avec autocomplete 🔴 MVP

**User story** : « En tant que client, je veux taper "canapé" et voir immédiatement les produits pertinents sans avoir à naviguer. »

**Comportement** :
- Debounce 300ms après dernière frappe
- Suggestions par catégorie de résultats : Produits (5 max) + Catégories (3 max) + Articles blog (2 max)
- Enter → page /recherche?q=... avec résultats complets
- Historique 5 dernières recherches (localStorage) affiché quand focus + input vide

**Edge cases** :
- Recherche vide → historique
- Aucun résultat → « Aucun produit pour "xxx" · Voir tous les produits » + suggestions catégories populaires
- Recherche avec accents / sans accents → doit matcher (« canape » = « canapé »)
- Recherche avec fautes → fuzzy match léger (Levenshtein distance ≤ 2)
- Injection XSS dans query → escape systématique, pas d'HTML dans suggestions

### F3 · Filtres avancés catalogue 🔴 MVP

**User story** : « En tant que client sur la page Salon, je veux filtrer par prix, matière, couleur pour voir uniquement ce qui m'intéresse. »

**Comportement** :
- Filtres actualisent la grille sans reload (URL update via History API)
- Chips actifs en haut de grille (« Bois massif × », « < 200 000 F × »)
- Compteur produits mis à jour temps réel
- Bouton « Réinitialiser » supprime tous les filtres
- État conservé si retour arrière navigateur

**Edge cases** :
- Combinaison impossible (0 résultats) → empty state + suggestion « Retirer un filtre »
- Filtre matière avec option non présente dans catégorie → grisée (pas cachée)
- URL avec filtres → au partage, la page rouvre avec filtres appliqués
- Filtre prix avec bornes inversées (max < min) → auto-correction silencieuse

### F4 · Wishlist / favoris 🔴 MVP

**User story** : « En tant que client, je veux mettre de côté 5 canapés que j'aime pour en parler à mon conjoint ce soir. »

**Comportement** :
- Toggle ♡ sur card produit ou fiche produit → ajoute/retire de la wishlist
- Stockage : localStorage si guest, Sheet client si connecté (sync auto au login)
- Page `/wishlist` : grille comme catégorie, sans filtres (juste tri)
- Compteur wishlist dans header (badge)
- Actions par item : « Retirer », « Ajouter au panier », « Partager par WhatsApp » (lien pré-rempli)

**Edge cases** :
- Wishlist vide → illustration + « Explorer le catalogue » CTA
- localStorage plein (rare) → alerte « Wishlist limitée à 100 items »
- Produit en wishlist devenu indisponible → badge « Indisponible » sur la card
- Login après ajout guest → fusion wishlist locale + serveur, dédup

### F5 · Moodboards éditoriaux 🟡 V1.1

**User story** : « En tant que client indécis, je veux voir des compositions déjà pensées pour m'inspirer, et pouvoir acheter la composition entière en un click. »

**Comportement** :
- Page `/moodboards` : grille moodboards avec image ambiance
- Page moodboard `/moodboards/[slug]` : hero + shopping list produits utilisés + bouton « Ajouter la composition au panier » (ajoute tous les items d'un coup)
- Tag produits sur l'image (hotspots cliquables optionnels V2)

**Edge cases** :
- Un produit du moodboard indisponible → marqué « rupture », exclu de l'ajout groupé + toast « 1 produit ignoré (rupture) »
- Moodboard sans produits (composition future) → CTA « Nous contacter pour recréer » (WhatsApp)

---

## 2. Fiche produit

### F6 · Galerie photos avec zoom 🔴 MVP

**User story** : « En tant que client, je veux voir le canapé sous tous les angles avant de dépenser 500 000 F. »

**Comportement** :
- 4-6 photos par produit min, hébergées optimisées (WebP + lazy load)
- Thumbnails cliquables sous l'image principale
- Click sur image principale → lightbox plein écran avec zoom (molette + double-tap mobile)
- Swipe horizontal mobile pour naviguer entre photos
- Touche flèches clavier pour naviguer (accessibilité)

**Edge cases** :
- Produit avec 1 seule photo → thumbnails masqués
- Photo cassée / 404 → placeholder ivoire avec icône « image indisponible »
- Lightbox sur mobile → fond opaque plein écran, bouton fermeture visible

### F7 · Variantes produit (couleur / dimension) 🔴 MVP

**User story** : « En tant que client, je veux choisir la version 3 places du canapé Atlas en tan plutôt que la 2 places en olive. »

**Comportement** :
- Sélecteurs couleur (swatches ronds) + dimensions (chips) sur fiche produit
- Sélection variante → mise à jour photo principale + prix + stock + délai
- URL mise à jour avec `?variant=atlas-3-places-tan` (partageable)
- Panier stocke le SKU précis, pas juste l'ID produit parent

**Edge cases** :
- Variante en rupture → chip grisé + note « Non disponible en ce coloris »
- Aucune variante sélectionnée → ajout panier bloqué + toast « Choisir un coloris »
- Combinaison invalide (existe pas) → auto-sélection de la 1re combinaison valide

### F8 · Cross-sell « Complétez votre salon » 🟡 V1.1

**User story** : « En tant que client qui vient d'ajouter un canapé au panier, je veux voir des tables basses assorties. »

**Comportement** :
- Slider 6-8 produits en bas de fiche produit
- Règle serveur : produits de la même famille + prix cohérent + stock OK
- Sur panier : cross-sell basé sur items + catégories du panier

**Edge cases** :
- Moins de 3 produits éligibles → masquer la section (pas d'affichage « 1 produit »)
- Produit déjà dans le panier → exclu du cross-sell

### F9 · Avis clients 🟡 V1.1

**User story** : « En tant que client, je veux lire les avis avant d'acheter, et pouvoir donner le mien après réception. »

**Comportement** :
- Note globale (étoiles + moyenne) visible sur card + fiche produit
- Onglet « Avis » : moyenne + graph répartition + liste (auteur, date, note, texte)
- CTA « Laisser un avis » visible uniquement si commande de ce produit livrée (contrôle serveur)
- Modération manuelle admin avant publication (badge « en attente »)

**Edge cases** :
- 0 avis → empty state + CTA « Soyez le premier »
- Client qui note plusieurs fois → écrasement du précédent avis
- Avis avec langage inapproprié → filtre serveur mots-clés + notif admin

---

## 3. Panier & checkout

### F10 · Panier persistant 🔴 MVP

**User story** : « En tant que client, je veux que mon panier soit là quand je reviens 3 jours plus tard, sans avoir tout re-sélectionné. »

**Comportement** :
- Panier stocké localStorage (guest) + Sheet client (connecté)
- Sync auto au login (fusion + dédup, quantités additionnées)
- Panier vidé automatiquement 30 jours après dernière modif (localStorage) — jamais côté serveur
- Mini-panier flottant : hover desktop = récap ; click = redirect /panier

**Edge cases** :
- Prix changé entre ajout et checkout → recalcul serveur avec prix actuel + notif « Le prix a été mis à jour »
- Produit du panier retiré du catalogue → marqué « Indisponible », exclu du total, toast au checkout
- Stock devenu inférieur à quantité panier → auto-ajustement à stock disponible + notif

### F11 · Tunnel checkout 4 étapes 🔴 MVP

**User story** : « En tant que client, je veux finaliser mon achat en moins de 3 minutes sans obstacle. »

**Comportement** :
- Stepper visible en permanence, backtrack possible aux étapes précédentes
- Récap panier sticky (droite desktop / accordéon mobile) toujours visible
- Guest ou compte : les deux flows sont équivalents (pas de blocage guest)
- Progression sauvegardée à chaque étape (revenir plus tard = reprend où on en était, si connecté)

**Edge cases** :
- Fermeture navigateur en cours de checkout → panier + adresses conservés (localStorage)
- Passage guest → création compte proposée en étape 4 (« Créer un compte pour suivre votre commande »)
- Erreur formulaire → focus sur champ en erreur + message rouge sous le champ (pas de modal)
- Session expirée entre étapes → redirect login + retour checkout après auth

### F12 · Zones de livraison + tarifs 🔴 MVP

**User story** : « En tant qu'admin, je veux définir les zones desservies et leurs tarifs sans toucher au code. »

**Comportement** :
- Config admin : liste zones avec nom + tarif standard + tarif étage + tarif montage
- Frontend : dropdown zones dans checkout, calcul frais auto au changement
- Serveur-side uniquement : jamais de règle prix en JS client (leçon SEC-C1 LOÏS HAIR)
- Zones activables/désactivables (temporairement désactivées = grisées + note)

**Edge cases** :
- Client hors zones → option « Nous contacter pour devis » (redirige WhatsApp)
- Modif tarif en cours de checkout d'un client → recalcul serveur au submit, pas d'incohérence
- Zone désactivée après ajout panier → alerte checkout + choix nouvelle zone

### F13 · Paiement Kadev acompte 30% / solde 70% 🔴 MVP

**User story** : « En tant que client, je veux payer 30 % en ligne pour bloquer ma commande, et régler le reste à la livraison en cash ou Wave. »

**Comportement** :
- Toggle en étape 3 : « Payer intégralement » vs « Acompte 30 % + solde à la livraison »
- Redirect Kadev PAY pour paiement acompte (Wave / OM / CB unifié)
- Pattern robuste (leçon LOÏS HAIR Phase 5) :
  1. Créer commande statut `pending` AVANT redirect Kadev
  2. Enregistrer référence Kadev sur la commande
  3. Attendre webhook Kadev (HMAC-SHA512 validé) → statut `paid_deposit`
  4. Si pas de webhook après 15 min → job cleanup marque `payment_timeout`
- Solde marqué payé par admin/livreur à la livraison via dialog admin
- Reçu A5 imprimable généré avec breakdown financier + QR avis

**Edge cases** :
- Client abandonne la redirection Kadev → commande reste `pending` 72h puis auto-cancel
- Webhook Kadev arrive plusieurs fois (rejeu) → idempotence via référence unique
- Paiement Kadev accepté mais webhook perdu → job de rapprochement quotidien (compare Kadev backoffice ↔ Sheet)
- Client change d'avis après acompte payé → politique clarifiée CGV (avoir vs remboursement, à trancher au RDV)
- Solde non payé après J+3 → rappel auto WhatsApp + email (semi-auto : admin valide l'envoi)

### F14 · Rappels automatisés 🟡 V1.1

**User story** : « En tant qu'admin, je veux que le système relance automatiquement les paniers abandonnés et les soldes impayés sans que je m'en occupe. »

**Comportement** :
- Panier abandonné J+1 : email + WhatsApp semi-auto (admin approuve envoi via lien magique dans email admin quotidien)
- Solde impayé J+3 : email + WhatsApp semi-auto
- Auto-cancel commandes pending > 72h
- Avis client J+7 après livraison : email avec lien Google My Business
- Tous les rappels tracés dans le journal audit

**Edge cases** :
- Client déjà relancé récemment → cap 1 rappel / semaine max
- Client no-spam list (a demandé à ne plus être contacté) → skip
- Erreur envoi WhatsApp (numéro invalide) → fallback email uniquement, log erreur

---

## 4. Compte utilisateur

### F15 · Inscription / connexion 🔴 MVP

**User story** : « En tant que client fidèle, je veux avoir un compte pour retrouver mes commandes et adresses. »

**Comportement** :
- Inscription : nom + email + mot de passe (min 8 caractères) + acceptation CGV
- Login : email + mot de passe OU lien magique par email (passwordless)
- Session : cookie httpOnly + secure + SameSite=Strict (durée 30j « se souvenir de moi » sinon session)
- Mot de passe oublié : email avec lien réinitialisation (valable 1h, à usage unique)

**Edge cases** :
- Email déjà utilisé à l'inscription → « Ce compte existe déjà · Se connecter »
- Login échoué 5 fois → captcha au 6e (v2), pas de lockout MVP (UX friction)
- Session expirée pendant checkout → login inline sans perte panier
- Compte supprimé demandé → soft delete (données conservées 90j pour comptabilité) puis purge

### F16 · Historique commandes 🔴 MVP

**User story** : « En tant que client, je veux voir mes commandes passées, leur statut, et re-télécharger un reçu. »

**Comportement** :
- Liste commandes triée date desc, filtre par statut
- Détail commande : items + total + adresse + livraison + paiements (acompte, solde) + tracking
- Reçu A5 téléchargeable (PDF généré serveur, mise en cache 24h)
- Bouton « Recommander » (recharge le panier avec les mêmes items, quantité et variantes conservées si dispo)

**Edge cases** :
- Commande annulée → visible avec statut « Annulée » + raison
- Reçu d'une commande partielle (solde impayé) → mention « Solde restant : XXX 000 F »
- Recommander avec produits indisponibles → toast « 2 produits indisponibles, 3 ajoutés au panier »

---

## 5. Admin CRM PWA

### F17 · Login admin par rôle 🔴 MVP

**User story** : « En tant que Coulibaly, je veux donner à mon livreur un accès limité (voir ses tournées) sans lui donner accès à ma config Kadev. »

**Comportement** :
- 3 rôles : admin (tout) / gérant (commandes + clients + catalogue, pas config ni Kadev) / livreur (uniquement commandes à livrer)
- Login ID + password (pas d'email pour livreur, ID court type initiales)
- Chaque action admin loggée dans journal audit (qui, quand, quoi, avant/après)
- Session admin : durée 8h max, ré-auth pour actions sensibles (config Kadev, suppression)

**Edge cases** :
- Livreur qui tente URL admin/config → 403 + log incident
- Admin unique (Coulibaly) supprime son propre compte → bloqué + message
- Session expirée pendant édition → sauvegarde brouillon local + demande re-login

### F18 · Dashboard KPI temps réel 🔴 MVP

**User story** : « En tant que Coulibaly, je veux voir en ouvrant l'app combien j'ai vendu aujourd'hui et ce qui demande mon attention. »

**Comportement** :
- KPI cards : CA jour/semaine/mois, commandes du jour, panier moyen, taux conversion
- Graphiques : CA 30j, répartition zones livraison
- Blocs listes : commandes récentes, alertes stock, paniers abandonnés, soldes impayés
- Actions rapides : + produit, + article, envoyer rapport mensuel

**Edge cases** :
- Pas de vente aujourd'hui → cards à « 0 F » + note « Journée calme »
- Chargement lent (> 3s) → skeleton cards + fetch progressif
- Erreur Sheet (quota exhausté) → banner erreur + retry auto backoff exponentiel

### F19 · Gestion commandes 🔴 MVP

**User story** : « En tant qu'admin, je veux voir une commande, marquer les étapes (préparée, livrée, soldée) et annuler si besoin. »

**Comportement** :
- Liste commandes avec filtres (statut, zone, date, client)
- Détail commande : tout visible + actions contextuelles (marquer préparée, imprimer bon livraison, marquer livrée, encaisser solde, annuler)
- Notes internes admin (invisibles client)
- Bouton « Contacter client par WhatsApp » (lien pré-rempli avec récap commande)

**Edge cases** :
- Marquer livrée sans solde encaissé → alerte confirmation (« Voulez-vous marquer livrée sans encaisser le solde ? »)
- Annuler commande déjà payée (acompte) → workflow avoir : générer bon avoir + notif client
- Modification quantité article après commande → interdit (créer nouvelle commande)

### F20 · Gestion catalogue produits 🔴 MVP

**User story** : « En tant qu'admin, je veux ajouter un nouveau canapé avec ses photos et son prix, et le publier immédiatement. »

**Comportement** :
- Liste produits avec filtres + tri + recherche
- Formulaire produit : titre, description, prix, prix promo, coût (interne, calcul marge), stock, seuil alerte, catégorie, sous-catégorie, tags, variantes (couleur/dimension), photos (drag & drop, upload direct Sheet Drive)
- Statut : brouillon / publié / archivé
- Preview fiche produit avant publication

**Edge cases** :
- Upload photo > 5 MB → compression auto client-side avant upload
- Suppression produit avec commandes historiques → soft delete (archivé), reste visible historique
- Modif prix produit → historique prix conservé (Sheet colonne « prix_precedent » + date)

### F21 · Gestion blog + moodboards 🟡 V1.1

**User story** : « En tant qu'admin, je veux publier un article sur les tendances déco 2026 avec photos et produits tagués. »

**Comportement** :
- Éditeur WYSIWYG minimal (Markdown-like : h2, h3, bold, italic, listes, images, liens, embed produit card)
- Upload images inline
- Tag produits (sélecteur qui insère un mini-card produit dans l'article)
- Prévisualisation avant publication
- SEO : titre meta, description meta, image OG

**Edge cases** :
- Article trop long (> 50 000 caractères) → alerte performance
- Image cassée dans article publié → placeholder + log warning admin
- Article référence produit supprimé → cassé mais visible, admin alerté

### F22 · Configuration site 🔴 MVP

**User story** : « En tant qu'admin, je veux modifier le bandeau annonce, les zones livraison, les coordonnées sans redéploiement. »

**Comportement** :
- Bandeau annonce : texte + couleur + lien optionnel + on/off
- Zones livraison : CRUD avec nom + tarifs (standard, étage, montage) + on/off
- Coordonnées site : adresse, tel, WhatsApp, email, réseaux sociaux
- Config Kadev : PUBLIC_KEY (chiffrée, jamais visible), URL retour, URL webhook (readonly)
- Config B2B : paliers remise (10%, 15%, 20% selon volume annuel)

**Edge cases** :
- Modif zone en cours d'utilisation par client → recalcul checkout serveur, cohérence garantie
- Config Kadev invalide (test échoué) → refus save + message erreur explicite
- Suppression toutes zones → bloqué (au moins 1 zone obligatoire)

### F23 · Programme B2B décorateurs 🟡 V1.1

**User story** : « En tant qu'architecte d'intérieur, je veux avoir un compte pro avec remise 15 % automatique et facturation détaillée pour mes clients. »

**Comportement** :
- Formulaire inscription pro : entreprise + RCCM + N° contribuable + secteur + volume prévisionnel
- Validation manuelle admin (peut refuser, demande justificatif)
- Compte pro validé → remise auto appliquée au checkout selon palier
- Factures pro téléchargeables avec mentions TVA + N° contribuable Bois Sacré
- Prix HT visible en plus du prix TTC (toggle)

**Edge cases** :
- Client pro déclassé (volume insuffisant) → bascule vers palier inférieur, notif
- Client pro rachète après clôture → réactivation compte
- Doublon inscription pro (même RCCM) → bloqué

### F24 · Reporting mensuel automatisé 🟡 V1.1

**User story** : « En tant que Coulibaly, je veux recevoir le 1er de chaque mois un email récap avec mes chiffres du mois précédent. »

**Comportement** :
- Job cron 1er du mois 6h GMT
- Email avec : CA total, nombre commandes, panier moyen, top 10 produits, répartition zones, taux conversion, alertes (stock, soldes en retard), lien vers CSV comptable
- Export CSV téléchargeable manuellement à tout moment

**Edge cases** :
- Job cron échoue (Apps Script quota) → retry lendemain 6h, log erreur
- Envoi email échoue → fallback WhatsApp admin
- Aucune commande dans le mois → email envoyé quand même avec « Aucune vente ce mois »

### F25 · Audit sécurité OWASP Top 10 🔴 MVP

**User story** : « En tant qu'agence MyComm, je veux garantir à Coulibaly qu'aucune faille classique OWASP n'est présente à la mise en ligne. »

**Comportement** :
- Checklist SEC-C1 à SEC-M4 (héritée LOÏS HAIR) appliquée en fin de S7 :
  - **SEC-C1** : zéro règle prix/stock/zone en JS client (tout serveur)
  - **SEC-C2** : webhook Kadev via Cloudflare Worker HMAC-SHA512, jamais Apps Script direct
  - **SEC-C3** : escape HTML systématique sur toute donnée dynamique (utiliser un helper `esc()`)
  - **SEC-C4** : cookies session httpOnly + secure + SameSite=Strict
  - **SEC-C5** : rate limiting sur login (5 tentatives / 15 min / IP)
  - **SEC-M1** : validation stricte types entrées serveur (email regex, phone regex, prix > 0)
  - **SEC-M2** : CSP headers restrictifs (script-src self + Google Fonts uniquement)
  - **SEC-M3** : pas de logs de données sensibles (email, tel, adresse) en console
  - **SEC-M4** : audit dépendances tierces (aucune npm dep hors Google Fonts)
- Test de pénétration manuel (SQLi, XSS, CSRF, IDOR) documenté dans `docs/security-audit.md`

**Edge cases** :
- Faille détectée en audit → correction avant mise en ligne, jamais de « on verra plus tard »
- Nouveau CVE Kadev / Apps Script → veille active + patch prioritaire

---

## 6. Priorisation résumée

| Priorité | Fonctionnalités | Total |
|---|---|---|
| 🔴 **MVP** (S1-S8) | F1, F2, F3, F4, F6, F7, F10, F11, F12, F13, F15, F16, F17, F18, F19, F20, F22, F25 | **18 features** |
| 🟡 **V1.1** (post-launch 30j) | F5, F8, F9, F14, F21, F23, F24 | **7 features** |
| 🟢 **V2** (Phase 2) | AR/3D produit, configurateur canapé, multi-langue EN, app native | **4 features** |

---

## 7. À trancher au prochain point projet

- **F13 · Rétractation acompte** : politique en cas d'annulation client après paiement acompte → avoir vs remboursement (impact CGV)
- **F17 · Livreur externe vs interne** : accès admin livreur permanent ou compte partagé ?
- **F20 · Photos produits** : Coulibaly les fournit ou MyComm organise shooting ? (impact planning)
- **F21 · Rédaction blog** : Coulibaly rédige ou MyComm bootstrap 5 articles au lancement ?
- **F23 · Paliers B2B** : validation avec Coulibaly des seuils volume et remises exactes
