// User
export const GET_USER = state => state.userData.email

export const IS_LOGGEDIN = state => state.userData.loggedIn

export const GET_LOADING = state => state.userData.loading

export const GET_PLAYERNUMS = state => state.userData.playerNums

export const GET_DRAWINPROG = state => state.userData.drawInProg

export const GET_CURRENTDRAWS = state => state.userData.currentDraws

//Toast
export const GET_TOAST_SHOW = state => state.toastData.show

export const GET_TOAST_MSG = state => state.toastData.msg

export const GET_TOAST_TYPE = state => state.toastData.type

// History

export const GET_UPDATE_HISTORY = state => state.history.updateHistory

// History Details

export const GET_HISTORY_PLAYERNUMS = state => state.historyDetails.selectedNums

export const GET_HISTORY_DRAWEDNUMS = state => state.historyDetails.drawedNums

export const GET_HISTORY_MONEYWON = state => state.historyDetails.moneyWon

export const GET_HISTORY_DRAWTIME = state => state.historyDetails.drawTime