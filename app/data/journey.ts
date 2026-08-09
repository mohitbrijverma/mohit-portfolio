export type JourneyVisual =
  | "rings"
  | "signal"
  | "models"
  | "topics"
  | "flow"
  | "stars";

export type JourneyChapter = {
  id: string;
  number: string;
  title: string;
  eyebrow: string;
  statement: string;
  description: string;
  image: string;
  accent: string;
  positionClass: string;
  visual: JourneyVisual;
};

export const journeyChapters: JourneyChapter[] = [
  {
    id: "starting-point",
    number: "01",
    title: "Starting Point",
    eyebrow: "Origin sketchbook",
    statement: "Curiosity became a method.",
    description:
      "The route starts before any job title: observe carefully, ask a sharper question, and turn uncertainty into something small enough to test.",
    image:
      "https://www.figma.com/api/mcp/asset/8c51bfcc-be61-4131-a26b-06c19d3a39ad.svg",
    accent: "#4fd096",
    positionClass: "landmark--starting",
    visual: "rings",
  },
  {
    id: "physics-observatory",
    number: "02",
    title: "Physics Observatory",
    eyebrow: "NASA WIND H1 · Research log",
    statement: "Twenty-five years of solar-wind data, made visible.",
    description:
      "During my University of Mumbai research internship from April to June 2024, I analysed Interplanetary Coronal Mass Ejections using the NASA WIND H1 database and created Python workflows for web mining and scientific visualisation.",
    image:
      "https://www.figma.com/api/mcp/asset/6d421840-2872-4a9a-a7be-9d1924569bee.svg",
    accent: "#2ec7ef",
    positionClass: "landmark--physics",
    visual: "signal",
  },

  {
    id: "ai-health-lab",
    number: "03",
    title: "AI Health Lab",
    eyebrow: "IEEE study · Separate clinical AI project",
    statement:
      "Comparing zero-shot classifiers, then contributing to a psychiatric-assistant system.",
    description:
      "In my IEEE-published comparative study, Mistral-8×7B, LLaMA-8B and Gemma-7B classified psychiatric diseases from 10,000 health-related questions using zero-shot prompting through the ChatGroq API. Mistral achieved the highest accuracy at 93.5% and prompt adherence at 97.1%, followed by LLaMA at 85.3% accuracy and Gemma at 80.2%. Separately, in May 2025, I contributed to the Medic LLM Assistant for Psychiatric Diseases, where I led the visualisation module and supported manual psychiatric case-data collection. That project received an overall evaluation rating of 9/10.",
    image:
      "https://www.figma.com/api/mcp/asset/f39be1eb-2b3a-484a-b8d9-f1e19d4b2771.svg",
    accent: "#b25cff",
    positionClass: "landmark--ai",
    visual: "models",
  },
  {
    id: "teaching-academy",
    number: "04",
    title: "Teaching Academy",
    eyebrow: "SIWS · Knowledge studio",
    statement: "Complex ideas become useful when they become clear.",
    description:
      "As an Assistant Professor, I delivered lectures and practical sessions across Blockchain, Web3, Computational Mathematics, Software Engineering, Relational Databases and Project Presentation.",
    image:
      "https://www.figma.com/api/mcp/asset/9c9145a8-5d6b-452c-b34e-9ae04911e9bc.svg",
    accent: "#f7b344",
    positionClass: "landmark--teaching",
    visual: "topics",
  },
  {
    id: "product-workshop",
    number: "05",
    title: "Chemisto Workshop",
    eyebrow: "Nikma Healthcare · Ongoing project",
    statement: "Building the working system behind a healthcare platform.",
    description:
      "At Nikma Healthcare, my assigned project is Chemisto. I am responsible for building and handling the platform across customer discovery, product administration, checkout, orders, payments, private prescriptions, doctor-consultation workflows and operational management. I use an AI-assisted development process while taking responsibility for product decisions, implementation, testing and continuous improvement.",
    image:
      "https://www.figma.com/api/mcp/asset/6455bb31-3f31-4b10-9f34-fa3686c76bee.svg",
    accent: "#347dff",
    positionClass: "landmark--product",
    visual: "flow",
  },
  {
    id: "next-territory",
    number: "06",
    title: "Next Territory",
    eyebrow: "Now → Next",
    statement: "The horizon stays intentionally unfinished.",
    description:
      "I am strengthening system design, engineering foundations, product judgment and communication while using AI as leverage without replacing human reasoning and responsibility.",
    image:
      "https://www.figma.com/api/mcp/asset/aa0fa1d9-685e-4568-823f-d2af87a2f6b7.svg",
    accent: "#7d66ff",
    positionClass: "landmark--next",
    visual: "stars",
  },
];
