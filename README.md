# Rootd Live

Landing page for Rootd Live — demand validation for independent artists in India.

## Stack

- **Frontend**: Next.js 14 (App Router) on Vercel
- **Backend**: Supabase (Postgres + Row Level Security)
- **Fonts**: Anton, Space Grotesk, DM Mono, Archivo Black (via next/font)

---

## Setup

### 1. Clone and install

```bash
npm install
```

### 2. Set up Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run `supabase-schema.sql`
3. Go to **Settings → API** and copy your Project URL and anon key

### 3. Environment variables

```bash
cp .env.local.example .env.local
```

Fill in your Supabase values in `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 4. Run locally

```bash
npm run dev
```

---

## Deploy to Vercel

1. Push to GitHub
2. Import repo in [vercel.com](https://vercel.com)
3. Add the same env vars under **Settings → Environment Variables**
4. Deploy

---

## Images

All images are in `/public/images/`:

| File | Used in |
|------|---------|
| `hero-kalakaar.jpg` | Hero background |
| `pain-musician.jpg` | Pain section background |
| `how-skater.jpg` | How It Works background |
| `proof-trumpet.jpg` | Proof section background |

---

## Viewing signups

In your Supabase dashboard → **Table Editor → artist_signups**.

You can also export as CSV from there for manual follow-up.
