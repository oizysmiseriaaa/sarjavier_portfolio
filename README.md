# Shean Anika Rojo Javier — Portfolio Website

A premium, responsive Next.js portfolio built with TypeScript, Tailwind CSS, Framer Motion, and Lucide React.

## Project Overview

This portfolio is designed to showcase Shean Anika Rojo Javier as a BSIT student, aspiring web developer, and future IT professional.

Sections included:
- Navbar
- Hero
- About
- Skills
- Projects
- Certifications
- Contact
- Footer

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React
- Next/Image

## Local Development

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Folder Structure

```
app/
  components/
    About.tsx
    Certifications.tsx
    Contact.tsx
    Footer.tsx
    Hero.tsx
    Navbar.tsx
    Projects.tsx
    Skills.tsx
  layout.tsx
  page.tsx
  globals.css
app/lib/
  data.ts
  utils.ts
public/
  profile/profile.png
  logo.png
  certificates/mos-word-badge.svg
  projects/
    street-paws.svg
    infinity-events.svg
    bagluxe.svg
    spotgarage.svg
    ccsfix.svg
```

## Update Images and Badge Files

### Replace project images

The project currently uses SVG placeholders in `public/projects/`:
- `street-paws.svg`
- `infinity-events.svg`
- `bagluxe.svg`
- `spotgarage.svg`
- `ccsfix.svg`

To replace them with high-quality PNG or JPG images:

1. Add the new image file to `public/projects/`.
2. Use the same file name, or update the path in `app/lib/data.ts`.

Example:

```ts
image: '/projects/street-paws.png',
```

### Replace certification badge

The certification badge uses a placeholder at:

- `public/certificates/mos-word-badge.svg`

Replace it with a real badge image, such as `mos-word-badge.png`, then update `app/lib/data.ts` if you change the file name.

### Replace profile or logo images

Current profile and logo files:
- `public/profile/profile.png`
- `public/logo.png`

You can replace these files directly with better quality versions.

## Update Data and Links

All portfolio content is sourced from `app/lib/data.ts`.

Important data includes:
- `portfolioData` for social links, profile image, and introduction
- `aboutData` for the about section
- `skillsData` for skill categories
- `projectsData` for project cards and links
- `certifications` for the certification card

## Deployment

Deploy with Vercel for a production-ready experience.

```bash
npm run build
npm run start
```

Then follow Vercel deployment steps or connect the repository on [vercel.com](https://vercel.com).

## Notes

- The site is responsive and built for mobile, tablet, and desktop.
- The portfolio is ready for review before deployment.
- Replace placeholder assets with real PNG/JPG files to improve visual polish.

## Extra

If you want, I can also update the portfolio to use real PNG/JPG images the moment you provide them. Simply add the files to `public/projects/` and `public/certificates/`, and I will adjust the data paths accordingly.
