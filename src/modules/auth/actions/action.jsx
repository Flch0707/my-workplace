const ACTION_TYPE = {
    initAuth: 'initAuth',
    successAuth: 'successAuth',
    failedAuth: 'failedAuth',
    updateUser: 'updateUser',
    reset: 'reset'
}

const ACTION = {
    initAuth: () => {
        return { type: ACTION_TYPE.initAuth }
    },
    successAuth: (message = '') => {
        return { type: ACTION_TYPE.successAuth, payload: message }
    },
    failedAuth: (error = '') => {
        return { type: ACTION_TYPE.failedAuth, payload: error }
    },
    updateUser: (user) => {
        return { type: ACTION_TYPE.updateUser, payload: user }
    },
    reset: () => {
        return { type: ACTION_TYPE.reset }
    }
}
export { ACTION, ACTION_TYPE }
