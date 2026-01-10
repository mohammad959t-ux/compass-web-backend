export const seedServices = [
  {
    slug: "brand-strategy",
    title: "Brand Strategy",
    name: "Brand Strategy",
    summary: "Positioning, messaging, and market clarity that cuts through.",
    description:
      "We align founders and teams around a single narrative, then translate it into a confident digital presence.",
    features: ["Vision workshops", "Audience research", "Messaging framework"],
    category: "Strategy",
    price: 6000,
    priceRange: "$2,500 - $6,000"
  },
  {
    slug: "web-experience",
    title: "Web Experience",
    name: "Web Experience",
    summary: "High-conversion websites built for momentum.",
    description:
      "UX + UI design and responsive builds that feel fast, polished, and ready to scale.",
    features: ["UX flows", "Figma design", "Next.js build"],
    category: "Design",
    price: 9500,
    priceRange: "$4,500 - $15,000"
  },
  {
    slug: "growth-systems",
    title: "Growth Systems",
    name: "Growth Systems",
    summary: "Funnels, automation, and revenue experiments.",
    description:
      "We connect your site to marketing automations, conversion tracking, and performance loops.",
    features: ["CRM setup", "Email journeys", "Conversion analytics"],
    category: "Automation",
    price: 7000,
    priceRange: "$3,000 - $9,000"
  }
];

export const seedProjects = [
  {
    slug: "lumen-payments",
    title: "Lumen Payments",
    name: "Lumen Payments",
    category: "Fintech",
    summary: "Replatformed onboarding and conversion for a multi-region launch.",
    results: ["+38% activation", "-22% support tickets", "3x faster sales demos"],
    status: "active",
    owner: "Amina Al Noor",
    budget: 18000
  },
  {
    slug: "atlas-ventures",
    title: "Atlas Ventures",
    name: "Atlas Ventures",
    category: "Venture Studio",
    summary: "Brand and website for a portfolio of ambitious founders.",
    results: ["12-week rollout", "Unified brand system", "Global investor kit"],
    status: "paused",
    owner: "Javier Suarez",
    budget: 12000
  },
  {
    slug: "veridian-health",
    title: "Veridian Health",
    name: "Veridian Health",
    category: "Healthcare",
    summary: "Trust-first digital experience for a remote healthcare group.",
    results: ["HIPAA-aligned UX", "+44% booking rate", "New telehealth flow"],
    status: "complete",
    owner: "Priya Singh",
    budget: 24000
  }
];

export const seedPackages = [
  {
    slug: "launch-pad",
    title: "Launch Pad",
    name: "Launch Pad",
    price: 4900,
    priceLabel: "$4,900",
    description: "A focused brand + website sprint for new ventures.",
    includes: ["3-page website", "Brand starter kit", "Analytics setup"],
    status: "live"
  },
  {
    slug: "growth-surge",
    title: "Growth Surge",
    name: "Growth Surge",
    price: 9500,
    priceLabel: "$9,500",
    description: "Conversion-first site build with automation and CRM wiring.",
    includes: ["Custom UX", "CRM + email", "Performance tracking"],
    status: "live"
  },
  {
    slug: "enterprise-elevation",
    title: "Enterprise Elevation",
    name: "Enterprise Elevation",
    price: 18000,
    priceLabel: "$18,000",
    description: "Full-scale digital transformation for mature teams.",
    includes: ["Multi-product IA", "Design system", "Launch support"],
    status: "draft"
  }
];

export const seedReviews = [
  {
    client: "Lumen Payments",
    name: "Amina Al Noor",
    role: "CEO, Lumen Payments",
    quote:
      "Compass delivered a website that feels premium and converts faster. Their process is razor sharp.",
    rating: 5,
    status: "approved",
    token: "lm-450",
    comment: ""
  },
  {
    client: "Atlas Ventures",
    name: "Javier Suarez",
    role: "COO, Atlas Ventures",
    quote:
      "Every touchpoint felt intentional. We launched with confidence and a brand that finally fits.",
    rating: 4,
    status: "pending",
    token: "av-982",
    comment: ""
  },
  {
    client: "Veridian Health",
    name: "Priya Singh",
    role: "Product Lead, Veridian Health",
    quote:
      "Our new experience made scheduling effortless. The team delivered on every promise.",
    rating: 5,
    status: "approved",
    token: "vh-301",
    comment: ""
  }
];

export const seedLeads = [
  {
    name: "Noor Al Abbas",
    email: "noor@atlas.com",
    status: "new",
    createdAt: "2026-01-02",
    company: "Atlas",
    budget: "10k+",
    message: "We need a new website."
  }
];

export const seedOrders = [
  {
    client: "Lumen Payments",
    project: "Growth Site",
    total: 18000,
    status: "in-progress",
    dueDate: "2026-02-04"
  },
  {
    client: "Atlas Ventures",
    project: "Brand System",
    total: 12000,
    status: "pending",
    dueDate: "2026-01-28"
  }
];

export const seedExpenses = [
  { vendor: "Figma", category: "Software", amount: 84, date: "2026-01-02" },
  { vendor: "AWS", category: "Infrastructure", amount: 210, date: "2026-01-05" }
];

export const seedCalendar = [
  {
    title: "Discovery call: Atlas Ventures",
    date: "2026-01-12",
    type: "call",
    status: "scheduled"
  },
  {
    title: "Design review: Lumen Payments",
    date: "2026-01-15",
    type: "review",
    status: "scheduled"
  }
];
