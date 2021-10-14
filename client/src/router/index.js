import Home from '@/pages/Home'
import Kanban from '@/pages/Kanban'
import NotFound from '@/pages/NotFound'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/kanban',
    name: 'Kanban',
    component: Kanban
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
