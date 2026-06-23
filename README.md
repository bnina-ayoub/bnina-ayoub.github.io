<div align="center">

# `AYOUB BNINA // PORTFOLIO`

**Tactical-HUD-styled portfolio for an Embedded Firmware & Robotics Engineer.**
Bare-metal C · STM32 · RTOS · Anti-UAV systems · React + Tailwind · GitHub Pages.

[![Deploy Status](https://img.shields.io/github/actions/workflow/status/bnina-ayoub/portfolio/deploy.yml?branch=main&label=deploy&style=for-the-badge&color=FF5722)](../../actions)
[![GitHub Pages](https://img.shields.io/badge/live-github_pages-00FF41?style=for-the-badge&logo=github)](https://bnina-ayoub.github.io/portfolio/)
[![License: MIT](https://img.shields.io/badge/license-MIT-FFB000?style=for-the-badge)](LICENSE)
![React](https://img.shields.io/badge/react-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Tailwind](https://img.shields.io/badge/tailwind-3.4-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=black)

</div>

---

```
  ┌──────────────────────────────────────────────────────────┐
  │ STATUS: OPERATIONAL    LAT/LON: 41.2867° N · 36.3300° E  │
  │ CALLSIGN: BNINA-A      CLEARANCE: YTB SCHOLAR · 2026     │
  └──────────────────────────────────────────────────────────┘
```

A single-page, static React portfolio fusing **Industrial Robotics** and **Tactical/Defense HUD** aesthetics — built to showcase embedded firmware, robotics and defense-systems work (anti-UAV vision, STM32/RTOS control, micro-ROS pipelines). Ships as a fully static bundle. Zero backend. Auto-deploys to GitHub Pages on every push.

---

## ▍ Live demo

> **Live →** [`bnina-ayoub.github.io/portfolio`](https://bnina-ayoub.github.io/portfolio/) *(update once your Pages URL is live)*

<sub>🎯 Featuring an animated radar sweep, a boot-up terminal typewriter, target-lock crosshair hovers on project cards, a persistent UTC HUD status bar, scanline overlays and a blueprint grid background.</sub>

---

## ▍ Features

| | |
|---|---|
| 🎯 **Tactical HUD aesthetic** | Graphite base + signal orange / HUD green / tactical amber accents, blueprint grids, scanlines, grain texture |
| 📡 **Animated hero** | Live radar sweep with blips, boot-up terminal log typewriter, dossier-style stats grid |
| 🛰️ **8 sections** | Hero · Dossier · Systems (Skills) · Mission Log (Experience) · Target Profiles (Projects) · Academic Records · Decorations · Comms (Contact) |
| 🎮 **Interactive** | Smooth-scroll nav with scroll-spy · target-lock crosshair on project hover · live UTC clock · copy-email-to-clipboard · sonner toasts |
| 📬 **Contact form** | Composes a `mailto:` link to your address — static-friendly, no backend required |
| 📱 **Fully responsive** | Mobile-first nav, bento grids collapse to single column |
| ♿ **Accessible** | Semantic HTML, ARIA labels on icon buttons, WCAG-AA contrast in the tactical palette |
| 🚀 **CI/CD** | GitHub Actions builds + deploys to Pages on every push to `main` |
| 🧩 **Single content file** | All text/data lives in `frontend/src/data/portfolio.js` — edit once, site updates everywhere |

---

## ▍ Stack

```yaml
frontend:
  framework:    React 19 (Create React App + CRACO)
  styling:      Tailwind CSS 3.4 + custom HUD palette
  icons:        lucide-react
  toasts:       sonner
  fonts:        Chivo · IBM Plex Sans · JetBrains Mono (Google Fonts)
hosting:        GitHub Pages (static)
ci:             GitHub Actions
state:          none — purely static content
```

---

## ▍ Project structure

```
.
├── .github/
│   └── workflows/
│       └── deploy.yml             # Auto build + deploy to GitHub Pages
├── frontend/
│   ├── public/
│   │   └── index.html             # <title>, meta tags
│   ├── src/
│   │   ├── data/
│   │   │   └── portfolio.js       # ★ ALL content lives here ★
│   │   ├── components/
│   │   │   ├── Nav.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Skills.jsx
│   │   │   ├── Experience.jsx
│   │   │   ├── Projects.jsx
│   │   │   ├── Education.jsx
│   │   │   ├── Awards.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── HUDStatusBar.jsx
│   │   ├── App.js
│   │   ├── index.css              # Global theme + scanlines/grid
│   │   └── index.js
│   ├── tailwind.config.js         # Color palette, fonts, animations
│   └── package.json
├── DEPLOY.md                      # Full GitHub Pages setup guide
└── README.md
```

> The `backend/` folder (if present) is **not used** by the deployed site — this is intentionally a static SPA.

---

## ▍ Quick start

### Run locally

```bash
git clone https://github.com/bnina-ayoub/portfolio.git
cd portfolio/frontend
yarn install
yarn start              # → http://localhost:3000
```

### Production build

```bash
cd frontend
yarn build              # outputs frontend/build/
npx serve -s build      # preview the production bundle locally
```

---

## ▍ Customize (no code required for most edits)

**95% of edits happen in one file:** [`frontend/src/data/portfolio.js`](frontend/src/data/portfolio.js)

| Change... | Edit in `portfolio.js` |
|---|---|
| Name, title, email, phone, LinkedIn, GitHub, summary | `profile` |
| Hero stat tiles | `stats` |
| Skills + percentages | `skills` |
| Internships / mission log | `experience` |
| Project cards (title, status, image, stack) | `projects` |
| Education records | `education` |
| Awards / certifications | `awards` |
| Top-nav labels | `navLinks` |

**Project status badges:**
`"ONGOING"` → amber · `"COMPLETED"` → green · `"ARCHIVE"` → grey

**Project media:** set the `image:` field to an Unsplash/Pexels direct URL **or** place a file inside `frontend/public/` and reference it as `/your-file.png`.

### Theming

| Change... | File |
|---|---|
| Color palette (`signal`, `hud`, `tactical-amber`, `graphite`) | `frontend/tailwind.config.js` |
| Background grid, scanlines, grain, scrollbar | `frontend/src/index.css` |
| Fonts | `frontend/src/index.css` (`@import url(...)`) + `tailwind.config.js` |
| Browser tab title / meta | `frontend/public/index.html` |

### Add / remove a section
1. Add or remove the section component in `frontend/src/App.js`.
2. Update the `navLinks` array in `portfolio.js`.

---

## ▍ Deploy

This repo ships with a complete GitHub Actions workflow at [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml). It rebuilds and republishes on every push to `main`.

**One-time setup:**

1. Push the repo to GitHub.
2. **Settings → Pages → Source: GitHub Actions** ✅
3. That's it — open the **Actions** tab and watch the first deploy.

Detailed instructions (custom domain, manual triggers, local preview) → [`DEPLOY.md`](DEPLOY.md).

**Manual trigger:** **Actions** → *Build & Deploy Portfolio to GitHub Pages* → **Run workflow**.

---

## ▍ Color palette

| Token | Hex | Role |
|---|---|---|
| `graphite-800` | `#0E1014` | Page base |
| `graphite-700` | `#161A20` | Card surface |
| `graphite-400` | `#30363D` | Borders |
| `signal` | `#FF5722` | Primary CTA / highlights |
| `tactical-amber` | `#FFB000` | Warnings / "ongoing" / dates |
| `hud-green` | `#00FF41` | Active / healthy / monospace data |
| `alert-red` | `#FF3B30` | Alerts |

---

## ▍ Roadmap

- [ ] Replace placeholder TGT-003 / TGT-004 project media with real videos & images
- [ ] Add a downloadable **PDF CV** button in the hero
- [ ] Optional 3rd-party contact endpoint (Formspree / Resend) for non-static hosts
- [ ] Optional WebGL drone model in the hero
- [ ] OG / Twitter social card image
- [ ] Add a small recruiter availability banner + vCard download

---

## ▍ Contact

**Ayoub Bnina** — Embedded Robotics Engineer · YTB Scholar
📍 Samsun, Türkiye · 🌐 [LinkedIn](https://linkedin.com/in/ayoub-bnina) · 💻 [GitHub](https://github.com/bnina-ayoub)
✉️ [`bninayoub.pro@gmail.com`](mailto:bninayoub.pro@gmail.com)

---

## ▍ License

Released under the **MIT License**. See [`LICENSE`](LICENSE).
Feel free to fork and adapt for your own engineering portfolio — a small credit link back is appreciated but not required.

---

<div align="center">

```
// END OF TRANSMISSION
SYS: NOMINAL · CHANNEL SECURE · UTC SYNCED
```

</div>
