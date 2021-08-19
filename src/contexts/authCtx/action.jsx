const ACTION_TYPE = {
    initAuth: "initAuth",
    successAuth: "successAuth",
    failedAuth: "failedAuth",
    updateUser: "updateUser"
}

const ACTION = {
    initAuth: () => {
        return { type: ACTION_TYPE.initAuth }
    },
    successAuth: () => {
        return { type: ACTION_TYPE.successAuth }
    },
    failedAuth: (error) => {
        return { type: ACTION_TYPE.failedAuth, payload: error }
    },
    updateUser: (user) => {
        return { type: ACTION_TYPE.updateUser, payload: user }
    }
}
export { ACTION, ACTION_TYPE }
