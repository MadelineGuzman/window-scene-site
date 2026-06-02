# Window Scene Launch Site

Investor/client-facing product launch website for G.H.O.S.T. Solutions LLC and Window Scene.

## What is included

- Premium one-page product launch layout
- Hero, problem, solution, how-it-works, product possibilities, sustainability, investor/partnership, founder story, and waitlist sections
- Responsive static HTML/CSS/JS with no build step
- Interactive scene preview tabs
- Local waitlist form interaction placeholder

## Open locally

Open `index.html` directly in a browser, or run:

```powershell
npm install
npm run serve
```

Then open `http://127.0.0.1:4173`.

## Deploy

This is a static site. The deploy entry point is `index.html` at the repo root.

### GitHub Pages

1. Push this repo to GitHub.
2. In GitHub, open the repository settings.
3. Go to `Pages`.
4. Under `Build and deployment`, choose `GitHub Actions`.
5. Push to `main`, or manually run the `Deploy static site to GitHub Pages` workflow.

### Netlify

1. Create a new Netlify site from this repo.
2. Netlify will use `netlify.toml`.
3. Build command is blank.
4. Publish directory is `.`.

### Vercel

1. Import this repo into Vercel.
2. Framework preset can be `Other`.
3. Build command can be left blank.
4. Output directory can be left as `.`.

## Next upgrades

- Replace CSS mockups with final product renders, photography, or generated launch imagery
- Connect the waitlist form to a CRM, email service, or backend endpoint
- Add an investor deck download or private inquiry form
- Add press, prototype, and manufacturing partner sections as assets become available
