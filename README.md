# Estimation MXL — nouveau site web

Refonte du site [estimationmxl.com](https://estimationmxl.com/). Première étape : une section hero sur mesure pour présenter la nouvelle direction visuelle.

**Stack** : Next.js 16 (App Router, Turbopack) · React 19 · Tailwind CSS v4 · shadcn/ui · [ForgeUI](https://forgeui.in).

## Démarrer

```bash
npm install
npm run dev
```

Puis ouvrir <http://localhost:3000>.

| Commande        | Rôle                          |
| --------------- | ----------------------------- |
| `npm run dev`   | Serveur de développement      |
| `npm run build` | Build de production           |
| `npm run start` | Sert le build de production   |
| `npm run lint`  | ESLint                        |

## Section hero

La hero reprend la mise en page du bloc ForgeUI **hero-section12** (badge, grand titre avec une tuile de marque intégrée, deux boutons pilule), adaptée à MXL :

- le logo MXL remplace le logo Reddit, dans une tuile bleue qui s'appose comme un tampon (« signées MXL ») ;
- le bleu `#1B5DF2` de l'ancien site devient la couleur principale ;
- une grille de plan (blueprint) en fond, qui s'éclaire autour du curseur sur ordinateur ;
- les textes, statistiques et certifications (IICRC WRT, Xactimate, Symbility, CNESST) viennent de l'ancien site.

Les animations d'entrée sont en CSS (aucun flash au chargement) et sont désactivées si l'utilisateur a activé « réduire les animations ».

### Fichiers

```
src/app/page.tsx                                 page d'accueil
src/app/globals.css                              thème ForgeUI + couleurs MXL
src/components/sections/site-header.tsx          en-tête (logo, navigation)
src/components/sections/hero-section.tsx         section hero
src/components/sections/blueprint-background.tsx grille de fond interactive
src/components/brand/mxl-logo.tsx                logo MXL vectoriel (SVG)
public/brand/                                    logo original (PNG) et version SVG
```

## Composants ForgeUI Pro

`hero-section12` fait partie de ForgeUI **Pro** : le registre refuse le téléchargement sans jeton. Le registre `@forgeui` est déjà configuré dans `components.json` ; pour installer les blocs officiels :

1. Générer un jeton sur <https://forgeui.in/docs/cli> (compte ForgeUI Pro requis).
2. Copier `.env.example` en `.env.local` et y coller le jeton (`FORGEUI_API_TOKEN=...`). Ce fichier n'est jamais commité.
3. Lancer :

   ```bash
   npx shadcn@latest add @forgeui/hero-section12
   ```

## Déployer

Le plus simple : importer le dépôt sur [Vercel](https://vercel.com/new), qui détecte Next.js automatiquement.
