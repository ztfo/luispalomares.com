import { createStore } from 'vuex';

export default createStore({
  state: {
    articles: [],
    projects: [
        { 
            id: '0',
            company: 'CertifID',
            series: 'B',
            title: 'Designing a future safe from wire fraud.', 
            website: 'https://certifid.com',
            revenue: '$15M+',
            backgroundImage: '/img/certifid.jpg',
            logo: 'img/certifid-logo.svg',
            overview: 'At CertifID, I collaborate with some of the most talented and driven individuals I know. Joining early in its journey felt like a continuation of my entrepreneurial path. I\'ve led and contributed to diverse projects, including a full app redesign, launching three of the flagship products that propelled us to a leading position in the industry, and making impactful contributions to our company\'s brand and web presence. Working with such a talented team on a powerful mission has been the magic I\'ve been looking for, providing constant opportunities for learning and growth.',
            role: 'Product',
        },
        { 
          id: '1',
          company: 'InHouse',
          series: 'Seed',
          title: 'Collaborating with transparency in the home buying process.', 
          website: 'https://web.archive.org/web/20180525031450/https://getinhouse.io/',
          revenue: '$1M',
          backgroundImage: '/img/inhouse.jpg',
          logo: '/img/inhouse-logo.svg',
          overview: 'At InHouse, I co-founded and scaled a college side-gig into a national provider for top mortgage brands in the US. We developed niche technology enabling mortgage lenders and real estate agents to collaborate transparently and stay compliant with RESPA regulations. As the company expanded, we successfully secured an institutional seed round, building significant traction and trust. Although we eventually closed the business, the invaluable lessons learned continue to shape my career and decision-making.',
          role: 'Founder',
      }        
    ]
  },
  mutations: {
    SET_ARTICLES(state, articles) {
      state.articles = articles;
    },
    ADD_ARTICLE(state, article) {
      state.articles.push(article);
    },
    UPDATE_ARTICLE(state, updatedArticle) {
      const index = state.articles.findIndex(a => a.id === updatedArticle.id);
      if (index !== -1) {
        state.articles[index] = updatedArticle;
      }
    },
    DELETE_ARTICLE(state, articleId) {
      state.articles = state.articles.filter(a => a.id !== articleId);
    }
  },
  actions: {
    async loadArticles({ commit }) {
      try {
        const response = await fetch('/articles/index.json');
        const articles = await response.json();
        commit('SET_ARTICLES', articles);
      } catch (error) {
        console.error('Failed to load articles:', error);
      }
    }
  },
  getters: {
    getArticle: (state) => (id) => {
      return state.articles.find(article => article.id === id);
    },
    getProject: (state) => (id) => {
      return state.projects.find(project => project.id === id);
    }
  }
});