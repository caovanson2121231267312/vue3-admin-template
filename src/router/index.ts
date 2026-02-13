import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'
import type { App } from 'vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/auth',
      name: 'AuthLayout',
      component: () => import('../layouts/AuthLayout.vue'),
      meta: { requiresAuth: false },
      children: [
        {
          path: 'login',
          name: 'Login',
          component: () => import('../views/auth/LoginView.vue'),
          meta: { title: 'nav.login' },
        },
      ],
    },
    {
      path: '/',
      component: () => import('../layouts/MainLayout.vue'),
      children: routes,
    },
  ],
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  },
})

/** Gắn router vào app (gọi trong main.ts) */
export function setupRouter(app: App<Element>) {
  app.use(router)
}

export default router
