# Charte graphique · Atelier Boisacré

Document de référence pour toute production visuelle du site et des supports connexes (portfolio, planches d'ambiance, réseaux sociaux, print).

## 1. Positionnement

**Cabinet d'architecture d'intérieur** à Abidjan, fondé par Coulibaly Mohamed Parfait.
Interventions : résidentiel · hospitality · tertiaire/institutionnel · mobilier signature sur mesure.

**Signature** (bio Instagram, à utiliser telle quelle) :
> « Né d'un besoin d'ancrage : faire dialoguer l'objet, l'espace et l'héritage. »

L'univers visuel doit dégager : **chaleur, sincérité, sobriété, ancrage, temporalité.** Chaque pièce, chaque espace montré doit sembler pensé pour vieillir bien.

Registre à éviter : discount, saturation, effets vitrine, mise en scène artificielle.

Une **variante e-commerce** (catalogue mobilier style Kave Home) est archivée dans `docs/archive/` au cas où l'atelier ouvrirait plus tard une boutique en ligne.

## 2. Palette

| Token           | Hex       | Usage                                                            |
|-----------------|-----------|------------------------------------------------------------------|
| `--bg`          | `#F7F5F1` | Fond général (crème). Base de la page.                           |
| `--surface`     | `#FFFFFF` | Surfaces surélevées (cartes produit, modales).                   |
| `--tan`         | `#CC916E` | Accent chaleur (backgrounds secondaires, badges).                |
| `--wood`        | `#1C0000` | Fond sombre (footer, CTA band, texte fort).                      |
| `--gold`        | `#D89545` | Accent principal (boutons, focus, liens actifs, éléments clés).  |
| `--olive`       | `#7A8A6D` | Accent nature (prix, tags secondaires, illustrations).           |
| `--text`        | `#2A1F17` | Texte principal sur fond clair.                                  |
| `--text-muted`  | `#6B5D51` | Texte secondaire, descriptions.                                  |
| `--border`      | `#E8E1D6` | Bordures fines, séparateurs.                                     |

**Règles :**
- Sur fond clair : `--text` pour le corps, `--gold` pour les accents.
- Sur fond `--wood` : `--bg` pour le corps, `--gold` pour les accents.
- **Interdits** : bleu, magenta, gris pur neutre. Toute couleur hors palette doit être justifiée et validée.

## 3. Typographie

| Rôle             | Famille    | Poids       | Charge Google Fonts |
|------------------|------------|-------------|---------------------|
| Titres (h1–h4)   | Fraunces   | 400 / 500   | opsz 9..144 axis    |
| Corps + labels   | Manrope    | 400 / 500 / 600 | statique variable |

- Fraunces apporte le caractère "atelier" (empattements légers, contraste modéré).
- Manrope reste neutre, lisible sur toutes les tailles.
- **Interdits** : Inter, Roboto, Helvetica en concurrence. Pas de web-font tierce en plus.

**Échelle fluide** (`tokens.css`) :
- `--h1-size` : clamp(32px, 5vw, 80px)
- `--h2-size` : clamp(24px, 4vw, 64px)
- `--h3-size` : clamp(20px, 3vw, 48px)
- Corps : `1rem` (16px) par défaut.

## 4. Espacements

Échelle exponentielle `--space-1` (4px) → `--space-16` (128px). Utiliser exclusivement les tokens, jamais de valeurs en dur dans les composants.

- Padding section : `--space-13` (80px) haut + bas
- Gap grille : `--space-4` (16px) à `--space-6` (24px)
- Padding card : `--space-4` à `--space-5`

## 5. Rayons + ombres

- `--radius-sm` (4px) : badges, inputs
- `--radius-md` (8px) : boutons, cartes
- `--radius-lg` (12px) : modales, bandeau CTA

- `--shadow-sm` : hover boutons
- `--shadow-md` : hover cartes
- `--shadow-lg` : modales

Ombres sobres, jamais colorées.

## 6. Composants — règles d'usage

### Boutons

- `.button-primary` (or ambré, texte crème) : action principale (1 par section max).
- `.button-secondary` (contour or ambré) : action secondaire.
- `.button-ghost` (transparent) : liens transformés en bouton.

### Cartes

- `.card` : générique produit.
- `.mood-card` : ambiance, image plein cadre + overlay bois-sombre.
- `.category-card` : catégorie, format portrait 3:4, label positionné en bas-gauche.
- `.journal-card` : article, image + date + titre + extrait.

### Placeholders (S2)

Toutes les zones "image" utilisent la classe `.ph` + un modificateur (`ph-mood-nature`, `ph-cat-salon`, …). Ces classes rendent des gradients palette DA en attendant les photos client.

**À la S3** : remplacer chaque `<div class="ph ph-xxx"></div>` par une `<img>` avec `alt` descriptif, en conservant le ratio.

## 7. Accessibilité

- Focus visible obligatoire : contour or ambré 2px + offset 2px (`base.css`).
- `prefers-reduced-motion` : toutes animations réduites à 1ms.
- Contraste texte : validé sur `--text` / `--bg` (≥ 4.5:1) et `--bg` / `--wood` (≥ 12:1).
- Labels de formulaire toujours présents (utiliser `.visually-hidden` si le champ n'a pas de label visible).
- Chaque icône seule dans un bouton doit avoir un `aria-label`.

## 8. Photographie (S3+)

Directives pour les prises de vue client :
- Lumière naturelle latérale, matin ou fin de journée.
- Fonds neutres (mur crème, sol bois, tissu lin).
- Cadrages : produit isolé (fond neutre) + mise en scène (contexte ambiance).
- Ratios cibles : 3:4 (catégorie), 4:3 (moodboard, journal), 1:1 (Instagram), 4:5 (atelier).
- Éviter : filtres saturés, HDR agressif, arrière-plans encombrés.

## 9. Interdictions résumées

- Pas d'emoji dans les titres ni sous-titres du site.
- Pas de dépendance externe hors Google Fonts (Fraunces + Manrope).
- Pas de couleur hors palette sans validation.
- Pas de police tierce (Inter et consorts).
- Pas de styles inline dans le HTML (tout passe par les CSS composants).

---

_Charte v1 · septembre 2026 · révisable à la S3._
