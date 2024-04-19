import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue';
import ProjectDetail from '../components/ProjectDetail.vue';
import store from '../store';

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
    path: '/dashboard',
    name: 'dashboard',
    component: () => import(/* webpackChunkName: "dashboard" */ '../views/DashboardView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router;