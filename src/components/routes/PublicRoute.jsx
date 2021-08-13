import { Route, Redirect } from "react-router-dom"
import React, { useContext } from 'react'
import { AuthContext } from '../../context/authCtx'

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
    const { currentUser } = useContext(AuthContext)
    return (
        <Route {...rest}
            render={props => (
                currentUser && restricted ?
                    <Redirect to="/" />
                    : <Component {...props} />
            )} />
    )
}
export default PublicRoute
