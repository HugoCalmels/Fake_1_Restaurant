# Le Faux Bistrot

Site de restaurant que le gérant modifie lui-même : carte, horaires, photos, textes.
Refonte d'un vrai restaurant, sous un nom fictif.

[Site](https://fake-bristot.netlify.app/) · [Captures et présentation](https://hugo-calmels.fr/sites-web/site-dynamique-simple)

## Fonctionnalités

- Contenu modifiable depuis une interface d'administration (CMS headless), sans base de données
- Carte du midi et du soir, horaires, « ouvert / fermé » calculé en direct, galerie photos
- FR/EN, pages générées au build, Lighthouse 100
- Widget de réservation façon Zenchef (factice)

## Stack

- Next.js 15, React 19, TypeScript, Tailwind CSS 4 — Netlify
- Decap CMS (contenu en JSON dans le dépôt)

## Lancer en local

```bash
npm install
npm run dev
```

Pour l'interface d'administration en local : `npx decap-server`, puis `/admin`.
