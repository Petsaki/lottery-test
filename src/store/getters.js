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