import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Users from '../views/Users'
import User from '../views/User.vue'
import History from '../views/History.vue'
import store from "../store/store"
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    /*redirect:'/about'*/
  },
  {
    path: '/users',
    name: 'Users',
    component: Users,
  },
  {
    path: '/about/:id',
    name: 'About',
    props: true,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path:'/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/users/:id',
    name: 'User',
    component: User,
    props:true
  },
  {
    path:'/history',
    name: 'History',
    component: History,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


router.beforeEach((to, from, next) => {
  let authenticated = localStorage.getItem("token");

  console.log(store)
  store.commit("addToHistory",to.fullPath)
  if (!authenticated && to.name !== 'Login') {
    next({ name: 'Login' })}
  else if (authenticated && to.name==='Login')
  {next ({name:'Home'})}
  else  {
    next()
  }




})



export default router
