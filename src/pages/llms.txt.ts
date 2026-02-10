import type { APIRoute } from "astro";
import { siteConfig } from "../data/site";

export const GET: APIRoute = () => {
  const destinations = siteConfig.destinations
    .map((d) => `- **${d.name}**: ${d.description}`)
    .join("\n");

  const body = `# ${siteConfig.name}

> ${siteConfig.tagline}

${siteConfig.description}

## Destinations

${destinations}

## Contact

- Email: ${siteConfig.contact.email}
- Instagram: ${siteConfig.contact.instagram}
- Website: ${siteConfig.url}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
