# 📸 Image & Certificate Setup Guide

## Directory Structure

Your public folder is now organized as follows:

```
public/
├── profile/
│   └── profile.png          (Your profile picture)
├── projects/
│   ├── project1.png
│   ├── project2.png
│   └── project3.png
├── certificates/
│   └── mos-word-badge.png   (Your certification badge)
└── icons/                    (Additional icons if needed)
```

---

## 🏆 Adding Your Microsoft Word Certification Badge

### Step 1: Get Your Credly Badge

1. Go to **Credly**: https://www.credly.com
2. Sign in with your Microsoft account
3. Find your **Microsoft Office Specialist – Word Associate** badge
4. Click on the badge to open the credential page
5. **Copy the URL** from your browser (you'll need this)

### Step 2: Screenshot Your Badge

1. On your Credly credential page, take a screenshot of the badge image
2. Save it as: `mos-word-badge.png`
3. Place it in: `public/certificates/`

**Alternative:** Right-click the badge image → Save image as → `public/certificates/mos-word-badge.png`

### Step 3: Update Your Credly Link

Open `app/lib/data.ts` and find the certifications section:

```typescript
export const certifications = [
  {
    title: 'Microsoft Office Specialist – Word Associate',
    issuer: 'Microsoft 365 Apps',
    date: 'January 24, 2025',
    badge: '/certificates/mos-word-badge.png',
    credlyUrl: 'https://www.credly.com', // ← REPLACE THIS
    verified: true,
  },
];
```

Replace `https://www.credly.com` with your actual Credly badge URL.

Example:
```
credlyUrl: 'https://www.credly.com/badges/your-badge-id/public_url',
```

---

## 📷 Adding Your Profile Picture

1. Place your profile picture in: `public/profile/profile.png`
2. Update `app/lib/data.ts` to add your profile URL (optional)
3. Use it in components with:

```typescript
import Image from 'next/image';

<Image
  src="/profile/profile.png"
  alt="Profile"
  width={400}
  height={400}
/>
```

---

## 🖼️ Adding Project Images

1. Place project images in: `public/projects/`
2. Update `app/lib/data.ts` - the `projectsData` array already references these paths:

```typescript
export const projectsData = [
  {
    id: 1,
    title: 'Student Management System',
    image: '/projects/project1.jpg', // ← Your image path
    ...
  },
];
```

---

## ✅ Checklist

- [ ] Screenshot your Credly badge
- [ ] Save as `public/certificates/mos-word-badge.png`
- [ ] Update your Credly URL in `app/lib/data.ts`
- [ ] Add profile picture to `public/profile/profile.png`
- [ ] Add project images to `public/projects/`
- [ ] Run `npm run dev` to test

---

## 📝 Important Notes

**DO:** Place images in `public/` folder only

**DON'T:** Put images in:
- `app/`
- `components/`
- `lib/`

**Image Formats:** PNG, JPG, JPEG, WEBP are recommended

**Badge Size:** 128x128px to 256x256px is ideal

---

## 🔗 Badge Verification Link

Your About section now displays:
✓ Certificate badge image
✓ Certification title
✓ Issuer and date
✓ "View Credential" button linking to Credly

---

For questions or issues, check Next.js Image documentation:
https://nextjs.org/docs/app/api-reference/components/image
