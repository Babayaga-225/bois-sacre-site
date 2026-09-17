# Bois Sacré · site vitrine

Site vitrine e-commerce de l'atelier de mobilier et décoration **Bois Sacré**, Abidjan.

- **Client** : Coulibaly Mohamed, architecte d'intérieur
- **Cadre** : réalisation bénévole via MyComm (Anicet Tafotien)
- **Statut** : prototype S2 · homepage statique HTML/CSS · pas de back-end à ce stade

## Stack

- HTML5 statique
- CSS moderne : custom properties (design tokens), grid, flex, `clamp()`
- Typographie : **Fraunces** (titres) + **Manrope** (corps), chargées via Google Fonts
- Aucune dépendance JS externe. Aucune image externe (les visuels sont des placeholders CSS avec gradients ; ils seront remplacés par les photos client à la S3)

## Arborescence

```
bois-sacre-site/
├── index.html              Homepage (9 blocs)
├── src/
│   ├── tokens.css          Palette, typo, spacing, radius, shadows
│   ├── base.css            Reset, focus-visible, prefers-reduced-motion
│   ├── layout.css          Container + grid 12 col
│   └── components/
│       ├── header.css      Header sticky, nav, actions
│       ├── footer.css      Footer 3 colonnes
│       ├── section.css     Sections + moodboards + catégories + atelier + journal + IG + CTA
│       ├── placeholder.css Placeholders visuels (gradients palette DA)
│       ├── hero.css        Hero fullscreen
│       ├── button.css      Boutons primary / secondary / ghost
│       ├── card.css        Carte produit générique
│       ├── badge.css       Badges (Nouveau, Promo, Rupture)
│       └── modal.css       Modal générique (non-utilisé sur la homepage S2)
└── docs/
    └── CHARTE.md           Charte graphique + règles d'usage
```

## Blocs de la homepage (S2)

1. **Header sticky** — logo + nav 7 catégories + recherche/panier/burger
2. **Hero** — plein écran, titre + sous-titre + 2 CTA sur fond ambré/bois
3. **Moodboards** — 3 ambiances (Nature brute · Méditerranée · Africain contemporain)
4. **Catégories** — 4 pièces (Salon · Chambre · Salle à manger · Bureau)
5. **Atelier split** — visuel + texte présentation atelier
6. **Journal** — 3 cartes articles blog
7. **Instagram** — grille 6 tuiles carrées
8. **CTA final** — bandeau sombre "sur mesure"
9. **Footer** — 3 colonnes (contact · liens · newsletter + social)

## Prévisualiser en local

Ouvrir `index.html` dans un navigateur, ou depuis la racine :

```bash
python3 -m http.server 8080
```

Puis <http://localhost:8080/>

## À faire · prochaines étapes (S3+)

- Remplacer les placeholders CSS par les photos réelles du client
- Ajouter les pages internes : catalogue, fiche produit, panier, contact
- Micro-interactions JS : sticky header opaque au scroll, menu burger, modal produit
- Intégration formulaire contact (email ou back-end léger)
- SEO on-page complet + balises Open Graph
- Optimisations perfs : lazy-load images, preload fonts

---

Made in Bouaké 🇨🇮 · MyComm
