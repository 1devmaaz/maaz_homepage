export type NavLink = {
  label: string;
  href: string;
};

export type SocialLink = {
  label: string;
  href: string;
  icon: "instagram" | "linkedin" | "github";
};

export type ProjectCaseStudy = {
  problem: string;
  challenge: string;
  architecture: string;
  decisions: string[];
  result: string;
  lessons: string[];
};

export type ArchitectureNode = {
  id: string;
  label: string;
  purpose: string;
  responsibilities: string[];
  technologies: string[];
  communication: string;
};

export type Project = {
  slug: string;
  title: string;
  description: string;
  overview: string;
  highlights: string[];
  tags: string[];
  href?: string;
  image?: string;
  role?: string;
  year?: string;
  caseStudy: ProjectCaseStudy;
  /** Ordered request path for the live architecture diagram */
  architecture: ArchitectureNode[];
};

export type PricingPlan = {
  name: string;
  price: string;
  description: string;
  features: string[];
  highlighted?: boolean;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type Metric = {
  id: string;
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  description: string;
};

export type TimelineMilestone = {
  id: string;
  year: string;
  title: string;
  description: string;
  lesson: string;
  tech: string[];
  image?: string;
};

export type ThinkingStage = {
  id: string;
  label: string;
  focus: string;
  tools: string[];
  example: string;
  avoid: string;
};

export type SystemDesignNode = {
  id: string;
  label: string;
  purpose: string;
  why: string;
  technologies: string[];
  scaling: string;
  bottleneck?: string;
};

export const site = {
  name: "Muhammad Maaz",
  title: "Muhammad Maaz — Software Engineer",
  description:
    "Full-stack software engineer building scalable web and mobile products with React, Next.js, Node.js, and TypeScript.",
  // Prefer NEXT_PUBLIC_SITE_URL in production (e.g. your Vercel domain). Falls back for local/dev.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  email: "maaz.shakeel.bodla@gmail.com",
  resume: "/MaazResume.pdf",

  nav: [
    { label: "home", href: "/#home" },
    { label: "portfolio", href: "/#portfolio" },
    { label: "services", href: "/#services" },
    { label: "approach", href: "/#approach" },
    { label: "about", href: "/#about" },
    { label: "blog", href: "/blog" },
  ] satisfies NavLink[],

  socials: [
    {
      label: "Instagram",
      href: "https://instagram.com/1devmaaz",
      icon: "instagram",
    },
    {
      label: "LinkedIn",
      href: "https://linkedin.com/in/1maazdev",
      icon: "linkedin",
    },
    {
      label: "GitHub",
      href: "https://github.com/maazshakeel",
      icon: "github",
    },
  ] satisfies SocialLink[],

  hero: {
    intro:
      "Software Engineer focused on building scalable full-stack applications while exploring AI, system design, networking, and cybersecurity.",

    developer:
      "I enjoy turning complex ideas into reliable software through clean architecture, thoughtful engineering, and continuous learning.",

    pillars: [
      {
        label: "Learn",
        description: "Master computer science fundamentals and never stop learning.",
      },
      {
        label: "Innovate",
        description: "Explore better ways to solve problems and improve products.",
      },
      {
        label: "Build",
        description: "Create scalable products that solve real-world problems.",
      },
    ],
  },

  metrics: [
    {
      id: "years",
      label: "Years Coding",
      value: 4,
      suffix: "+",
      description: "Building software since my first C programs and late-night debugging sessions.",
    },
    {
      id: "projects",
      label: "Projects Built",
      value: 12,
      suffix: "+",
      description: "From school platforms and mobile apps to cultural experiences and SaaS experiments.",
    },
    {
      id: "technologies",
      label: "Technologies",
      value: 12,
      suffix: "+",
      description: "TypeScript, React, Next.js, Node, databases, and the tools that keep systems reliable.",
    },
    {
      id: "commits",
      label: "Git Commits",
      value: 1800,
      suffix: "+",
      description: "Small, intentional commits — shipping features, fixing bugs, and refining architecture.",
    },
    {
      id: "posts",
      label: "Blog Posts",
      value: 1,
      description: "Writing to explain hard ideas clearly — starting with knowledge representation in AI.",
    },
    {
      id: "coffee",
      label: "Coffee Consumed",
      value: 940,
      suffix: "+",
      description: "Fuel for deep work sessions, architecture sketches, and late refactors.",
    },
    {
      id: "streak",
      label: "Learning Streak",
      value: 120,
      suffix: "d",
      description: "A current rhythm of daily learning across system design, AI, and security.",
    },
    {
      id: "opensource",
      label: "Open Contributions",
      value: 18,
      description: "PRs, issues, and shared notes that help other builders move faster.",
    },
  ] satisfies Metric[],

  timeline: {
    title: "Build Timeline",
    eyebrow: "The path so far",
    description:
      "Not a resume checklist — a connected story of how curiosity turned into craft.",
    milestones: [
      {
        id: "started",
        year: "2021",
        title: "Started Programming",
        description:
          "Took CS50 Introduction to computer science. Wrote the first programs out of curiosity — small scripts that made the machine do something on command.",
        lesson: "Clarity beats cleverness. If you can explain it simply, you understand it.",
        tech: ["C", "Problem Solving", "CS50", "Memory", "Fundamentals"],
      },
      {
        id: "c-fundamentals",
        year: "2022",
        title: "Learned C",
        description:
          "Dug into memory, pointers, and how programs actually run — the foundation under every abstraction.",
        lesson: "High-level frameworks make sense only after you respect the low-level costs.",
        tech: ["C", "Data Structures"],
      },
      {
        id: "react",
        year: "2023",
        title: "Discovered React",
        description:
          "Moved from static pages to interactive UIs — components, state, and thinking in interfaces.",
        lesson: "UI is a system. Consistency and composition matter more than one-off polish.",
        tech: ["JavaScript", "React", "CSS"],
      },
      {
        id: "first-saas",
        year: "2024",
        title: "Built First SaaS Experiments",
        description:
          "Shipped full-stack ideas end to end — auth, data models, deployment, and real users giving feedback.",
        lesson: "Shipping teaches faster than planning. Measure, then refine the architecture.",
        tech: ["TypeScript", "Node.js", "PostgreSQL"],
      },
      {
        id: "system-design",
        year: "2024",
        title: "Learned System Design",
        description:
          "Started designing for scale: boundaries, failure modes, caching, and how services talk under load.",
        lesson: "Every technology choice is a trade-off. Name the constraint before you pick the tool.",
        tech: ["System Design", "REST APIs", "Architecture"],
      },
      {
        id: "mobile",
        year: "2025",
        title: "Built Mobile Apps",
        description:
          "Took products beyond the browser with React Native — shared logic, native feel, field-ready workflows.",
        lesson: "Mobile constraints force better product decisions: offline, latency, and focus.",
        tech: ["React Native", "Express", "Prisma"],
      },
      {
        id: "ai",
        year: "2025",
        title: "Learning AI Deeply",
        description:
          "Studying knowledge representation, agents, and how to ground models in reliable systems — not just prompts.",
        lesson: "AI is powerful when paired with structure: retrieval, rules, and measurable outcomes.",
        tech: ["AI", "Python", "Knowledge Graphs"],
      },
      {
        id: "scalable",
        year: "2026",
        title: "Building Scalable Products",
        description:
          "Focused on products that grow: clean architecture, observability, and systems that stay maintainable.",
        lesson: "Scale is a design problem first. Code quality is how you keep options open.",
        tech: ["Next.js", "TypeScript", "System Design"],
      },
    ] satisfies TimelineMilestone[],
  },

  howIThink: {
    title: "How I Think",
    eyebrow: "Engineering workflow",
    description:
      "Skills list what I use. This is how I actually solve problems — click any stage to see the focus, tools, examples, and traps I avoid.",
    stages: [
      {
        id: "problem",
        label: "Problem",
        focus:
          "Define the real user and business problem before touching code. Separate symptoms from root causes.",
        tools: ["User interviews", "Issue framing", "Constraints list"],
        example:
          "For complaint systems: the problem wasn't \"need an app\" — it was routing ownership and visibility across roles.",
        avoid: "Jumping into features because they sound impressive, not because they reduce pain.",
      },
      {
        id: "research",
        label: "Research",
        focus:
          "Study existing patterns, constraints, and failure modes. Learn what similar systems got wrong.",
        tools: ["Docs", "RFCs", "Competitor teardown", "Paper / blog notes"],
        example:
          "Before Efficient Track, I mapped how schools already track attendance — paper, spreadsheets, and fragile WhatsApp chains.",
        avoid: "Copying architectures without understanding the constraints that created them.",
      },
      {
        id: "architecture",
        label: "Architecture",
        focus:
          "Draw boundaries: clients, APIs, data ownership, auth, and what must stay simple at v1.",
        tools: ["Diagrams", "Domain models", "API contracts", "Threat sketch"],
        example:
          "Complaint Management split admin, staff, and mobile clients around one REST API and role-aware access.",
        avoid: "Over-engineering microservices before a single deployable system earns the complexity.",
      },
      {
        id: "prototype",
        label: "Prototype",
        focus:
          "Validate the riskiest assumption with the thinnest slice — UI flow or API contract, not polish.",
        tools: ["Wireframes", "Spike PRs", "Mock APIs", "Clickable demos"],
        example:
          "Museum Jawa started as interaction prototypes to prove storytelling UX before content volume.",
        avoid: "Building the perfect database schema while the product question is still unanswered.",
      },
      {
        id: "build",
        label: "Build",
        focus:
          "Ship iteratively with typed contracts, clear modules, and boring reliable defaults.",
        tools: ["TypeScript", "Next.js / React Native", "Node", "Prisma", "Git"],
        example:
          "Feature slices landed as small commits: auth → models → dashboards → mobile workflows.",
        avoid: "Giant branches that mix refactor, feature, and experiment in one PR.",
      },
      {
        id: "test",
        label: "Test",
        focus:
          "Protect the paths that can break trust: auth, data integrity, and critical user journeys.",
        tools: ["Manual QA scripts", "API checks", "Edge-case matrices"],
        example:
          "Role-based routes get explicit happy-path and forbidden-path checks before release.",
        avoid: "Assuming \"it works on my machine\" covers multi-role or mobile network realities.",
      },
      {
        id: "measure",
        label: "Measure",
        focus:
          "Watch behavior and performance after ship — latency, errors, and whether the workflow actually stuck.",
        tools: ["Logs", "Analytics", "User feedback", "Perf traces"],
        example:
          "School workflows revealed which screens needed fewer taps once staff used them daily.",
        avoid: "Optimizing vanity metrics that don't change decisions or reliability.",
      },
      {
        id: "improve",
        label: "Improve",
        focus:
          "Refactor with intent: reduce complexity, strengthen boundaries, and feed lessons into the next cycle.",
        tools: ["Retros", "Tech debt board", "Architecture notes"],
        example:
          "After first SaaS experiments, I tightened API boundaries and typing before adding features.",
        avoid: "Endless polish with no learning loop — improve what measurement proved mattered.",
      },
    ] satisfies ThinkingStage[],
  },

  systemDesign: {
    title: "Interactive System Design",
    eyebrow: "Architecture whiteboard",
    description:
      "Explore how I design a production request path — click any node for why it exists, where it bottlenecks, and how I'd scale it.",
    product: "Complaint Management System",
    productNote:
      "A walkthrough of the shape I'd take a complaint platform toward under real traffic — grounded in the product I shipped, extended into the design decisions that matter at scale.",
    nodes: [
      {
        id: "client",
        label: "Client",
        purpose:
          "Capture complaints and surface role-aware status for staff on web and mobile.",
        why: "The product lives where work happens — browsers and phones — so UX and offline-friendly retries start here.",
        technologies: ["React", "React Native", "TypeScript"],
        scaling:
          "Keep clients thin: no business rules in the UI. Cache read models locally; never invent status transitions client-side.",
      },
      {
        id: "load-balancer",
        label: "Load Balancer",
        purpose:
          "Terminate TLS, distribute traffic across API instances, and shed load when backends are unhealthy.",
        why: "A single API process is a single failure domain. Balancing is the first move when concurrent staff spikes.",
        technologies: ["Reverse proxy", "Health checks", "HTTPS"],
        scaling:
          "Horizontal API replicas behind sticky-free routing. Drain unhealthy targets automatically.",
        bottleneck:
          "Misconfigured health checks can flap traffic or hide a dying instance until users feel it.",
      },
      {
        id: "api",
        label: "API",
        purpose:
          "Validate requests, enforce authz, run status transitions, and orchestrate side effects.",
        why: "One authoritative contract keeps mobile, admin, and staff clients honest — and makes audits possible.",
        technologies: ["Node.js", "Express", "TypeScript", "JWT / RBAC"],
        scaling:
          "Stateless handlers + connection pooling. Push slow work (notifications, exports) onto the queue instead of blocking the request.",
        bottleneck:
          "Synchronous fan-out (email, reports) on the request path saturates workers under complaint spikes.",
      },
      {
        id: "queue",
        label: "Queue",
        purpose:
          "Buffer asynchronous jobs so intake stays fast when downstream work is bursty.",
        why: "Complaint intake shouldn't wait on email providers or heavy report generation.",
        technologies: ["Job queue", "Retries", "Dead-letter"],
        scaling:
          "Partition by job type. Bounded retries with backoff; dead-letter poison messages for human review.",
        bottleneck:
          "Unbounded queues hide outages — depth and age need alerts or you discover lag too late.",
      },
      {
        id: "workers",
        label: "Workers",
        purpose:
          "Consume queued jobs: notifications, digests, exports, and other side effects.",
        why: "Separating workers lets the API stay responsive while background throughput scales independently.",
        technologies: ["Node workers", "Idempotent handlers"],
        scaling:
          "Autoscale consumers on queue depth. Make every job idempotent so retries are safe.",
      },
      {
        id: "database",
        label: "Database",
        purpose:
          "Persist complaints, users, roles, and status history as the source of truth.",
        why: "Relational integrity and migrations beat ad-hoc stores when ownership and audit trails matter.",
        technologies: ["PostgreSQL", "Prisma"],
        scaling:
          "Indexes for status/owner queries, read replicas for dashboards, write path stays on the primary.",
        bottleneck:
          "Hot tables without indexes on status + assignee turn dashboards into full scans under load.",
      },
      {
        id: "storage",
        label: "Storage",
        purpose:
          "Hold attachments and export artifacts outside the transactional database.",
        why: "Blobs in Postgres bloat backups and slow restores — object storage keeps the DB lean.",
        technologies: ["Object storage", "Signed URLs"],
        scaling:
          "Direct-to-storage uploads with short-lived signed URLs. Lifecycle policies for expired exports.",
      },
    ] satisfies SystemDesignNode[],
  },

  services: [
    "Full-Stack Web Development",
    "Frontend Development",
    "Backend Development",
    "REST API Development",
    "Database Design",
    "System Design",
    "AI Integration",
    "Technical Consulting",
  ],

  skills: [
    "TypeScript",
    "React",
    "Next.js",
    "React Native",
    "Node.js",
    "Express",
    "Prisma",
    "PostgreSQL",
    "Tailwind CSS",
    "REST APIs",
    "System Design",
    "Git",
  ],

  projects: [
    {
      slug: "complaint-management-system",
      title: "Complaint Management System",
      description:
        "A modern complaint management platform with authentication, role-based access control, and real-time complaint tracking.",
      overview:
        "A full-stack complaint management system built to help organizations collect, route, and resolve customer complaints efficiently. The platform supports role-based dashboards for admins and staff, structured complaint workflows, and a mobile-friendly experience for field teams.",
      highlights: [
        "Secure authentication with role-based access control",
        "Real-time complaint status tracking and updates",
        "Admin dashboard for monitoring and resolving issues",
        "Mobile app experience built with React Native",
        "REST API backend with structured database models",
      ],
      tags: ["React Native", "Express", "TypeScript", "Prisma"],
      role: "Full-stack developer",
      year: "2025",
      image: "/projects/complaint-system.webp",
      href: "https://sortit-landing-page.vercel.app",
      caseStudy: {
        problem:
          "Organizations were losing complaints in chat threads and spreadsheets — no clear ownership, status, or accountability across admin and field staff.",
        challenge:
          "Supporting multiple roles (admin, staff, mobile field users) with consistent workflows while keeping the API simple enough to ship quickly.",
        architecture:
          "React Native clients and web dashboards talk to a typed Express REST API. Prisma owns the data model; auth issues role claims that gate routes and UI. Complaint state transitions live on the server so every client stays consistent.",
        decisions: [
          "Role-based access at the API boundary — not only in the UI",
          "Shared TypeScript types between mobile and backend to reduce contract drift",
          "Status machine on the server so mobile offline retries don't invent invalid states",
          "Landing + product split so marketing could ship without blocking core workflows",
        ],
        result:
          "A deployable complaint pipeline with role dashboards, tracked status changes, and a mobile path for field teams — clearer ownership from intake to resolution.",
        lessons: [
          "Define ownership and status vocabulary before building screens",
          "Mobile constraints force better API design earlier",
          "Authz mistakes are product bugs — test forbidden paths as carefully as happy paths",
        ],
      },
      architecture: [
        {
          id: "mobile",
          label: "Mobile / Web Client",
          purpose: "Capture complaints and show role-aware status for staff in the field or office.",
          responsibilities: [
            "Complaint intake forms",
            "Status timelines",
            "Role-specific dashboards",
          ],
          technologies: ["React Native", "TypeScript"],
          communication: "HTTPS JSON requests to the REST API with auth tokens.",
        },
        {
          id: "api",
          label: "REST API",
          purpose: "Single source of truth for complaint workflows and business rules.",
          responsibilities: [
            "Validate payloads",
            "Enforce status transitions",
            "Orchestrate reads/writes",
          ],
          technologies: ["Express", "TypeScript"],
          communication: "Receives client calls; talks to Auth and Database layers.",
        },
        {
          id: "auth",
          label: "Authentication",
          purpose: "Identify users and attach roles used for authorization.",
          responsibilities: ["Login / session", "Role claims", "Route guards"],
          technologies: ["JWT / session auth", "RBAC"],
          communication: "Issues tokens/claims consumed by API middleware and clients.",
        },
        {
          id: "db",
          label: "Database",
          purpose: "Persist complaints, users, and audit-friendly status history.",
          responsibilities: ["Relational models", "Migrations", "Query integrity"],
          technologies: ["Prisma", "PostgreSQL"],
          communication: "Queried by the API through Prisma — no direct client access.",
        },
      ],
    },
    {
      slug: "efficient-track",
      title: "Efficient Track",
      description:
        "A smart school management platform designed to simplify communication, attendance, analytics, and student management.",
      overview:
        "Efficient Track is a school operations platform that brings attendance, communication, analytics, and student records into one place. It was designed to reduce manual admin work and give staff a clearer view of school activity through a clean, responsive interface.",
      highlights: [
        "Centralized attendance and student management",
        "Communication tools for staff and administration",
        "Analytics views for school performance insights",
        "Responsive web interface for desktop and tablet use",
        "Modular architecture for future feature expansion",
      ],
      tags: ["React", "Node.js", "TypeScript"],
      role: "Full-stack developer",
      year: "2025",
      image: "/projects/efficient-track.webp",
      href: "https://efficient-track.vercel.app/",
      caseStudy: {
        problem:
          "School staff juggled attendance, student records, and communication across paper, spreadsheets, and chat — slow, error-prone, and hard to audit.",
        challenge:
          "Unifying operations into one product without overwhelming non-technical users or overbuilding modules schools wouldn't adopt yet.",
        architecture:
          "A React frontend with a Node/TypeScript API and modular domains (attendance, students, communication, analytics). Features are separated so new school workflows can land without rewriting the core shell.",
        decisions: [
          "Modular feature areas instead of one monolithic admin screen",
          "Tablet-first layouts for staff who work between desk and classroom",
          "Analytics as views over existing records — not a separate speculative warehouse",
          "Ship a usable attendance + records core before expanding communication depth",
        ],
        result:
          "A live school operations web app that centralizes day-to-day workflows and gives admins a clearer picture of activity without spreadsheet chaos.",
        lessons: [
          "Operational software wins by reducing taps, not adding dashboards",
          "Start with the daily ritual (attendance) before the aspirational analytics",
          "Modular boundaries make future school features cheaper to add safely",
        ],
      },
      architecture: [
        {
          id: "browser",
          label: "Browser",
          purpose: "Staff-facing UI for attendance, records, and day-to-day school operations.",
          responsibilities: ["Forms & tables", "Role views", "Analytics screens"],
          technologies: ["React", "TypeScript"],
          communication: "Calls the Node API over HTTPS.",
        },
        {
          id: "api",
          label: "API Layer",
          purpose: "Expose modular school domains behind a consistent contract.",
          responsibilities: [
            "Attendance endpoints",
            "Student records",
            "Communication hooks",
          ],
          technologies: ["Node.js", "TypeScript"],
          communication: "Routes domain logic to storage; returns typed JSON.",
        },
        {
          id: "modules",
          label: "Domain Modules",
          purpose: "Keep school features separable so new workflows don't rewrite the core.",
          responsibilities: ["Attendance", "Students", "Analytics views"],
          technologies: ["Modular services"],
          communication: "Invoked by the API; share validation and entity boundaries.",
        },
        {
          id: "db",
          label: "Database",
          purpose: "Store operational school data for reporting and audit trails.",
          responsibilities: ["Records", "Attendance events", "User accounts"],
          technologies: ["SQL datastore"],
          communication: "Accessed only through the API/domain layer.",
        },
      ],
    },
    {
      slug: "museum-jawa",
      title: "Museum Jawa",
      description:
        "An interactive website to explore and learn about Indonesian Java culture, with a beautiful and highly interactive user experience.",
      overview:
        "Museum Jawa is an interactive cultural website focused on the heritage, traditions, and stories of Java. The experience combines rich visuals, smooth navigation, and educational content to make Indonesian culture feel engaging and accessible to a global audience.",
      highlights: [
        "Immersive UI inspired by Javanese culture and storytelling",
        "Interactive sections for exploring traditions and history",
        "Responsive layout optimized for modern browsers",
        "Fast, lightweight frontend built with React and Tailwind CSS",
        "Deployed as a live production-ready web experience",
      ],
      tags: ["React.js", "JavaScript", "TailwindCSS"],
      href: "https://museumjava.vercel.app/",
      image: "/projects/museumjawa.webp",
      role: "Frontend developer",
      year: "2025",
      caseStudy: {
        problem:
          "Cultural education sites often feel static — long text walls that don't invite exploration, especially for global visitors new to Javanese heritage.",
        challenge:
          "Balancing immersive storytelling and interaction with performance and clarity so content remains the hero, not the animation.",
        architecture:
          "A React + Tailwind frontend structured as narrative sections. Interaction patterns (scroll, hover, focused content blocks) guide attention while assets stay lightweight for fast loads.",
        decisions: [
          "Story-first IA — culture chapters over generic page templates",
          "Interaction only where it teaches; no decorative motion for its own sake",
          "Responsive art direction so visuals hold up from phone to desktop",
          "Deploy early to validate pacing with real browsers and networks",
        ],
        result:
          "A live, interactive cultural experience that feels exploratory rather than encyclopedic — and stays fast enough for casual browsing.",
        lessons: [
          "Immersion fails if performance drops; constrain motion budgets early",
          "Content structure is product design when the domain is storytelling",
          "Prototype interactions before investing in full visual polish",
        ],
      },
      architecture: [
        {
          id: "browser",
          label: "Browser",
          purpose: "Render the cultural narrative and respond to exploration gestures.",
          responsibilities: ["Section layout", "Interaction cues", "Responsive art direction"],
          technologies: ["React", "JavaScript", "Tailwind CSS"],
          communication: "Loads static assets and client-side routes; no backend round-trips for core browsing.",
        },
        {
          id: "content",
          label: "Content Model",
          purpose: "Structure Java heritage stories into explorable chapters.",
          responsibilities: ["Narrative sections", "Cultural topics", "Media references"],
          technologies: ["Component content", "Static copy"],
          communication: "Fed into React sections as structured props/modules.",
        },
        {
          id: "interaction",
          label: "Interaction Layer",
          purpose: "Guide attention with scroll, hover, and focused content blocks.",
          responsibilities: ["Scroll pacing", "Hover reveals", "Focus states"],
          technologies: ["CSS / JS interactions"],
          communication: "Listens to user input; animates presentation without mutating content source.",
        },
        {
          id: "cdn",
          label: "Static Hosting",
          purpose: "Serve a fast, production-ready frontend globally.",
          responsibilities: ["Asset delivery", "Caching", "HTTPS"],
          technologies: ["Vercel"],
          communication: "Delivers the built React app and media to the browser.",
        },
      ],
    },
  ] satisfies Project[],

  approach: {
    title: "How I Work",
    steps: [
      {
        title: "Understand",
        description:
          "Start by understanding the problem, business goals, and technical constraints before designing a solution.",
      },
      {
        title: "Design",
        description:
          "Plan clean architecture, scalable systems, and maintainable code before implementation.",
      },
      {
        title: "Build",
        description:
          "Develop reliable software with modern technologies, testing, and performance in mind.",
      },
      {
        title: "Improve",
        description:
          "Continuously iterate based on feedback, analytics, and real-world usage.",
      },
    ],
    cta: "Let's build something meaningful.",
  },

  pricing: [
    {
      name: "Starter",
      price: "Contact",
      description: "Simple websites, landing pages, and personal portfolios.",
      features: [
        "Responsive Design",
        "SEO Ready",
        "Modern UI",
      ],
    },
    {
      name: "Professional",
      price: "Contact",
      description: "Full-stack web applications and business solutions.",
      features: [
        "Authentication",
        "Backend APIs",
        "Database",
        "Deployment",
      ],
      highlighted: true,
    },
    {
      name: "Custom",
      price: "Let's Talk",
      description: "Large-scale products, SaaS platforms, AI integrations, and long-term collaborations.",
      features: [
        "Custom Architecture",
        "Scalable Infrastructure",
        "Ongoing Support",
      ],
    },
  ] satisfies PricingPlan[],

  about: {
    title: "About Me",
    paragraphs: [
      "I'm Muhammad Maaz, a software engineer passionate about building reliable software and understanding the principles behind great systems. I spend most of my time developing full-stack applications while studying computer science fundamentals, system design, artificial intelligence, networking, and cybersecurity.",

      "Beyond programming, I'm passionate about entrepreneurship, content creation, and sharing what I learn. My goal is to build products that solve meaningful problems while continuously improving as an engineer and lifelong learner.",
    ],
  },

  faq: [
    {
      question: "What technologies do you work with?",
      answer:
        "I primarily work with TypeScript, React, Next.js, React Native, Node.js, Express, Prisma, SQL databases, and modern web technologies.",
    },
    {
      question: "What kinds of projects interest you?",
      answer:
        "I enjoy building SaaS platforms, full-stack applications, developer tools, AI-powered software, and scalable backend systems.",
    },
    {
      question: "Are you available for freelance work?",
      answer:
        "Yes. I'm open to freelance projects, long-term collaborations, and opportunities to work with startups and product teams.",
    },
    {
      question: "How can I contact you?",
      answer:
        "The fastest way is via email or LinkedIn. I'm always happy to connect with developers, founders, and anyone passionate about technology.",
    },
  ] satisfies FaqItem[],

  contact: {
    title: "Let's Build Together",
    description:
      "Whether you're building a startup, a web application, or an AI-powered product, I'd love to hear about it.",
    cta: "Get in Touch",
  },
} as const;
