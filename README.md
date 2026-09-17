# Atelier Boisacré · site vitrine

Site vitrine **portfolio** de l'**Atelier Boisacré**, cabinet d'architecture d'intérieur à Abidjan.

- **Fondateur** : Coulibaly Mohamed Parfait
- **Positionnement** : architecture d'intérieur (résidentiel · hospitality · tertiaire) + design de mobilier sur mesure
- **Cadre** : réalisation bénévole via MyComm (Anicet Tafotien)
- **Statut** : prototype S2 · homepage statique HTML/CSS · pas de back-end à ce stade
- **Signature (bio IG)** : « Né d'un besoin d'ancrage : faire dialoguer l'objet, l'espace et l'héritage. »

## Stack

- HTML5 statique
- CSS moderne : custom properties (design tokens), grid, flex, `clamp()`
- Typographie : **Fraunces** (titres) + **Manrope** (corps), chargées via Google Fonts
- Aucune dépendance JS externe, aucune image externe (visuels = placeholders CSS avec gradients, à remplacer par les photos réelles des projets à la S3)

## Arborescence

```
bois-sacre-site/
├── index.html                    Homepage portfolio (9 blocs)
├── src/
│   ├── tokens.css                Palette, typo, spacing, radius, shadows
│   ├── base.css                  Reset, focus-visible, prefers-reduced-motion, .visually-hidden
│   ├── layout.css                Container + grid 12 col
│   └── components/
│       ├── header.css            Header sticky + nav + actions
│       ├── footer.css            Footer 3 colonnes (dark bois)
│       ├── section.css           Sections + projects + services + manifesto + method + territories + journal + form + CTA + moodboards + categories (héritage)
│       ├── placeholder.css       Placeholders visuels (gradients palette DA — projets, territoires, journal, moodboards, catégories)
│       ├── hero.css              Hero fullscreen
│       ├── button.css            Boutons primary / secondary / ghost
│       ├── card.css              Carte produit générique
│       ├── badge.css             Badges génériques
│       └── modal.css             Modal générique (non-utilisé sur la homepage)
├── AGENTS.md                     Manifeste Sandbox Antigravity (règles délégation, sécurité)
└── docs/
    ├── CHARTE.md                 Charte graphique + règles d'usage
    └── archive/                  Variantes de homepage gardées en veille
        ├── README.md
        └── homepage-catalog-v1.html   Version e-commerce style Kave (S2 initiale, avant pivot portfolio)
```

## Blocs de la homepage

1. **Header sticky** — logo « Atelier Boisacré » + nav (Projets · Services · Approche · Territoires · Journal · Contact)
2. **Hero** — plein écran, baseline manifeste + 2 CTA (Voir les projets · Démarrer un projet)
3. **Portfolio · projets récents** — grille 9 tuiles (Villa Doum · K-Beach · Île Bouley Lounge · W-Kitchen · Complexe hôtelier · Complexe scolaire · Tabouret Multifaces · BAO-ci · Inside Out)
4. **Services** — 4 cartes (Résidentiel · Hospitality · Mobilier sur mesure · Conseil & étude préalable)
5. **Manifeste + méthode** — citation IG + 4 étapes (Écoute · Croquis · Prototypage · Livraison), fond dark bois
6. **Territoires d'intervention** — 4 cartes typologies
7. **Journal** — 3 études de cas
8. **Contact** — CTA + formulaire de brief (nom · email · téléphone · type de projet · message)
9. **Footer** — coordonnées correctes + Instagram + Behance

## Prévisualiser en local

Ouvrir `index.html` dans un navigateur, ou depuis la racine :

```bash
python3 -m http.server 8080
```

Puis <http://localhost:8080/>

## À faire · prochaines étapes (S3+)

- **Photos réelles** : récupérer 15-20 photos HD des projets phares auprès de Coulibaly (via WhatsApp) et remplacer les placeholders CSS
- **Backend formulaire** : brancher le formulaire de brief sur Formspree, Getform ou un endpoint Apps Script
- **Pages projet dédiées** : chaque projet ouvert vers une page détaillée avec galerie, plan, cartel technique
- **Presse & reconnaissances** : si applicable, ajouter section citations/logos clients
- **Micro-interactions JS** : header opaque au scroll, menu burger, transitions image
- **SEO on-page + Open Graph** + optimisations perfs (lazy-load, preload fonts)
- **Version anglaise** : Coulibaly cible aussi la clientèle expat / hospitality → EN utile

## Variante catalogue (au chaud)

Une variante **e-commerce style Kave Home** (moodboards, catégories mobilier) est conservée dans `docs/archive/homepage-catalog-v1.html` au cas où Coulibaly voudrait ajouter un axe boutique en ligne pour le mobilier signature. Les composants CSS restent dans `src/components/section.css`, réutilisables directement.

---

Made in Bouaké 🇨🇮 · MyComm
