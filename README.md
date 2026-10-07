# AI x MAD — Creative Technology Studio

AI x MAD is a business-first creative technology website for Karthikeyan K, focused on web development, app development and AI-assisted creative work.

## Visual direction

The current design uses the **Executive Signal** system: a professional agency-style template with a light porcelain canvas, crisp graphite typography, cobalt action color, and dark editorial bands for the Work and Contact sections.

- white/porcelain hero shell with a premium split layout
- cobalt primary actions and restrained blue accents
- dark editorial project carousel for contrast
- clean white service cards with compact tool tiles
- structured process and founder sections with generous spacing
- dark business contact section with the existing WhatsApp workflow
- responsive behavior across desktop, tablet, mobile and 4K

Typography:
- **Sora** — display/headline type
- **Manrope** — body/interface type
- **JetBrains Mono** — labels and technical metadata

## Higgsfield motion

The hero uses a custom AI x MAD motion asset created in the connected Higgsfield workflow. A studio-specific technology frame was built first, then motion was produced from that visual language. The page also includes a CSS fallback composition so the hero still looks intentional if autoplay is blocked or the remote video cannot load.

Hero motion source:
`https://d2ol7oe51mr4n9.cloudfront.net/user_3JFN34Qe7I15a2A1mQucztzlTZR/8558cd23-be37-40a1-8dee-c45a79bb5c76.mp4`

## Preserved business content

The redesign keeps the existing AI x MAD information and real project destinations:

- New Royal Tiles — https://royaltiles.vercel.app/
- Sugumar Portfolio — https://sugumar-portfolio-beta.vercel.app/
- VIP-Hunter — https://vip-hunter.vercel.app/
- Deccan Matriculation School — https://www.deccanmatric.in/

It also keeps:

- founder introduction for Karthikeyan K
- web, app and AI service positioning
- three-step project process
- WhatsApp project inquiry form
- WhatsApp number: +91 99447 54339
- email: karthikumaran7170@gmail.com
- GitHub: https://github.com/Karthi7170

## Contact behavior

The contact form does not silently send data to a server. It opens WhatsApp with the visitor's project details prefilled, and the visitor decides whether to send the message.

## Run locally

```sh
python -m http.server 8000
```

Then open http://localhost:8000.

## Production build

With Node.js 18 or later, run:

```sh
npm run build
python -m http.server 8000 --directory dist
```

The dependency-free build validates local HTML/CSS file references and creates `dist/` with the six public pages, stylesheet, JavaScript and assets. Deploy the contents of `dist/`; development scripts, tests and generated screenshots are excluded.

To verify the transparent logo, image fallback and navigation at desktop and mobile widths, install the same browser runner used by CI:

```sh
npm install --no-save playwright@1.55.1
npx playwright install chromium
python -m http.server 4173 --bind 127.0.0.1 --directory dist
```

With that server running, use `npm run test:header` in another terminal. Set `PORTFOLIO_BASE_URL` for a different server URL, or `CHROMIUM_PATH` to use a system Chromium executable. Screenshots are written to `artifacts/`.

## Quality checks

GitHub Actions validates:

- JavaScript syntax
- static structure and project links
- desktop rendering
- 390 px and 320 px mobile layouts
- 3840 × 2160 viewport layout
- WhatsApp form handoff
- floating WhatsApp prompt
- horizontal overflow
- reduced-motion fallback

The browser tests run in headless Chromium. They do not access or control the owner's local Chrome profile.
