export const projectCategories = ["Web", "Mobile", "AI", "Design"] as const;

export type ProjectCategory = (typeof projectCategories)[number];

export type Project = {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  /** Card/hero image path, or "" to show a category-colored placeholder. */
  image: string;
  gallery: string[];
  highlights: string[];
  /** Path to a PDF in /public, or "" when there is no report. */
  report: string;
  category: ProjectCategory;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    id: "tinyml-motor",
    title: "TinyML Predictive Maintenance System",
    description:
      "Patent-pending end-to-end TinyML system running an on-device motor fault classifier on ESP32. Achieved ~85% accuracy at sub-100ms inference. Streams live results to a React/TypeScript dashboard via Node.js backend.",
    longDescription:
      "An end-to-end TinyML system that runs a healthy/faulty motor classifier directly on an ESP32 microcontroller — no cloud required. The model was trained in Edge Impulse on 1-second windows of current and dual-axis vibration data sampled at 100 Hz, then deployed as a TensorFlow Lite Micro binary. On-device inference runs in under 100ms. A Node.js and Express backend streams results via Server-Sent Events to a live React and TypeScript dashboard, sending compact JSON scores instead of raw sensor data for approximately 99% lower bandwidth. An invention disclosure has been filed and the patent is pending. A research paper has been submitted to ICIDeA 2026.",
    image: "",
    gallery: [],
    highlights: [
      "~85% classification accuracy with F1 score of 0.89",
      "Sub-100ms on-device inference running on ESP32",
      "~99% lower bandwidth versus raw sensor streaming",
      "Patent pending — invention disclosure filed",
      "Research paper submitted to ICIDeA 2026 (AI/ML & Signal Processing track)",
    ],
    report: "",
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
    longDescription:
      "A complete transformer health monitoring pipeline built on Dissolved Gas Analysis. Physics-informed features were engineered from IEC 60599 and IEEE C57.104 standards, then an XGBoost classifier was trained to diagnose 7 transformer fault types. SHAP explainability confirms the model correctly identifies acetylene as the key arcing signature. The system ships as a Flask REST API with a live 7-gas DGA simulator, a React dashboard showing real-time fault visualization and fleet risk-ranking, and an LLM diagnostic chatbot that receives live sensor context. Probability calibration reduced Expected Calibration Error by 33%.",
    image: "",
    gallery: [],
    highlights: [
      "80% fault classification accuracy across 7 transformer fault types",
      "+23 percentage points above the Duval-triangle classical baseline (57% to 80%)",
      "33% reduction in Expected Calibration Error via probability calibration",
      "SHAP explainability confirms acetylene-arcing fault signatures",
      "Full stack: Flask API + React dashboard + LLM diagnostic chatbot",
    ],
    report: "",
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
    longDescription:
      "A real-time multiplayer browser game implementing the classic Indian card game Raja Mantri Chor Sipahi. Players join a room and the game state is synchronized live across all clients using Socket.io. The implementation validates regional UP and Bihar gameplay rules where the Sipahi must guess the Chor. Built with React and TypeScript on the frontend and Node.js on the backend.",
    image: "",
    gallery: [],
    highlights: [
      "Real-time multiplayer with Socket.io room management",
      "Regional UP/Bihar gameplay rules accurately implemented",
      "Live game state synchronization across all connected players",
      "Built with React, TypeScript and Node.js",
    ],
    report: "",
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
    longDescription:
      "A B.Tech major project developing a data-driven protection scheme for AC microgrids. The simulation model was built in PSCAD/EMTDC and generates labeled voltage and current waveform data across 8 fault types. A machine learning model is being trained to detect, classify, and locate faults — overcoming the limitations of fixed-threshold relay protection. The system will enable adaptive relay decisions that respond correctly to the variable generation mix of a renewable microgrid.",
    // These two files live in /public/images/, not /public/images/projects/.
    image: "/images/microgrid-protection.jpg",
    gallery: ["/images/microgrid-protection.jpg", "/images/microgrid-detail.jpg"],
    highlights: [
      "8-fault-type simulation model built and verified in PSCAD/EMTDC",
      "Labeled waveform dataset pipeline established for ML training",
      "Covers fault detection, classification, and location simultaneously",
      "Designed to overcome fixed-threshold relay limitations in microgrids",
      "B.Tech major project — currently ongoing",
    ],
    report: "",
    category: "AI",
    tags: ["Python", "MATLAB", "PSCAD", "Machine Learning"],
    featured: false,
  },
];

export function getProject(id: string) {
  return projects.find((project) => project.id === id);
}
