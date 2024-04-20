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
        }
    ]
  },
  getters: {
    getProject: (state) => (id) => {
      return state.projects.find(project => project.id == id);
    }
  }
});