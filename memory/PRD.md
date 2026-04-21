# M & J Auto Services — PRD

## Original Problem Statement
Build a professional, highly animated marketing website for "M & J Auto Services" — a 5-star trusted auto repair shop in San Mateo, CA. White + brown palette, Framer Motion animations, live Open/Closed status, contact form stored in DB, embedded Google Maps, SEO/schema.

## User Personas
- **Local driver (primary)** — needs trustworthy mechanic; values honest pricing + 5-star reviews.
- **Vehicle buyer** — scheduling pre-purchase inspection.
- **Returning customer** — booking routine maintenance (oil, brakes, tune-up).

## Core Requirements (static)
- Brand: M & J Auto Services · 1037 S Claremont St, San Mateo, CA 94402 · (650) 834-6690
- Hours: Mon–Fri 8AM–6PM · Sat 8AM–12PM · Sun Closed (America/Los_Angeles)
- Palette: #3E2723 / #795548 / #FAF7F2 / #FFFFFF / #B87333
- Fonts: Montserrat (headings) + Open Sans (body)
- Animation lib: Framer Motion
- Must prominently feature 5.0 Google rating (7 reviews)

## Implemented (2026-02)
- **Backend** (`/app/backend/server.py`):
  - `GET /api/` — health
  - `POST /api/contact` — validates name/email/phone/message; stores in Mongo `contacts`
  - `GET /api/contact` — lists submissions (no `_id`), sorted desc
  - `GET /api/shop/status` — live Open/Closed based on America/Los_Angeles
  - `/status` CRUD retained
- **Frontend** (`/app/frontend/src`):
  - `components/Loader.jsx` — 1.5s spinning wrench intro
  - `components/Navbar.jsx` — sticky glass nav w/ mobile menu
  - `components/Hero.jsx` — parallax, animated headline, shimmering 5-star badge, live Open/Closed chip, dual CTAs (Call Now / Get Quote)
  - `components/About.jsx` — split layout + floating satisfaction card
  - `components/Services.jsx` — 10 service cards with tilt hover
  - `components/WhyChooseUs.jsx` — scroll-triggered counters (5.0 / 7 / 100%)
  - `components/Reviews.jsx` — animated carousel with prev/next/dots
  - `components/Contact.jsx` — Google Maps iframe, phone tel-link, Get Directions, hours table (today highlighted + "Today" label), live Open/Closed badge, contact form w/ toast + success banner
  - `components/Footer.jsx` — brown bg, quick links, address/hours
  - `lib/hours.js` — timezone-aware open/closed computation
- **SEO / meta** (`public/index.html`):
  - Title, description, keywords, Open Graph tags
  - Schema.org `AutoRepair` JSON-LD w/ aggregateRating + opening hours
  - Brown-bronze wrench SVG favicon
  - Google Fonts: Montserrat + Open Sans

## Testing
- Testing agent iteration 1: **100% backend (8/8), 100% frontend critical flows**. No bugs.

## Prioritized Backlog (P0/P1/P2)
- **P1 – Admin dashboard** to view contact submissions (auth-protected)
- **P1 – Email notifications** on new contact (Resend/SendGrid — needs user API key)
- **P2 – Spam protection** on contact form (honeypot + rate limit)
- **P2 – Restrict CORS origins** for production
- **P2 – Online booking** with calendar time-slot picker
- **P2 – Before/after gallery** of repair jobs
- **P2 – Google Reviews live embed** (API)

## Next Tasks
1. Add email notification + admin dashboard after user provides email API key
2. Harden `/api/contact` (rate limit + captcha) before go-live
3. Lock CORS origin to production domain
