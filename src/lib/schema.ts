import type { Artisan } from "@/data/artisans";
import type { City } from "@/data/cities";
import type { Trade } from "@/data/trades";
import { SITE_NAME, SITE_URL } from "./utils";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    sameAs: [
      "https://www.facebook.com/artisanspresdechezvous",
      "https://www.instagram.com/artisanspresdechezvous",
      "https://www.linkedin.com/company/artisans-pres-de-chez-vous",
    ],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: "fr-FR",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/recherche?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function localBusinessSchema(
  artisan: Artisan,
  city: City,
  trade: Trade,
  path: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": trade.schemaType,
    "@id": `${SITE_URL}${path}#business`,
    name: artisan.name,
    description: artisan.description,
    image: `${SITE_URL}/opengraph-image`,
    url: `${SITE_URL}${path}`,
    telephone: artisan.phone,
    email: artisan.email,
    priceRange: "€".repeat(artisan.priceRange),
    address: {
      "@type": "PostalAddress",
      streetAddress: artisan.address.split(",")[0],
      postalCode: city.postalCode,
      addressLocality: city.name,
      addressRegion: city.region,
      addressCountry: "FR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: city.lat,
      longitude: city.lng,
    },
    areaServed: {
      "@type": "City",
      name: city.name,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: artisan.rating,
      reviewCount: artisan.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
    review: artisan.reviews.map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.author },
      datePublished: r.date,
      reviewBody: r.body,
      reviewRating: {
        "@type": "Rating",
        ratingValue: r.rating,
        bestRating: 5,
      },
    })),
    openingHoursSpecification: artisan.emergency
      ? [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ],
            opens: "00:00",
            closes: "23:59",
          },
        ]
      : [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "08:00",
            closes: "18:00",
          },
        ],
  };
}

export function itemListSchema(
  artisans: Artisan[],
  city: City,
  trade: Trade,
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${trade.plural} à ${city.name}`,
    numberOfItems: artisans.length,
    itemListElement: artisans.map((a, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE_URL}/${trade.slug}/${city.slug}/${a.slug}`,
      name: a.name,
    })),
  };
}

export function serviceSchema(trade: Trade, city: City) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: trade.name,
    areaServed: {
      "@type": "City",
      name: city.name,
    },
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "EUR",
      lowPrice: trade.avgPrice.min,
      highPrice: trade.avgPrice.max,
      offerCount: 5,
    },
  };
}
