export const updateToast = ({commit},{show, msg, type}) => {
    commit('UPDATE_TOAST',{show, msg, type})
}