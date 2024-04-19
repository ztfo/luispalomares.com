import { createStore } from 'vuex';

export default createStore({
  state: {
    projects: [
        { 
            id: '0',
            title: 'Designing a future safe from wire fraud.', 
            company: 'CertifID',
            backgroundImage: '',
            logo: 'https://uploads-ssl.webflow.com/5ce48a38b7568a828f2a0807/6622b9e0f694f2a1709c96ac_certifid-logo.svg',
            description: ''
        },
        { 
            id: '1',
            title: 'Innovating inside the largest real estate company in the US.', 
            company: 'HomeServices of America',
            backgroundImage: 'https://uploads-ssl.webflow.com/5ce48a38b7568a828f2a0807/5cf581a33b29a2565b28cd10_bhhs-merlin-platform.jpg',
            logo: 'https://uploads-ssl.webflow.com/5ce48a38b7568a828f2a0807/6622b9e0f694f2a1709c96ac_certifid-logo.svg',
            description: ''
        },        
        { 
            id: '2',
            title: 'Creating transparency in co-marketing in real estate.', 
            company: 'InHouse',
            backgroundImage: 'https://uploads-ssl.webflow.com/5ce48a38b7568a828f2a0807/5d9699dc26583d0d6112c48c_inhouse-thumbs.jpg',
            logo: 'https://uploads-ssl.webflow.com/5ce48a38b7568a828f2a0807/6622b9e037ed6c056059aecf_inhouse-logo.svg',
            description: ''
        },
        { 
            id: '3',
            title: 'Enlisting lenders and agents to educate homebuyers.', 
            company: 'Nova Home Loans',
            backgroundImage: 'https://uploads-ssl.webflow.com/5ce48a38b7568a828f2a0807/5d969f11d858e35b89f0754b_nlist-thumb.jpg',
            logo: 'https://www.novahomeloans.com/uploads/sites/15475/public/nova_logo_w.png',
            description: ''
        },                
    ]
  },
  getters: {
    getProject: (state) => (id) => {
      return state.projects.find(project => project.id == id);
    }
  }
});