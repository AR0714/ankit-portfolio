export const projectCategories = ["Web", "Mobile", "AI", "Design"] as const;

export type ProjectCategory = (typeof projectCategories)[number];

export type Project = {
  id: string;
  title: string;
  description: string;
  longDescription: string;
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

// Put screenshots in /public/images/projects/ using the filenames below.
// A 16:9 image (e.g. 1280×720) fits the cards best; placeholders show until then.
export const projects: Project[] = [
  {
    id: "tinyml-motor",
    title: "TinyML Predictive Maintenance System",
    description:
      "Patent-pending end-to-end TinyML system running an on-device motor fault classifier on ESP32. Achieved ~85% accuracy at sub-100ms inference. Streams live results to a React/TypeScript dashboard via Node.js backend.",
    longDescription: `Industrial motors usually fail in ways that are visible long before they stop working — a bearing starts to rumble, a rotor drifts out of balance, a winding heats up. The usual answer is to stream raw vibration data to a server and analyze it there, which burns bandwidth and adds latency to a decision that should be immediate. This project moves the decision onto the motor itself.

The classifier was trained in Edge Impulse on labelled vibration data covering healthy and faulty motor states, then quantized and deployed to an ESP32 as a TensorFlow Lite Micro model. Running on-device means the raw signal never leaves the microcontroller: the board samples the sensor, runs inference in under 100 ms, and emits only a compact classification result. That is roughly 99% less data than streaming the raw sensor feed.

A Node.js backend receives those results and pushes them to the browser over Server-Sent Events, so the dashboard reflects the motor's state as it changes rather than on a polling interval. The front end is a React and TypeScript dashboard showing live fault state, classification confidence, and recent history, so an operator can see both the current reading and how it has been trending.

The system reached roughly 85% classification accuracy with an F1 score of 0.89. An invention disclosure has been filed and the work is patent pending, with a research paper submitted to ICIDeA 2026.`,
    image: "/images/projects/tinyml-motor.jpg",
    gallery: [
      "/images/projects/tinyml-motor-1.jpg",
      "/images/projects/tinyml-motor-2.jpg",
      "/images/projects/tinyml-motor-3.jpg",
    ],
    highlights: [
      "~85% classification accuracy (F1: 0.89)",
      "Sub-100ms on-device inference on ESP32",
      "~99% lower bandwidth vs raw sensor streaming",
      "Patent pending — invention disclosure filed",
      "Research paper submitted to ICIDeA 2026",
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
    longDescription: `When a power transformer develops an internal fault, the insulating oil carries the evidence: arcing, partial discharge, and overheating each break the oil down into a different mix of dissolved gases. Dissolved gas analysis reads that mix, and traditional methods like the Duval triangle map gas ratios onto fault types using fixed geometric boundaries. Those boundaries are interpretable, but they leave a lot of real samples unclassified or misclassified.

This project treats the same problem as a learning task. Gas concentrations are turned into features guided by IEC 60599 — the ratios the standard already identifies as diagnostically meaningful — and an XGBoost model is trained to separate seven distinct fault types. The model reaches 80% accuracy, which is 23 percentage points above the Duval-triangle baseline on the same data, and calibration was tuned alongside raw accuracy, cutting Expected Calibration Error by 33% so that a reported confidence means what it says.

Accuracy alone is not enough for a diagnosis an engineer has to act on, so the pipeline runs SHAP on every prediction to show which gases drove it. The explanations line up with known physics: acetylene dominates the cases the model labels as arcing, which is exactly the signature the standard describes. That agreement is a useful check that the model learned the chemistry rather than an artifact of the dataset.

Around the model sits a full stack — a Flask REST API serving predictions, a React dashboard for entering readings and reading results, and an LLM chatbot that answers follow-up questions about a given diagnosis in plain language. The result runs end to end, from simulated gas readings through the API and dashboard to a conversational explanation.`,
    image: "/images/projects/transformer-dga.jpg",
    gallery: [
      "/images/projects/transformer-dga-1.jpg",
      "/images/projects/transformer-dga-2.jpg",
      "/images/projects/transformer-dga-3.jpg",
    ],
    highlights: [
      "80% fault classification accuracy across 7 fault types",
      "+23 percentage points above Duval-triangle baseline",
      "33% reduction in Expected Calibration Error",
      "SHAP confirms acetylene-arcing signatures",
      "End-to-end: simulator → API → dashboard → LLM chatbot",
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
    longDescription: `Raja Mantri Chor Sipahi is a four-player guessing game played across India with slips of paper: each player draws a hidden role — king, minister, thief, or soldier — and the minister has to guess which player is the thief. Getting it right keeps the points; getting it wrong hands them over. The whole game turns on hidden information, so moving it online means the server has to be the only place that knows the full state.

The implementation runs on Socket.io, with a Node.js server holding authoritative game state and broadcasting only what each player is allowed to see. Rounds, role assignment, guesses, and scoring are all synchronized live, so every player's screen updates the moment something happens rather than waiting on a refresh.

The rules for this game vary by region, and the scoring in particular differs from place to place. This version implements the variant played in UP and Bihar, with the point values and turn order validated against how the game is actually played there rather than a generic version of the rules.

The client is React with TypeScript, which keeps the shared game state and the socket event payloads type-checked across the client-server boundary — useful in a game where a mismatched message shape would silently desynchronize a round.`,
    image: "/images/projects/raja-mantri.jpg",
    gallery: ["/images/projects/raja-mantri-1.jpg", "/images/projects/raja-mantri-2.jpg"],
    highlights: [
      "Real-time multiplayer with Socket.io",
      "Regional UP/Bihar gameplay rules implemented",
      "Built with React + TypeScript + Node.js",
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
    longDescription: `Conventional protection relays trip on fixed thresholds, which works well on a traditional grid where fault currents are large and predictable. A microgrid breaks that assumption. It can run connected to the main grid or islanded, and its fault current depends heavily on which mode it is in and how much inverter-based generation is online — so a threshold tuned for one operating state is wrong for another, leading to relays that either trip late or trip on nothing.

This project develops a data-driven alternative that learns what a fault looks like instead of assuming a fixed magnitude. Voltage and current waveforms are used as the input signal, and the scheme addresses the three questions a protection system has to answer: whether a fault has occurred, what type it is, and where along the network it happened.

The training data comes from a microgrid model built in PSCAD/EMTDC, simulating eight distinct fault types across operating conditions, so the model sees both grid-connected and islanded behavior rather than a single scenario. Simulated waveforms are processed in Python and MATLAB to extract the features the classifier works from.

The goal is a relay decision that adapts to the microgrid's current operating state rather than one calibrated for a single configuration. This is my B.Tech major project and the work is ongoing.`,
    image: "/images/projects/microgrid-protection.jpg",
    gallery: ["/images/projects/microgrid-protection-1.jpg"],
    highlights: [
      "8-fault-type simulation model built in PSCAD/EMTDC",
      "ML-based adaptive relay decisions",
      "B.Tech major project — ongoing",
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
