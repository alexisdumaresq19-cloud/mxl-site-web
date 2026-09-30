# Estimation MXL — nouveau site web

Refonte du site [estimationmxl.com](https://estimationmxl.com/) pour **Estimation MXL, estimateurs après sinistre** : une page d'accueil complète en français, sur fond noir, inspirée du template ForgeUI **Cardinal**.

**Stack** : Next.js 16 (App Router, Turbopack) · React 19 · Tailwind CSS v4 · shadcn/ui · [ForgeUI](https://forgeui.in) · [Aceternity UI](https://ui.aceternity.com) · Motion.

## Démarrer

```bash
npm install
npm run dev
```

Puis ouvrir <http://localhost:3000>.

| Commande        | Rôle                        |
| --------------- | --------------------------- |
| `npm run dev`   | Serveur de développement    |
| `npm run build` | Build de production         |
| `npm run start` | Sert le build de production |
| `npm run lint`  | ESLint                      |

## Page d'accueil

| Section                      | Contenu                                                                                                 |
| ---------------------------- | ------------------------------------------------------------------------------------------------------- |
| En-tête                      | Logo, méga-menu « Services », liens d'ancre, Facebook, bouton « Demander une estimation », menu mobile  |
| Hero                         | « Des estimations [précises / détaillées] signées MXL » : petit mot animé, grande tuile MXL, aperçu     |
| Formations et certifications | « Un sinistre à estimer? », bouton vers le contact et bande qui défile, style ForgeUI call-to-action03  |
| Services                     | « Votre sinistre, [évalué / chiffré / documenté] » et 3 cartes : dommages, coûts, rapport et indemnités |
| À propos                     | Texte « Notre expertise » et chiffres animés (5+ ans, 100+ clients, 2 500+ projets)                     |
| FAQ                          | Accordéon, réponses tirées de l'ancien site                                                             |
| Contact                      | « Parlons-en. » et formulaire de demande d'estimation, style ForgeUI contact04 (voir plus bas)          |
| Pied de page                 | Le vrai logo MXL qui s'écrit comme une signature (animé), liens, Facebook, grand logo MXL en contour    |

Textes, statistiques et certifications viennent de l'ancien site. Les montants et dates des illustrations sont des **exemples** (marqués comme tels) : à remplacer par de vraies données si MXL le souhaite.

Les animations sont en CSS et Motion ; elles sont désactivées si l'utilisateur a activé « réduire les animations ».

### Fichiers

```
src/app/page.tsx                    page d'accueil
src/app/actions.ts                  Server Action du formulaire de contact
src/app/not-found.tsx               page 404
src/app/globals.css                 thème ForgeUI + couleurs MXL + utilitaires
src/lib/site.ts                     contenu partagé (services, certifications, navigation)
src/components/ui/                  composants shadcn et Aceternity
src/components/sections/            sections de la page et leurs illustrations
src/components/brand/mxl-logo.tsx   logo MXL vectoriel (SVG)
src/components/brand/mxl-signature.ts  traits de plume qui dévoilent le logo (signature du pied de page)
public/brand/                       logo original (PNG) et version SVG
```

## Logos des formations et certifications

En attendant les logos, la bande affiche le nom de chaque certification. Pour ajouter un logo :

1. Déposer le fichier dans `public/certifications/`, de préférence en **SVG** ou en **PNG transparent** (le logo est affiché en blanc ; un fond blanc donnerait un rectangle blanc).
2. Dans `src/lib/site.ts`, ajouter `logo` à la certification, par exemple :
   `{ name: "IICRC WRT", detail: "Certification", logo: { src: "/certifications/iicrc.svg", width: 120, height: 40 } }`

## Formulaire de contact

Champs : prénom, nom, courriel, téléphone (facultatif) et description du sinistre. Les demandes sont envoyées par courriel via [Resend](https://resend.com). Tant que les variables ne sont pas définies, le formulaire affiche un message invitant à écrire sur Facebook (rien n'est perdu en silence).

Variables (voir `.env.example`), à ajouter dans `.env.local` en local et dans Vercel > Settings > Environment Variables :

| Variable             | Rôle                                           |
| -------------------- | ---------------------------------------------- |
| `RESEND_API_KEY`     | Clé API Resend                                 |
| `CONTACT_TO_EMAIL`   | Adresse qui reçoit les demandes                |
| `CONTACT_FROM_EMAIL` | Expéditeur sur un domaine vérifié (facultatif) |

**Politique de confidentialité** : le site n'en a pas encore. Au Québec, la Loi 25 en exige une dès qu'un site recueille des renseignements personnels (ce formulaire en recueille). Une fois la page publiée, ajouter son lien sous le formulaire, à côté de la mention « Ces renseignements servent à répondre à votre demande. ».

## Composants

**Aceternity UI** (gratuits), installés avec `npx shadcn@latest add @aceternity/…` :

| Composant             | Utilisation                   |
| --------------------- | ----------------------------- |
| `container-text-flip` | Mot animé du titre de la hero |
| `layout-text-flip`    | Titre animé de « Services »   |
| `wobble-card`         | Cartes de « Services »        |

Adaptations faites dans `src/components/ui/` : import de `cn` corrigé, balises `span` pour pouvoir placer le texte animé dans un titre (sinon erreur d'hydratation), premier mot visible dès le rendu serveur, pas de défilement des mots si l'utilisateur réduit les animations, texture `public/noise.webp` ajoutée. Les fichiers de démo ont été retirés (contenu fictif).

**ui-lab** (licence MIT) : la signature du composant [`footer-signature`](https://github.com/xevrion/ui-lab/blob/main/src/lab/components/footer-signature.tsx), sans le reste de son footer, est dans `src/components/ui/signature.tsx` (avis de licence en tête du fichier). Elle s'écrit quand elle est entièrement visible, ralentit dans les boucles et s'affiche d'un coup si l'utilisateur réduit les animations. Ajout : un mode « dévoiler » (`reveal`) où les traits de plume servent de masque sur le vrai logo. Chaque lettre apparaît au passage de la plume, dans l'ordre d'écriture, et le résultat final est exactement le logo d'origine.

**ForgeUI** : le registre `@forgeui` est configuré dans `components.json`. `hero-section12`, `logo-cloud02`, `call-to-action03` et `contact04` sont des blocs **Pro** : la hero, la section formations et certifications et la section contact sont des reproductions écrites pour MXL. Pour installer les blocs officiels :

1. Générer un jeton sur <https://forgeui.in/docs/cli> (compte ForgeUI Pro requis).
2. L'ajouter dans `.env.local` : `FORGEUI_API_TOKEN=...` (jamais commité).
3. Installer un bloc : `npx shadcn@latest add @forgeui/logo-cloud02`

**Licences** : le template Cardinal et les blocs ForgeUI Pro peuvent servir pour des projets clients, mais leur code source ne doit pas être partagé publiquement. Ce dépôt étant public, le site reprend leur style avec du code écrit pour MXL. Pour y ajouter des fichiers Pro tels quels, passer d'abord le dépôt en privé.

## Déployer

Le site est déployé sur Vercel : <https://mxl-site-web.vercel.app>. Avec l'intégration Git de Vercel, chaque push sur la branche de production redéploie le site.
