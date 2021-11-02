import React, { createContext, useEffect, useState, useReducer } from 'react';
import { projectAuth as auth } from '../../firebase'
import { authReducer } from '../modules/auth/reducers/reducer'
import { ACTION } from '../modules/auth/actions/action'
import { ROUTEPATH, AUTHTYPE, MESSAGE, DEFAULT_USER_PHOTO_URL } from '../constants/constants'
import firebase from 'firebase/app'
//create context
const AuthContext = createContext()
// Provider
const AuthProvider = ({ children }) => {
    // //reducer to update state
    const initialState = {
        loading: false,
        error: '',
        userUpdated: false,
        currentUser: null
    }
    const [state, dispatch] = useReducer(authReducer, initialState, () => initialState);
    //Auth methods
    const signUp = async ({ authType, email, password, passwordConfirm, history }) => {
        dispatch(ACTION.initAuth())
        switch (authType) {
            case AUTHTYPE.email:
                try {
                    if (password !== passwordConfirm) {
                        throw new Error('Passwords do not match')
                    }
                    const res = await auth.createUserWithEmailAndPassword(email, password)
                    if (!res) {
                        throw new Error('Could not complete sign-up')
                    }
                    await res.user.updateProfile(
                        {
                            displayName: res.user.email.split('@')[0],
                            photoURL: DEFAULT_USER_PHOTO_URL,
                        })
                    dispatch(ACTION.successAuth())
                    history.push(ROUTEPATH.dashboard)
                } catch (err) {
                    dispatch(ACTION.failedAuth(err.message))
                }
                break
            case AUTHTYPE.googleAuth:
                try {
                    await authWithGoogle()
                    dispatch(ACTION.successAuth())
                    history.push(ROUTEPATH.dashboard)
                } catch (err) {
                    dispatch(ACTION.failedAuth(err.message))
                }
        }
    }

    const login = async ({ authType, email, password, history }) => {
        dispatch(ACTION.initAuth())
        switch (authType) {
            case AUTHTYPE.email:
                try {
                    await auth.signInWithEmailAndPassword(email, password)
                    dispatch(ACTION.successAuth())
                    history.push(ROUTEPATH.dashboard)
                } catch (err) {
                    dispatch(ACTION.failedAuth(err.message))
                }
                break
            case AUTHTYPE.googleAuth:
                try {
                    await authWithGoogle()
                    dispatch(ACTION.successAuth())
                    history.push(ROUTEPATH.dashboard)
                } catch (err) {
                    dispatch(ACTION.failedAuth(err.message))
                }
        }
    }

    const logout = async ({ history }) => {
        dispatch(ACTION.initAuth())
        try {
            await auth.signOut()
            dispatch(ACTION.successAuth())
            history.push(ROUTEPATH.dashboard)
        } catch (err) {
            dispatch(ACTION.failedAuth(err.message))
        }
    }

    const resetPassword = async (email) => {
        dispatch(ACTION.initAuth())
        try {
            await auth.sendPasswordResetEmail(email)
            dispatch(ACTION.successAuth(MESSAGE.passwordResetSuccess))
        } catch (err) {
            dispatch(ACTION.failedAuth(err.message))
        }
    }

    const updateProfileInfo = async ({ email, password, passwordConfirm, displayName }) => {
        const { currentUser } = state
        dispatch(ACTION.initAuth())
        try {
            if (password !== passwordConfirm) {
                throw new Error('Passwords do not match')
            }
            await currentUser.updatePassword(password)
            if (email !== currentUser.email) {
                await currentUser.updateEmail(email)
            }
            if (displayName !== currentUser.displayName) {
                await currentUser.updateProfile({ displayName })
            }
            dispatch(ACTION.successAuth(MESSAGE.profileUpdateSuccess))
        } catch (err) {
            dispatch(ACTION.failedAuth(err.message))
        }
    }

    const authWithGoogle = async () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('profile');
        provider.addScope('email');
        return await firebase.auth().signInWithPopup(provider)
    }

    const resetErrorsAndMessages = () => {
        dispatch(ACTION.reset())
    }
    //use effect
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            dispatch(ACTION.updateUser(user))
        })
        return unsubscribe
    }, [])
    return (
        <AuthContext.Provider
            value={{
                state,
                signUp,
                login,
                resetPassword,
                updateProfileInfo,
                logout,
                resetErrorsAndMessages
            }}>
            {children}
        </AuthContext.Provider>
    )
}
export { AuthProvider, AuthContext }