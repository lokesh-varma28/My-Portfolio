<div align="center">

# Natra Lokesh · Developer Portfolio

**Full Stack & React Native developer building fast web apps and cross-platform mobile apps.**

[![Live site](https://img.shields.io/badge/Live-natralokesh.in-06b6d4?style=for-the-badge&logo=vercel&logoColor=white)](https://www.natralokesh.in/)
[![React](https://img.shields.io/badge/React_19-20232a?style=for-the-badge&logo=react&logoColor=61dafb)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-646cff?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_4-0f172a?style=for-the-badge&logo=tailwindcss&logoColor=38bdf8)](https://tailwindcss.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB_Atlas-0b1f14?style=for-the-badge&logo=mongodb&logoColor=47a248)](https://www.mongodb.com/atlas)

[**View the live site →**](https://www.natralokesh.in/)

</div>

---

## Overview

A modern, animated single-page portfolio with a working contact pipeline: messages are saved to **MongoDB Atlas** and a styled notification email is sent through **Resend**. It supports **dark and light themes**, pulls my public repositories live from the **GitHub API**, and has a downloadable resume.

## Highlights

- **Dark / light theme** with a header toggle, saved in the browser and applied before first paint (no flash).
- **Animated hero** with a typing role line, floating skill badges, mouse spotlight and an interactive code window.
- **Filterable tech stack** grouped into Frontend, Mobile, Backend, Database, Testing, Tools and AI Tools.
- **Live GitHub repositories**: search, language filters and a manual sync button.
- **Mobile engineering showcase** with an interactive phone mockup.
- **Contact form** that validates, stores the message in MongoDB and emails me, with a confetti success state.
- **Resume download** from the hero and footer.
- **Responsive**: mobile-first layout checked down to 375px wide, with smooth scrolling powered by Lenis.

## Tech stack

| Area | Tools |
| --- | --- |
| Frontend | React 19, Vite, Tailwind CSS 4 |
| Animation | Framer Motion, GSAP, Lenis, canvas-confetti |
| Icons | lucide-react, react-icons |
| Backend | Vercel Serverless Function (`api/contact.js`), Node.js |
| Database | MongoDB Atlas (official `mongodb` driver) |
| Email | Resend |
| Tooling | ESLint, Vercel CLI |
| Hosting | Vercel, custom domain |

## Project structure

```text
My-Portfolio/
├── api/
│   └── contact.js          # POST /api/contact: validate, save to MongoDB, send email
├── public/
│   ├── tools/              # Logos used in the tech stack section
│   └── Natra-Lokesh-Resume.pdf
├── src/
│   ├── components/         # Navbar, Hero, About, TechStack, GithubRepos, Contact, Footer...
│   ├── data/               # Static content
│   ├── styles/theme.css    # Light theme tokens (dark is the default)
│   ├── App.jsx
│   └── main.jsx
├── .env.example            # Environment variable template
├── index.html
└── vite.config.js
```

## Getting started

### Prerequisites

- Node.js 20 or newer
- A free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster
- A [Resend](https://resend.com/) account and API key

### Install

```bash
git clone https://github.com/lokesh-varma28/My-Portfolio.git
cd My-Portfolio
npm install
```

### Configure environment variables

```bash
cp .env.example .env
```

Fill in the values (see the table below). Never commit `.env`.

### Run locally

```bash
# Frontend only (the contact form will not work, /api is not served by Vite)
npm run dev

# Full stack including the /api functions (use this to test the contact form)
npx vercel dev
```

### Other scripts

| Command | What it does |
| --- | --- |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint |

## Environment variables

| Variable | Required | Description |
| --- | --- | --- |
| `MONGODB_URI` | Yes | MongoDB Atlas connection string |
| `MONGODB_DB` | No | Database name, defaults to `portfolio` |
| `RESEND_API_KEY` | Yes | Resend API key (server side only) |
| `CONTACT_NOTIFICATION_EMAIL` | Yes | Inbox that receives new messages |
| `RESEND_FROM` | No | Sender, for example `Portfolio <contact@yourdomain.com>`. Defaults to Resend's test sender |

> **Resend test mode:** without a verified domain, Resend only delivers to the email address of your own Resend account. Verify your domain in Resend and set `RESEND_FROM` to send to any inbox.

## Contact API

`POST /api/contact`

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "phone": "+91 98765 43210",
  "subject": "Project inquiry",
  "message": "Hi, I would like to talk about..."
}
```

| Status | Meaning |
| --- | --- |
| `200` | Saved to MongoDB. Response includes `emailSent` (true when the notification email was delivered) |
| `400` | Missing `name`, `email` or `message` |
| `405` | Method not allowed (only `POST`) |
| `500` | Could not save the message |

Messages are stored in the `contact_submissions` collection. The email step is best effort: if it fails, the message is still saved.

## Deployment

1. Push the repository to GitHub and import it in [Vercel](https://vercel.com/).
2. Add the environment variables above under **Settings → Environment Variables** (Production).
3. Redeploy after changing any variable.
4. Add a custom domain under **Settings → Domains** and redirect the apex domain to `www`.

## Troubleshooting

| Problem | Fix |
| --- | --- |
| Contact form fails on `localhost:5173` | Expected. Use `npx vercel dev` so `/api/contact` is served |
| `querySrv ECONNREFUSED` when connecting to Atlas locally | Your network DNS blocks SRV lookups. Switch DNS to `8.8.8.8` / `1.1.1.1` or use a non-SRV Atlas connection string |
| `tlsv1 alert internal error` | Allow your IP (or `0.0.0.0/0`) under Atlas **Network Access** |
| Resend returns `403 validation_error` | You are sending from the test sender to an address other than your Resend account email. Verify a domain |
| Port 3000 already in use | Stop the old `vercel dev` process or use the port it prints |

## Notes

- The `supabase/` folder is a leftover from an earlier version and is no longer used.
- GitHub data is fetched from the public API, so very frequent reloads can hit the unauthenticated rate limit.

## Contact

- Website: [natralokesh.in](https://www.natralokesh.in/)
- GitHub: [@lokesh-varma28](https://github.com/lokesh-varma28)
- Location: Peravaram, Andhra Pradesh, India

---

<div align="center">

© 2026 Natra Lokesh. All rights reserved.

</div>
