// A stat is either a number that counts up (e.g. "3+") or a short text value (e.g. "DRDO Intern").
export type Stat =
  | { label: string; value: number; suffix?: string }
  | { label: string; text: string };

const stats: Stat[] = [
  { label: "Projects", value: 6, suffix: "+" },
  { label: "Research Papers", value: 2 },
  { label: "Experience", text: "DRDO Intern" },
];

// A headline stat: the numeric part counts up, the rest is kept verbatim ("4.7 ms", "~15%").
export type PublicationStat = { key: string; value: string; label: string };

const ieeePublication = {
  title:
    "End-to-End TinyML Predictive Maintenance System for Industrial Motors — Hardware, Signal Processing, and Edge-Deployed Deep Learning",
  conference:
    "IEEE ICIDeA 2026 — 4th International Conference on Industrial Electronics: Developments & Applications",
  venue: "KIIT Deemed to be University, Bhubaneswar",
  date: "October 29–31, 2026",
  paperId: "854",
  session: "Technical Session 21",
  coAuthors: [
    "Pratham Kumar",
    "Sanjana Kumari",
    "Ravi Kumar",
    "Lipsa Subhadarshini",
    "Sananda Mukherjee",
  ],
  guide: "Dr. Ranjeeta Patel, SMIEEE",
  story:
    "Most AI systems need a cloud server to think. I built one that thinks on a $5 chip — in under 5 milliseconds. Our TinyML system detects industrial motor faults using a hardware prototype I built from scratch, a 923-parameter neural network, and a live React dashboard — all running on a single ESP32 microcontroller with no internet required. The work was presented at IEEE ICIDeA 2026, selected from 871 international submissions.",
  stats: [
    { key: "accuracy", value: "96.3%", label: "Fault Detection Accuracy" },
    { key: "inferenceTime", value: "4.7 ms", label: "On-Device Inference" },
    { key: "hardwareCost", value: "$5", label: "Hardware Cost" },
    { key: "parameters", value: "923", label: "Model Parameters" },
    { key: "modelSize", value: "15 KB", label: "Flash Footprint" },
    { key: "submissions", value: "871", label: "Submissions Worldwide" },
    { key: "accepted", value: "134", label: "Papers Accepted" },
    { key: "acceptanceRate", value: "~15%", label: "Acceptance Rate" },
  ] satisfies PublicationStat[] as PublicationStat[],
  tags: [
    "TinyML",
    "IEEE",
    "Edge AI",
    "Embedded Systems",
    "Predictive Maintenance",
  ],
  // Add the IEEE Xplore URL here once the paper is indexed; the button stays hidden while empty.
  paperLink: "",
  certificate: "/images/certificate.webp",
  // Add more entries here as conference photos come in.
  gallery: [
    {
      src: "/images/conference/photo-1.jpg",
      caption: "Presenting at IEEE ICIDeA 2026",
    },
  ],
};

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
  currentlyBuilding: {
    project: "Data-Driven AC Microgrid Protection System",
    description:
      "ML fault-protection scheme for AC microgrids — detecting, classifying and locating faults from voltage/current waveforms",
    tag: "B.Tech Major Project",
    status: "In Progress",
  },
  ieeePublication,
};

// Root-relative so these also work from a project detail page.
export const navLinks = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/#about" },
  { label: "Projects", href: "/#projects" },
  { label: "Skills", href: "/#skills" },
  { label: "Contact", href: "/#contact" },
];
