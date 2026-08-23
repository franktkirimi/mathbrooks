export type ThingsProjectStatus = "Active programme" | "Research in formation";

export type ThingsProject = {
  code: string;
  slug: string;
  name: string;
  shortName: string;
  domain: string;
  status: ThingsProjectStatus;
  expansion?: string;
  summary: string;
  question: string;
  whyItMatters: string;
  researchAreas: string[];
  intendedOutcome: string;
};

export const thingsProjects: ThingsProject[] = [
  {
    code: "A01",
    slug: "soko-a01",
    name: "SOKO A01",
    shortName: "SOKO A01",
    domain: "Embodied intelligence",
    status: "Active programme",
    expansion: "Sensory-Oriented Kinetic Operator",
    summary:
      "A humanoid research platform for dangerous, physically demanding, and difficult-to-automate work.",
    question:
      "Can one adaptable physical system reduce people’s exposure to dangerous and demanding work?",
    whyItMatters:
      "Many essential tasks still place people close to hazardous machinery, chemicals, unstable ground, extreme heat, and repetitive physical strain.",
    researchAreas: [
      "Multimodal sensing and situational awareness",
      "Controlled movement in unstructured environments",
      "Human supervision and safe intervention",
      "Task adaptation across agriculture, mining, and industry",
    ],
    intendedOutcome:
      "A useful machine that extends human capability while keeping judgment and control with people.",
  },
  {
    code: "N01",
    slug: "tessera",
    name: "Tessera™",
    shortName: "Tessera",
    domain: "Resilient networks",
    status: "Research in formation",
    summary:
      "An AI-driven, hardware-agnostic intelligence layer for decentralized networks that can adapt when nodes move, weaken, or disappear.",
    question:
      "Can a decentralized network learn to restore useful routes as its physical conditions change?",
    whyItMatters:
      "Central towers, fixed fibre routes, and proprietary hardware can leave communities and operations disconnected when one critical part fails.",
    researchAreas: [
      "Reinforcement-learning approaches to dynamic packet routing",
      "Low-power inference across heterogeneous edge devices",
      "Handoffs between Wi-Fi, Bluetooth, RF, and satellite links",
      "Operator visibility, traffic priority, and manual control",
    ],
    intendedOutcome:
      "A trusted network-intelligence layer that helps essential communications adapt to failure, movement, and interference.",
  },
  {
    code: "L01",
    slug: "zimbabwe-language-intelligence",
    name: "Ilwimi",
    shortName: "Ilwimi",
    domain: "Inclusive Language Intelligence",
    status: "Research in formation",
    expansion: "Zimbabwe Language Intelligence",
    summary:
      "AI that speaks our reality—built around how Zimbabweans actually speak, write, work, and reason.",
    question:
      "Can useful AI understand Zimbabwean languages, code-switching, local knowledge, and everyday context?",
    whyItMatters:
      "Shona, Ndebele, Chewa, Ndau, Zimbabwean English, and mixed-language communication remain underserved by mainstream systems, widening the digital divide and limiting locally useful innovation.",
    researchAreas: [
      "Consented, high-quality local language datasets",
      "Shona, Ndebele, English, and code-switching evaluation",
      "Speech recognition, translation, and voice interfaces",
      "Efficient models for low-connectivity and on-device use",
      "Cultural context and local knowledge integration",
    ],
    intendedOutcome:
      "A trusted language-intelligence layer—open models, APIs, and datasets that make Zimbabwean digital services locally fluent, useful, and accessible.",
  },
  {
    code: "E01",
    slug: "zimbabwe-earth-intelligence",
    name: "neFI",
    shortName: "neFI",
    domain: "Environmental infrastructure",
    status: "Active programme",
    summary:
      "The environmental nervous system of Zimbabwe.",
    question:
      "Can Zimbabwe bring every environmental observation into one continuously updated, freely accessible foundation layer?",
    whyItMatters:
      "Zimbabwe’s environmental data exists, but it lives in fragments. The signals are often present before a crisis; no single view brings them together in time.",
    researchAreas: [
      "Satellite imagery and Earth observation",
      "Weather and rainfall observations",
      "River levels and dam states",
      "Ground reports and field observations",
      "Terrain, soils, catchments, and administrative boundaries",
    ],
    intendedOutcome:
      "Nationally hosted, institutionally governed environmental data infrastructure that outlasts any single project, organisation, or political cycle.",
  },
  {
    code: "G01",
    slug: "eklezo",
    name: "Eklezo",
    shortName: "Eklezo",
    domain: "Energy intelligence",
    status: "Research in formation",
    expansion: "End-to-End Energy Intelligence",
    summary:
      "From local lithium to grid orchestration—resilient infrastructure, operating intelligence, and the long path towards local battery capability.",
    question:
      "Can Zimbabwe connect energy deployment, intelligent orchestration, and local battery capability into one resilient value chain?",
    whyItMatters:
      "Farms, mines, schools, clinics, and businesses increasingly combine grid power, solar generation, storage, and backup systems without one operating intelligence, while much of the battery value chain remains external.",
    researchAreas: [
      "Eklezo OS forecasting, scheduling, and control",
      "Hybrid energy infrastructure and mini-grid deployment",
      "Local battery-material and pack-engineering research",
      "Second-life storage and recycling pathways",
    ],
    intendedOutcome:
      "A vertically connected energy ecosystem that deploys resilient power now, coordinates it intelligently, and builds towards deeper local battery capability.",
  },
];

export const getThingsProject = (slug?: string) =>
  thingsProjects.find((project) => project.slug === slug);
