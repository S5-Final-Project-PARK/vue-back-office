import LoginView from '@/views/LoginView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login',
      meta: { title: "Hello" },
      component: LoginView,
    },
    {
      path: '/home',
      name: 'Home',
      meta: { title: "Home" },
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/dishes',
      name: 'Dishes',
      meta: { title: "Dishes" },
      component: () => import('@/views/DishesView.vue'),
    },
  ],
})

// ✅ Dynamically update the document title
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title as string;
  }
  next();
});

export default router;
