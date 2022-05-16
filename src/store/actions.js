import { doc, getDoc, getFirestore } from "firebase/firestore";


export const SET_TOAST = ({commit},{show, msg, type}) => {
    commit('ADD_TOAST',{show, msg, type})
}

export const SET_HISTORYDETAILS = ({commit},{selectedNums, drawedNums, moneyWon,drawTime}) => {
    commit('ADD_HISTORYDETAILS',{selectedNums, drawedNums, moneyWon,drawTime})
}

export const REMOVE_HISTORYDETAILS = ({commit}) => {
    commit('CLEAR_HISTORYDETAILS')
}

export const FETCH_USERDATA = async ({ commit,dispatch }, {user}) => {
    if (user) {
        commit('GET_LOADING',true);
        try {
            const userdata = await getDoc(doc(getFirestore(), "users", user.uid));
            const ud = userdata.data();
            dispatch('SET_USERDATA',
                {currentNums:ud.currentNums,
                currentDraw: ud.currentDraw, 
                drawRunning :ud.drawRunning, 
                email:user.email}
            );
        } catch (e) {
            console.error("Error adding document: ", e);
        }finally{
            commit('GET_LOADING',false);
        }
    } else {
        dispatch('REMOVE_USERDATA');
    }
}

export const SET_USERDATA = ({commit},{currentNums,currentDraw,drawRunning,email}) => {
    commit('SET_LOGGEDIN', true)
    commit('ADD_PLAYERNUMS', currentNums)
    commit('ADD_CURRENTDRAW', currentDraw)
    commit('SET_DRAWINPROG', drawRunning)
    commit('SET_USER', email)
}

export const REMOVE_USERDATA = ({commit}) => {
    commit('SET_LOGGEDIN', false)
    commit('CLEAR_USER', "")
    commit('CLEAR_PLAYERNUMS', [])
    commit('CLEAR_CURRENTDRAW', [])
    commit('SET_DRAWINPROG', false)
}