import Vue from 'vue'
import Router from 'vue-router'
import store from '../store';
import { getAuth } from "firebase/auth";

Vue.use(Router)

const Home = () => import('../views/Home.vue')
const Login = () => import('../views/Login.vue')
const Signup = () => import('../views/SignUp.vue')
const NotFound = () => import('../views/NotFound.vue')
const Draw = () => import('../views/Draw.vue')
const History = () => import('../views/History.vue')
const HistoryDetails = () => import('../views/HistoryDetails.vue')


const ProtectedDraw = (to,from, next) =>{
  if (!store.getters.GET_DRAWINPROG){
    next({
      path: from.path,
    })
  }else{
    next()
  }
}

const router = new Router({
  mode:"history",
  routes: [
      {path:'/', component:Home,meta: {requiresAuth: true}},
      {path:'/login', component:Login,meta: {requiresAuth: false}},
      {path:'/signUp', component:Signup,meta: {requiresAuth: false}},
      {path:'/liveDraw', component:Draw,meta: {requiresAuth: true}, beforeEnter: ProtectedDraw},
      {path:'/history', component:History,meta: {requiresAuth: true}},
      {path:'/history/:id', component:HistoryDetails,meta: {requiresAuth: true}},
      {path:'/*', component:NotFound},
  ],
  // scrollBehavior() {
  //   return {
  //     y:0,
  //     behavior: 'smooth',
  //   }
  // },
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
})


// beforeEnter does not has access to this.
router.beforeEach((to,from,next) => {

  if (getAuth().currentUser && store.getters.GET_DRAWINPROG && to.path !== "/liveDraw"){
    next({path: '/liveDraw'})
  }

  if (getAuth().currentUser && to.meta.requiresAuth){
    next();
  }else if (to.meta.requiresAuth === undefined){
    next()
  }else if (getAuth().currentUser && (!to.meta.requiresAuth)){
    next({path: from.path})
  }else if (!getAuth().currentUser && to.meta.requiresAuth){
    next({path: '/login'})
  }else if (!getAuth().currentUser && !to.meta.requiresAuth){
    next()
  }else{
    next()
  }
})

export default router