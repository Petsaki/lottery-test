export const SET_LOGGEDIN = (state, payload) => {
    state.userData.loggedIn = payload;
}

export const SET_USER = (state, payload) => {
    state.userData.email = payload
}

export const CLEAR_USER = (state, initialize) => {
    state.userData.email = initialize
}

export const SET_LOADING = (state, payload) => {
    state.userData.loading = payload;
}

export const ADD_PLAYERNUMS = (state, payload) => {
    state.userData.playerNums = payload;
}

export const CLEAR_PLAYERNUMS = (state, initialize) => {
    state.userData.playerNums = initialize;
}

export const SET_DRAWINPROG = (state, payload) => {
    state.userData.drawInProg = payload;
}

export const ADD_CURRENTDRAW = (state, payload) => {
    state.userData.currentDraws = payload;
}

export const CLEAR_CURRENTDRAW = (state, initialize) => {
    state.userData.currentDraws= initialize;
}

// Toast
export const ADD_TOAST = (state,{show, msg, type}) => {
    state.toastData.show = show;
    state.toastData.msg = msg;
    state.toastData.type = type;
}

// History

export const SET_UPDATEHISTORY = (state, payload) => {
    state.history.updateHistory = payload;
}

// History Details
export const ADD_HISTORYDETAILS = (state,{selectedNums, drawedNums, moneyWon,drawTime}) => {
    state.historyDetails.selectedNums = selectedNums
    state.historyDetails.drawedNums = drawedNums
    state.historyDetails.moneyWon = moneyWon
    state.historyDetails.drawTime = drawTime
}

export const CLEAR_HISTORYDETAILS = (state) => {
    state.historyDetails.selectedNums = []
    state.historyDetails.drawedNums = []
    state.historyDetails.moneyWon = null
    state.historyDetails.drawTime = null
}