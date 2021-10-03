import React, { Suspense } from 'react'
import {
  BrowserRouter as Router, Switch
} from "react-router-dom";
import { ROUTEPATH } from '../../../constants/constants'
import { AuthProvider } from '../../../contexts/authContext'

import SignUp from '../../auth/components/SignUp'
import Login from '../../auth/components/Login'
import ResetPassword from '../../auth/components/ResetPassword'
import UpdateProfile from '../../auth/components/UpdateProfile'
import PrivateRoute from '../../routes/PrivateRoute'
import PublicRoute from '../../routes/PublicRoute'
import Dashboard from './Dashboard';
function App() {
  return (
    <Suspense fallback="loading">
      <AuthProvider>
        <Router>
          <Switch>
            <PrivateRoute
              exact
              path={ROUTEPATH.dashboard}
              component={Dashboard} />
            <PrivateRoute
              exact
              path={ROUTEPATH.folderId}
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
          </Switch>
        </Router>
      </AuthProvider>
    </Suspense>
  )
}

export default App
