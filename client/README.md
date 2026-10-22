# Vitaliy Kulesh - React Portfolio Assignment 1

COMP229 Web Application Development - Assignment 1 starter/complete portfolio structure.

## Pages

- Home
- About Me
- Projects
- Education
- Services
- Contact Me

## Run locally

```bash
npm install
npm run dev
```

Open the local URL shown by Vite, normally http://localhost:5173/.

## Build check

```bash
npm run build
npm run preview
```

## Replace before submission

1. Replace `src/assets/headshot-placeholder.svg` with your real headshot and update the import in `src/pages/About.tsx` if the filename changes.
2. Put your real PDF resume at `public/resume.pdf`.
3. Replace the placeholder email and phone number in `src/pages/Contact.tsx`.
4. Replace the Marine Automation graduation year and institution in `src/pages/Education.tsx`.
5. Review project descriptions and adjust them to match your actual work.

## Suggested Git commit history

```bash
git init
git add .
git commit -m "Create React portfolio project structure"

git add src/components src/App.tsx
git commit -m "Add navigation logo footer and routing"

git add src/pages/Home.tsx src/pages/About.tsx
git commit -m "Build home and about pages"

git add src/pages/Projects.tsx src/pages/Education.tsx src/pages/Services.tsx
git commit -m "Add projects education and services pages"

git add src/pages/Contact.tsx
git commit -m "Add contact form and home redirect"

git add src/styles src/assets
git commit -m "Complete responsive styling and portfolio assets"
```

If the files were already committed together, make future meaningful edits as separate commits instead of creating fake history.

## Deploy

### Vercel

1. Push the project to your own GitHub repository.
2. Sign in to Vercel and choose **Add New > Project**.
3. Import your GitHub repository.
4. Framework should detect **Vite** automatically.
5. Build command: `npm run build`.
6. Output directory: `dist`.
7. Click **Deploy**.
8. Submit the final live URL.

### Netlify

1. Push to GitHub.
2. In Netlify choose **Add new site > Import an existing project**.
3. Select the GitHub repository.
4. Build command: `npm run build`.
5. Publish directory: `dist`.
6. Deploy. `netlify.toml` already contains the React Router SPA redirect.
