import React, { createContext, useState, useEffect } from 'react';
import { projectAuth as auth } from '../../firebase'
import firebase from 'firebase/app'

//create context
const AuthContext = createContext()
// Provider
const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState()

    const signUp = async (authType, email, password) => {
        switch (authType) {
            case "EMAIL":
                return await auth.createUserWithEmailAndPassword(email, password)
            case "GOOGLE":
                return await authWithGoogle()
        }
    }

    const login = async (authType, email, password) => {
        switch (authType) {
            case "EMAIL":
                return await auth.signInWithEmailAndPassword(email, password)
            case "GOOGLE":
                return await authWithGoogle()
        }
    }

    const logout = async () => {
        return await auth.signOut()
    }

    const authWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('profile');
        provider.addScope('email');
        return firebase.auth().signInWithPopup(provider)

    }
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
        })
        return unsubscribe
    }, [])

    return (
        <AuthContext.Provider
            value={{
                currentUser,
                signUp,
                login,
                logout
            }}>
            {children}
        </AuthContext.Provider>
    )
}
export { AuthProvider, AuthContext }