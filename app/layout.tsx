import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { owner, siteUrl } from "@/lib/constants";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Shean Anika Rojo Javier | Frontend Developer & IT Student",
  description:
    "Frontend Developer and Information Technology student showcasing web development projects, technical skills, certifications, and professional growth.",
  keywords: [
    "Frontend Developer",
    "Web Developer",
    "Information Technology",
    "BSIT",
    "JavaScript",
    "Portfolio",
    "Philippines Developer",
    "Student Developer",
    "Microsoft Office Specialist",
  ],
  authors: [{ name: owner.name }],
  creator: owner.name,
  icons: {
    icon: "/favicon.ico",
    apple: "/logo.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Shean Anika Rojo Javier Portfolio",
    title: "Shean Anika Rojo Javier | Frontend Developer & IT Student",
    description:
      "Frontend Developer and Information Technology student showcasing projects, technical skills, certifications, and professional growth.",
    images: [
      {
        url: "/profile/profile.png",
        width: 1200,
        height: 1200,
        alt: "Shean Anika Rojo Javier",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shean Anika Rojo Javier | Frontend Developer & IT Student",
    description:
      "Frontend Developer and Information Technology student showcasing projects, skills, certifications, and professional growth.",
    images: ["/profile/profile.png"],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <body className="bg-[var(--background)] text-[var(--foreground)] antialiased">
        {children}
      </body>
    </html>
  );
}
