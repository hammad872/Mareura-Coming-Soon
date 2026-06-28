# Mareura — Coming Soon

Animated launch page. Vite + React + TypeScript + Tailwind + Framer Motion.

## Run
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # outputs dist/
```

## Customize
- **Launch date:** `LAUNCH_DATE` at the top of `src/App.tsx`.
- **Typed commands:** `COMMANDS` array in `src/App.tsx`.
- **Email capture:** the `onSubmit` in `src/App.tsx` has a `TODO` — POST the email to your
  backend, Mailchimp, Resend, or a form service (Formspree, etc.). Currently it just shows
  the success state.
- **Brand:** colors + fonts live in `tailwind.config.js`; motion/gradient utilities in `src/index.css`.
- **Logo:** the `<Logo>` component is the SVG ribbon-M — swap for your exported asset anytime.

## Deploy
Static build — drop `dist/` on Vercel, Netlify, Cloudflare Pages, or any static host.
On Vercel: import the repo, framework preset "Vite", done.
