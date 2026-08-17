export type Maturity = "Live" | "In Development" | "Exploring";

export type EcosystemItem = {
  name: string;
  status: Maturity;
  description: string;
  href?: string;
};

export const liveProducts: EcosystemItem[] = [
  {
    name: "PayYako",
    status: "Live",
    description:
      "A living Career Passport for professionals: salary intelligence, career guidance, verified work evidence, and a professional identity that improves as the person grows.",
    href: "https://payyako.online",
  },
  {
    name: "zwprice",
    status: "Live",
    description:
      "A Zimbabwean request marketplace where people can post what they need, compare supplier quotes, and confirm final terms.",
    href: "https://www.zwprice.com",
  },
  {
    name: "FortiFaith",
    status: "Live",
    description:
      "A platform that helps people stay close to missionaries through updates, giving, and prayer.",
    href: "https://fortifaith.com",
  },
];

export const technologyTools = [
  "AI",
  "Software",
  "Computing",
  "Data",
  "Automation",
  "Connected technology",
];

export const industries: EcosystemItem[] = [
  { name: "Health", status: "Exploring", description: "Better access, information, coordination, and care." },
  { name: "Finance", status: "Exploring", description: "Tools that help people and organizations understand, access, and manage financial systems." },
  { name: "Education", status: "Exploring", description: "Technology that helps people learn, teach, and access educational opportunities." },
  { name: "Logistics", status: "Exploring", description: "Systems that help coordinate the movement of goods and resources." },
  { name: "Agriculture", status: "Exploring", description: "Tools that help farmers make better decisions, improve productivity, and manage resources." },
  { name: "Mining", status: "Exploring", description: "Technology designed to help people work more intelligently, efficiently, and safely." },
  { name: "Labor", status: "Exploring", description: "Technology that connects people with opportunity and improves how work is organized." },
  { name: "Energy", status: "Exploring", description: "Technology that helps communities and organizations manage energy use, reliability, and access." },
  { name: "Public Services", status: "Exploring", description: "Digital systems that make public information, services, and coordination more accessible." },
];
