export interface ResourceCollection {
  slug: string;
  title: string;
  description: string;
}

export const resourceCollections: ResourceCollection[] = [
  { slug: 'budgeting-resources', title: 'Budgeting Resources', description: 'Planners and worksheets for building a budget that sticks.' },
  { slug: 'savings-resources', title: 'Savings Resources', description: 'Trackers and challenges to help you save more consistently.' },
  { slug: 'investing-resources', title: 'Investing Resources', description: 'Guides and checklists for getting started with investing.' },
  { slug: 'financial-planning-resources', title: 'Financial Planning Resources', description: 'Tools for the bigger picture: debt payoff, net worth, goals.' },
  { slug: 'sustainable-living-guides', title: 'Sustainable Living Guides', description: 'Step-by-step guides for lower-impact everyday habits.' },
  { slug: 'eco-friendly-checklists', title: 'Eco-Friendly Checklists', description: 'Quick-reference checklists for greener choices at home.' },
  { slug: 'printable-planners', title: 'Printable Planners', description: 'Print-and-use planners for money and sustainable living.' },
];

export function getResourceCollectionBySlug(slug: string): ResourceCollection | undefined {
  return resourceCollections.find((collection) => collection.slug === slug);
}
