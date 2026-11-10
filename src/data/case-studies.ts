// Case studies, read by the navbar card, /case-studies and each case study page.
// Facts come from the PCMS repo's requirements doc and go-live record; no invented results.
export type CaseStudy = {
  slug: string;
  client: string;
  title: string;
  tags: string;
  /** ISO date the case study was published. */
  published: string;
  /** How the date reads on cards. */
  date: string;
  summary: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: 'gorkhakali-polyclinic',
    client: 'Gorkhakali Polyclinic',
    title: 'How Gorkhakali Polyclinic moved reception, lab and billing off paper',
    tags: 'Healthcare, PCMS',
    published: '2026-11-10',
    date: 'November 2026',
    summary: 'Registers, lab chits and an end-of-day pile of paper, replaced desk by desk. The doctors still write by hand.',
  },
];

export const featured = caseStudies[0];
export const href = (c: CaseStudy) => `/case-studies/${c.slug}`;
