import { Route, Redirect } from "react-router-dom"
import React, { useContext } from 'react'
import { AuthContext } from '../../contexts/authContext'
import { ROUTEPATH } from '../../constants/constants'
import AuthLayout from "../auth/Layouts/AuthLayout"

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
    const { state: { currentUser } } = useContext(AuthContext)
    return (
        <Route {...rest}
            render={props => (
                currentUser && restricted ?
                    <Redirect to={ROUTEPATH.dashboard} />
                    :
                    <AuthLayout>
                        <Component {...props} />
                    </AuthLayout>

            )} />
    )
}
export default PublicRoute
