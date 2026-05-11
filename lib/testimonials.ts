export interface Testimonial {
  quote: string;
  name: string;
  title: string;
  company: string;
  image?: string;
  logo?: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "Before HEYDE, we spent weeks on visual inconsistency across campaigns. In 2 weeks, they built us a documented system. Now we generate assets independently.",
    name: "María",
    title: "Creative Director",
    company: "Soleá Fragrance",
    logo: "🌿",
  },
  {
    quote:
      "We went from €45k and 8 weeks for a photoshoot to €15k and 10 days with HEYDE. Same premium quality, infinite scalability. Game changer.",
    name: "David",
    title: "CEO",
    company: "Luxury Fashion Brand",
    logo: "✨",
  },
  {
    quote:
      "The documentation was key. We didn't just get images—we got a system we could evolve ourselves. That's worth everything.",
    name: "Elena",
    title: "Brand Manager",
    company: "Premium Beauty Brand",
    logo: "💎",
  },
];
