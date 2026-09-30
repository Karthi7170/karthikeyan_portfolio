# AI X MAD — Creative Technology Studio

A high-fidelity, mobile-first business website for **AI X MAD**, a creative technology studio founded by Karthikeyan K. The studio offers website development, app development and AI-assisted creative work.

## Creative direction

The homepage introduces the **AI X MAD** brand first, with an original futuristic robot rendered entirely as **inline SVG** and CSS. Its gradients, optical lighting, 3D-style pose, orbit layers and responsive composition remain sharp on retina and 4K displays—without loading a large video, 3D engine, paid plugin or image asset. Motion is subtle, respects reduced-motion preferences, and pointer-based robot tilt is limited to devices with precise pointers.

- Palette: midnight blue, deep black, frosted steel and electric blue.
- Typography: Space Grotesk for headlines, Plus Jakarta Sans for interface/body copy, and IBM Plex Mono for technical labels.
- The main calls to action navigate to the real project gallery and contact form.
- The existing founder introduction, three service categories, four portfolio projects, development process and WhatsApp contact features remain.
- No founder photograph appears in the hero.

## Run locally

Open `index.html` directly in a modern browser, or serve this folder with a local static server:

```sh
python -m http.server 8000
```

Open http://localhost:8000.

No build step, API key, data collection or third-party JavaScript library is required. Google Fonts are optional; local system-font fallbacks are provided.

## Sections

- Home: AI X MAD studio introduction, original SVG robot, cinematic lighting, motion-aware 3D-style interaction and clear project/contact CTAs
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
- Interactive hero lighting and robot tilt on precise-pointer devices (no portrait on the homepage)
- Accessible copy-email control with success/error feedback
- Dismissible WhatsApp chat preview (initially collapsed on all screens for a non-intrusive experience)
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

## Studio refresh

All original About, Services, Projects, Process and Contact content and the original project URLs are preserved. The first screen has an original scalable vector robot instead of the founder's photograph. Project mockups remain styled in blue and link to the existing project destinations.

Keep `tests/smoke.mjs` and `tests/browser.mjs` passing before merging changes.

## Contact / WhatsApp

The phone number is **+91 99447 54339** (WhatsApp international format: `919944754339`). The contact form collects visitor name, optional email, project type and message. When a visitor submits it, the browser opens `wa.me` with a prefilled WhatsApp message; the visitor reviews it and presses **Send** in WhatsApp. **The website does not send the message itself or store submissions on a server.** Without JavaScript, the form still opens WhatsApp with the visitor's message through its regular GET action. The floating WhatsApp prompt can be dismissed and reopened, with an accessible keyboard-operated launcher; it never sends unsolicited messages.

The hero and chat widget respect `prefers-reduced-motion`. On all screen sizes the WhatsApp prompt starts collapsed to avoid blocking the homepage artwork or content.

## Quality checks

The GitHub Actions workflow validates the JavaScript and runs static assertions plus headless Chromium checks at desktop, mobile and 3840 × 2160 UHD viewport sizes. The suite also checks reduced-motion behavior, interactive project filtering, WhatsApp message handoff and the dismissible contact widget. Browser screenshots are uploaded as a workflow artifact for visual review. These checks do not mean the site was opened in the owner's local Chrome profile.
