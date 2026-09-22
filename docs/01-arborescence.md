# 01 · Arborescence du site Bois Sacré

Structure complète du site (public + admin), organisée par zone fonctionnelle. Base de travail pour le CDC formel et pour le sitemap.xml.

## 1. Header · navigation méga-menu (8 catégories)

Le header est fixe (sticky) en desktop. En mobile, un bouton hamburger déclenche un drawer plein écran.

| Catégorie | Sous-catégories (menu déroulant desktop) |
|---|---|
| **Salon** | Canapés · Fauteuils · Tables basses · Meubles TV · Buffets & rangements |
| **Chambre** | Lits · Têtes de lit · Chevets · Commodes · Dressings · Miroirs de chambre |
| **Salle à manger** | Tables · Chaises · Bancs · Buffets salle à manger · Vaisseliers |
| **Bureau** | Bureaux · Chaises de bureau · Bibliothèques · Rangements bureau |
| **Décoration** | Coussins · Tapis · Textiles (rideaux, plaids) · Vases · Miroirs déco · Art mural · Objets déco |
| **Luminaires** | Suspensions · Appliques · Lampadaires · Lampes à poser · Extérieur (outdoor) |
| **Extérieur** | Mobilier de jardin · Salons de jardin · Chaises longues · Parasols · Luminaires outdoor |
| **Enfant** | Chambres enfants · Chambres ados · Rangements enfant · Décoration enfant |

**Éléments transverses du header** :
- Logo Bois Sacré à gauche (SVG, wordmark version foncée)
- Barre de recherche centrale (autocomplete produit + catégorie)
- Icône compte utilisateur (avec badge « connecté » si session ouverte)
- Icône wishlist (badge compteur si items)
- Icône panier (badge compteur + total FCFA au survol desktop)
- Bandeau annonce configurable au-dessus du header (promo, événement Décor Expo, message livraison)

## 2. Pages statiques institutionnelles

| URL | Titre | Objet |
|---|---|---|
| `/` | Accueil | Hero par ambiance + 4 catégories phares + 3 moodboards + Instagram feed + 3 derniers articles blog + CTA newsletter |
| `/atelier` | Notre atelier | Storytelling Coulibaly Mohamed, savoir-faire, photos atelier Abidjan, équipe |
| `/demarche` | Notre démarche | Sourcing bois local + import contrôlé, artisanat, durabilité, prix juste |
| `/livraisons` | Livraisons | Zones desservies + tarifs + délais + options (étage, montage) + FAQ |
| `/nous-rendre-visite` | Nous rendre visite | Adresse showroom Abidjan + Google Maps embed + horaires + parking + tel + WhatsApp |
| `/cgv` | Conditions générales de vente | Contrat légal (paiement, livraison, rétractation, garantie) |
| `/mentions-legales` | Mentions légales | Éditeur, hébergeur, propriété intellectuelle, cookies |
| `/politique-confidentialite` | Politique de confidentialité | RGPD/local, données collectées, cookies, droits utilisateur |
| `/contact` | Contact | Formulaire + WhatsApp + email + téléphone + adresse |

## 3. Blog / journal éditorial

| URL | Titre | Objet |
|---|---|---|
| `/blog` | Journal Bois Sacré | Grille articles paginée (12/page), filtrage par catégorie |
| `/blog/[slug]` | Article | Titre + hero + corps + auteur + date + produits mentionnés (cross-sell) + articles similaires |
| `/blog/categorie/[slug]` | Catégorie blog | Filtre par thème : Ambiances, Guides d'achat, Coulisses atelier, Tendances |
| `/moodboards` | Nos ambiances | Grille moodboards (page dédiée) : « Salon bord de lagune », « Chambre terre cuite », etc. |
| `/moodboards/[slug]` | Moodboard | Composition d'ambiance + shopping list produits utilisés + achat groupé |

## 4. Pages e-commerce (catalogue)

| URL | Titre | Objet |
|---|---|---|
| `/[categorie]` | Page catégorie | Hero cat + filtres latéraux + tri + grille produits + pagination |
| `/[categorie]/[sous-categorie]` | Sous-catégorie | Même structure, périmètre restreint |
| `/produit/[slug]` | Fiche produit | Galerie 4-6 photos + zoom + specs + prix + livraison + stock + panier + cross-sell + reviews |
| `/recherche?q=[query]` | Résultats recherche | Grille produits triée par pertinence + filtres à droite |
| `/wishlist` | Ma wishlist | Liste des favoris (localStorage + compte si connecté) |
| `/panier` | Panier | Récap items + modif quantités + suppression + cross-sell + total + CTA checkout |

## 5. Tunnel checkout (4 étapes)

| URL | Étape | Contenu |
|---|---|---|
| `/checkout/adresse` | Étape 1 · Adresse | Formulaire adresse livraison (guest ou compte) + choix zone Abidjan |
| `/checkout/livraison` | Étape 2 · Livraison | Choix mode (standard / étage / avec montage) + créneau souhaité + calcul frais |
| `/checkout/paiement` | Étape 3 · Paiement | Choix méthode (Wave / Orange Money / CB via Kadev) + acompte 30 % vs total |
| `/checkout/confirmation` | Étape 4 · Confirmation | Récap commande + numéro + reçu A5 imprimable + instructions livraison |

## 6. Compte utilisateur

| URL | Titre | Objet |
|---|---|---|
| `/compte/connexion` | Connexion | Login email + mot de passe · OU passwordless via lien magique |
| `/compte/inscription` | Créer un compte | Nom + email + mot de passe + acceptation CGV |
| `/compte/mot-de-passe-oublie` | Mot de passe oublié | Envoi lien réinitialisation par email |
| `/compte` | Mon compte | Dashboard : dernières commandes + adresses + wishlist + newsletter |
| `/compte/commandes` | Mes commandes | Historique commandes avec statut (pending, préparée, livrée, soldée) |
| `/compte/commande/[id]` | Détail commande | Récap + suivi livraison + solde restant + reçu téléchargeable |
| `/compte/adresses` | Mes adresses | CRUD adresses de livraison |
| `/compte/profil` | Mon profil | Modif nom, email, mot de passe, préférences newsletter |
| `/compte/deconnexion` | Déconnexion | POST déconnexion + redirect accueil |

### Compte B2B (décorateurs / architectes)

| URL | Titre | Objet |
|---|---|---|
| `/pro` | Espace pro Bois Sacré | Landing dédié : avantages remise 10-20 %, prix HT visible, facturation détaillée |
| `/pro/inscription` | Inscription pro | Formulaire avec RCCM / N° contribuable + validation manuelle admin |
| `/compte/pro/factures` | Mes factures pro | Historique factures téléchargeables PDF |

## 7. Admin CRM PWA

Sous-domaine dédié `admin.bois-sacre.ci` (ou route protégée `/admin/*`), PWA installable, login ID/password par utilisateur.

| URL | Titre | Objet |
|---|---|---|
| `/admin/connexion` | Login admin | ID + mot de passe (rôle : admin / gérant / livreur) |
| `/admin` | Dashboard | KPI temps réel : CA jour/semaine/mois, marge, top produits, alertes stock |
| `/admin/commandes` | Commandes | Liste avec filtres (statut, zone, date) + tri, click → détail |
| `/admin/commande/[id]` | Détail commande admin | Récap + actions (marquer préparée, marquer livrée, marquer soldée, annuler) + notes internes |
| `/admin/clients` | Clients | Liste + recherche + click → fiche client |
| `/admin/client/[id]` | Fiche client | Coordonnées + historique commandes + notes internes + panier abandonné |
| `/admin/catalogue` | Catalogue | Liste produits + filtres + tri, CRUD produit |
| `/admin/produit/[id]` | Édition produit | Formulaire complet : titre, description, prix, photos, stock, catégorie, tags |
| `/admin/blog` | Blog admin | Liste articles + CRUD article |
| `/admin/article/[id]` | Édition article | Éditeur WYSIWYG minimal + upload images + preview |
| `/admin/moodboards` | Moodboards admin | Liste + CRUD moodboard (composition, produits tag) |
| `/admin/config` | Configuration | Zones livraison + tarifs, bandeau annonce, coordonnées, config Kadev, config B2B |
| `/admin/pro` | Comptes pro | Validation manuelle inscriptions B2B + gestion remises |
| `/admin/reporting` | Reporting | Export CSV mensuel + graphiques CA + envoi rapport mensuel manuel |
| `/admin/journal` | Journal audit | Log de toutes les actions admin (qui, quand, quoi) |

## 8. Endpoints API techniques (Apps Script)

Non exposés dans l'arborescence publique, référencés ici pour cohérence. Détail dans `04-decisions-techniques.md`.

- `/exec?action=getProducts`
- `/exec?action=getProduct&id=...`
- `/exec?action=search&q=...`
- `/exec?action=createOrder` (POST)
- `/exec?action=getOrder&id=...`
- `/exec?action=updateOrderStatus` (POST admin)
- `/exec?action=updateStock` (POST admin)
- `/exec?action=login` (POST admin)
- `/exec?action=getConfig`
- (etc. — liste complète dans le doc 04)

Webhook Kadev : Cloudflare Worker à part, URL séparée (jamais Apps Script direct — cf. leçon LOÏS HAIR SEC-C2).

## 9. Fichiers techniques racine site

- `/robots.txt` — allow all (public) sauf `/admin/*` disallow
- `/sitemap.xml` — généré au build, contient toutes les pages publiques + produits + articles
- `/favicon.ico` — 32×32 (à produire, cf. gap identifié doc 03)
- `/apple-touch-icon.png` — 180×180 (à produire)
- `/manifest.webmanifest` — PWA config (nom, icônes, couleur thème, orientation)
- `/service-worker.js` — cache stratégique (offline-first pour admin PWA)
- `/.well-known/` — assetlinks.json si app Android (V2)

## 10. Ce qui reste à trancher au RDV Coulibaly

- Nombre réel de sous-catégories par catégorie (le doc liste des standards Kave Home, à valider selon catalogue Bois Sacré réel)
- Y a-t-il un catalogue outdoor / luminaire / enfant, ou juste les 4 gros (salon, chambre, salle à manger, bureau) au lancement ?
- Y a-t-il un vrai showroom Abidjan visitable (impact page `/nous-rendre-visite`) ou juste un atelier de production ?
- Statut de l'Instagram : compte actif à intégrer ou à créer avant le lancement ?
- Politique de rétractation / retour : applicable ou non sur meuble ? (impact CGV)
- Blog : Coulibaly rédige-t-il lui-même ou MyComm le lance avec 5 articles bootstrap ?
