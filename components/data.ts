export const skills = [
  { label: "Frontend", n: "01", span: 3, tags: ["TypeScript", "React", "Redux", "Next.js"] },
  { label: "Backend", n: "02", span: 3, tags: ["Python", "FastAPI", "Django", "Node.js", "Express", "REST API"] },
  { label: "Base de données", n: "03", span: 2, tags: ["MySQL", "PostgreSQL", "NoSQL"] },
  { label: "DevOps", n: "04", span: 2, tags: ["CI/CD", "GitHub Actions", "Jenkins", "Docker", "Nginx"] },
];

export const expertise = [
  {
    n: "01",
    title: "Applications web sur-mesure",
    desc: "Je conçois et développe des applications complètes : architecture technique, développement front-end et back-end, déploiement et mise en production.",
    tags: ["React / Next.js", "Node.js", "Full Stack"],
  },
  {
    n: "02",
    title: "Interfaces & expérience",
    desc: "Des interfaces réactives, accessibles et soignées, pensées pour la clarté et la conversion. Du design system à l'intégration pixel-perfect.",
    tags: ["UI / UX", "Accessibilité", "Responsive"],
  },
  {
    n: "03",
    title: "API & architecture back-end",
    desc: "Conception d'API REST / GraphQL robustes, modélisation de bases de données performantes, authentification et sécurité des données.",
    tags: ["REST / GraphQL", "PostgreSQL", "Sécurité"],
  },
  {
    n: "04",
    title: "Performance & maintenance",
    desc: "Audit et optimisation des temps de chargement, SEO technique, intégration de services tiers, CI/CD et suivi des évolutions dans la durée.",
    tags: ["Web Vitals", "CI/CD", "SEO technique"],
  },
];

export type Project = {
  n: string;
  kind: string;
  title: string;
  preview: string;
  desc: string;
  tags: string[];
  flip: boolean;
};

export const projects: Project[] = [
  {
    n: "01",
    kind: "PROJET PERSONNEL · 2025",
    title: "Space-Explorer.fr",
    preview: "space-explorer.fr",
    desc: "Plateforme d'exploration spatiale qui agrège et visualise des données astronomiques en temps réel via les API de la NASA. Recherche de planètes, imagerie et fiches détaillées.",
    tags: ["React", "Next.js", "TypeScript", "NASA API"],
    flip: false,
  },
  {
    n: "02",
    kind: "MISSION PRO · 2022–2024",
    title: "Crédit Agricole Assurances — PECA",
    preview: "projet PECA",
    desc: "Applications métier internes et SaaS. Fonctionnalité de suivi de projets adoptée par 4 équipes, connecteur d'intégration externe optimisé (20 s → 3 s) et pipelines CI/CD atteignant 85 % de couverture back-end.",
    tags: ["FastAPI", "React", "Redux", "Docker", "Jenkins"],
    flip: true,
  },
  {
    n: "03",
    kind: "FREELANCE · 2024",
    title: "Adsunga",
    preview: "adsunga",
    desc: "Plateforme web sur-mesure pour un client. Conception de l'interface front-end, intégration responsive et connexion à des API tierces.",
    tags: ["React", "TypeScript", "FastAPI", "REST API"],
    flip: false,
  },
  {
    n: "04",
    kind: "PROJET PERSONNEL · 2023",
    title: "Crypto-Explorer",
    preview: "crypto-explorer",
    desc: "Tableau de bord de suivi de cryptomonnaies en temps réel : graphiques interactifs, historique des cours et alertes de prix personnalisées.",
    tags: ["React", "TypeScript", "Chart.js", "FastAPI"],
    flip: true,
  },
];

export const timeline = [
  {
    period: "2022 — 2024",
    kind: "EXPÉRIENCE",
    title: "Développeur Full Stack — Crédit Agricole Assurances",
    desc: "Applications internes et environnements SaaS à dominante back-end Python (FastAPI / Django), front React / TypeScript / Redux. Connecteur d'intégration optimisé (20 s → 3 s), pipelines CI/CD Jenkins & Docker, 85 % de couverture back-end et refactorisation SOLID (−30 % de code).",
  },
  {
    period: "2024 — 2025",
    kind: "FORMATION",
    title: "Mastère — Expert en sécurité des développements informatiques",
    desc: "Cloud Campus. Spécialisation en sécurité applicative : bonnes pratiques de développement sécurisé, audit et protection des données.",
  },
  {
    period: "2023 — 2025",
    kind: "FORMATION",
    title: "Mastère — Développeur Web Full Stack",
    desc: "Live Campus. Conception et développement d'applications web full stack, architecture logicielle et travail en équipe sur des projets concrets.",
  },
  {
    period: "2021",
    kind: "FORMATION",
    title: "Développement Full Stack — Doranco",
    desc: "Formation aux fondamentaux du développement web : langages, frameworks modernes et premières mises en pratique.",
  },
];

export const testimonials = [
  {
    quote:
      "« Rigoureux et autonome, Abderahmane livre un code propre et bien documenté. Un vrai plaisir de travailler avec lui sur des sujets exigeants. »",
    author: "— Lead Tech, Crédit Agricole Assurances",
  },
  {
    quote:
      "« Force de proposition et toujours à l'écoute du besoin. Il a su livrer notre plateforme dans les délais avec une qualité au rendez-vous. »",
    author: "— Fondateur, projet Adsunga",
  },
];

export const marqueeItems = [
  "Full Stack",
  "React",
  "Node.js",
  "TypeScript",
  "Next.js",
  "UI / UX",
  "Performance",
];
