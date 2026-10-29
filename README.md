# Saint-Yzan-de-Soudiac — prototype cliquable

Prototype haute fidélité du futur site de la mairie de Saint-Yzan-de-Soudiac (Gironde, 33920), destiné à être présenté à la mairie.
Front seul : **aucune administration, base de données, authentification ni API**. Les données sont des fichiers TypeScript locaux et les formulaires affichent un succès simulé.

## Lancement

```bash
pnpm i && pnpm dev      # http://localhost:3000
pnpm build && pnpm start
pnpm lint
```

Stack : Next.js 16 (App Router, Cache Components), React 19, TypeScript strict, Tailwind CSS v4 (thème `@theme` dans `src/app/globals.css`), polices Schibsted Grotesk et Hanken Grotesk servies par le site (`next/font`), `lucide-react`.

## Structure

```
src/
├─ app/                 une route par page (voir « Pages »), sitemap.xml, robots.txt
├─ proxy.ts             404 réel pour les slugs inconnus (actualités, démarches, rubriques)
├─ components/
│  ├─ layout/           Header (overlay / solid) + méga-menu sur toutes les pages, SearchToggle, MobileMenu, Footer commun, Logo, SkipLink, SiteFrame
│  ├─ ui/               Button, Container, Eyebrow, SectionHeader, Breadcrumb, Tag, FilterChips, SubNav, FormField, LinkArrow (lucide), icons
│  ├─ sections/         Hero, QuickAccess, AlertBanner, NewsCard/Grid, PhotoBand, Stats, AgendaList, PhotoTiles, ContactSplit,
│  │                    Timeline, DocList, ProcedureList, OfficialCard, MayorBlock, ShareButtons, filtres (…Browser), etc.
│  └─ forms/            ReportForm, BookingForm, ContactForm, validation et succès simulé
├─ data/                site, navigation, news, events, procedures, documents, officials, rubriques, rooms, history, photos, sitemap
└─ lib/                 types, utils (cn, formatDate, isOpenToday), styles (échelle typographique), search
public/images/          13 photos WebP · public/documents/ : PDF « document à venir »
```

## Pages

`/` · `/mairie` · `/mairie/elus` · `/mairie/comptes-rendus` · `/demarches` · `/demarches/[slug]` · `/demarches/signaler-un-probleme` · `/demarches/reserver-une-salle` · `/vivre-ici/[slug]` (enfance-jeunesse, sante-solidarite, environnement, associations-culture) · `/decouvrir/histoire-patrimoine` · `/actualites` · `/actualites/[slug]` · `/agenda` · `/recherche?q=` · `/contact` · `/plan-du-site` · `/mentions-legales` · `/donnees-personnelles` · `/cookies` · `/accessibilite` · 404.

## Placeholders à remplacer

Tous les contenus inconnus sont affichés entre crochets, pour ne jamais inventer d'information réelle :

- Élus : `[Prénom Nom]`, `[NN]` (portraits), `[Délégation]`, `[Commission]`, `[N] membres`, `Depuis [année]`, `[Mot du maire…]`, délégués communautaires.
- Conseil municipal : `[date]` des séances, `Arrêté municipal n° [numéro]`, `[taille]` des PDF (les PDF pointent vers `public/documents/document-a-venir.pdf`).
- Actualités et agenda : `[date]`, `[lieu]`, `[tarif]`, `[Citation…]`, `[Événement associatif]`, programme du Village de Noël.
- Enfance & jeunesse : `[À compléter]` (horaires de classe, téléphone de l'école), `[horaires]`, `[tarif / repas]`.
- Autres rubriques : permanences du CCAS, centre médical, déchèterie, annuaire des associations et des commerces, bibliothèque.
- Salles : `[Nom de la salle]`, `[capacité]`, `[équipements]`, `[tarif]`, délai de réponse, caution.
- Démarches : modalités, pièces et délais marqués `[…]`, liens vers le guichet urbanisme et le PLU.
- RGPD et pages légales : `[durée]`, `[contact DPO]`, directeur de publication, hébergeur, prestataire, audit RGAA (`[organisme]`, `[date]`, `[taux]`).
- Jumelage : historique et prochaines rencontres. Mesure d'audience (page Cookies).
- **URL à vérifier** : site de la CdC Latitude Nord Gironde (`latitude-nord-gironde.fr`, d'après les annuaires) et domaine du futur site, défini une seule fois dans `site.url` (`src/data/site.ts`, actuellement `saint-yzan-de-soudiac.com`), utilisé pour le partage, `sitemap.xml` et `robots.txt`.
- **Export iCal** : le bouton « Ajouter à mon calendrier » a été retiré tant qu'aucun événement n'a de date réelle.

## Crédits photo (Wikimedia Commons)

| Fichier | Sujet | Crédit |
|---|---|---|
| `eglise11`, `hero` | Église Saint-Laurent, vues latérales | Renhour48, CC0 |
| `eglise`, `modillons` | Façade et modillons de l'église | William Ellison, CC BY-SA 4.0 |
| `mairie`, `ecole`, `college`, `poste`, `monument` | Bâtiments de la commune | Jack ma, CC BY-SA 3.0 |
| `gare`, `gareHD` | Gare de Saint-Mariens – Saint-Yzan | Cramos, CC BY-SA 4.0 |
| `bourg`, `lac` | Cartes postales anciennes | Domaine public |

Les crédits sont affichés dans les légendes, les pastilles de crédit et le pied de page.
