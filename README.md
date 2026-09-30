# KARTHIKEYAN — AI X MAD

A professional, black-and-blue portfolio for Karthikeyan K, vibe coder, web developer and app developer. **AI X MAD** is the studio name.

The first screen is intentionally typography-only: the name **KARTHIKEYAN** and the exact subtitle **Vibe coder - web developer - App developer**. The previous portrait image is retained in the repository but is not displayed in the homepage.

Visual design: Manrope headline typography, Inter interface and body text, midnight-black and deep-blue gradients, volumetric blue lighting, a subtle motion-aware lens and light field, cinematic typography, responsive case-study cards and accessible transitions.

## Run locally

Open `index.html` directly in a modern browser, or serve this folder with a local static server:

```sh
python -m http.server 8000
```

Open http://localhost:8000.

No build step, API key, data collection or third-party JavaScript library is required. Google Fonts are optional; local system-font fallbacks are provided.

## Sections

- Home: typography-only KARTHIKEYAN hero with cinematic volumetric blue lighting, lens geometry and motion-aware effects
- About: introduction to Karthikeyan and AI X MAD
- Services: web development, app development and AI-assisted creative work
- Projects: real projects with interactive website/app filtering
- Process: talk, create, launch
- Contact: accessible project inquiry form, WhatsApp handoff, email/copy-email action and GitHub profile

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
- Interactive hero lighting on precise-pointer devices (no portrait on the homepage)
- Accessible copy-email control with success/error feedback
- Dismissible WhatsApp chat preview (desktop initially open, mobile initially collapsed)
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

## Contact / WhatsApp

The phone number is **+91 99447 54339** (WhatsApp international format: `919944754339`). The contact form collects visitor name, optional email, project type and message. When a visitor submits it, the browser opens `wa.me` with a prefilled WhatsApp message; the visitor reviews it and presses **Send** in WhatsApp. **The website does not send the message itself or store submissions on a server.** Without JavaScript, the form still opens WhatsApp with the visitor's message through its regular GET action. The floating WhatsApp prompt can be dismissed and reopened, with an accessible keyboard-operated launcher; it never sends unsolicited messages.

The hero and chat widget respect `prefers-reduced-motion`. On small screens the WhatsApp prompt starts collapsed to avoid blocking the homepage content.
