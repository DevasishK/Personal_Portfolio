## Personal Portfolio

Dual-mode personal site by **Devasish Viswanadh Kolla** — [Repository on GitHub](https://github.com/DevasishK/Personal_Portfolio)

**Stack:** React 19, Vite, Tailwind CSS, Framer Motion, React Router, Supabase (optional), EmailJS (contact & fun-mode messages).

- **Professional mode** (`/pro`): recruiter-friendly layout, projects, resume, contact
- **Fun mode** (`/fun`): interactive hero (thought trails + mind cloud), gallery, music vibe, and playful sections
- **Landing** (`/`): choose mode

### SEO & indexing

- Canonical host: **`https://www.devasishkolla.in`** (see [`src/seo.ts`](src/seo.ts), [`public/sitemap.xml`](public/sitemap.xml), [`public/robots.txt`](public/robots.txt)). Point DNS so apex redirects to `www` (or the reverse) for a single preferred URL in Search Console.
- [`public/og-image.jpg`](public/og-image.jpg) is used for Open Graph / Twitter previews; replace it with your own ~1200×630 image (keep the same filename or update [`src/seo.ts`](src/seo.ts) `OG_IMAGE_PATH`).
- Google Search Console HTML verification: [`public/googleabfbbaf7823636b0.html`](public/googleabfbbaf7823636b0.html).

### Clone & run

```bash
git clone https://github.com/DevasishK/Personal_Portfolio.git
cd Personal_Portfolio
npm install
cp .env.example .env
# Edit .env with your keys (see below)
npm run dev
```

```bash
npm run build   # output: dist/
npm run preview
```

### Configure Supabase

This project works **without** Supabase for some features (questions + message wall fall back to local mock storage in the browser). The **visitor counter only uses Supabase** — without `VITE_SUPABASE_*` env vars it shows “— visits”. Add env vars + run the schema for a live global counter.

1) Create a Supabase project
2) In Supabase SQL editor, run:
- `supabase/schema.sql`
3) Add environment variables in `.env`:

```bash
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

After that you’ll get:
- **Visitor counter**: increments via RPC `increment_visit_count` and shows in the navbar

**Navbar shows `— visits` or only a small local number?** Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in Vercel (or Netlify) → **Environment Variables**, redeploy, and run `supabase/schema.sql` in the Supabase SQL editor. Without those, the site falls back to a per-browser count in `localStorage` (not a global total).
- **Ask Questions**: `Contact` form inserts into `questions`
- **Message wall**: reads/writes `messages`

### Customize content

Update sample content here:
- `src/utils/sampleData.js`

**Resume (local file or Google Drive)**

*Option A — Google Drive (good if your local PDF won’t preview):*
1. Upload the PDF to Google Drive → **Share** → **Anyone with the link** (Viewer).
2. Copy the share link.
3. In `src/utils/sampleData.js`, paste it into `RESUME_GOOGLE_DRIVE_SHARE_URL` (replace `YOUR_FILE_ID`).

*Option B — file in the repo:*
1. Put the PDF in `public/` (e.g. `public/resume.pdf`).
2. Set `RESUME_GOOGLE_DRIVE_SHARE_URL` to a placeholder with `YOUR_FILE_ID` (keeps local mode) or use `resumeFromLocal('/resume.pdf')` in `sampleData.js`.

### Deploy (Vercel / Netlify)

- Build command: `npm run build`
- Output directory: `dist`
- Add the same env vars (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`) in your hosting provider.

### Relationship Status requests (EmailJS)

Fun Mode includes a Relationship Status modal that **emails requests to you**. The status **never** changes automatically—you update it manually in code.

1) Create an EmailJS account + email service
2) Create a template and include these template variables:
- `name`
- `type`
- `statusAtTime`
- `message`
- `date`
- `createdAt`

3) Add env vars in `.env`:

```bash
VITE_EMAILJS_SERVICE_ID=...
VITE_EMAILJS_TEMPLATE_ID=...
VITE_EMAILJS_PUBLIC_KEY=...
```

### Project structure

Matches the modular layout requested:
- `src/pages/*` mode pages + landing
- `src/components/*` reusable UI widgets
- `src/sections/*` shared professional sections
- `src/services/*` Supabase client + email helpers

### License

Private / personal use unless otherwise noted.
