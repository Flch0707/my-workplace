import { ACTION_TYPE } from './action'
// state reducer    
const authReducer = (state, { type, payload }) => {
    switch (type) {
        case ACTION_TYPE.initAuth: {
            return {
                ...state,
                error: '',
                loading: true
            }
        }
        case ACTION_TYPE.successAuth: {
            return {
                ...state,
                error: '',
                loading: false
            }
        }
        case ACTION_TYPE.failedAuth: {
            return {
                ...state,
                error: payload,
                loading: false
            }
        }
        case ACTION_TYPE.updateUser: {
            return {
                ...state,
                currentUser: payload,
                userUpdated: true
            }
        }
    }
}

export { authReducer }
