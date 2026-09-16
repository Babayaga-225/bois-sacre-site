# Bois Sacré · site e-commerce

E-commerce mobilier & décoration haut de gamme, style Kave Home adapté au marché ivoirien.

**Client** : Coulibaly Mohamed — Atelier Bois Sacré, Abidjan (Côte d'Ivoire)
**Agence** : MyComm Platform — Anicet Tafotien
**Périmètre** : Premium (e-commerce complet + admin CRM PWA + Kadev + audit sécu OWASP)
**Statut** : semaine 1 — analyse & conception

## Stack

- Frontend statique HTML/CSS/JS (zéro dépendance externe hors Google Fonts)
- Backend Google Apps Script (Sheet source de vérité)
- Paiement Kadev PAY (Wave + Orange Money + CB), pattern acompte 30 % + solde 70 %
- Cloudflare Worker pour webhook HMAC-SHA512 Kadev
- Hébergement Vercel avec auto-deploy sur `main`

## Structure du repo

```
bois-sacre-site/
├── README.md
├── AGENTS.md                 · cadrage pour Antigravity (bulk work)
├── LICENSE                   · MIT
├── .gitignore
├── docs/
│   ├── 01-arborescence.md
│   ├── 02-wireframes.md
│   ├── 03-cadrage-fonctionnalites.md
│   └── 04-decisions-techniques.md
└── src/
    └── tokens.css            · design tokens (palette, typo, spacing)
```

## Standards MyComm à respecter

- Mobile-first strict, test à 375px avant desktop
- Escape HTML systématique sur toute donnée dynamique
- Aucune dépendance externe ajoutée sans validation
- Font `Inter` bannie (charte MyComm)
- Prix en FCFA uniquement
- Français ivoirien pour le texte user-facing
- Sécurité serveur-side (jamais de règle prix/stock/zone en JS client)

## Roadmap

- **S1** (semaine en cours) : arborescence + wireframes + cadrage + décisions techniques + design tokens
- **S2** : DA finalisée + composants UI + skeleton HTML
- **S3-4** : catalogue dynamique + fiches produits
- **S5** : tunnel checkout + intégration Kadev
- **S6** : admin CRM PWA
- **S7** : audit OWASP + tests E2E
- **S8** : recette + formation + mise en ligne
