// A stat is either a number that counts up (e.g. "3+") or a short text value (e.g. "DRDO Intern").
export type Stat =
  | { label: string; value: number; suffix?: string }
  | { label: string; text: string };

const stats: Stat[] = [
  { label: "Projects", value: 3, suffix: "+" },
  { label: "Research Papers", value: 2 },
  { label: "Experience", text: "DRDO Intern" },
];

export const about = {
  name: "Ankit Raj",
  title: "Engineer & Builder",
  roles: ["Engineer", "Builder", "ML Researcher", "Tinkerer"],
  tagline: "I build intelligent systems at the edge of hardware and AI.",
  bio: [
    "Final-year Electrical Engineering student at KIIT University working at the intersection of power systems and edge AI. I build on-device ML systems for fault diagnosis, predictive maintenance, and condition monitoring. I have a patent-pending TinyML motor-fault system and research papers under review at ICIDeA 2026 and PEDES 2026.",
  ],
  photo: "/images/profile.jpg",
  location: "India",
  email: "ankitforward47@gmail.com",
  resumeUrl: "/resume.pdf",
  stats,
  socials: {
    github: "https://github.com/AR0714",
    linkedin: "https://linkedin.com/in/ankitraj0714",
  },
};

// Root-relative so these also work from a project detail page.
export const navLinks = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/#about" },
  { label: "Projects", href: "/#projects" },
  { label: "Skills", href: "/#skills" },
  { label: "Contact", href: "/#contact" },
];
