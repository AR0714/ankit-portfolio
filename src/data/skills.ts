export type SkillCategory = {
  category: string;
  skills: string[];
};

export const skillCategories: SkillCategory[] = [
  {
    category: "ML & AI",
    skills: ["TensorFlow", "PyTorch", "Keras", "scikit-learn", "TinyML", "Edge Impulse"],
  },
  {
    category: "GenAI & LLMs",
    skills: ["LangChain", "HuggingFace", "RAG Pipelines", "LLM Apps"],
  },
  {
    category: "Languages",
    skills: ["Python", "JavaScript", "C/C++", "MATLAB"],
  },
  {
    category: "Embedded & IoT",
    skills: ["ESP32", "Arduino", "Signal Processing", "OpenCV"],
  },
  {
    category: "Libraries",
    skills: ["NumPy", "Pandas", "Matplotlib", "TensorFlow Lite Micro"],
  },
  {
    category: "Web & Tools",
    skills: ["React", "TypeScript", "Node.js", "Flask", "Git", "GitHub"],
  },
];
