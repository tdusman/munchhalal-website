import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://munchhalal.ca';

  // Static routes
  const staticRoutes = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 1 },
    { url: `${baseUrl}/restaurants`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.9 },
    { url: `${baseUrl}/map`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${baseUrl}/faq`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.5 },
  ];

  // Dynamic restaurant routes - these would normally be fetched server-side
  // Since we use localStorage, we include known slugs
  const restaurantSlugs = [
    'lahore-tikka-house', 'paramount-fine-foods', 'mogadishu-eats',
    'bombay-chowpatty', 'sultan-kebab-palace', 'al-tanoor-grill',
    'karachi-kitchen', 'saffron-lounge', 'kabul-farms-restaurant',
    'dhaka-spice-house', 'anatolian-delight', 'suugo-somali-cuisine',
    'naan-and-chai', 'shawarma-station', 'beirut-star-grill',
  ];

  const restaurantRoutes = restaurantSlugs.map((slug) => ({
    url: `${baseUrl}/restaurants/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...restaurantRoutes];
}
