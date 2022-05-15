let stateData = {
  userData:{
    loading: false,
    loggedIn: false,
    email: "",
    playerNums: [],
    drawInProg: false,
    currentDraws:[],
  },
  toastData:{
    show:false,
    msg:null,
    type:null,
  }
}

export const state = Object.assign(stateData)