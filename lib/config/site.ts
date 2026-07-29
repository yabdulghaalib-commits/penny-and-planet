export const siteConfig = {
  name: 'Penny and Planet',
  url: 'https://www.pennyandplanet.com',
  description:
    'Penny and Planet helps you build financial wellbeing while living more sustainably: practical guides on budgeting, saving, investing, and eco-friendly living.',
  defaultOgImageUrl: 'https://picsum.photos/seed/penny-and-planet-og/1200/630',
  twitterHandle: '@pennyandplanet',
} as const;

/** Central pagination defaults — change once, every listing page picks it up. */
export const ARTICLES_PER_PAGE = 6;
