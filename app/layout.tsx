import type { Metadata } from "next";
import "@/app/globals.css";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "Abderahmane Adjali — Développeur Web Full Stack",
  description:
    "Développeur full-stack à dominante back-end Python (FastAPI / Django) et front React / TypeScript. 4 ans d'expérience, dont 2,5 ans chez Crédit Agricole Assurances.",
  authors: [{ name: "Abderahmane Adjali" }],
  keywords: [
    "Développeur Full Stack",
    "React",
    "FastAPI",
    "Python",
    "TypeScript",
    "Next.js",
    "Portfolio",
  ],
  openGraph: {
    title: "Abderahmane Adjali — Développeur Web Full Stack",
    description:
      "Portfolio — applications web performantes, de l'architecture back-end jusqu'à l'interface.",
    type: "website",
    locale: "fr_FR",
  },
  icons: {
    icon: "/images/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
