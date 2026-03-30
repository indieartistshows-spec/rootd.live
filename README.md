# Rootd Live

**Stack:** Next.js 14 · Supabase · Vercel

---

## Setup in 4 steps

### 1. Install
```bash
npm install
```

### 2. Supabase
1. Create a project at supabase.com
2. Go to **SQL Editor** → run `supabase-schema.sql`
3. Go to **Settings → API** → copy URL + anon key

### 3. Env vars
```bash
cp .env.local.example .env.local
# Fill in your Supabase URL and anon key
```

### 4. Run
```bash
npm run dev
```

---

## Deploy to Vercel
1. Push to GitHub
2. Import repo on vercel.com
3. Add env vars: `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy

---

## View signups
Supabase dashboard → Table Editor → `artist_signups`
