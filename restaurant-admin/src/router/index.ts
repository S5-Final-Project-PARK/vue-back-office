import LoginView from '@/views/LoginView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login',
      meta: { title: 'Hello' },
      component: LoginView,
    },
    {
      path: '/home',
      name: 'Home',
      meta: { title: 'Home' },
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/dishes',
      name: 'Dishes',
      meta: { title: 'Dishes' },
      component: () => import('@/views/DishesView.vue'),
    },
    {
      path: '/cook',
      name: 'Cook',
      meta: { title: 'Insert A New Recipe' },
      component: () => import('@/views/InsertDishesView.vue'),
    },
    {
      path: '/edit',
      name: 'Edit',
      meta: { title: 'Edit' },
      component: () => import('@/views/EditDishesView.vue'),
    },
    {
      path: '/editDetails',
      name: 'EditDetails',
      meta: { title: 'Edit details' },
      component: () => import('@/views/EditDishesDetailView.vue'),
    },
    {
      path: '/details',
      name: 'Details',
      meta: { title: 'Add Detail' },
      component: () => import('@/views/InsertDishesDetailView.vue'),
    },
    {
      path: '/statistics',
      name: 'Statistics',
      meta: { title: 'Stats' },
      component: () => import('@/views/StatisticView.vue'),
    },
    {
      path: '/orders',
      name: 'orders',
      meta: { title: 'Orders' },
      component: () => import('@/views/OrderView.vue'),
    },
    {
      path: '/ingredient',
      name: 'ingredient',
      meta: { title: 'Stock' },
      component: () => import('@/views/IngredientView.vue'),
    },
    {
      path: '/restock',
      name: 'restock',
      meta: { title: 'Restock' },
      component: () => import('@/views/RestockIngredientView.vue'),
    },
  ],
})

// ✅ Dynamically update the document title
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title as string
  }
  next()
})

export default router
