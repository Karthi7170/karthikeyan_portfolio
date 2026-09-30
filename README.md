# AI x MAD — Creative Technology Studio

AI x MAD is a business-first creative technology website for Karthikeyan K, focused on web development, app development and AI-assisted creative work.

## Visual direction

The current design is rebuilt around the supplied motion-reference video:

- near-black canvas with cool blue lighting
- compact navigation and restrained UI chrome
- large white grotesk typography with a blue accent
- text-and-technology split hero composition
- cinematic perspective browser panels
- floating technical UI lines, rings, grids and glows
- large editorial service and project sections
- smooth scroll reveals and pointer-based depth on precise-pointer devices

The site uses **Inter Tight** for the display typography and **Inter** for interface/body copy.

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
