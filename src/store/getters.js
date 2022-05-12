export const user = state => state.user

export const loggedIn = state => state.isLoggedIn

export const playerNums = state => state.userData.playerNums

export const getDrawInProg = state => state.userData.drawInProg

export const getCurrentDraw = state => state.userData.currentDraws

export const test = state => state.test

//Toast

export const toastShow = state => state.toastData.show

export const toastMsg = state => state.toastData.msg

export const toastType = state => state.toastData.type

