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



const ProtectedDraw = (to,from, next) =>{
  console.log("Protected Draw")
  console.log("PROTECTED ROUTE: ", !store.getters.getDrawInProg )
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
      {path:'/', component:AppMain,meta: {requiresAuth: true}},
      {path:'/test', component:TestComp},
      {path:'/login', component:AppLogin,meta: {requiresAuth: false}},
      {path:'/signUp', component:AppSignup,meta: {requiresAuth: false}},
      {path:'/liveDraw', component:AppDraw,meta: {requiresAuth: true}, beforeEnter: ProtectedDraw},
      {path:'/history', component:AppHistory,meta: {requiresAuth: true}},
      {path:'/history/:id', component:HistoryDetails,meta: {requiresAuth: true}},
      {path:'/*', component:AppNotFound},
  ]
})






router.beforeEach((to,from,next) => {
  console.log(to.meta.requiresAuth)
  console.log("Auth",getAuth().currentUser)

  if (getAuth().currentUser && store.getters.getDrawInProg && to.path !== "/liveDraw"){
    next({path: '/liveDraw'})
  }

  if (getAuth().currentUser && to.meta.requiresAuth){
    console.log("1")
      next();
  }else if (to.meta.requiresAuth === undefined){
    next()
  }else if (getAuth().currentUser && (!to.meta.requiresAuth)){
      next({path: from.path})
      console.log("2")
  }else if (!getAuth().currentUser && to.meta.requiresAuth){
    console.log("3")
    next({path: '/login'})
  }else if (!getAuth().currentUser && !to.meta.requiresAuth){
    console.log("4")
    next()
  }else{
    console.log("5")
    next()
  }
  console.log(`nagigation GLOBAL guard ${to.path} + ${from.path}`)
  
})


export default router