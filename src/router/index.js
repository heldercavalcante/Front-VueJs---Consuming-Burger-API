import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MeatForm from '../components/Ingredients/MeatForm.vue'
import BreadForm from '../components/Ingredients/BreadForm.vue'
import OptionalForm from '../components/Ingredients/OptionalForm.vue'
import Admin from '../views/admin/Admin.vue'
import Meats from '../views/admin/Meats.vue'
import Breads from '../views/admin/Breads.vue'
import Optionals from '../views/admin/Optionals.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/admin/orders',
    name: 'Orders',
    component: () => import(/* webpackChunkName: "orders" */ '../views/Orders.vue')
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin
  },
  {
    path: '/admin/meat/show',
    name: 'Meats',
    component: Meats
  },
  {
    path: '/admin/meat/:id?',
    name: 'MeatForm',
    component: MeatForm
  },
  {
    path: '/admin/bread/show',
    name: 'Breads',
    component: Breads
  },
  {
    path: '/admin/bread/:id?',
    name: 'BreadForm',
    component: BreadForm
  },
  {
    path: '/admin/optional/show',
    name: 'Optionals',
    component: Optionals
  },
  {
    path: '/admin/optional/:id?',
    name: 'OptionalForm',
    component: OptionalForm
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
