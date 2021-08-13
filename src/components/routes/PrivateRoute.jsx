import { Route, Redirect } from "react-router-dom"
import React, { useContext } from 'react'
import { AuthContext } from '../../context/authCtx'

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { currentUser } = useContext(AuthContext)
    return (
        <Route {...rest}
            render={props => {
                return (
                    currentUser ? <Component {...props} /> :
                        <Redirect to="/login" />
                )
            }}
        />
    )
}

export default PrivateRoute
