import { createStore } from 'vuex';

export default createStore({
  state: {
    projects: [
        { 
            id: '0',
            company: 'Built with Words',
            series: 'Seed',
            title: 'Building technology, with words', 
            revenue: '$20M',
            backgroundImage: '',
            logo: 'https://uploads-ssl.webflow.com/5ce48a38b7568a828f2a0807/66244ea11a738a8c4d78cad0_builtwithwords.svg',
            overview: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget sapien egestas tincidunt. Nullam nec nunc nec nunc.',
            role: 'Owner',
            team: [ 'Product Manager', 'UX Designer', 'UI Designer', 'Frontend Developer', 'Backend Developer', 'QA' ],
            story: 'Once upon a time, LLMs were invented, and the world changed forever.',
            opportunity: 'How might I take advantage of this new technology?',
            strategy: 'Dive in, head first into the deep end.',
            outcomes: 'We built a product that people loved, and we made a lot of money.',
            reflection: 'Words are powerful, and can be used to build amazing things.',
        }     
    ]
  },
  getters: {
    getProject: (state) => (id) => {
      return state.projects.find(project => project.id === id);
    }
  }
});