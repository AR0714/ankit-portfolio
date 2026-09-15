export const projectCategories = ["Web", "Mobile", "AI", "Design"] as const;

export type ProjectCategory = (typeof projectCategories)[number];

export type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  category: ProjectCategory;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
};

// Placeholder data — replace with your real projects.
// Put screenshots in /public/images/projects/ and reference them as "/images/projects/<file>".
// A 16:9 image (e.g. 1280×720) fits the card best.
export const projects: Project[] = [
  {
    id: "task-flow",
    title: "TaskFlow",
    description:
      "A collaborative task manager with real-time updates, drag-and-drop boards, and team workspaces.",
    image: "/images/projects/taskflow.jpg",
    category: "Web",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/your-username/taskflow",
    featured: true,
  },
  {
    id: "weather-now",
    title: "WeatherNow",
    description:
      "A clean, fast weather dashboard with 7-day forecasts, location search, and animated conditions.",
    image: "/images/projects/weathernow.jpg",
    category: "Web",
    tags: ["React", "OpenWeather API", "Framer Motion"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/your-username/weathernow",
  },
  {
    id: "shop-lite",
    title: "ShopLite",
    description:
      "A minimal e-commerce storefront with product filtering, cart management, and Stripe checkout.",
    image: "/images/projects/shoplite.jpg",
    category: "Web",
    tags: ["Next.js", "Stripe", "Node.js", "MongoDB"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/your-username/shoplite",
  },
  {
    id: "fit-track",
    title: "FitTrack",
    description:
      "A cross-platform fitness app for logging workouts, tracking streaks, and visualizing progress over time.",
    image: "/images/projects/fittrack.jpg",
    category: "Mobile",
    tags: ["React Native", "Expo", "Firebase"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/your-username/fittrack",
  },
  {
    id: "doc-chat",
    title: "DocChat",
    description:
      "An AI assistant that answers questions about your uploaded PDFs with cited, source-grounded responses.",
    image: "/images/projects/docchat.jpg",
    category: "AI",
    tags: ["Python", "FastAPI", "Claude API", "Next.js"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/your-username/docchat",
  },
  {
    id: "brew-brand",
    title: "Brew & Co. Brand Kit",
    description:
      "A complete visual identity and UI kit for a local coffee shop — logo, color system, and app mockups.",
    image: "/images/projects/brewco.jpg",
    category: "Design",
    tags: ["Figma", "Illustrator", "UI Design"],
    liveUrl: "https://example.com",
  },
];
