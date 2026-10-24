// Static portfolio data. Replaces the former Vuex store — the data never
// changes at runtime, so a plain module is the simplest SSR/SSG-safe source.
//
// Adding a quest is one object here plus its images in /public/img. Only `id`,
// `company`, `title`, `overview` and `projectType` are required:
// - `stats` (0–3, real and sourced numbers only): the first doubles as the
//   headline on the homepage card.
// - `wins`: one-liners, shown as "Key wins" on main quests and "Highlights" on
//   side quests.
// - `logo` / `backgroundImage`: without a logo the company name is set as a
//   wordmark; without a banner the card shows its loading dots and the page
//   drops its hero.

export const projects = [
  {
    id: 'certifid',
    company: 'CertifID',
    role: 'Director of Product',
    stage: 'Series C',
    timeline: '2018 – now',
    title: 'Designing a future safe from wire fraud.',
    backgroundImage: '/img/certifid.jpg',
    logo: '/img/certifid-logo.svg',
    stats: [
      { value: '7-figure', label: 'ARR in year one' },
      { value: '48x', label: 'Match request growth' },
      { value: '100%', label: 'customers migrated, no volume lost' },
    ],
    overview: 'I joined CertifID as one of its first ten employees and built its design function from scratch, then grew into Director of Product as we went from seed to Series C. Today I lead a small product team.',
    wins: [
      'Launched PayoffProtect: seven-figure ARR in its first year, now our top revenue product.',
      'Launched CertifID Match: 48x request growth over eight quarters, used by about 60% of active customers.',
      'Pitched and prototyped a unified closing platform, then led the build: the Client Experience launched in May 2026, with every customer migrated six months ahead of plan and no volume lost.',
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
    timeline: '2015 – 2019',
    title: 'Collaborating with transparency in the home buying process.',
    backgroundImage: '/img/inhouse.jpg',
    logo: '/img/inhouse-logo.svg',
    stats: [
      { value: 'Top-20', label: 'US lender as a customer' },
      { value: 'Seed', label: 'led by the Arizona Founders Fund' },
    ],
    overview: 'I co-founded InHouse in college and grew it into a co-marketing platform for mortgage lenders and real estate agents. We raised a seed round and served lenders nationally before winding it down in 2019.',
    wins: [
      'Built co-marketing tools that kept lenders and agents RESPA-compliant.',
      'Signed a top-20 US lender on a private-label deal, plus customers like Long Realty and NOVA Home Loans.',
      'Won "most likely to launch" at the University of Arizona\'s 2015 New Venture Competition.',
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
    role: 'Product, Design & Engineering',
    stage: 'Fractional',
    timeline: 'Ongoing',
    title: 'Product, design, and front-end for teams that need a builder.',
    backgroundImage: '/img/fractional.jpg',
    stats: [
      { value: '4', label: 'client teams' },
      { value: '3', label: 'industries: fintech, proptech, philanthropy' },
    ],
    overview: 'Fractional product, design, and front-end work for teams that need someone to take an idea all the way to shipped code.',
    wins: [
      'Nova Credit: design, front-end, web, and growth.',
      'Homeward: design and front-end.',
      'GivingData: brand and marketing site.',
      'TitleSentry: built a compliance platform for title agencies from zero. It\'s now in closed alpha.',
    ],
    links: [
      { label: 'Work with me', url: 'mailto:hello@builtwithwords.ai' },
    ],
    projectType: 'main',
  },
  {
    id: 'homeservices',
    company: 'HomeServices of America',
    role: 'Product Designer',
    stage: 'Enterprise',
    timeline: '2018',
    title: 'Agent websites and a CRM for a family of brokerage brands.',
    backgroundImage: '/img/homeservices.jpg',
    logo: '/img/homeservices-logo.svg',
    overview: 'Between InHouse and CertifID, I spent eight months as a product designer at HomeServices of America, the Berkshire Hathaway company behind BHHS and its sister brands. I designed the agent website and CRM system used across them.',
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
    backgroundImage: '/img/arreglo-ai.jpg',
    logo: '/img/arreglo-ai-logo.svg',
    stats: [
      { value: 'Live', label: 'on Figma Community' },
    ],
    overview: 'A Figma plugin I built to finish my own songs: name your patterns, pick a genre, and get a full arrangement in minutes.',
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
    backgroundImage: '/img/reflip.jpg',
    stats: [
      { value: '4 weeks', label: 'from idea to beta' },
    ],
    overview: 'reflip turns a short video into an 8-pad instrument, and every post ships with its kit so anyone can remix it. Pre-launch, waitlist open.',
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
    backgroundImage: '/img/archipelago.jpg',
    stats: [
      { value: '~100', label: 'markets mapped' },
    ],
    overview: 'A craft-market directory for vendors that covers where markets are, what booths cost, and what sellers make. AI agents keep it current, and I review what they find before it goes live. Coming soon.',
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
    backgroundImage: '/img/llu.jpg',
    stats: [
      { value: '3', label: 'singles out' },
    ],
    overview: 'My music project. I write and produce dance music, make the artwork, and built the site. The Latebloomer EP returns soon as Buena Suerta, with more tracks.',
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
