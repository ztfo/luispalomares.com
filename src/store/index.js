import { createStore } from 'vuex';

export default createStore({
  state: {
    projects: [
        { 
            id: '0',
            company: 'CertifID',
            series: 'C',
            title: 'Designing a future safe from wire fraud.', 
            website: 'https://certifid.com',
            revenue: '',
            backgroundImage: '/img/certifid.jpg',
            logo: 'img/certifid-logo.svg',
            overview: 'At CertifID, I collaborate with some of the most talented and driven individuals I know. Joining early in its journey felt like a continuation of my entrepreneurial path. I\'ve led and contributed to diverse projects, including a full app redesign, launching three of the flagship products that propelled us to a leading position in the industry, and making impactful contributions to our company\'s brand and web presence. Working with such a talented team on a powerful mission has been the magic I\'ve been looking for, providing constant opportunities for learning and growth.',
            role: 'Product',
            projectType: 'main'
        },
        { 
          id: '1',
          company: 'InHouse',
          series: 'Seed',
          title: 'Collaborating with transparency in the home buying process.', 
          website: 'https://web.archive.org/web/20180525031450/https://getinhouse.io/',
          revenue: '$1M ARR',
          backgroundImage: '/img/inhouse.jpg',
          logo: '/img/inhouse-logo.svg',
          overview: 'At InHouse, I co-founded and scaled a college side-gig into a national provider for top mortgage brands in the US. We developed niche technology enabling mortgage lenders and real estate agents to collaborate transparently and stay compliant with RESPA regulations. As the company expanded, we successfully secured an institutional seed round, building significant traction and trust. Although we eventually closed the business, the invaluable lessons learned continue to shape my career and decision-making.',
          role: 'Founder',
          projectType: 'main'
      },
      { 
        id: '2',
        company: 'Arreglo.ai',
        series: 'Side Project',
        title: 'AI-powered music arrangement generator for Figma.', 
        website: 'https://arreglo.ai',
        revenue: 'Free',
        backgroundImage: '/img/arreglo-ai.jpg',
        logo: '/img/arreglo-ai-logo.svg',
        overview: 'Arreglo started as a personal tool I built to help me finish songs. I was getting stuck on arrangements and decided to create an AI-powered tool that could take my track ideas and turn them into complete arrangement concepts in minutes. What began as a solution for my own workflow became polished enough to share as a Figma plugin, helping other musicians overcome the same creative blocks I was facing.',
        role: 'Founder & Developer',
        projectType: 'side'
      },
      { 
        id: '3',
        company: 'Drawberry.ai',
        series: 'Side Project',
        title: 'AI-powered coloring book generator with a cause.', 
        website: 'https://drawberry.ai/',
        revenue: 'Coming Soon',
        backgroundImage: '/img/drawberry-ai.jpg',
        logo: '/img/drawberry-ai-logo.svg',
        overview: 'The idea for Drawberry came while on a trip with my niece and nephew. They loved coloring books, and I imagined how amazing it would be if AI could turn our own family photos into coloring pages from that trip. That spark grew into Drawberry, a way to create personal coloring books while also helping fund arts programs for kids.',
        role: 'Founder & Developer',
        projectType: 'side'
      }        
    ]
  },
  getters: {
    getProject: (state) => (id) => {
      return state.projects.find(project => project.id === id);
    },
    getProjectsByType: (state) => (type) => {
      return state.projects.filter(project => project.projectType === type);
    },
    getMainQuests: (state) => {
      return state.projects.filter(project => project.projectType === 'main');
    },
    getSideQuests: (state) => {
      return state.projects.filter(project => project.projectType === 'side');
    }
  }
});