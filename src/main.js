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
  if (user) {
      try {
          const userdata = await getDoc(doc(getFirestore(), "users", user.uid));
         
              store.commit('UPDATE_PLAYERNUMS', userdata.data().currentNums);
          

          
              store.commit('UPDATE_CURRENTDRAW', userdata.data().currentDraw);
          

            store.commit('UPDATE_DRAWINPROG', userdata.data().drawRunning);
      } catch (e) {
          console.error("Error adding document: ", e);
      }
    store.commit('UPDATE_LOGGEDIN',true)
    store.commit('UPDATE_USER', user.email)
  } else {
    store.commit('UPDATE_LOGGEDIN',false)
    store.commit('UPDATE_USER', null)
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


// new Vue({
//   render: h => h(App),
//   router: router,
//   store: store,
// }).$mount('#app')