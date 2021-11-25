import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/components/Login'
import Kanban from '@/pages/Kanban'
import NotFound from '@/pages/NotFound'
import ProjectPick from "../components/ProjectPick";
import QueriesPick from "../components/QueriesPick";

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/project_pick',
    name: 'ProjectPick',
    component: ProjectPick
  },
  {
    path: '/query_pick',
    name: 'QueryPick',
    component: QueriesPick
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

const router = createRouter({
  mode: 'history',
  history: createWebHistory(),
  routes
})

export default router
