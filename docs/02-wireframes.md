# 02 · Wireframes low-fi Bois Sacré

Format texte structuré (pas de mockup graphique en semaine 1). Chaque écran est décrit **du haut vers le bas** en respectant la logique mobile-first (375px). Les précisions desktop (≥ 1024px) sont notées entre parenthèses.

Conventions :
- `[HEADER]` `[SECTION]` `[FOOTER]` = zones majeures
- `▪` = élément visuel
- `→` = interaction / lien
- `⟳` = état alternatif (loading, error, empty)

---

## 1. Homepage · `/`

### Zone 1 · Header sticky
- ▪ Bandeau annonce fin (48px, fond olive, texte ivoire) : « Livraison offerte à partir de 500 000 F · Abidjan »
- ▪ Header principal (72px, fond ivoire) :
  - Logo Bois Sacré à gauche (SVG wordmark foncé, hauteur 40px)
  - (Desktop) Nav 8 catégories au centre, hover = méga-menu plein largeur
  - Icônes droite : recherche 🔍 · compte 👤 · wishlist ♡ · panier 🛒 (badges compteur)
  - (Mobile) Burger à droite, à la place du nav
- ▪ Bordure basse fine tan `#CC916E` sur 1px

### Zone 2 · Hero « par ambiance » (pas par produit)
- ▪ Slider full-width (mobile 100vw × 80vh, desktop 100vw × 90vh) avec 3 slides auto (7 sec) :
  1. Ambiance salon lumière rasante → tagline « Un intérieur pensé, une matière qui dure » + CTA « Voir le salon »
  2. Ambiance chambre matières naturelles → tagline « La chambre, refuge premier » + CTA « Voir la chambre »
  3. Ambiance salle à manger conviviale → tagline « Autour de la table, tout se dit » + CTA « Voir la salle à manger »
- ▪ Dots de navigation en bas
- ▪ Texte tagline : Fraunces 32px mobile / 56px desktop, ivoire, ombre légère
- ▪ CTA : bouton pill tan, texte brun profond

### Zone 3 · 4 catégories phares
- ▪ Titre « Explorer par pièce » (Fraunces 24px mobile / 32px desktop, centré)
- ▪ Grille 2×2 mobile / 4×1 desktop
  - Chaque carte : image ambiance + label catégorie (Salon / Chambre / Salle à manger / Bureau)
  - Overlay hover : opacité 20% → 40%, label glisse vers le haut

### Zone 4 · 3 moodboards éditoriaux
- ▪ Titre « Nos ambiances » + sous-titre « Compositions signées Bois Sacré »
- ▪ Slider horizontal 3 moodboards (scroll snap mobile, grid 3 col desktop)
  - Chaque carte : photo composition + titre moodboard + nombre d'items (« 8 pièces ») + CTA « Voir la composition »

### Zone 5 · Bloc « Notre démarche »
- ▪ Split 50/50 desktop (stack mobile) : image atelier + texte
- ▪ Texte : « À Abidjan, nous concevons et fabriquons du mobilier qui traverse le temps. Bois massif, tissus naturels, assemblages solides. » + CTA « Découvrir l'atelier »

### Zone 6 · Instagram feed
- ▪ Titre « @atelierboisacre » + CTA « Nous suivre »
- ▪ Grille 3×2 mobile / 6×1 desktop de dernières publications (image seule, hover = date + likes)
- ⟳ Si feed vide ou erreur API : masquer la section entière (pas d'état « no posts »)

### Zone 7 · 3 derniers articles blog
- ▪ Titre « Journal »
- ▪ 3 cards : image + catégorie + titre + date + extrait 2 lignes + CTA « Lire l'article »
- ▪ Footer section : CTA « Voir le journal complet »

### Zone 8 · CTA newsletter
- ▪ Bande pleine largeur fond brun `#1C0000`, texte ivoire
- ▪ Titre « Recevez nos ambiances en avant-première »
- ▪ Champ email + bouton « S'abonner » tan
- ⟳ Succès inline « Merci · vous êtes inscrit » (vert olive)
- ⟳ Erreur inline « Email invalide » (rouge sourd)

### Zone 9 · Footer
- ▪ Fond brun `#1C0000`, texte ivoire, 4 colonnes desktop / accordéon mobile
  1. « Bois Sacré » — logo + tagline + réseaux sociaux
  2. « Boutique » — liens 8 catégories
  3. « À propos » — Atelier, Démarche, Journal, Ambiances
  4. « Aide » — Livraisons, CGV, Contact, Nous rendre visite
- ▪ Ligne basse : « © 2026 Atelier Bois Sacré · Abidjan · Site par MyComm Platform »

---

## 2. Page catégorie · `/salon`

### Zone 1 · Header (identique homepage)

### Zone 2 · Hero catégorie
- ▪ Image ambiance pleine largeur (60vh mobile, 50vh desktop)
- ▪ Titre catégorie « Salon » (Fraunces 40px mobile / 64px desktop, brun `#1C0000` sur fond ivoire)
- ▪ Sous-titre « 42 pièces pour composer votre salon »
- ▪ Breadcrumb : « Accueil / Salon »

### Zone 3 · Sous-navigation catégorie
- ▪ Chips horizontaux scrollables : « Tous · Canapés · Fauteuils · Tables basses · Meubles TV · Buffets »
- ▪ Chip actif : fond tan, texte brun profond ; inactif : bordure grise, texte gris

### Zone 4 · Layout principal
Desktop : 2 colonnes (sidebar filtres 280px + grille produits fluide)
Mobile : filtres masqués derrière bouton « Filtrer », tri en haut de grille

#### 4a · Sidebar filtres (desktop)
- ▪ Titre « Filtrer » + bouton « Réinitialiser »
- ▪ Bloc « Prix » : slider min/max + input FCFA
- ▪ Bloc « Matière » : checkboxes (Bois massif, Bois plaqué, Rotin, Métal, Tissu, Cuir)
- ▪ Bloc « Couleur » : swatches ronds cliquables (Naturel, Tan, Noir, Blanc, Vert, Terracotta)
- ▪ Bloc « Dimensions » : slider largeur + hauteur + profondeur
- ▪ Bloc « Style » : checkboxes (Contemporain, Scandinave, Rustique, Industriel)
- ▪ Bloc « Pièce » : réplique catégories (Salon, Chambre, etc.)
- ▪ Bloc « Disponibilité » : checkbox « En stock uniquement »
- ▪ Bouton « Appliquer » sticky bas

#### 4b · Bar de tri (au-dessus grille, sticky mobile)
- ▪ Compteur « 42 produits »
- ▪ Sélecteur tri : Nouveauté · Prix ↑ · Prix ↓ · Popularité · Recommandé
- ▪ (Mobile) bouton « Filtrer » qui ouvre un drawer plein écran

#### 4c · Grille produits
- ▪ Cards produits (2 col mobile / 3-4 col desktop)
- ▪ Chaque card :
  - Image produit (ratio 4/5, fond ivoire uniforme)
  - Badge « Nouveau » / « Rupture » / « -20 % » en haut à gauche si applicable
  - Icône ♡ wishlist en haut à droite (toggle rempli si actif)
  - Titre produit (Manrope 14px, brun `#1C0000`)
  - Prix FCFA (Manrope 16px medium, brun) + prix barré si promo (gris)
  - Au hover desktop : swap image sur 2e photo galerie + bouton « Ajouter au panier » qui apparaît
- ⟳ Empty state (aucun produit après filtres) : illustration + « Aucun produit ne correspond à vos filtres · Réinitialiser »
- ⟳ Loading : skeleton cards (fond gris clair pulsant)

### Zone 5 · Pagination
- ▪ Boutons « ← Précédent » · « 1 · 2 · 3 · … · 7 » · « Suivant → »
- ▪ Compteur « Page 1 sur 7 »

### Zone 6 · Footer (identique homepage)

---

## 3. Fiche produit · `/produit/canape-modulaire-atlas`

### Zone 1 · Header (identique)

### Zone 2 · Layout principal
Desktop : 2 colonnes 50/50 (galerie gauche + infos droite, sticky)
Mobile : stack vertical (galerie plein écran → infos → détails)

#### 2a · Galerie
- ▪ Image principale grande (ratio 4/5, fond ivoire)
- ▪ Zoom au click (lightbox overlay, molette souris = zoom)
- ▪ Thumbnails 4-6 photos en dessous (scroll horizontal mobile)
- ▪ Badge « 360° » / « AR » si disponible (V2 seulement)

#### 2b · Bloc infos
- ▪ Breadcrumb : « Accueil / Salon / Canapés / Canapé Atlas »
- ▪ Titre produit (Fraunces 32px)
- ▪ Étoiles avis (5 étoiles + nombre reviews en petit)
- ▪ Prix FCFA (Manrope 28px medium, brun) + prix barré si promo
- ▪ Description courte (Manrope 15px, 3-4 lignes)
- ▪ Sélecteurs :
  - Coloris : swatches (si variantes)
  - Dimensions : chips (2 places / 3 places / d'angle)
- ▪ Disponibilité :
  - ✓ « En stock · Livraison 5-7 jours » (vert olive)
  - ⏳ « Sur commande · 3-4 semaines » (tan)
  - ✗ « Rupture · Prévenez-moi » (gris + bouton notification email)
- ▪ Sélecteur quantité (- 1 +)
- ▪ Bouton principal « Ajouter au panier » (pill full-width, fond tan, texte brun)
- ▪ Bouton secondaire « ♡ Ajouter à ma wishlist »
- ▪ Bloc « Livraison » compact :
  - « Livraison Abidjan à partir de 5 000 F »
  - « Option étage : + 3 000 F »
  - « Option montage : + 8 000 F »
  - Lien « Voir toutes les zones »
- ▪ Bloc réassurance (icônes + texte court) :
  - 🌿 « Bois massif certifié »
  - 🛠️ « Fabrication Abidjan »
  - 📞 « SAV WhatsApp 7j/7 »

### Zone 3 · Onglets détails (sticky sous header)
Onglets : Description · Spécifications · Livraison · Avis (nb)

- **Description** : texte long enrichi, images intercalées
- **Spécifications** : tableau (Dimensions L×l×H · Matière · Poids · Origine · Entretien · Garantie)
- **Livraison** : zones + tarifs + délais + FAQ courte
- **Avis** : moyenne + graph répartition étoiles + liste reviews (auteur, date, note, texte)
  - CTA « Laisser un avis » (visible si commande passée sur ce produit)
  - ⟳ Empty state avis : « Soyez le premier à donner votre avis »

### Zone 4 · Cross-sell « Complétez votre salon »
- ▪ Titre + slider horizontal 6-8 produits similaires ou complémentaires

### Zone 5 · Cross-sell « Vu récemment »
- ▪ Slider basé localStorage historique de visite (masqué si vide)

### Zone 6 · Footer (identique)

---

## 4. Panier · `/panier`

### Zone 1 · Header (identique)

### Zone 2 · Titre + compteur
- ▪ « Mon panier · 3 articles » (Fraunces 32px)

### Zone 3 · Layout
Desktop : 2 colonnes (items 65% + récap 35% sticky)
Mobile : items empilés + récap sticky bas d'écran

#### 3a · Items
Chaque item :
- ▪ Thumbnail produit (100×100)
- ▪ Titre + variante (« Coloris Naturel · 3 places »)
- ▪ Prix unitaire
- ▪ Sélecteur quantité (- N +)
- ▪ Prix ligne calculé
- ▪ Bouton « Supprimer » (icône poubelle + label discret)
- ▪ Séparateur fin

#### 3b · Récap
- ▪ Sous-total articles
- ▪ Livraison (« Calculée à l'étape suivante »)
- ▪ Total estimé (Manrope 24px medium, brun)
- ▪ Champ code promo (accordéon)
- ▪ Bouton « Passer commande » (pill full-width, fond tan)
- ▪ Note « Ou payez 30 % maintenant, 70 % à la livraison »

### Zone 4 · Cross-sell « Complétez votre commande »
- ▪ Slider 6 produits complémentaires (calculé serveur-side)

### Zone 5 · Réassurance
- ▪ 3 icônes : Paiement sécurisé · Livraison Abidjan · SAV WhatsApp

### Zone 6 · Footer (identique)

⟳ Panier vide : illustration + « Votre panier est vide · Explorer le catalogue » (CTA)

---

## 5. Checkout · tunnel 4 étapes

### Structure commune
- ▪ Header simplifié (logo + tel SAV, pas de nav catégories)
- ▪ Stepper horizontal : 1 Adresse · 2 Livraison · 3 Paiement · 4 Confirmation
- ▪ Étape courante highlightée, précédentes cliquables (backtrack)
- ▪ Récap panier sticky à droite (desktop) / accordéon en haut (mobile)
- ▪ Footer minimal (CGV + contact)

### Étape 1 · Adresse · `/checkout/adresse`
- ▪ Toggle « J'ai un compte / Je crée un compte / Continuer en invité »
- ▪ Formulaire :
  - Prénom + Nom
  - Email (validation format)
  - Téléphone (format +225 XX XX XX XX XX)
  - Adresse ligne 1 + ligne 2
  - Zone (dropdown : Cocody, Riviera, Yopougon, Plateau, Marcory, Adjamé, Treichville, Autre)
  - Indications d'accès (textarea, ex : « 3e étage sans ascenseur, immeuble bleu »)
- ▪ Case à cocher « Enregistrer pour la prochaine commande » (si compte)
- ▪ Bouton « Continuer vers la livraison »

### Étape 2 · Livraison · `/checkout/livraison`
- ▪ 3 options en cards radio :
  1. Standard rez-de-chaussée · 5 000 F · Livraison 5-7 jours
  2. Étage sans ascenseur · +3 000 F · Livraison 5-7 jours
  3. Avec montage à domicile · +8 000 F · Livraison 7-10 jours
- ▪ Créneau souhaité : dropdown (Matin 8h-12h · Après-midi 14h-18h · Peu importe)
- ▪ Champ « Instructions livreur » (textarea)
- ▪ Bouton « Continuer vers le paiement »

### Étape 3 · Paiement · `/checkout/paiement`
- ▪ Toggle « Payer intégralement / Payer 30 % maintenant, 70 % à la livraison »
- ▪ Récap montant à payer maintenant (grande police)
- ▪ 3 méthodes en cards radio :
  1. Wave CI (logo Wave, « Vous serez redirigé vers Wave »)
  2. Orange Money (logo OM, « Vous serez redirigé vers Orange Money »)
  3. Carte bancaire Visa/Mastercard (logos, « Paiement sécurisé Kadev »)
- ▪ Case CGV « J'accepte les conditions générales de vente » (lien /cgv)
- ▪ Bouton « Payer XXX 000 F » (pill full-width, fond tan)
- ⟳ Loading pendant redirection Kadev (spinner + « Redirection vers votre banque… »)
- ⟳ Erreur Kadev : « Le paiement a été refusé · Essayer un autre moyen »

### Étape 4 · Confirmation · `/checkout/confirmation`
- ▪ Icône ✓ verte grande
- ▪ « Merci · votre commande #B24-0129 est confirmée »
- ▪ Récap : items + adresse + livraison + paiement acompte + solde restant
- ▪ Bouton « Télécharger le reçu A5 » (PDF généré serveur)
- ▪ Bouton secondaire « Suivre ma commande sur WhatsApp » (lien pré-rempli wa.me/…)
- ▪ Bloc « Prochaines étapes » :
  1. Vous recevez un email de confirmation
  2. Nous préparons votre commande sous 24-48h
  3. Notre livreur vous contacte 1 jour avant livraison
  4. Vous réglez le solde à la livraison
- ▪ CTA « Retour à la boutique »

---

## 6. Admin dashboard · `/admin`

### Structure commune admin
- ▪ Header admin dédié : logo + user + logout
- ▪ Sidebar navigation (desktop) / drawer (mobile) :
  - 📊 Dashboard
  - 🛒 Commandes (badge nouvelles)
  - 👥 Clients
  - 📦 Catalogue
  - ✍️ Blog
  - 🎨 Moodboards
  - ⚙️ Configuration
  - 🏢 Comptes pro
  - 📈 Reporting
  - 📜 Journal audit
- ▪ Contenu principal à droite

### Zone dashboard
#### KPI cards (grille 4×1 desktop / 2×2 mobile)
- ▪ Card CA du jour : « 245 000 F » + tendance vs hier (%, flèche)
- ▪ Card commandes du jour : « 3 · dont 2 nouvelles » + tendance
- ▪ Card panier moyen : « 82 000 F » + tendance
- ▪ Card taux conversion : « 4,2 % » + tendance

#### Graphiques (2 col desktop)
- ▪ Graph CA 30 derniers jours (barres verticales tan)
- ▪ Graph répartition zones livraison (donut : Cocody, Riviera, etc.)

#### Blocs listes
- ▪ « Commandes récentes » (table 5 lignes) : #ID · Client · Total · Statut · Actions rapides (marquer préparée)
- ▪ « Alertes stock » (table 5 lignes) : Produit · Stock restant · Seuil alerte · CTA « Réapprovisionner »
- ▪ « Paniers abandonnés J-1 » (table 5 lignes) : Client · Total panier · Contact WhatsApp direct
- ▪ « Soldes en attente > J+3 » (table) : #Commande · Client · Solde dû · Contact WhatsApp

#### Actions rapides (bandeau haut)
- ▪ Bouton « + Nouveau produit »
- ▪ Bouton « + Nouvel article »
- ▪ Bouton « Envoyer le rapport mensuel maintenant »

⟳ Loading : skeleton cards + tables
⟳ Erreur chargement KPI : « Impossible de charger les données · Réessayer »

---

## 7. Notes transverses wireframes

- **Mobile-first strict** : chaque écran conçu à 375px avant desktop. Toucher > 44px, texte > 14px.
- **Accessibilité** : contraste AA min (4.5:1 texte / 3:1 UI), navigation clavier, aria-labels sur icônes.
- **Loading skeletons** systématiques (pas de spinner central sauf checkout).
- **Empty states** designés pour chaque liste (pas juste « aucun résultat »).
- **Error states** clairs, jamais de trace technique visible côté utilisateur.
- **Toasts** pour actions positives (« Ajouté au panier · Voir mon panier ») en bas d'écran mobile / haut droite desktop.
- **Confirmations destructives** : modal double-confirmation pour supprimer commande, produit, article, client.
- **Print** : reçus / factures / rapports mensuels ont un CSS `@media print` dédié (A4 / A5 selon doc).

---

## 8. À produire en S2 (design haute fidélité)

- Maquettes Figma / HTML statique par écran (mobile + desktop) validées
- Composants UI documentés : boutons, cards, forms, inputs, modals, toasts, badges
- Iconographie custom (icons.svg spritesheet)
- Photos ambiance + photos produits (dépend du shooting Coulibaly)
- Illustrations vectorielles pour empty states
- Animation micro-interactions (ajout panier, wishlist, hover)
