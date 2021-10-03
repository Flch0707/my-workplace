import { Route, Redirect } from "react-router-dom"
import React, { useContext } from 'react'
import { AuthContext } from '../../contexts/authContext'
import { ROUTEPATH } from '../../constants/constants'
import Header from "../global/components/Header"
const PrivateRoute = ({ component: Component, ...rest }) => {
    const { state: { currentUser } } = useContext(AuthContext)
    return (
        <Route {...rest}
            render={props => {
                return (
                    currentUser ?
                        <>
                            <Header />
                            <Component {...props} /></>
                        :
                        <Redirect to={ROUTEPATH.login}
                        />
                )
            }}
        />
    )
}

export default PrivateRoute
