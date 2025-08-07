import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

// Lazy load components for better performance
const HomeView = () => import('../views/HomeView.vue')

// Define routes with error handling
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      title: 'LinkedIn Talent Sourcing',
      requiresAuth: false
    }
  },
  {
    path: '/search',
    name: 'search',
    component: HomeView,
    meta: {
      title: 'Search Results',
      requiresAuth: false
    }
  },
  {
    path: '/error',
    name: 'error',
    component: () => import('../views/ErrorView.vue'),
    meta: {
      title: 'Error'
    }
  },
  {
    path: '/rate-limit',
    name: 'rate-limit',
    component: () => import('../views/RateLimitView.vue'),
    meta: {
      title: 'Rate Limit Exceeded'
    }
  },
  // Catch all route for 404s
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// Global navigation guards for error handling
router.beforeEach((to, _from, next) => {
  // Set page title
  if (to.meta?.title) {
    document.title = `${to.meta.title} | LinkedIn Recruiter`
  }
  
  next()
})

// Error handling for navigation failures
router.onError((error) => {
  console.error('Router navigation error:', error)
  
  // Handle different types of errors
  if (error.message.includes('Loading chunk')) {
    // Handle chunk loading errors (code splitting)
    window.location.reload()
  } else {
    // Navigate to error page for other errors
    router.push('/error')
  }
})

export default router