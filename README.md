# City Suburb Inc. Website

Modern website for City Suburb Inc., a roofing and masonry contractor serving Queens, Brooklyn, Manhattan, Bronx, and Long Island.

## Stack

- **Next.js 14** (App Router)
- **Tailwind CSS** (custom design system)
- **React Hook Form + Zod** (quote form validation)
- **Framer Motion** (animations)
- **Lucide React** (icons)

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment (optional)

Copy `.env.example` to `.env.local` and add:

- `NEXT_PUBLIC_TAWK_PROPERTY_ID` – for Tawk.to chat widget
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` – for custom map (embed works without it)

## Features

- Hero with CTAs and trust badges
- Sticky header and mobile menu
- Quote form (modal) with validation and honeypot
- Services grid, Why Choose Us, Before/After gallery
- Testimonials carousel, service areas map, trust/credentials
- FAQ accordion with search
- Footer with newsletter signup and contact info
- Chat widget (placeholder; add Tawk.to script when ready)
- JSON-LD LocalBusiness schema for SEO

## API Routes

- `POST /api/contact` – quote form (extend with DB + email in production)
- `POST /api/newsletter` – newsletter signup (extend with Mailchimp etc.)

## Deploy

Build and start:

```bash
npm run build
npm start
```

Recommended: deploy frontend to **Vercel** and connect backend (DB, SMTP) via environment variables.
# Ravis-repository
