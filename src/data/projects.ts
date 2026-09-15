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

// Put screenshots in /public/images/projects/ using the filenames below.
// A 16:9 image (e.g. 1280×720) fits the card best; cards show a title placeholder until then.
export const projects: Project[] = [
  {
    id: "tinyml-motor",
    title: "TinyML Predictive Maintenance System",
    description:
      "Patent-pending end-to-end TinyML system running an on-device motor fault classifier on ESP32. Achieved ~85% accuracy at sub-100ms inference. Streams live results to a React/TypeScript dashboard via Node.js backend.",
    image: "/images/projects/tinyml-motor.jpg",
    category: "AI",
    tags: ["TinyML", "TensorFlow Lite", "ESP32", "React", "TypeScript", "Node.js"],
    githubUrl: "https://github.com/AR0714/Predictive_Maintenof_Industrial_Motors_SystemTinyML",
    featured: true,
  },
  {
    id: "transformer-dga",
    title: "Transformer Health Monitoring (DGA & ML)",
    description:
      "Diagnoses 7 transformer fault types from dissolved gas analysis with 80% accuracy — beating the Duval-triangle baseline by +23 pts. Ships with Flask REST API, React dashboard, and an LLM diagnostic chatbot.",
    image: "/images/projects/transformer-dga.jpg",
    category: "AI",
    tags: ["Python", "XGBoost", "SHAP", "Flask", "React", "LLM"],
    githubUrl: "https://github.com/AR0714/transformer-health-dga",
    featured: true,
  },
  {
    id: "raja-mantri",
    title: "Raja Mantri Chor Sipahi",
    description:
      "Real-time multiplayer implementation of the classic Indian card game, built with React, Node.js, and Socket.io. Validated for specific regional gameplay rules with live game state synchronization.",
    image: "/images/projects/raja-mantri.jpg",
    category: "Web",
    tags: ["React", "Node.js", "Socket.io", "TypeScript"],
    githubUrl: "https://github.com/AR0714/RAJA-MANTRI-CHOR-SIPAHI",
    featured: true,
  },
  {
    id: "microgrid-protection",
    title: "Data-Driven AC Microgrid Protection",
    description:
      "B.Tech major project — developing an ML fault-protection scheme that detects, classifies and locates AC microgrid faults from voltage/current waveforms, overcoming fixed-threshold relay limitations.",
    image: "/images/projects/microgrid-protection.jpg",
    category: "AI",
    tags: ["Python", "MATLAB", "PSCAD", "Machine Learning"],
    featured: false,
  },
];
