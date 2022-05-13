let syncedUser = {
    isLoggedIn: false,
    user: {
      email: ""
    },
    userData:{
        data: null,
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

export const state = Object.assign(syncedUser)