import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'ClientListing',
    component: () => import('components/ClientListing.vue'),
  },
]

export default routes
