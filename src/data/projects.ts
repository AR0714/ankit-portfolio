export const projectCategories = ["Web", "Mobile", "AI", "Design"] as const;

export type ProjectCategory = (typeof projectCategories)[number];

/** A gallery entry: a plain path, or a path with its own alt text. */
export type GalleryItem = string | { src: string; alt: string };

export type Project = {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  /** Card/hero image path, or "" to show a category-colored placeholder. */
  image: string;
  /** "contain" frames a tall document page instead of cropping it to fill the card. */
  imageFit?: "cover" | "contain";
  gallery: GalleryItem[];
  highlights: string[];
  /** Path to a PDF in /public, or "" when there is no report. */
  report: string;
  category: ProjectCategory;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  /** Extra buttons beside the GitHub button (e.g. a second repo). */
  links?: { label: string; url: string }[];
  /** "See it in action" block: an animated GIF plus a link to the real thing. */
  demo?: { gif: string; liveUrl: string; caption?: string; fallbackNote?: string };
  /** Compact stat strip shown above the overview. */
  metrics?: { value: string; label: string }[];
  /** "Honest limitations" list shown after the highlights. */
  limitations?: string[];
  /** Click-to-load iframe of a live app (desktop only). */
  embed?: {
    url: string;
    title: string;
    poster?: string;
    /** Buttons that reload the iframe with ?scenario=<value>. */
    scenarios?: { label: string; value: string }[];
  };
};

export const projects: Project[] = [
  {
    id: "tinyml-ieee-hardware",
    title: "TinyML Motor Fault Detection — IEEE Published",
    description:
      "A complete edge AI system that detects industrial motor faults in 4.7ms on a $5 microcontroller — no cloud required. Presented at IEEE ICIDeA 2026.",
    longDescription:
      "Most AI systems need a cloud server to think. I built one that thinks on a $5 chip — in under 5 milliseconds. Our TinyML system detects industrial motor faults using a hardware prototype I built from scratch, a 923-parameter neural network, and a live React dashboard — all running on a single ESP32 microcontroller with no internet required. The work was presented at IEEE ICIDeA 2026, selected from 871 international submissions. The full pipeline runs end to end on physical hardware rather than in simulation: current and vibration sensors feed the ESP32, on-device signal processing turns raw waveforms into spectral features, a deep neural network quantized to INT8 classifies the motor's condition in 15 KB of flash, and a Node.js backend streams each result to a live React IoT dashboard.",
    image: "/images/projects/ieee-hardware.jpg",
    // The paper's front page is portrait, so frame it rather than crop it.
    imageFit: "contain",
    gallery: [],
    highlights: [
      "96.3% fault detection accuracy on real fault events",
      "4.7ms inference time on ESP32 — smaller than a matchbox",
      "923-parameter neural network, INT8 quantized, 15KB flash footprint",
      "Physical hardware prototype built and tested — not a simulation",
      "Paper accepted at IEEE ICIDeA 2026 — selected from 871 submissions (~15% acceptance rate)",
    ],
    report: "",
    category: "AI",
    tags: [
      "TinyML",
      "ESP32",
      "Edge Impulse",
      "Deep Neural Networks",
      "INT8 Quantization",
      "FFT/Spectral Analysis",
      "React",
      "Node.js",
    ],
    featured: true,
  },
  {
    id: "janamdin-mubarak-khat",
    title: "Janamdin Mubarak Khat 🎂",
    description:
      "A personalized interactive birthday surprise website builder with animations, games, and heartfelt messages — generates a fully self-contained HTML file with zero backend.",
    longDescription:
      "Janamdin Mubarak Khat is a two-part web project — a 14-screen interactive birthday experience and a public builder tool that lets anyone create their own. The birthday experience features mic-based candle blowing, a scratch card reveal, memory photo timeline, star dedication screen, slot machine, secret Easter egg, and a handwritten letter with typewriter animation — all set to custom music. The public builder lets anyone upload their photos, write their message, and generate a fully self-contained HTML file they can deploy to Netlify in minutes — completely free with zero backend. Both projects are built in pure vanilla HTML, CSS, and JavaScript with no frameworks.",
    image: "/images/projects/janamdin.png",
    gallery: ["/images/projects/janamdin.png", "/images/projects/janamdin-star.jpg"],
    highlights: [
      "14 fully interactive screens including mic-based candle blowing, scratch card, balloon popping, and star dedication",
      "Hidden Easter egg triggered by 3 secret taps on the bear's nose — reveals a private message",
      "Public builder generates a 100% self-contained HTML file with all 15 photos and audio embedded as base64 — zero server needed",
      "5-point privacy verification system ensures no personal data from the template ever leaks into publicly generated files",
      "Background music starts at exactly 0:12 seconds (the best part) and loops — never plays from 0:00",
      "9 custom interactive features: petal shower, wish candle, star screen, Easter egg, slot machine, scratch card, memory timeline, voice embed, and mic interaction",
    ],
    report: "",
    category: "Web",
    tags: [
      "HTML5",
      "CSS3",
      "Vanilla JavaScript",
      "Web Audio API",
      "Canvas API",
      "FileReader API",
      "Intersection Observer API",
      "Netlify",
    ],
    liveUrl: "https://janamdin-mubarak-khat.netlify.app",
    githubUrl: "https://github.com/AR0714/janamdin-mubarak-khat",
    featured: true,
  },
  {
    id: "tinyml-motor",
    title: "TinyML Predictive Maintenance System",
    description:
      "Patent-pending end-to-end TinyML system running an on-device motor fault classifier on ESP32. Achieved ~85% accuracy at sub-100ms inference. Streams live results to a React/TypeScript dashboard via Node.js backend.",
    longDescription:
      "An end-to-end TinyML system that runs a healthy/faulty motor classifier directly on an ESP32 microcontroller — no cloud required. The model was trained in Edge Impulse on 1-second windows of current and dual-axis vibration data sampled at 100 Hz, then deployed as a TensorFlow Lite Micro binary. On-device inference runs in under 100ms. A Node.js and Express backend streams results via Server-Sent Events to a live React and TypeScript dashboard, sending compact JSON scores instead of raw sensor data for approximately 99% lower bandwidth. An invention disclosure has been filed and the patent is pending. A research paper has been submitted to ICIDeA 2026.",
    image: "/images/projects/tinyml-3.jpg",
    gallery: [
      "/images/projects/tinyml-1.jpg",
      "/images/projects/tinyml-2.jpg",
      "/images/projects/tinyml-3.jpg",
    ],
    highlights: [
      "~85% classification accuracy with F1 score of 0.89",
      "Sub-100ms on-device inference running on ESP32",
      "~99% lower bandwidth versus raw sensor streaming",
      "Patent pending — invention disclosure filed",
      "Research paper submitted to ICIDeA 2026 (AI/ML & Signal Processing track)",
    ],
    report: "",
    category: "AI",
    tags: [
      "TinyML",
      "TensorFlow Lite",
      "ESP32",
      "React",
      "TypeScript",
      "Node.js",
    ],
    githubUrl:
      "https://github.com/AR0714/Predictive_Maintenof_Industrial_Motors_SystemTinyML",
    featured: true,
  },
  {
    id: "transformer-dga",
    title: "Transformer Health Monitoring (DGA & ML) + GridPulse Dashboard",
    description:
      "Diagnoses 7 transformer fault types from dissolved gas analysis at 80% accuracy, 23 points above the classical Duval-triangle baseline. Explainable (SHAP), calibrated, with a live 3D GridPulse dashboard and an LLM assistant.",
    longDescription: `A power transformer costs millions and takes up to two years to replace. When it develops an internal fault, its insulating oil releases characteristic gases, and reading them (Dissolved Gas Analysis, DGA) is the cheapest early warning there is. This project implements the classical DGA methods from scratch (Key Gas, IEC 60599 ratios, Duval Triangle) and then beats them with a calibrated, explainable machine-learning model.

Physics-informed features were engineered from IEC 60599 and IEEE C57.104, turning five raw gases into about 13 features. A calibrated XGBoost classifier diagnoses seven fault classes (Normal, PD, D1, D2, T1, T2, T3). On a sealed 70-sample test set it reaches 80.0% accuracy against 57.1% for the Duval Triangle, and isotonic calibration cut the Expected Calibration Error from 0.15 to 0.10. SHAP confirms the model relies on acetylene to detect arcing, which matches the chemistry.

Beyond the model, the project reports its own weak points: an audit found that 41 of 49 rows of the public IEC TC10 benchmark had leaked into the training data, so the evaluation was corrected and the finding published. An abstention layer returns "engineer review required" when confidence is low instead of guessing.

GridPulse is the front end: a cinematic React + Three.js dashboard with a particle-built transformer winding, a Health Index orb whose flame edge changes with the fault, a dissolved-gas breakdown with SHAP drivers, and a diagnostic assistant (Llama 3.3 70B on Groq, called from a serverless function so the API key never reaches the browser). A retrieval-augmented agent grounded in IEC 60599 and a Flask conversational twin complete the stack. The whole project is documented in a 41-page formal PDF.

Note: the dashboard's sensor readings are simulated. The model metrics come from the research repository.`,
    image: "/images/projects/gridpulse-02-arcing-d2.webp",
    gallery: [
      {
        src: "/images/projects/gridpulse-01-normal.webp",
        alt: "GridPulse dashboard in a healthy state, Health Index 92",
      },
      {
        src: "/images/projects/gridpulse-02-arcing-d2.webp",
        alt: "GridPulse dashboard during high-energy arcing (D2), Health Index 12",
      },
      {
        src: "/images/projects/gridpulse-03-dissolved-gases.webp",
        alt: "Dissolved-gas breakdown against IEC limits with SHAP drivers",
      },
      {
        src: "/images/projects/gridpulse-04-unit07-profile.webp",
        alt: "UNIT-07 substation profile modal",
      },
      {
        src: "/images/projects/gridpulse-05-ai-assistant.webp",
        alt: "GridPulse diagnostic assistant answering a question about the fault",
      },
      {
        src: "/images/projects/gridpulse-06-mobile-d2.webp",
        alt: "GridPulse arcing view on a 390px phone layout",
      },
    ],
    metrics: [
      { value: "80.0%", label: "Accuracy" },
      { value: "+23 pts", label: "vs Duval Triangle" },
      { value: "0.15 → 0.10", label: "Calibration error" },
      { value: "7", label: "Fault classes" },
      { value: "41 pages", label: "Documentation" },
    ],
    highlights: [
      "80.0% accuracy across 7 fault types on a sealed test set, vs 57.1% for the Duval Triangle (+23 points)",
      "Probability calibration cut Expected Calibration Error from 0.15 to 0.10 (33% reduction)",
      "SHAP shows acetylene drives arcing detection (SHAP +0.74), matching IEC 60599 chemistry",
      "Leakage audit: found and reported that 41 of 49 public benchmark rows overlapped the training data",
      "Abstention layer: asks for engineer review instead of guessing when confidence is low",
      "Live 3D dashboard (React, Three.js, GLSL shaders) with a server-side LLM assistant",
      "41-page formal documentation covering every build step, decision and limitation",
    ],
    limitations: [
      "Dashboard sensor data is simulated; model metrics come from the research repository.",
      "The 70-sample test set is curated (10 per class), not a natural field distribution.",
      "About 400 labelled samples from overlapping public sources, not validated on field data.",
      "Not a failure predictor, a remaining-useful-life model or a full digital twin; it is a diagnosis and triage layer on top of IEC/IEEE standards.",
    ],
    demo: {
      gif: "/images/projects/gridpulse-demo.gif",
      liveUrl: "https://transformer-dga.netlify.app",
      caption:
        "Simulated sensor data. Press 1 to 5 on the live site to switch fault scenarios.",
    },
    embed: {
      url: "https://transformer-dga.netlify.app",
      title: "GridPulse live dashboard",
      poster: "/images/projects/gridpulse-01-normal.webp",
      scenarios: [
        { label: "Normal", value: "N" },
        { label: "Partial discharge", value: "PD" },
        { label: "Thermal <300 C", value: "T1" },
        { label: "Thermal >700 C", value: "T3" },
        { label: "Arcing", value: "D2" },
      ],
    },
    report: "/docs/GridPulse_Project_Documentation.pdf",
    category: "AI",
    tags: [
      "Python",
      "XGBoost",
      "SHAP",
      "Calibration",
      "RAG",
      "Flask",
      "React",
      "TypeScript",
      "Three.js",
      "Netlify Functions",
      "LLM",
    ],
    liveUrl: "https://transformer-dga.netlify.app",
    githubUrl: "https://github.com/AR0714/transformer-health-dga",
    links: [{ label: "Dashboard Code", url: "https://github.com/AR0714/gridpulse-dashboard" }],
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
    image: "/images/projects/microgrid-protection.jpg",
    gallery: [
      "/images/projects/microgrid-protection.jpg",
      "/images/projects/microgrid-detail.jpg",
    ],
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
