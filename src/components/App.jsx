import React, { Suspense } from 'react'
import { ROUTEPATH } from '../constants/constants'
import SignUp from './auth/SignUp'
import Login from './auth/Login'
import ResetPassword from './auth/ResetPassword'
import UpdateProfile from './auth/UpdateProfile'
import PrivateRoute from './routes/PrivateRoute'
import PublicRoute from './routes/PublicRoute'
import Dashboard from './Dashboard'
import { Container } from 'react-bootstrap'

function App() {
  return (
    <Suspense fallback="loading">
      <Container
        style={{ minHeight: "100vh" }}
        className="d-flex align-items-center justify-content-center">
        <PrivateRoute
          exact
          path={ROUTEPATH.dashboard}
          component={Dashboard} />
        <PrivateRoute
          exact
          path={ROUTEPATH.updateProfile}
          component={UpdateProfile} />
        <PublicRoute
          exact
          path={ROUTEPATH.signUp}
          restricted={true}
          component={SignUp} />
        <PublicRoute
          exact
          path={ROUTEPATH.login}
          restricted={true}
          component={Login} />
        <PublicRoute
          exact
          path={ROUTEPATH.resetPassword}
          restricted={true}
          component={ResetPassword} />
      </Container>
    </Suspense>
  )
}

export default App
