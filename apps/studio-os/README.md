# AI x MAD Studio OS — independent web app

This is a standalone, responsive React/Vite PWA intended to replace the Floot-hosted Studio OS. It contains **no Floot imports, credentials or client data**.

## Implementation status
- Responsive iPhone interface with Home, Leads, CRM, Quotes and More navigation
- Supabase email/password login (requires a separate project and authorized user)
- RLS-protected lead, proposal and project records
- Prospect pipeline and stage updates
- Quotations (draft and copy; no unsolicited sending)
- Project tracking
- No AI API, WhatsApp outbound or production deployment controls have been connected yet
- No existing portfolio files are modified: app is isolated under `apps/studio-os`

## Setup
1. Create a **new Supabase project** for the studio, separate from VIP-Hunter and GCS.
2. Run `supabase/migration.sql` in that project's SQL editor. Confirm RLS is enabled.
3. In Supabase Authentication, disable public registration for a private internal app; create/invite your authorized studio admin user.
4. Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` in the Vercel project's environment variables. The publishable key is used by the browser; do not use a service_role key here.
5. Set the Vercel project **Root Directory** to `apps/studio-os`, **Framework** to Vite, and build command to `npm run build`.
6. Install and test locally with `npm install && npm run build && npm run dev` (Node 22+ suggested).
7. Deploy with a commercial-eligible Vercel plan. Vercel Hobby is not permitted for commercial use.
8. Test sign-in, create/edit leads and quotations, Home Screen install, and CRM RLS before directing clients/staff to the new domain.

## Cutover
Keep Floot online while testing this replacement. The Floot Studio OS currently has no lead, proposal or project records as checked on Oct 14, 2026; its internal user/login credentials do not transfer. When independent authentication, persistence and deployment are confirmed, move DNS if needed, and then unpublish Floot to retire its branding.

## Security
Never commit secrets or `.env` files. Never send raw Supabase service keys to the browser. Client rows are protected by owner-id RLS policies. For multiple staff with access to shared client records, implement a separate organization membership policy before inviting them.
