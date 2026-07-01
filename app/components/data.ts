export const skills = [
  { label: "Frontend", n: "01", span: 3, tags: ["TypeScript", "React", "Redux", "Next.js"] },
  { label: "Backend", n: "02", span: 3, tags: ["Python", "FastAPI", "Django", "Node.js", "Express", "REST API"] },
  { label: "Base de données", n: "03", span: 2, tags: ["MySQL", "PostgreSQL", "NoSQL"] },
  { label: "DevOps", n: "04", span: 2, tags: ["CI/CD", "GitHub Actions", "Jenkins", "Docker", "Nginx"] },
];


export const expertise = [
  {
    n: "01",
    title: "Applications web sur mesure",
    desc: "Je conçois et développe des applications web complètes : architecture technique, développement front-end et back-end, déploiement et mise en production.",
    tags: [
      "TypeScript",
      "React",
      "Next.js",
      "Tailwind CSS",
      "Bootstrap",
      "PHP",
      "Python",
      "Node.js",
      "Full Stack",
    ],
  },
  {
    n: "02",
    title: "Interfaces & expérience utilisateur",
    desc: "Des interfaces réactives, accessibles et soignées, conçues pour offrir une expérience fluide et favoriser la conversion. Du design system à l'intégration pixel-perfect.",
    tags: [
      "UI Design",
      "UX",
      "Design System",
      "Accessibilité",
      "Responsive",
    ],
  },
  {
    n: "03",
    title: "API & architecture back-end",
    desc: "Conception d'API REST robustes, modélisation de bases de données performantes, authentification, sécurité et architecture évolutive.",
    tags: [
  "Node.js",
  "PHP",
  "Python",
  "FastAPI",
  "Django",
  "Docker",
  "Nginx",
  "MySQL",
  "PostgreSQL",
  "MongoDB",
  "Sécurité",
],
  },
  {
    n: "04",
    title: "Performance & maintenance",
    desc: "Audit et optimisation des performances, SEO technique, intégration de services tiers, automatisation CI/CD et maintenance évolutive.",
    tags: [
      "Core Web Vitals",
      "SEO technique",
      "CI/CD",
      "SonarQube",
      "Monitoring",
    ],
  },
];

export type Project = {
  n: string;
  kind: string;
  title: string;
  image: string;
  desc: string;
  tags: string[];
  href: string ;
  flip: boolean;
  available : boolean;
};

export const projects: Project[] = [
  
  {
    n: "01",
    kind: "PROJET PERSONNEL · 2026",
    title: "Crypto-Explorer",
    image: "/images/preview/crypto-explorer.png",
    desc: "Tableau de bord de suivi de cryptomonnaies en temps réel : graphiques interactifs, historique des cours et alertes de prix personnalisées. Mise en place de pipelines CI/CD pour automatiser les déploiements.",
    tags: ["Tailwind", "TypeScript", "React", "Redux", "NextJs", "Chart.js", "Python", "FastAPI", "WebSocket", "CoinGecko API"],
    href:"https://crypto-explorer.fr",
    flip: false,
    available : true,
  },
  {
    n: "02",
    kind: "MISSION PRO · 2022–2025",
    title: "Crédit Agricole Assurances — PECA",
    image: "/images/preview/lock-svgrepo-com.png",
    desc: "Applications métier internes et SaaS. Fonctionnalité de suivi de projets adoptée par 4 équipes, connecteur d'intégration externe optimisé (20 s → 3 s) et pipelines CI/CD atteignant 85 % de couverture back-end. Et bien d'autres ...",
    tags: ["Tailwind", "Material UI",  "TypeScript", "React", "Redux","Python", "FastAPI", "MySQL", "SQLAlchemy", "Docker", "Jenkins", "Jira"],
    href: "#",
    flip: true,
    available : false 
  },
  {
    n: "03",
    kind: "FREELANCE · 2025",
    title: "Adsunga",
    image: "/images/preview/Adsunga.png",
    desc: "Plateforme web sur-mesure pour un client. Conception de l'interface front-end, intégration responsive. Intégration d'article via un back-office avec CK Editor. Mise en place de pipelines CI/CD",
    tags: ["Tailwind", "TypeScript", "React",  "Node.js", "MongoDB", "Docker",  "CircleCI", "Nginx", "CK Editor"],
    href: "https://adsunga.com",
    flip: false,
        available : true,

  },
  {
    n: "04",
    kind: "PROJET PERSONNEL · 2024",
    title: "Space-Explorer V2",
    image: "/images/preview/Space-Explorer.png",
    desc: "Site web de type blog dédié au partage d'articles sur l'astronomie, avec galerie d'images et forum de discussion.",
    tags: ["Tailwind", "React", "Node.js", "MongoDB","Docker", "CircleCI", "Nginx", ],
    href:"https://space-explorer.fr",
    flip: true,
        available : true,

  },
  
    {
    n: "05",
    kind: "PROJET PERSONNEL · 2021",
    title: "Space-Explorer",
    image: "/images/preview/crypto-explorer.png",
    desc: "Site web de type blog dédié au partage d'articles sur l'astronomie, avec galerie d'images et forum de discussion.",
    tags: ["Bootsrap 5", "PHP 8",  "Architecture MVC", "MySQL","Composer", "Apache", "CK Editor"],
    href:"https://space-explorer.fr",
    flip: false,
        available : true,

  },
  
];

export const timeline = [
  {
    period: "2023 — 2025",
    kind: "Contrat en alternance",
    title: "Développeur Full Stack — Crédit Agricole Assurances",
    desc: "Applications internes et environnements SaaS à dominante back-end Python (FastAPI / Django), front React / TypeScript / Redux. Connecteur d'intégration optimisé (20 s → 3 s), pipelines CI/CD Jenkins & Docker, 85 % de couverture back-end et refactorisation SOLID (−30 % de code).",
  },
   {
    period: "2022 — 2023",
    kind: "Contrat en alternance",
    title: "Développeur Full Stack — Cloud Campus",
    desc: "Applications internes et environnements SaaS à dominante back-end Python (FastAPI / Django), front React / TypeScript / Redux. Connecteur d'intégration optimisé (20 s → 3 s), pipelines CI/CD Jenkins & Docker, 85 % de couverture back-end et refactorisation SOLID (−30 % de code).",
  },
   {
    period: "2022 — 2022",
    kind: "Contrat en alternance",
    title: "Développeur Full Stack — Canton Consulting",
    desc: "SaaS de visioconférence et de réunions collaboratives avec espaces de travail partagés. Développement du front-end en React et TypeScript, du back-end en Java Quarkus, avec GitLab CI/CD et MySQL."
  },
{
period: "2024 — 2025",
kind: "FORMATION · Alternance",
title: "Mastère — Expert en sécurité des développements informatiques (Titre RNCP niveau 7 · Bac+5)",
desc: "Cloud Campus. Formation en alternance spécialisée en sécurité applicative, audit et protection des données. Validation des cinq blocs de compétences au travers d'études de cas, de réalisations techniques et de soutenances devant un jury.",
},
{
period: "2022 — 2024",
kind: "FORMATION · Alternance",
title: "Mastère — Développeur Web Full Stack (Titre RNCP niveau 6 · Bac+3/4)",
desc: "Live Campus. Formation en alternance axée sur la conception et le développement d'applications web full stack, l'architecture logicielle et le travail en équipe. Validation par la rédaction d'un mémoire, d'un rapport de projet, le développement d'une application mise en production et une soutenance devant un jury.",
},
{
period: "2021",
kind: "FORMATION",
title: "Développement Full Stack (Titre RNCP niveau 5 · Bac+2)",
desc: "Doranco. Formation aux fondamentaux du développement web de 7 mois, validée par la réalisation d'un projet web mis en production, la rédaction d'un rapport et une soutenance devant un jury.",
},
];

export const testimonials = [
  {
    quote:
      "« Rigoureux et autonome, Abderahmane livre un code propre et bien documenté. Un vrai plaisir de travailler avec lui sur des sujets exigeants. »",
    author: "XXX — Lead Tech, Crédit Agricole Assurances",
  },
  {
    quote:
      "« Force de proposition et toujours à l'écoute du besoin. Il a su livrer notre plateforme dans les délais avec une qualité au rendez-vous. »",
    author: "Julien Safou — Fondateur, projet Adsunga",
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
