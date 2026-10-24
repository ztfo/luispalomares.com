// Static portfolio data. Replaces the former Vuex store — the data never
// changes at runtime, so a plain module is the simplest SSR/SSG-safe source.
//
// Adding a quest is one object here plus its images in /public/img. Only `id`,
// `company`, `title`, `overview` and `projectType` are required:
// - `headline`: the short line under the title on the homepage card — broad
//   and punchy; the specifics belong in `stats` and `wins` on the quest page.
// - `stats` (0–3, real and sourced numbers only).
// - `wins`: one-liners, shown as "Key wins" on main quests and "Highlights" on
//   side quests.
// - `clients` ({ name, logo }): a "Notable clients" row of small white logos —
//   for quests about the work rather than one company.
// - `logo` / `backgroundImage`: without a logo the company name is set as a
//   wordmark; without a banner the card shows its loading dots and the page
//   drops its hero.

export const projects = [
  {
    id: 'certifid',
    company: 'CertifID',
    role: 'Director of Product',
    stage: 'Series C',
    timeline: '2019 – now',
    title: 'Designing a future safe from wire fraud.',
    headline: 'Seed to Series C, from early employee to Director of Product',
    backgroundImage: '/img/certifid.jpg',
    logo: '/img/certifid-logo.svg',
    stats: [
      { value: '7-figure', label: 'ARR in PayoffProtect\'s first year' },
      { value: '~70%', label: 'of eligible customers on the new platform in five months' },
      { value: '58%', label: 'of billable volume beyond wire protection, up from 37%' },
    ],
    overview: 'At CertifID, I collaborate with some of the most talented and driven individuals I know. Joining early in its journey felt like a continuation of my entrepreneurial path, and working with such a talented team on a powerful mission has been the magic I\'ve been looking for.',
    wins: [
      'Built the product design function and design system from scratch, and led our first large redesign.',
      'Launched PayoffProtect: seven-figure ARR in its first year, now our largest product by volume.',
      'Launched identity verification: 48x request growth over eight quarters.',
      'Drove the product vision behind the largest release in company history: a full closing platform with identity, documents, and payments.',
    ],
    links: [
      { label: 'Website', url: 'https://certifid.com' },
      { label: 'Series C', url: 'https://www.businesswire.com/news/home/20250715516305/en/CertifID-Raises-%2447.5-Million-Series-C-Led-by-Centana-Growth-Partners' },
      { label: 'Client Experience launch', url: 'https://www.certifid.com/article/the-new-client-experience' },
    ],
    projectType: 'main',
  },
  {
    id: 'inhouse',
    company: 'InHouse',
    role: 'Co-founder & CEO',
    stage: 'Seed',
    timeline: '2014 – 2019',
    title: 'Collaborating with transparency in the home buying process.',
    headline: 'Co-founded and scaled to 27 states',
    backgroundImage: '/img/inhouse.jpg',
    logo: '/img/inhouse-logo.svg',
    stats: [
      { value: '27', label: 'states' },
      { value: '2,000+', label: 'users' },
      { value: '1/3', label: 'lower co-marketing costs' },
    ],
    overview: 'At InHouse, I co-founded and scaled a college side-gig into a national provider for top mortgage brands in the US. Although we eventually closed the business, the invaluable lessons learned continue to shape my career and decision-making.',
    wins: [
      'Raised a seed round led by the Arizona Founders Fund, its first Tucson investment.',
      'Partnered with Top 20 national mortgage brands, plus customers like Long Realty and NOVA Home Loans.',
      'Streamlined RESPA compliance for lenders and agents co-marketing together.',
    ],
    links: [
      { label: 'Website (archived)', url: 'https://web.archive.org/web/20180525031450/https://getinhouse.io/' },
      { label: 'Tucson.com', url: 'https://tucson.com/business/article_cf74558c-5f18-552b-81a0-cf60679257cf.html' },
    ],
    projectType: 'main',
  },
  {
    id: 'fractional',
    company: 'Fractional Product',
    role: 'Product & Design Advisor',
    stage: 'Fractional',
    timeline: 'Ongoing',
    title: 'Product, design, and front-end for teams that need a builder.',
    headline: 'From napkin sketch to shipped product',
    backgroundImage: '/img/fractional.jpg',
    overview: 'Selected advisory work helping early-stage companies turn napkin sketch ideas into products people use, from product strategy and design through functional frontends.',
    clients: [
      { name: 'Nova Credit', logo: '/img/novacredit-logo.svg' },
      { name: 'Homeward', logo: '/img/homeward-logo.svg' },
      { name: 'GivingData', logo: '/img/givingdata-logo.svg' },
    ],
    links: [
      { label: 'Work with me', url: 'mailto:hello@builtwithwords.ai' },
      { label: 'Dribbble', url: 'https://dribbble.com/luispalomares' },
    ],
    projectType: 'main',
  },
  {
    id: 'homeservices',
    company: 'HomeServices of America',
    role: 'Product Designer',
    stage: 'Innovation Lab',
    timeline: '2019',
    title: 'Agent websites and a CRM for a family of brokerage brands.',
    backgroundImage: '/img/homeservices.jpg',
    logo: '/img/homeservices-logo.svg',
    stats: [
      { value: '7', label: 'pilot brokerages in the beta roll-out' },
    ],
    overview: 'At Merlin Labs, the real estate innovation lab of HomeServices of America and Berkshire Hathaway, I designed the agent websites and CRM system built for its brokerage brands.',
    wins: [
      'Led the design and development of a custom Salesforce platform for real estate client and transaction management.',
      'Helped relaunch and finish a delayed project by reassessing product priorities.',
    ],
    links: [
      { label: 'Website', url: 'https://www.homeservices.com' },
    ],
    projectType: 'main',
  },
  {
    id: 'arreglo',
    company: 'Arreglo.ai',
    role: 'Founder & Developer',
    stage: 'Side Project',
    timeline: '2024 – now',
    title: 'AI-powered music arrangement generator for Figma.',
    headline: 'Live on Figma, now in beta as a VST',
    backgroundImage: '/img/arreglo-ai.jpg',
    logo: '/img/arreglo-ai-logo.svg',
    stats: [
      { value: 'Live', label: 'on Figma Community' },
    ],
    overview: 'Arreglo started as a personal tool I built to help me finish songs. I was getting stuck on arrangements and decided to create an AI-powered tool that could take my track ideas and turn them into complete arrangement concepts in minutes. What began as a solution for my own workflow became polished enough to share as a Figma plugin, helping other musicians overcome the same creative blocks I was facing.',
    wins: [
      'A working beta of a VST plugin that brings Arreglo into the DAW.',
      'v2 with sign-in and paid credits is built and ready to launch.',
      'Next: letting Claude arrange directly inside FL Studio.',
    ],
    links: [
      { label: 'Website', url: 'https://arreglo.ai' },
      { label: 'Figma Community', url: 'https://www.figma.com/community/plugin/1473434918581718662/arreglo' },
    ],
    projectType: 'side',
  },
  {
    id: 'reflip',
    company: 'reflip',
    role: 'Founder & Developer',
    stage: 'Side Project',
    timeline: '2026',
    title: 'Finger-drum your own videos into loops anyone can remix.',
    headline: 'In beta, waitlist open',
    backgroundImage: '/img/reflip.jpg',
    stats: [
      { value: '4 weeks', label: 'from idea to beta' },
    ],
    overview: 'Chop your video into pads. Drum a loop over it. Post a link anyone can play, and re-flip. It\'s in beta now, with a waitlist open for launch.',
    wins: [
      'The whole audio and video pipeline runs in the browser, with no server rendering.',
      'Every remix stays traceable to its source.',
    ],
    projectType: 'side',
  },
  {
    id: 'archipelago',
    company: 'Archipelago',
    role: 'Founder & Developer',
    stage: 'Side Project',
    timeline: '2025 – now',
    title: 'Helping craft vendors find their next great market.',
    headline: 'AI agents mapping craft markets',
    backgroundImage: '/img/archipelago.jpg',
    stats: [
      { value: '~100', label: 'markets mapped' },
    ],
    overview: 'Archipelago is a vendor-first craft market directory. We help vendors discover markets, read honest reviews from other sellers, and make data-driven decisions about where to sell their products. Coming soon.',
    wins: [
      'An agent pipeline that discovers and enriches markets, with a hard monthly cost cap.',
      'A review queue, so nothing publishes unchecked.',
    ],
    projectType: 'side',
  },
  {
    id: 'llu',
    company: 'llü',
    role: 'Producer',
    stage: 'Music',
    timeline: '2024 – now',
    title: 'Dance music, written and produced as llü.',
    headline: 'Three singles out, more on the way',
    backgroundImage: '/img/llu.jpg',
    stats: [
      { value: '3', label: 'singles out' },
    ],
    overview: 'llü is my music project. I write and produce dance music, illustrate the artwork, and built the site myself. My next release, Buena Suerte, is on the way.',
    wins: [
      'Singles: La Luna (2024), El Diablito (2025), and The Feeling (2025).',
      'Arreglo started here, as a tool to finish these songs.',
    ],
    links: [
      { label: '7thst.music', url: 'https://7thst.music' },
      { label: 'Spotify', url: 'https://open.spotify.com/artist/1t00W56dAWaTPJ7YcRwY91' },
      { label: 'SoundCloud', url: 'https://soundcloud.com/llu-official' },
    ],
    projectType: 'side',
  },
]

export function useProjects() {
  const getProject = (id) => projects.find((project) => project.id === id)

  return { projects, getProject }
}
