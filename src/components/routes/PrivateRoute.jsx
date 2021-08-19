import { Route, Redirect } from "react-router-dom"
import React, { useContext } from 'react'
import { AuthContext } from '../../contexts/authCtx/context'
import { ROUTEPATH } from '../../constants/constants'
const PrivateRoute = ({ component: Component, ...rest }) => {
    const { state: { currentUser } } = useContext(AuthContext)
    return (
        <Route {...rest}
            render={props => {
                return (
                    currentUser ? <Component {...props} /> :
                        <Redirect to={ROUTEPATH.login} />
                )
            }}
        />
    )
}

export default PrivateRoute
