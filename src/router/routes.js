import Vue from 'vue'
import Router from 'vue-router'
import store from '../store';
import { getAuth } from "firebase/auth";

Vue.use(Router)

const AppMain = () => import('../views/AppMain.vue')
const AppLogin = () => import('../views/AppLogin.vue')
const AppSignup = () => import('../views/AppSignup.vue')
const AppNotFound = () => import('../views/AppNotFound.vue')
const AppDraw = () => import('../views/AppDraw.vue')
const AppHistory = () => import('../views/AppHistory.vue')
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
      {path:'/', component:AppMain,meta: {requiresAuth: true}},
      {path:'/login', component:AppLogin,meta: {requiresAuth: false}},
      {path:'/signUp', component:AppSignup,meta: {requiresAuth: false}},
      {path:'/liveDraw', component:AppDraw,meta: {requiresAuth: true}, beforeEnter: ProtectedDraw},
      {path:'/history', component:AppHistory,meta: {requiresAuth: true}},
      {path:'/history/:id', component:HistoryDetails,meta: {requiresAuth: true}},
      {path:'/*', component:AppNotFound},
  ],
  scrollBehavior() {
    return {
      y:0,
      behavior: 'smooth',
    }
  },
  // scrollBehavior(to, from, savedPosition) {
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