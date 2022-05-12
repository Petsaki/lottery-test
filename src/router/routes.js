import Vue from 'vue'
import Router from 'vue-router'
import store from '../store';

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

  console.log(!store.getters.getDrawInProg)
  console.log(store.getters.getDrawInProg)

  if (store.getters.getDrawInProg && (to.path === "/" || to.path === "/history") ){
    next({
      path: '/liveDraw',
    })
  }
  
  if (LoggedIn) {
    if (to.path === '/login' || to.path === '/signUp'){
      next({
        path: '/',
      })
    }else{
      next()
    }
    
  } else{
    if (to.path === '/'){
      next({
        path: '/login',
      })
    }else if (to.path !== '/'){
      next()
    }
    

  }
}

const ProtectedDraw = (to,from, next) =>{
  console.log("Protected Draw")
  if (!store.getters.getDrawInProg){
    next({
      path: '/',
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
      {path:'/', component:AppMain,beforeEnter: ProtectedRoute},
      {path:'/test', component:TestComp},
      {path:'/login', component:AppLogin,beforeEnter: ProtectedRoute},
      {path:'/signUp', component:AppSignup,beforeEnter: ProtectedRoute},
      {path:'/liveDraw', component:AppDraw, beforeEnter: ProtectedDraw},
      {path:'/history', component:AppHistory, beforeEnter: ProtectedRoute},
      {path:'/history/:id', component:HistoryDetails, beforeEnter: ProtectedRoute},
      {path:'/*', component:AppNotFound},
  ]
})






// router.beforeEach(() => {
//   store.commit('UPDATE_TOAST',
//   {show:false, msg:"", type:""}
//   );
// })


export default router