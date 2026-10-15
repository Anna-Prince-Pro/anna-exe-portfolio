# anna-exe-portfolio
Static personal site. No build step, no backend, no dependencies.

## Edit
All content lives in `data.js`. Anything starting with `REPLACE` renders as a dashed placeholder; swap in a real URL or text. Put your resume at `assets/resume.pdf` and set its link. Add screenshots to `assets/` and reference them from the project data (add an `img` field and render it in `app.js` if wanted). Add archive entries to the `archive` array.

## Run locally
Open `index.html`, or run `npx serve .` / `python3 -m http.server`.

## Push to GitHub
`git init && git add . && git commit -m "init" && git branch -M main`
Create an empty repo named `anna-exe-portfolio` on github.com, then
`git remote add origin <your-repo-url> && git push -u origin main`.

## Deploy (free, HTTPS)
Vercel or Netlify: "Import from GitHub", pick the repo. Framework: Other. Build command: none. Output directory: `.` (root). Every push to `main` redeploys automatically. GitHub Pages also works (Settings → Pages → main / root).

## Update later
Edit `data.js` → commit → push. The host publishes it.
