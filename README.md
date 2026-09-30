# KARTHIKEYAN — AI X MAD

A professional, black-and-blue portfolio for Karthikeyan K, vibe coder, web developer and app developer. **AI X MAD** is the studio name.

The first screen is intentionally typography-only: the name **KARTHIKEYAN** and the exact subtitle **Vibe coder - web developer - App developer**. The previous portrait image is retained in the repository but is not displayed in the homepage.

Visual design: Manrope headline typography, Inter interface and body text, midnight-black and deep-blue gradients, restrained blue highlights, subtle geometric halos, responsive case-study cards and accessible motion.

## Run locally

Open `index.html` directly in a modern browser, or serve this folder with a local static server:

```sh
python -m http.server 8000
```

Open http://localhost:8000.

No build step, API key, data collection or third-party JavaScript library is required. Google Fonts are optional; local system-font fallbacks are provided.

## Sections

- Home: name-only hero, role subtitle and restrained black/blue visual atmosphere
- About: introduction to Karthikeyan and AI X MAD
- Services: web development, app development and AI-assisted creative work
- Projects: real projects with interactive website/app filtering
- Process: talk, create, launch
- Contact: email link, copy-email action and GitHub profile

### Real project destinations

- [New Royal Tiles](https://royaltiles.vercel.app/)
- [Sugumar Portfolio](https://sugumar-portfolio-beta.vercel.app/)
- [VIP-Hunter](https://vip-hunter.vercel.app/)
- [Deccan Matriculation School](https://www.deccanmatric.in/)

These URLs are editable in `index.html`. Confirm live deployment availability before sharing the page with a client.

## Interactions

- Sticky navigation with active section indicator and mobile menu
- Midnight / deep-blue palette toggle with stored preference (when permitted by browser)
- Press **Ctrl+K** or **⌘K** for quick navigation
- Filter projects: All / Websites / Apps
- Scroll progress indicator and intersection-based reveals
- Gentle pointer lighting on precise-pointer devices (no portrait tilt on the homepage)
- Accessible copy-email control with success/error feedback
- Reduced-motion support and graceful static content with JavaScript disabled

## Files

```
index.html               Semantic content and visual mockups
styles.css               Tokens, design system, motion and responsive layout
script.js                Progressive enhancement and interactive features
assets/portrait.webp     Previously supplied portrait preserved as an unused source asset
assets/mark.svg          Custom AI X MAD monogram/favicon
```

## Publish

Import the repository into Vercel as a static/"Other" project with the **repository root** as the output directory and no build command, or publish it with GitHub Pages. Committing code to GitHub does not itself guarantee a deployment.

## 2026 visual refresh

All original About, Services, Projects, Process and Contact content and the original project URLs are preserved. The first screen contains no image. Project mockups are stylized in blue while remaining navigable to the real project destinations.

Keep `tests/smoke.mjs` and `tests/browser.mjs` passing before merging changes.
