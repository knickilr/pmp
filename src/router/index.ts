import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import Employee from '../components/Employee.vue'
import Project from '../components/Project.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/employee',
    name: 'Employee',
    component: Employee
  },
  {
    path: '/project',
    name: 'Project',
    component: Project
  }
]

const router = new VueRouter({
  routes
})

export default router
