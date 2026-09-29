# Estimation MXL — nouveau site web

Refonte du site [estimationmxl.com](https://estimationmxl.com/) : une page d'accueil complète en français, sur fond noir, inspirée du template ForgeUI **Cardinal**.

**Stack** : Next.js 16 (App Router, Turbopack) · React 19 · Tailwind CSS v4 · shadcn/ui · [ForgeUI](https://forgeui.in) · Motion.

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

| Section        | Contenu                                                                                                  |
| -------------- | -------------------------------------------------------------------------------------------------------- |
| En-tête        | Logo, méga-menu « Services », liens d'ancre, Facebook, bouton « Demander une estimation », menu mobile   |
| Hero           | Titre « Des estimations précises, signées MXL » (tuile tampon), aperçu de rapport d'estimation (exemple) |
| Certifications | IICRC WRT, Xactimate, Symbility, CNESST                                                                  |
| Services       | Après sinistre, ébénisterie, construction et rénovation, chacun avec son illustration                    |
| À propos       | Texte « Notre expertise » et chiffres animés (5+ ans, 100+ clients, 2 500+ projets)                      |
| FAQ            | Accordéon, réponses tirées de l'ancien site                                                              |
| Contact        | Formulaire de demande d'estimation (voir plus bas)                                                       |
| Pied de page   | Liens, Facebook, grand logo MXL en contour                                                               |

Textes, statistiques et certifications viennent de l'ancien site. Les montants, dates et pourcentages des illustrations sont des **exemples** (marqués comme tels) : à remplacer par de vraies données si MXL le souhaite.

Les animations sont en CSS et Motion ; elles sont désactivées si l'utilisateur a activé « réduire les animations ».

### Fichiers

```
src/app/page.tsx                    page d'accueil
src/app/actions.ts                  Server Action du formulaire de contact
src/app/not-found.tsx               page 404
src/app/globals.css                 thème ForgeUI + couleurs MXL + utilitaires
src/lib/site.ts                     contenu partagé (services, certifications, navigation)
src/components/sections/            sections de la page et leurs illustrations
src/components/brand/mxl-logo.tsx   logo MXL vectoriel (SVG)
public/brand/                       logo original (PNG) et version SVG
```

## Formulaire de contact

Les demandes sont envoyées par courriel via [Resend](https://resend.com). Tant que les variables ne sont pas définies, le formulaire affiche un message invitant à écrire sur Facebook (rien n'est perdu en silence).

Variables (voir `.env.example`), à ajouter dans `.env.local` en local et dans Vercel > Settings > Environment Variables :

| Variable             | Rôle                                           |
| -------------------- | ---------------------------------------------- |
| `RESEND_API_KEY`     | Clé API Resend                                 |
| `CONTACT_TO_EMAIL`   | Adresse qui reçoit les demandes                |
| `CONTACT_FROM_EMAIL` | Expéditeur sur un domaine vérifié (facultatif) |

## ForgeUI

Le registre `@forgeui` est configuré dans `components.json`. Les blocs **Pro** (dont `hero-section12`) demandent un jeton :

1. Générer un jeton sur <https://forgeui.in/docs/cli> (compte ForgeUI Pro requis).
2. L'ajouter dans `.env.local` : `FORGEUI_API_TOKEN=...` (jamais commité).
3. Installer un bloc : `npx shadcn@latest add @forgeui/hero-section12`

**Licence du template Cardinal** : il peut servir pour des projets clients, mais son code source ne doit pas être redistribué ni partagé. Ce dépôt étant public, le site reprend le style de Cardinal avec du code écrit pour MXL, sans copier les fichiers du template. Pour y coller des composants du template tels quels, passer d'abord le dépôt en privé.

## Déployer

Le site est déployé sur Vercel : <https://mxl-site-web.vercel.app>. Avec l'intégration Git de Vercel, chaque push sur la branche de production redéploie le site.
