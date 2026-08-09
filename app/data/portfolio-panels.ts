import type { PortfolioPanelId } from "@/app/components/portfolio/game/PortfolioWorldHud";

export type PortfolioPanelItem = {
  title: string;
  description: string;
  meta?: string;
};

export type PortfolioPanelAction = {
  label: string;
  href: string;
};

export type PortfolioPanelContent = {
  id: PortfolioPanelId;
  eyebrow: string;
  title: string;
  description: string;
  items: PortfolioPanelItem[];
  actions?: PortfolioPanelAction[];
};

export const portfolioPanels: Record<PortfolioPanelId, PortfolioPanelContent> =
  {
    about: {
      id: "about",
      eyebrow: "About Mohit",
      title: "Research, teaching and product building meet here.",
      description:
        "I am Mohit Verma, a product builder working across software, healthcare systems, scientific research and education. I use curiosity to understand difficult problems and turn them into practical, understandable products.",
      items: [
        {
          title: "Chemisto",
          meta: "Nikma Healthcare · Ongoing project",
          description:
            "At Nikma Healthcare, I am responsible for the ongoing development and management of Chemisto, a healthcare commerce and operations platform. My work spans the customer storefront, catalogue administration, checkout and order management, payment integration, private prescription handling, doctor-consultation workflows and operational dashboards. I use AI-assisted development tools throughout the product and engineering process while taking responsibility for implementation, testing, iteration and continuous improvement.",
        },
        {
          title: "Zero-Shot Classification of Psychiatric Diseases",
          meta: "IEEE Xplore · Apr 17, 2025",
          description:
            "A comparative study of Mistral-8×7B, LLaMA-8B and Gemma-7B for classifying psychiatric diseases from 10,000 health-related questions using zero-shot prompting through the ChatGroq API. Mistral achieved 93.5% accuracy and 97.1% prompt adherence, outperforming LLaMA at 85.3% accuracy and Gemma at 80.2%. The models were evaluated on accuracy, instruction adherence and their ability to distinguish between similar diseases.",
        },
        {
          title: "Educator",
          description:
            "As an Assistant Professor, I have taught Blockchain, Web3, Computational Mathematics, Software Engineering and Relational Databases.",
        },
      ],
    },

    projects: {
      id: "projects",
      eyebrow: "Selected work",
      title: "Products and research built around real problems.",
      description:
        "My work spans healthcare product operations, psychiatric-health technology, artificial intelligence and scientific research—presented from newest to oldest.",
      items: [
        {
          title: "Chemisto · Nikma Healthcare",
          meta: "Healthcare product system · Ongoing",
          description:
            "Building and managing a healthcare commerce and operations platform covering product discovery, checkout, prescriptions, doctor workflows, administration, clinical operations and order management.",
        },
        {
          title: "Medic LLM Assistant for Psychiatric Diseases",
          meta: "LTMG Hospital · May 19, 2025",
          description:
            "Contributed to a medical-assistant system designed to generate psychiatric diagnosis reports, propose structured treatment plans and recommend appropriate medications. I led the visualisation module and supported manual collection of psychiatric case data. The system was evaluated using real-life case records and received an overall rating of 9/10.",
        },
        {
          title: "Zero-Shot Psychiatric Disease Classification",
          meta: "IEEE Xplore · Apr 17, 2025",
          description:
            "Evaluated Mistral, LLaMA and Gemma across 10,000 health-related questions using accuracy, instruction adherence and the ability to differentiate between similar psychiatric disorders.",
        },
        {
          title: "Interplanetary Coronal Mass Ejection Analysis",
          meta: "University of Mumbai · Apr-Jun 2024",
          description:
            "Analysed 25 years of NASA WIND H1 data during my University of Mumbai research internship. I developed Python workflows for web mining, data analysis and scientific visualisation using Matplotlib, Seaborn and Tplot.",
        },
      ],
      actions: [
        {
          label: "View IEEE publication",
          href: "https://ieeexplore.ieee.org/document/11031589",
        },
      ],
    },

    skills: {
      id: "skills",
      eyebrow: "Capabilities",
      title: "A multidisciplinary toolkit for building complete systems.",
      description:
        "My skills combine engineering, product thinking, research, visual communication and teaching.",
      items: [
        {
          title: "Product and Engineering",
          description:
            "Next.js, React, TypeScript, APIs, databases, system workflows, responsive interfaces and AI-assisted development.",
        },
        {
          title: "Research and Data",
          description:
            "Python, data analysis, Matplotlib, Seaborn, Tplot, web mining, requests, CDF data and scientific visualisation.",
        },
        {
          title: "Artificial Intelligence",
          description:
            "Large language models, zero-shot classification, model evaluation, ChatGroq workflows and interpretable result visualisation.",
        },
        {
          title: "Teaching and Communication",
          description:
            "Higher-education teaching, technical communication, Blockchain, Web3, Computational Mathematics and professional responsibility.",
        },
      ],
    },

    contact: {
      id: "contact",
      eyebrow: "Contact",
      title: "Have an interesting problem to build?",
      description:
        "I am open to conversations around product building, software systems, healthcare technology, research collaboration and teaching.",
      items: [
        {
          title: "Based in Mumbai, India",
          description:
            "Available for relevant product, engineering, research and educational opportunities.",
        },
        {
          title: "Best way to connect",
          description:
            "Send an email or connect with me through LinkedIn and include a short description of what you would like to discuss.",
        },
      ],
      actions: [
        {
          label: "Send email",
          href: "mailto:mohitbrijverma2@gmail.com",
        },
        {
          label: "Connect on LinkedIn",
          href: "https://www.linkedin.com/in/mohit-verma-3839b9226/",
        },
      ],
    },
  };
