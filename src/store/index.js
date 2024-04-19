import { createStore } from 'vuex';

export default createStore({
  state: {
    projects: [
        { 
            id: '1',
            title: 'Designing a future safe from wire fraud.', 
            company: 'CertifID',
            backgroundImage: '',
            logo: 'https://uploads-ssl.webflow.com/5ce48a38b7568a828f2a0807/6622b9e0f694f2a1709c96ac_certifid-logo.svg',
            description: ''
        },
        { 
            id: '2',
            title: 'Creating transparency in co-marketing in real estate.', 
            company: 'InHouse',
            backgroundImage: '',
            logo: 'https://uploads-ssl.webflow.com/5ce48a38b7568a828f2a0807/6622b9e037ed6c056059aecf_inhouse-logo.svg',
            description: ''
        },
        { 
            id: '3',
            title: 'The netflix of tortillas.', 
            company: 'Signal',
            backgroundImage: '',
            logo: 'https://uploads-ssl.webflow.com/5ce48a38b7568a828f2a0807/6622b9e0f694f2a1709c96ac_certifid-logo.svg',
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