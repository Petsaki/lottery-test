<template>
    <div>
        <app-header/>
         <div class="flex flex-col items-center m-7">
            <ul class="m-5 w-full flex flex-col items-center">
                <li class="pb-4 max-w-lg w-10/12">
                    <div class="relative">
                        
                        <p>
                           <span class="font-semibold">Draw date:</span>  
                        </p>
                        <p>
                           <span class="font-semibold">User's numbers:</span>  {{selectedNums}}
                        </p>
                        <p>
                            <span class="font-semibold">Drawed Numbers:</span> {{drawedNums}}
                        </p>
                        <p>
                            <span class="font-semibold">Money won:</span> {{moneyWon}}
                        </p>
                        </div>
                </li>

            </ul>
         </div>
    </div>
</template>

<script>

import AppHeader from '../components/AppHeader.vue';
import { getFirestore, getDoc, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";


export default {
    name: 'HistoryDetails',
    components: {
    'app-header':  AppHeader,
    },
    data(){
        return{
            id: this.$route.params,
            selectedNums:null,
            drawedNums:null,
            moneyWon:null,
            drawTime: null,
        }
    },
    async created(){
        const auth = getAuth();
        const user = auth.currentUser;
        if (user){
            try {
                const historyDetails = await getDoc(doc(getFirestore(), "users", user.uid, "history", this.id));
                console.log()
                 this.selectedNums = (historyDetails.data().playerNums);
                    this.drawedNums = (historyDetails.data().drawNums);
                    this.moneyWon = (historyDetails.data().totalWon);
                    this.drawTime = (historyDetails.data().drawTime);
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        }
    }
}
</script>

<style>

</style>