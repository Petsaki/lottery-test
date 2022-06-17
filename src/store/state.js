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
  },
  history:{
    updateHistory:false,
  },
  historyDetails:{
    selectedNums:[],
    drawedNums:[],
    moneyWon:null,
    drawTime: null
  }
}

export const state = Object.assign(stateData)