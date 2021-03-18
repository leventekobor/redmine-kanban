import Home from '@/pages/Home'
import NotFound from '@/pages/NotFound'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  }
]

export default createRouter({
  mode: 'history',
  history: createWebHistory(),
  routes
})
