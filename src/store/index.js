import { createStore } from 'vuex';

export default createStore({
  state: {
    projects: [
        { 
            id: '0',
            company: 'CertifID',
            series: 'B',
            title: 'Designing a future safe from wire fraud.', 
            revenue: '$15M+',
            backgroundImage: '/img/certifid.jpg',
            logo: 'img/certifid-logo.svg',
            overview: 'At CertifID, I collaborate with some of the most talented and driven individuals in the industry. Since joining early in its journey, it\'s felt like a continuation of my own entrepreneurial path. I\'ve led and contributed to diverse projects across product design, frontend development, branding, and organizational design. Learning and growing at CertifID has been a privilege, where a powerful mission and incredible culture converge into something truly magical.',
            role: 'Product',
        },
        { 
          id: '1',
          company: 'InHouse',
          series: 'Seed',
          title: 'Collaborating with transparency in the home buying process.', 
          revenue: '$1M',
          backgroundImage: '/img/inhouse.jpg',
          logo: '/img/inhouse-logo.svg',
          overview: 'At InHouse, I co-founded and scaled a college side-gig into a national provider for top mortgage brands in the US. We developed niche technology enabling lenders and agents to collaborate transparently and stay compliant with RESPA regulations. As the company expanded, we successfully secured an institutional seed round, building significant traction and trust. Although we eventually closed the business, the invaluable lessons learned continue to shape my career and decision-making',
          role: 'Founder',
      }        
    ]
  },
  getters: {
    getProject: (state) => (id) => {
      return state.projects.find(project => project.id === id);
    }
  }
});