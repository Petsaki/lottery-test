let syncedUser = {
    isLoggedIn: false,
    user: {
      email: ""
    },
    userData:{
        data: null,
        playerNums: null,
        drawInProg: false,
        currentDraws:null,
    },
    toastData:{
      show:false,
      msg:null,
      type:null,
    }
}

export const state = Object.assign(syncedUser)