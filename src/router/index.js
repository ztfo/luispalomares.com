import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue';
import ProjectDetail from '../components/ProjectDetail.vue';
import store from '../store';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      title: 'Luis Palomares - Product Leader Portfolio',
      gaPage: 'home'
    },
    children: [
      {
        path: 'project/:id',
        name: 'project',
        component: ProjectDetail,
        props: (route) => ({ 
          project: store.getters.getProject(route.params.id) 
        }),
        meta: {
          title: (route) => {
            const project = store.getters.getProject(route.params.id);
            return project ? `${project.company} - ${project.title} | Luis Palomares` : 'Project | Luis Palomares';
          },
          gaPage: 'project_detail'
        }
      }
    ]
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import(/* webpackChunkName: "dashboard" */ '../views/DashboardView.vue'),
    meta: {
      title: 'Dashboard | Luis Palomares',
      gaPage: 'dashboard'
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// Google Analytics navigation tracking
router.beforeEach((to, from, next) => {
  // Track navigation events - only if GA is available
  if (typeof window !== 'undefined' && window.gtag && to.meta.gaPage) {
    try {
      // Track page view with custom parameters
      const pageParams = {
        page_title: typeof to.meta.title === 'function' ? to.meta.title(to) : to.meta.title,
        page_location: window.location.href,
        page_path: to.path
      };

      // Add project-specific data for project pages
      if (to.name === 'project' && to.params.id) {
        const project = store.getters.getProject(to.params.id);
        if (project) {
          pageParams.project_id = project.id;
          pageParams.project_company = project.company;
          pageParams.project_type = project.projectType;
          pageParams.project_series = project.series;
        }
      }

      // Track the page view
      window.gtag('event', 'page_view', pageParams);
      
      // Track navigation event
      window.gtag('event', 'navigation', {
        event_category: 'Navigation',
        event_label: to.meta.gaPage,
        from_page: from.name || 'unknown',
        to_page: to.name,
        navigation_type: 'router'
      });
    } catch (error) {
      // Silently fail if GA tracking fails - don't break navigation
      console.warn('GA tracking failed:', error);
    }
  }

  next();
});

export default router;