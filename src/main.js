import Vue from 'vue'
import App from './App.vue'
import router from './router/routes'
import * as firebase from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import store from './store';
import { doc, getFirestore, getDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCuYjPZgIjs8iWlT5Jh4Ou8uUiQEbUOx1I",
  authDomain: "lottery-app-vue.firebaseapp.com",
  projectId: "lottery-app-vue",
  storageBucket: "lottery-app-vue.appspot.com",
  messagingSenderId: "1058827681868",
  appId: "1:1058827681868:web:04dc809abe2b80182fb4e9"
};

firebase.initializeApp(firebaseConfig);

Vue.config.productionTip = false

let app;

const auth = getAuth();

onAuthStateChanged(auth, async (user) => {
  user ? Vue.prototype.$user = user : Vue.prototype.$user = null
  if (user) {
      store.commit('SET_LOADING',true);
      try {
          const userdata = await getDoc(doc(getFirestore(), "users", user.uid));
          const ud = userdata.data();
          store.dispatch('SET_USERDATA',
          {currentNums:ud.currentNums,
          currentDraw: ud.currentDraw, 
          drawRunning :ud.drawRunning, 
          email:user.email});
      } catch (e) {
        console.error("Error adding document: ", e);
      }finally{
        store.commit('SET_LOADING',false);
      }
  } else {
    store.dispatch('REMOVE_USERDATA');
  }


  if (!app){
    app=
      new Vue({
      render: h => h(App),
      router: router,
      store: store,
    }).$mount('#app')
  }

});