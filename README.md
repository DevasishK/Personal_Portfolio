## Personal Portfolio

Dual-mode personal site by **Devasish Viswanadh Kolla** — [Repository on GitHub](https://github.com/DevasishK/Personal_Portfolio)

**Stack:** React 19, Vite, Tailwind CSS, Framer Motion, React Router, Supabase (optional), EmailJS (contact & fun-mode messages).

- **Professional mode** (`/pro`): recruiter-friendly layout, projects, resume, contact
- **Fun mode** (`/fun`): interactive hero (thought trails + mind cloud), gallery, music vibe, and playful sections
- **Landing** (`/`): choose mode

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

This project works **without** Supabase (it falls back to local mock storage), but becomes “full-stack” when you add env vars + run the schema.

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
- **Ask Questions**: `Contact` form inserts into `questions`
- **Message wall**: reads/writes `messages`

### Customize content

Update sample content here:
- `src/utils/sampleData.js`

If you want a real resume download:
- Put your file at `public/resume.pdf`
- Update `resumeUrl` in `src/utils/sampleData.js` if needed

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
