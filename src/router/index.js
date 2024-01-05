// Composables
//import { createRouter, createWebHistory } from "vue-router"; // for local
import { createRouter, createWebHashHistory } from "vue-router"; // for server 


import middlewarePipeline from "./middlewarePipeline";
import store from '../store'
import axios from 'axios'
import auth from './middleware/auth'

const routes = [
  {
    path: '/',
    //component: () => import('@/layouts/default/Default.vue'),
    name: 'Login',
    component: () => import('../views/log_in.vue'),
  },
  {
    path: '/home',
    name: 'HomeView',
    component: () => import('../views/HomeView.vue'),
    meta: {
      middleware: [
        auth
      ]
    }
  },
  {
    path: '/mb-lab',
    name: 'Mb_Lab',
    component: () => import('../views/MB-Lab.vue'),
    
  },
  {
    path: '/mb-approve',
    name: 'Mb_Approve',
    component: () => import('../views/Booking-Approve.vue'),
  },
  
  {
    path: "/:catchAll(.*)",
    redirect: '/'
  }
]

// const router = createRouter({
//   history: createWebHistory(process.env.BASE_URL),
//   routes,
// })

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
router.beforeEach((to, from, next) => {
  if (!to.meta.middleware) {
    return next()
  }
  const middleware = to.meta.middleware
  const context = {
    to, from, next, store, axios
  }

  return middleware[0]({
    ...context,
    next: middlewarePipeline(context, middleware, 1)
  })
})

export default router
