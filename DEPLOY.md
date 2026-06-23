# Ayoub Bnina — Portfolio (Auto-Deploy via GitHub Pages)

Static React portfolio with a Tactical/Defense HUD aesthetic. Every push to `main` rebuilds and publishes automatically.

---

## 🚀 One-time setup (do this once)

### 1. Push this project to a GitHub repo
```bash
cd /path/to/this/project
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

> The folder structure expected by the workflow is:
> ```
> <repo-root>/
>   ├── frontend/          ← React app lives here
>   │   ├── src/
>   │   ├── package.json
>   │   └── yarn.lock
>   └── .github/
>       └── workflows/
>           └── deploy.yml
> ```
> The `backend/` folder is **not deployed** (this is a static site).

### 2. Enable GitHub Pages
1. Open your repo on GitHub → **Settings** → **Pages**.
2. Under **Build and deployment** → **Source**, select **GitHub Actions**.
3. (No branch selection needed — the workflow handles it.)

### 3. First deploy
- After pushing, open the **Actions** tab on GitHub.
- Watch the `Build & Deploy Portfolio to GitHub Pages` workflow run (~2 min).
- Once green, your site is live at:
  - **User/Org page repo** (`<username>.github.io`) → `https://<username>.github.io`
  - **Project repo** (`my-portfolio`) → `https://<username>.github.io/<repo-name>/`

The workflow uses `PUBLIC_URL=.` so it works for **both** layouts without further config.

---

## ✏️ Day-to-day workflow

1. Edit any file locally (or via GitHub web editor).
2. Commit and push to `main`.
3. GitHub Actions auto-builds and deploys. Refresh your site URL in 1–2 minutes.

**Most edits happen in one file:** `frontend/src/data/portfolio.js` (all text content, projects, skills, experience, education, awards).

For visual changes:
- Colors / fonts → `frontend/tailwind.config.js`
- Background effects / scanlines → `frontend/src/index.css`
- Section structure → files under `frontend/src/components/`

---

## 🛠 Manual trigger
You can re-run the deploy without pushing:
- GitHub repo → **Actions** → **Build & Deploy Portfolio to GitHub Pages** → **Run workflow**.

---

## 🌍 Custom domain (optional)
1. Add a `CNAME` file inside `frontend/public/` containing your domain (e.g. `ayoubbnina.com`).
2. Configure the DNS A/CNAME records as instructed in GitHub Pages settings.
3. Push — the workflow will include the `CNAME` automatically.

---

## 🧪 Build locally before pushing (optional sanity check)
```bash
cd frontend
yarn install
yarn build           # outputs to frontend/build/
npx serve -s build   # preview the production bundle
```
