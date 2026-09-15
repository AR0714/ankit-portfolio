export type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
};

// Placeholder data — replace with your real projects.
// Put screenshots in /public/images/projects/ and reference them as "/images/projects/<file>".
export const projects: Project[] = [
  {
    id: "task-flow",
    title: "TaskFlow",
    description:
      "A collaborative task manager with real-time updates, drag-and-drop boards, and team workspaces.",
    image: "/images/projects/taskflow.jpg",
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
    tags: ["Next.js", "Stripe", "Node.js", "MongoDB"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/your-username/shoplite",
  },
];
