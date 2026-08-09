export const portfolio = {
  name: "Mohit Verma",
  initials: "MV",
  role: "Full-Stack Developer",
  secondaryRole: "Product Builder",
  location: "India",

  // Replace these placeholders with your real contact details.
  email: "your-email@example.com",

  socialLinks: {
    github: "https://github.com/your-username",
    linkedin: "https://linkedin.com/in/your-username",
  },

  navigation: [
    { label: "About", href: "#about" },
    { label: "Work", href: "#work" },
    { label: "Skills", href: "#skills" },
    { label: "Contact", href: "#contact" },
  ],

  projects: [
    {
      title: "Chemisto",
      category: "Healthcare commerce platform",
      description:
        "An organizational healthcare platform that I contribute to building and improving across customer experience, product operations and carefully controlled clinical workflows.",
      highlights: [
        "Customer commerce experience",
        "Product and order operations",
        "Secure document workflows",
        "Authentication and communication",
      ],
      technologies: [
        "Next.js",
        "TypeScript",
        "Relational Database",
        "Object Storage",
        "Cloud Infrastructure",
      ],
      website: "https://chemisto.in",
      github: "",
      caseStudy: "/work/chemisto",
      featured: true,
      confidentialityNote:
        "This case study is intentionally limited to public and non-confidential information. Internal systems, organizational data and implementation details are not disclosed.",
    },
  ],
} as const;
