export const UPDATE_LOGGEDIN = (state, LoggedIn) => {
    state.isLoggedIn = LoggedIn;
}

export const UPDATE_USER = (state, email) => {
    state.user = email
}

export const UPDATE_PLAYERNUMS = (state, numArray) => {
    state.userData.playerNums= numArray;
}

export const DELETE_PLAYERNUMS = (state, initialize) => {
    state.userData.playerNums= initialize;
}

export const UPDATE_DRAWINPROG = (state, drawState) => {
    state.userData.drawInProg = drawState;
}

export const UPDATE_CURRENTDRAW = (state, payload) => {
    state.userData.currentDraws = payload;
}



// Toast
export const UPDATE_TOAST = (state,{show, msg, type}) => {
    state.toastData.show = show;
    state.toastData.msg = msg;
    state.toastData.type = type;
}

