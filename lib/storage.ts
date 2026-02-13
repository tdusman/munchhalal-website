import {
  Restaurant,
  Ad,
  Signup,
  ContactSubmission,
  SiteSettings,
} from "@/types";

const KEYS = {
  restaurants: "mh_restaurants",
  ads: "mh_ads",
  signups: "mh_signups",
  contacts: "mh_contacts",
  settings: "mh_settings",
} as const;

export function getItem<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  try {
    const item = localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : null;
  } catch {
    return null;
  }
}

export function setItem<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    console.error("Failed to save to localStorage");
  }
}

export function removeItem(key: string): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(key);
}

export function getRestaurants(): Restaurant[] {
  return getItem<Restaurant[]>(KEYS.restaurants) || [];
}

export function getRestaurantBySlug(slug: string): Restaurant | undefined {
  return getRestaurants().find((r) => r.slug === slug);
}

export function getAds(): Ad[] {
  return getItem<Ad[]>(KEYS.ads) || [];
}

export function getAdByPlacement(placement: Ad["placement"]): Ad | undefined {
  return getAds().find(
    (a) => a.placement === placement && a.status === "active",
  );
}

export function getSignups(): Signup[] {
  return getItem<Signup[]>(KEYS.signups) || [];
}

export function addSignup(signup: Signup): void {
  const signups = getSignups();
  signups.push(signup);
  setItem(KEYS.signups, signups);
}

export function getContacts(): ContactSubmission[] {
  return getItem<ContactSubmission[]>(KEYS.contacts) || [];
}

export function addContact(contact: ContactSubmission): void {
  const contacts = getContacts();
  contacts.push(contact);
  setItem(KEYS.contacts, contacts);
}

function defaultHours() {
  return {
    Monday: { open: "11:00", close: "22:00", closed: false },
    Tuesday: { open: "11:00", close: "22:00", closed: false },
    Wednesday: { open: "11:00", close: "22:00", closed: false },
    Thursday: { open: "11:00", close: "22:00", closed: false },
    Friday: { open: "11:00", close: "23:00", closed: false },
    Saturday: { open: "11:00", close: "23:00", closed: false },
    Sunday: { open: "12:00", close: "21:00", closed: false },
  };
}

export function initSeedData(): void {
  if (typeof window === "undefined") return;
  if (localStorage.getItem(KEYS.restaurants)) return;

  const restaurants: Restaurant[] = [
    // TORONTO (5)
    {
      id: "a1b2c3d4-e5f6-4a1b-8c2d-1234567890ab",
      name: "Lahore Tikka House",
      slug: "lahore-tikka-house",
      description:
        "Authentic Pakistani cuisine in the heart of Toronto. Known for our signature seekh kebabs, butter chicken, and fresh naan bread baked in our traditional tandoor oven. Family-owned since 2005, we serve halal-certified dishes made with the freshest ingredients.",
      category: "Pakistani",
      cuisineType: "Pakistani",
      address: "1365 Gerrard St E",
      city: "Toronto",
      province: "Ontario",
      postalCode: "M4L 1Z3",
      lat: 43.6763,
      lng: -79.327,
      phone: "(416) 406-1668",
      website: "https://lahoretikkahouse.ca",
      socialLinks: {
        instagram: "https://instagram.com/lahoretikka",
        facebook: "https://facebook.com/lahoretikkahouse",
      },
      images: [
        "https://picsum.photos/seed/lahoretikka1/400/300",
        "https://picsum.photos/seed/lahoretikka2/400/300",
        "https://picsum.photos/seed/lahoretikka3/400/300",
      ],
      coverImage: "https://picsum.photos/seed/lahoretikkahouse/800/500",
      priceRange: "$$",
      halalCertType: "certified",
      isFeatured: true,
      isPromoted: false,
      isHidden: false,

      status: "active",
      planType: "featured",
      openingHours: defaultHours(),
      createdAt: "2025-08-15T10:00:00Z",
    },
    {
      id: "b2c3d4e5-f6a7-4b2c-9d3e-2345678901bc",
      name: "Paramount Fine Foods",
      slug: "paramount-fine-foods",
      description:
        "Experience the finest Middle Eastern cuisine at Paramount Fine Foods. Our menu features shawarma, falafel, grilled meats, and traditional Lebanese desserts. Every dish is prepared with premium halal-certified ingredients and authentic recipes passed down through generations.",
      category: "Lebanese",
      cuisineType: "Lebanese",
      address: "253 Yonge St",
      city: "Toronto",
      province: "Ontario",
      postalCode: "M5B 1N8",
      lat: 43.6547,
      lng: -79.3806,
      phone: "(416) 971-7777",
      website: "https://paramountfinefoods.com",
      socialLinks: {
        instagram: "https://instagram.com/paramountfinefoods",
        facebook: "https://facebook.com/paramountfinefoods",
        twitter: "https://twitter.com/paramountfoods",
      },
      images: [
        "https://picsum.photos/seed/paramount1/400/300",
        "https://picsum.photos/seed/paramount2/400/300",
        "https://picsum.photos/seed/paramount3/400/300",
      ],
      coverImage: "https://picsum.photos/seed/paramountfinefoods/800/500",
      priceRange: "$$",
      halalCertType: "certified",
      isFeatured: true,
      isPromoted: true,
      isHidden: false,

      status: "active",
      planType: "featured",
      openingHours: defaultHours(),
      createdAt: "2025-07-20T10:00:00Z",
    },
    {
      id: "c3d4e5f6-a7b8-4c3d-ae4f-3456789012cd",
      name: "Mogadishu Eats",
      slug: "mogadishu-eats",
      description:
        "Toronto's premier Somali restaurant bringing the vibrant flavors of East Africa to your table. Enjoy our aromatic basmati rice with tender goat suqaar, sambusa platters, and refreshing mango lassi. Halal and family friendly.",
      category: "Somali",
      cuisineType: "Somali",
      address: "1585 Dundas St W",
      city: "Toronto",
      province: "Ontario",
      postalCode: "M6K 1T9",
      lat: 43.6495,
      lng: -79.43,
      phone: "(416) 534-0088",
      website: "https://mogadishueats.ca",
      socialLinks: { instagram: "https://instagram.com/mogadishueats" },
      images: [
        "https://picsum.photos/seed/mogadishu1/400/300",
        "https://picsum.photos/seed/mogadishu2/400/300",
        "https://picsum.photos/seed/mogadishu3/400/300",
      ],
      coverImage: "https://picsum.photos/seed/mogadishueats/800/500",
      priceRange: "$",
      halalCertType: "self_declared",
      isFeatured: false,
      isPromoted: false,
      isHidden: false,

      status: "active",
      planType: "basic",
      openingHours: defaultHours(),
      createdAt: "2025-11-01T10:00:00Z",
    },
    {
      id: "d4e5f6a7-b8c9-4d4e-bf5a-4567890123de",
      name: "Bombay Chowpatty",
      slug: "bombay-chowpatty",
      description:
        "A celebration of Indian street food and fine dining in downtown Toronto. From crispy pani puri to creamy butter paneer, our chefs craft each dish with traditional spices and modern flair. Fully halal kitchen with vegetarian options available.",
      category: "Indian",
      cuisineType: "Indian",
      address: "1472 Gerrard St E",
      city: "Toronto",
      province: "Ontario",
      postalCode: "M4L 1Z8",
      lat: 43.6767,
      lng: -79.3235,
      phone: "(416) 469-1234",
      website: "https://bombaychowpatty.ca",
      socialLinks: {
        instagram: "https://instagram.com/bombaychowpatty",
        facebook: "https://facebook.com/bombaychowpatty",
      },
      images: [
        "https://picsum.photos/seed/bombay1/400/300",
        "https://picsum.photos/seed/bombay2/400/300",
        "https://picsum.photos/seed/bombay3/400/300",
      ],
      coverImage: "https://picsum.photos/seed/bombaychowpatty/800/500",
      priceRange: "$$",
      halalCertType: "certified",
      isFeatured: false,
      isPromoted: false,
      isHidden: false,

      status: "active",
      planType: "basic",
      openingHours: defaultHours(),
      createdAt: "2025-12-10T10:00:00Z",
    },
    {
      id: "e5f6a7b8-c9d0-4e5f-ca6b-5678901234ef",
      name: "Sultan Kebab Palace",
      slug: "sultan-kebab-palace",
      description:
        "Sultan Kebab Palace offers the finest Turkish and Mediterranean cuisine in Toronto. Savor our charcoal-grilled Adana kebabs, authentic doner wraps, and creamy hummus platters. Our meats are sourced from certified halal suppliers.",
      category: "Turkish",
      cuisineType: "Turkish",
      address: "780 College St",
      city: "Toronto",
      province: "Ontario",
      postalCode: "M6G 1C6",
      lat: 43.6545,
      lng: -79.4218,
      phone: "(416) 532-9898",
      website: "https://sultankebab.ca",
      socialLinks: {
        instagram: "https://instagram.com/sultankebab",
        twitter: "https://twitter.com/sultankebab",
      },
      images: [
        "https://picsum.photos/seed/sultan1/400/300",
        "https://picsum.photos/seed/sultan2/400/300",
        "https://picsum.photos/seed/sultan3/400/300",
      ],
      coverImage: "https://picsum.photos/seed/sultankebabpalace/800/500",
      priceRange: "$$$",
      halalCertType: "certified",
      isFeatured: true,
      isPromoted: true,
      isHidden: false,

      status: "active",
      planType: "featured",
      openingHours: defaultHours(),
      createdAt: "2025-06-05T10:00:00Z",
    },

    // MISSISSAUGA (3)
    {
      id: "f6a7b8c9-d0e1-4f6a-db7c-6789012345fa",
      name: "Al-Tanoor Grill",
      slug: "al-tanoor-grill",
      description:
        "Al-Tanoor Grill is Mississauga's go-to destination for authentic Middle Eastern grilled meats and fresh salads. Our tanoor oven produces perfectly charred flatbreads while our chefs prepare juicy shawarma and mixed grills daily.",
      category: "Middle Eastern",
      cuisineType: "Middle Eastern",
      address: "3050 Artesian Dr",
      city: "Mississauga",
      province: "Ontario",
      postalCode: "L5M 2K1",
      lat: 43.56,
      lng: -79.6919,
      phone: "(905) 542-8800",
      website: "https://altanoor.ca",
      socialLinks: {
        instagram: "https://instagram.com/altanoor",
        facebook: "https://facebook.com/altanoor",
      },
      images: [
        "https://picsum.photos/seed/altanoor1/400/300",
        "https://picsum.photos/seed/altanoor2/400/300",
        "https://picsum.photos/seed/altanoor3/400/300",
      ],
      coverImage: "https://picsum.photos/seed/altanoorgrill/800/500",
      priceRange: "$$",
      halalCertType: "self_declared",
      isFeatured: false,
      isPromoted: false,
      isHidden: false,

      status: "active",
      planType: "basic",
      openingHours: defaultHours(),
      createdAt: "2025-10-22T10:00:00Z",
    },
    {
      id: "a7b8c9d0-e1f2-4a7b-ec8d-7890123456ab",
      name: "Karachi Kitchen",
      slug: "karachi-kitchen",
      description:
        "Bringing the bold flavors of Karachi street food to Mississauga. Try our famous nihari, haleem, and biryani prepared with slow-cooked spices. A family-friendly restaurant with generous portions and warm hospitality.",
      category: "Pakistani",
      cuisineType: "Pakistani",
      address: "5602 Tenth Line West",
      city: "Mississauga",
      province: "Ontario",
      postalCode: "L5M 0J1",
      lat: 43.5538,
      lng: -79.7231,
      phone: "(905) 567-3344",
      website: "https://karachikitchen.ca",
      socialLinks: { instagram: "https://instagram.com/karachikitchen" },
      images: [
        "https://picsum.photos/seed/karachi1/400/300",
        "https://picsum.photos/seed/karachi2/400/300",
        "https://picsum.photos/seed/karachi3/400/300",
      ],
      coverImage: "https://picsum.photos/seed/karachikitchen/800/500",
      priceRange: "$",
      halalCertType: "certified",
      isFeatured: true,
      isPromoted: false,
      isHidden: false,

      status: "active",
      planType: "featured",
      openingHours: defaultHours(),
      createdAt: "2025-09-12T10:00:00Z",
    },
    {
      id: "b8c9d0e1-f2a3-4b8c-fd9e-8901234567bc",
      name: "Saffron Lounge",
      slug: "saffron-lounge",
      description:
        "Saffron Lounge combines elegant Indian dining with a modern twist. Our menu features aromatic biryanis, tandoori specialties, and signature curry bowls. Perfect for family gatherings or a special night out in Mississauga.",
      category: "Indian",
      cuisineType: "Indian",
      address: "1177 Central Pkwy W",
      city: "Mississauga",
      province: "Ontario",
      postalCode: "L5C 4P3",
      lat: 43.5729,
      lng: -79.653,
      phone: "(905) 270-5500",
      website: "https://saffronlounge.ca",
      socialLinks: {
        instagram: "https://instagram.com/saffronlounge",
        facebook: "https://facebook.com/saffronlounge",
      },
      images: [
        "https://picsum.photos/seed/saffron1/400/300",
        "https://picsum.photos/seed/saffron2/400/300",
        "https://picsum.photos/seed/saffron3/400/300",
      ],
      coverImage: "https://picsum.photos/seed/saffronlounge/800/500",
      priceRange: "$$$",
      halalCertType: "self_declared",
      isFeatured: false,
      isPromoted: false,
      isHidden: false,

      status: "active",
      planType: "free",
      openingHours: defaultHours(),
      createdAt: "2025-12-28T10:00:00Z",
    },

    // BRAMPTON (3)
    {
      id: "c9d0e1f2-a3b4-4c9d-ae0f-9012345678cd",
      name: "Kabul Farms Restaurant",
      slug: "kabul-farms-restaurant",
      description:
        "Experience the rich flavors of Afghan cuisine at Kabul Farms. Our specialties include mantu dumplings, chopan kabob, and fragrant qabuli palaw. Every dish is prepared with authentic spices and halal meats, served in a warm and inviting atmosphere.",
      category: "Afghan",
      cuisineType: "Afghan",
      address: "30 Gillingham Dr",
      city: "Brampton",
      province: "Ontario",
      postalCode: "L6X 5G1",
      lat: 43.728,
      lng: -79.757,
      phone: "(905) 450-9988",
      website: "https://kabulfarms.ca",
      socialLinks: { instagram: "https://instagram.com/kabulfarms" },
      images: [
        "https://picsum.photos/seed/kabul1/400/300",
        "https://picsum.photos/seed/kabul2/400/300",
        "https://picsum.photos/seed/kabul3/400/300",
      ],
      coverImage: "https://picsum.photos/seed/kabulfarms/800/500",
      priceRange: "$$",
      halalCertType: "self_declared",
      isFeatured: false,
      isPromoted: false,
      isHidden: false,

      status: "active",
      planType: "basic",
      openingHours: defaultHours(),
      createdAt: "2025-11-15T10:00:00Z",
    },
    {
      id: "d0e1f2a3-b4c5-4d0e-bf1a-0123456789de",
      name: "Dhaka Spice House",
      slug: "dhaka-spice-house",
      description:
        "Brampton's authentic Bangladeshi dining experience. Our chefs serve traditional dishes like kacchi biryani, fish bhuna, and shatkora beef curry. We use family recipes that have been perfected over decades, with 100% halal ingredients.",
      category: "Bangladeshi",
      cuisineType: "Bangladeshi",
      address: "55 Charolais Blvd",
      city: "Brampton",
      province: "Ontario",
      postalCode: "L6Y 5K5",
      lat: 43.708,
      lng: -79.75,
      phone: "(905) 796-2255",
      website: "https://dhakaspice.ca",
      socialLinks: {
        instagram: "https://instagram.com/dhakaspice",
        facebook: "https://facebook.com/dhakaspice",
      },
      images: [
        "https://picsum.photos/seed/dhaka1/400/300",
        "https://picsum.photos/seed/dhaka2/400/300",
        "https://picsum.photos/seed/dhaka3/400/300",
      ],
      coverImage: "https://picsum.photos/seed/dhakaspicehouse/800/500",
      priceRange: "$",
      halalCertType: "unknown",
      isFeatured: false,
      isPromoted: false,
      isHidden: false,

      status: "active",
      planType: "free",
      openingHours: defaultHours(),
      createdAt: "2026-01-05T10:00:00Z",
    },
    {
      id: "e1f2a3b4-c5d6-4e1f-ca2b-1234567890ef",
      name: "Anatolian Delight",
      slug: "anatolian-delight",
      description:
        "A Turkish culinary gem in Brampton offering fresh pide, lahmacun, and charcoal-grilled kebabs. Our desserts include traditional baklava and kunefe. All meats are halal certified and sourced from trusted local suppliers.",
      category: "Turkish",
      cuisineType: "Turkish",
      address: "198 County Court Blvd",
      city: "Brampton",
      province: "Ontario",
      postalCode: "L6W 4P6",
      lat: 43.717,
      lng: -79.736,
      phone: "(905) 874-6677",
      website: "https://anatoliandelight.ca",
      socialLinks: { instagram: "https://instagram.com/anatoliandelight" },
      images: [
        "https://picsum.photos/seed/anatolian1/400/300",
        "https://picsum.photos/seed/anatolian2/400/300",
        "https://picsum.photos/seed/anatolian3/400/300",
      ],
      coverImage: "https://picsum.photos/seed/anatoliandelight/800/500",
      priceRange: "$$",
      halalCertType: "self_declared",
      isFeatured: true,
      isPromoted: false,
      isHidden: false,

      status: "active",
      planType: "featured",
      openingHours: defaultHours(),
      createdAt: "2025-05-18T10:00:00Z",
    },

    // SCARBOROUGH (2)
    {
      id: "f2a3b4c5-d6e7-4f2a-db3c-2345678901fa",
      name: "Suugo Somali Cuisine",
      slug: "suugo-somali-cuisine",
      description:
        "Discover the rich and aromatic flavors of Somalia at Suugo. Our menu features traditional bariis iskukaris, hilib ari, and freshly made canjeero. A community favorite in Scarborough for over a decade, serving 100% halal food.",
      category: "Somali",
      cuisineType: "Somali",
      address: "2642 Lawrence Ave E",
      city: "Scarborough",
      province: "Ontario",
      postalCode: "M1P 2S5",
      lat: 43.758,
      lng: -79.265,
      phone: "(416) 288-9911",
      website: "https://suugocuisine.ca",
      socialLinks: { instagram: "https://instagram.com/suugocuisine" },
      images: [
        "https://picsum.photos/seed/suugo1/400/300",
        "https://picsum.photos/seed/suugo2/400/300",
        "https://picsum.photos/seed/suugo3/400/300",
      ],
      coverImage: "https://picsum.photos/seed/suugosomali/800/500",
      priceRange: "$",
      halalCertType: "self_declared",
      isFeatured: false,
      isPromoted: false,
      isHidden: false,

      status: "active",
      planType: "free",
      openingHours: defaultHours(),
      createdAt: "2025-10-05T10:00:00Z",
    },
    {
      id: "a3b4c5d6-e7f8-4a3b-ec4d-3456789012ab",
      name: "Naan & Chai",
      slug: "naan-and-chai",
      description:
        "Naan & Chai is Scarborough's beloved Pakistani-Indian fusion restaurant. From butter chicken poutine to tandoori pizza, we blend traditional South Asian flavors with Canadian favorites. Our chai bar offers 12 unique tea blends.",
      category: "Pakistani",
      cuisineType: "Pakistani",
      address: "3351 Markham Rd",
      city: "Scarborough",
      province: "Ontario",
      postalCode: "M1X 1S5",
      lat: 43.81,
      lng: -79.228,
      phone: "(416) 298-7700",
      website: "https://naanandchai.ca",
      socialLinks: {
        instagram: "https://instagram.com/naanandchai",
        facebook: "https://facebook.com/naanandchai",
        twitter: "https://twitter.com/naanandchai",
      },
      images: [
        "https://picsum.photos/seed/naanchai1/400/300",
        "https://picsum.photos/seed/naanchai2/400/300",
        "https://picsum.photos/seed/naanchai3/400/300",
      ],
      coverImage: "https://picsum.photos/seed/naanandchai/800/500",
      priceRange: "$$",
      halalCertType: "unknown",
      isFeatured: false,
      isPromoted: false,
      isHidden: false,

      status: "active",
      planType: "free",
      openingHours: defaultHours(),
      createdAt: "2026-01-20T10:00:00Z",
    },

    // OTTAWA (2)
    {
      id: "b4c5d6e7-f8a9-4b4c-fd5e-4567890123bc",
      name: "Shawarma Station",
      slug: "shawarma-station",
      description:
        "Ottawa's top-rated shawarma spot! We serve massive platters of juicy chicken and beef shawarma with garlic sauce, fresh tabbouleh, and fluffy rice. Voted Best Shawarma in Ottawa three years running. Halal certified by ISNA Canada.",
      category: "Lebanese",
      cuisineType: "Lebanese",
      address: "1001 Rideau St",
      city: "Ottawa",
      province: "Ontario",
      postalCode: "K1N 5Y1",
      lat: 45.428,
      lng: -75.678,
      phone: "(613) 789-4545",
      website: "https://shawarmastation.ca",
      socialLinks: {
        instagram: "https://instagram.com/shawarmastation",
        facebook: "https://facebook.com/shawarmastation",
      },
      images: [
        "https://picsum.photos/seed/shawarma1/400/300",
        "https://picsum.photos/seed/shawarma2/400/300",
        "https://picsum.photos/seed/shawarma3/400/300",
      ],
      coverImage: "https://picsum.photos/seed/shawarmastation/800/500",
      priceRange: "$",
      halalCertType: "certified",
      isFeatured: false,
      isPromoted: false,
      isHidden: false,

      status: "active",
      planType: "basic",
      openingHours: defaultHours(),
      createdAt: "2025-09-28T10:00:00Z",
    },
    {
      id: "c5d6e7f8-a9b0-4c5d-ae6f-5678901234cd",
      name: "Beirut Star Grill",
      slug: "beirut-star-grill",
      description:
        "A taste of Lebanon in Canada's capital. Beirut Star Grill offers mezze platters, charcoal-grilled kafta, and fresh fattoush salad. Our cozy atmosphere and generous portions make us a favorite among Ottawa's halal food lovers.",
      category: "Middle Eastern",
      cuisineType: "Middle Eastern",
      address: "370 Bank St",
      city: "Ottawa",
      province: "Ontario",
      postalCode: "K2P 1Y2",
      lat: 45.41,
      lng: -75.692,
      phone: "(613) 234-8800",
      website: "https://beirutstar.ca",
      socialLinks: {
        instagram: "https://instagram.com/beirutstar",
        facebook: "https://facebook.com/beirutstar",
      },
      images: [
        "https://picsum.photos/seed/beirut1/400/300",
        "https://picsum.photos/seed/beirut2/400/300",
        "https://picsum.photos/seed/beirut3/400/300",
      ],
      coverImage: "https://picsum.photos/seed/beirutstargrill/800/500",
      priceRange: "$$",
      halalCertType: "unknown",
      isFeatured: false,
      isPromoted: false,
      isHidden: false,

      status: "active",
      planType: "free",
      openingHours: defaultHours(),
      createdAt: "2026-01-15T10:00:00Z",
    },
  ];

  const ads: Ad[] = [
    {
      id: "ad-001",
      title: "Try Halal Guys This Weekend",
      imageUrl: "https://picsum.photos/seed/halalguys/1200/400",
      destinationUrl: "https://thehalalguys.com",
      placement: "homepage_banner",
      status: "active",
      startsAt: "2025-01-01T00:00:00Z",
      endsAt: "2026-12-31T23:59:59Z",
    },
    {
      id: "ad-002",
      title: "Advertise Your Restaurant on Munchhalal",
      imageUrl: "https://picsum.photos/seed/advertise/1200/200",
      destinationUrl: "/contact",
      placement: "search_top",
      status: "active",
      startsAt: "2025-01-01T00:00:00Z",
      endsAt: "2026-12-31T23:59:59Z",
    },
    {
      id: "ad-003",
      title: "Discover Premium Halal Meat Delivered to Your Door",
      imageUrl: "https://picsum.photos/seed/halalfood/400/300",
      destinationUrl: "https://example.com/halal-delivery",
      placement: "sidebar",
      status: "active",
      startsAt: "2025-01-01T00:00:00Z",
      endsAt: "2026-12-31T23:59:59Z",
    },
  ];

  const settings: SiteSettings = {
    featuredSlots: 5,
    bannerEnabled: true,
  };

  setItem(KEYS.restaurants, restaurants);
  setItem(KEYS.ads, ads);
  setItem(KEYS.settings, settings);
}
