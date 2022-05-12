import Vue from 'vue'
import Router from 'vue-router'
import store from '../store';
import { getAuth } from "firebase/auth";

Vue.use(Router)

const AppMain = () => import('../views/AppMain.vue')
const TestComp = () => import('../components/TestComp.vue')
const AppLogin = () => import('../views/AppLogin.vue')
const AppSignup = () => import('../views/AppSignup.vue')
const AppNotFound = () => import('../views/AppNotFound.vue')
const AppDraw = () => import('../views/AppDraw.vue')
const AppHistory = () => import('../views/AppHistory.vue')
const HistoryDetails = () => import('../views/HistoryDetails.vue')


const ProtectedRoute = (to, from, next) =>{
  const LoggedIn = store.state.isLoggedIn
  console.log(LoggedIn)
  console.log("checking the paths")
  console.log(to.path === '/login');

  console.log(store.getters.getDrawInProg)

  if (store.getters.getDrawInProg && to.path !== "/liveDraw"){
    next({
      path: '/liveDraw',
    })
  }else{
    next();
  }
    
}

const ProtectedDraw = (to,from, next) =>{
  console.log("Protected Draw")
  if (!store.getters.getDrawInProg){
    next({
      path: from.path,
    })
  }else{
    next()
  }
  // console.log(from)
  // const playerNums= store.getters.playerNums
  // console.log(playerNums)
  // if (playerNums && playerNums.length === 5) {
  //   next()
  // } else {
  //   next({path: from.path,
  //   // query: { redirect: to.fullPath }
  // })
  // }
}

const router = new Router({
  mode:"history",
  routes: [
      // beforeEnter does not has access to this.
      {path:'/', component:AppMain,meta: {requiresAuth: true},beforeEnter: ProtectedRoute},
      {path:'/test', component:TestComp},
      {path:'/login', component:AppLogin,meta: {requiresAuth: false}},
      {path:'/signUp', component:AppSignup,meta: {requiresAuth: false}},
      {path:'/liveDraw', component:AppDraw,meta: {requiresAuth: true}, beforeEnter: ProtectedDraw},
      {path:'/history', component:AppHistory,meta: {requiresAuth: true}, beforeEnter: ProtectedRoute},
      {path:'/history/:id', component:HistoryDetails,meta: {requiresAuth: true}, beforeEnter: ProtectedRoute},
      {path:'/*', component:AppNotFound},
  ]
})






router.beforeEach((to,from,next) => {
  console.log(to.meta.requiresAuth)
  console.log(!getAuth().currentUser)
  if (getAuth().currentUser && to.meta.requiresAuth){
      next();
  }else if (!getAuth().currentUser && to.meta.requiresAuth){
    console.log("HYJGDSAKFJSDGKJAHFK")
    next({path: '/login'})
  }else if (getAuth().currentUser && !to.meta.requiresAuth && to.meta.requiresAuth !== undefined){
    next({path: from.path})
  }else{
    next()
  }
  console.log(`nagigation GLOBAL guard ${to.path} + ${from.path}`)
  
})


export default router