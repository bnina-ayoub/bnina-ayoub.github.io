# PRD — Ayoub Bnina · Embedded Robotics Portfolio

## Original Problem Statement
> Build a landing page: I want to create a digital portfolio of me as an Embedded Firmware/Robotics Engineer & hobbyist into Robotics and Defense systems like anti-UAV and drones, where I can showcase my projects (video and images) and my current skills and education. The app should be hosted on GitHub, interactive and attractive, with a theme related to the attached CV.

## User Choices (verbatim)
- Visual theme: hybrid **Industrial Robotics + Tactical/Defense HUD** (graphite + signal orange + military green/amber, blueprint grids, radar overlays, mono fonts)
- Projects: placeholder cards now, media added later
- Contact form: working
- Sections: Hero, About, Skills, Experience, Projects, Education, Awards, Contact
- Hosting: **static-only** (GitHub Pages compatible)

## Architecture
- Frontend: React 19 + CRA + Tailwind + Lucide + Sonner toasts
- Backend: not used (static SPA — content lives in `/app/frontend/src/data/portfolio.js`)
- Contact form: client-side `mailto:` composer (no backend dependency)
- All assets remote (Unsplash/Pexels). No server-side persistence.

## Implemented (2026-12)
- Hero: boot-up terminal typewriter, animated radar with sweep + blips, stats grid, dual CTAs
- About: dossier card + IR-style operative portrait
- Skills: 4-category bento (HW · SW/RTOS · Protocols · Languages) with bars and chip ribbon
- Experience: mission-log timeline (3 internships) with stack tags
- Projects: 4 target-profile cards (2 from CV + 2 placeholders) with status badges and hover crosshair lock
- Education: 3 academic records with INCOMING/ACTIVE/COMPLETED states
- Awards: 6 decorations + IEEE RAS field commendation banner
- Contact: terminal-style form composing a `mailto:` to `bninayoub.pro@gmail.com` + clipboard copy + sonner toasts
- Footer + persistent HUD status bar with live UTC clock
- Smooth-scroll nav with scroll-spy and mobile menu
- Custom Tailwind palette (graphite, signal orange, tactical amber, HUD green) + scanline/grain/grid overlays

## Tested
- 52/53 functional E2E assertions pass (Playwright via testing_agent_v3)
- 0 console errors · 0 failed network requests · 0 backend issues (no backend)

## Backlog
- **P1** — Replace placeholder TGT-003/004 project cards with real video/image media when user shares them
- **P2** — Optional: hook contact form to a 3rd-party static-friendly endpoint (Formspree, Resend via serverless) for users on hosts that allow it
- **P2** — Add GitHub Pages deployment config (`gh-pages` package + `homepage` field) once user creates the repo
- **P3** — Add an OG image / social preview card
- **P3** — Add downloadable PDF CV button (when user provides updated CV)
