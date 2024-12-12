import { createRouter, createWebHistory } from 'vue-router';
import UserListView from '../views/UserListView.vue';
import UserFormView from '../views/UserFormView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'user-list',
      component: UserListView,
    },
    {
      path: '/add',
      name: 'user-add',
      component: UserFormView,
    },
    {
      path: '/edit/:id',
      name: 'user-edit',
      component: UserFormView,
    },
  ],
});

export default router;
