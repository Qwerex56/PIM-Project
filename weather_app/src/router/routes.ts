import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('pages/main-view/MainView.vue'),
  },
  {
    path: '/TestPage',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/TestPage.vue') }],
  },
  {
    path: '/search',
    component: () => import('pages/search-view/SearchView.vue') // TODO: Replace with SearchView.vue when created
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
