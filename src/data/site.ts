export const siteConfig = {
  name: "Tranquil Trail Travels",
  tagline: "Your premium guide to Northeast India",
  description:
    "Premium customized travel itineraries for Northeast India — Assam, Arunachal Pradesh, Meghalaya & Nagaland. Luxury journeys crafted for the discerning traveler.",
  url: "https://tranquiltrailtravels.com",
  /**
   * Site-wide fallback for og:image / twitter:image. It is the homepage hero
   * (HeroDawn.astro) so a shared link shows what a visitor actually lands on.
   * Absolute on purpose — there is no local OG asset, and `/og-image.jpg`
   * used to 404 on every page that did not pass its own hero.
   */
  ogImage:
    "https://images.unsplash.com/photo-1689751439845-e57c1fab564d?auto=format&fit=crop&crop=entropy&q=80&w=1200",
  destinations: [
    {
      name: "Assam",
      state: "Assam",
      description:
        "Wildlife & Tea Heritage — encounter the one-horned rhino at Kaziranga and discover Majuli, the world's largest river island.",
    },
    {
      name: "Arunachal Pradesh",
      state: "Arunachal Pradesh",
      description:
        "Monasteries & Hidden Valleys — from Tawang's Buddhist monasteries to Mechuka's pristine valleys.",
    },
    {
      name: "Meghalaya",
      state: "Meghalaya",
      description:
        "Living Bridges & Waterfalls — trek to ancient living root bridges and witness spectacular waterfalls.",
    },
    {
      name: "Nagaland",
      state: "Nagaland",
      description:
        "Tribal Heritage & Alpine Meadows — experience Konyak warrior culture in Mon and trek the legendary Dzukou Valley.",
    },
  ],
  contact: {
    email: "contact@tranquiltrailtravels.com",
    whatsapp: "+916002324880",
    instagram: "https://www.instagram.com/tranquil_trail_travels",
  },
} as const;
