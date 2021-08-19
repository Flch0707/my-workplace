import { Route, Redirect } from "react-router-dom"
import React, { useContext } from 'react'
import { AuthContext } from '../../contexts/authCtx/context'
import { ROUTEPATH } from '../../constants/constants'

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
    const { state: { currentUser } } = useContext(AuthContext)
    return (
        <Route {...rest}
            render={props => (
                currentUser && restricted ?
                    <Redirect to={ROUTEPATH.dashboard} />
                    : <Component {...props} />
            )} />
    )
}
export default PublicRoute
