import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue';
import ProjectDetail from '../components/ProjectDetail.vue';
import store from '../store';
import EditorDashboard from '../components/Dashboard/EditorDashboard.vue';
import ArticleEditor from '../components/Dashboard/ArticleEditor.vue';
import ProjectEditor from '../components/Dashboard/ProjectEditor.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    children: [
      {
        path: 'project/:id',
        name: 'project',
        component: ProjectDetail,
        props: (route) => ({ 
          project: store.getters.getProject(route.params.id) 
        })
      }
    ]
  },
  {
    path: '/editor',
    name: 'editor',
    component: EditorDashboard,
    beforeEnter: (to, from, next) => {
      const isAuthorized = localStorage.getItem('editor_access');
      const attempts = parseInt(localStorage.getItem('accessAttempts') || '0');
      
      if (attempts >= 50) {
        next('/');
        return;
      }
      
      if (isAuthorized) {
        next();
      } else {
        window.location.href = '/editor-gate.html';
        return;
      }
    },
    children: [
      {
        path: 'articles',
        name: 'article-editor',
        component: ArticleEditor
      },
      {
        path: 'projects',
        name: 'project-editor',
        component: ProjectEditor
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router;