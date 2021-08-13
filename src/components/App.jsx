import React, { } from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import SignUp from './auth/SignUp'
import Login from './auth/Login'
import PrivateRoute from './routes/PrivateRoute'
import PublicRoute from './routes/PublicRoute'
import Dashboard from './Dashboard'
import { Container } from 'react-bootstrap'

function App() {
  return (
    <Container
      style={{ minHeight: "100vh" }}
      className="d-flex align-items-center justify-content-center">
      {/* <AuthProvider> */}
      <Router>
        <Switch>
          <PrivateRoute
            exact
            path="/"
            component={Dashboard} />
          <PublicRoute
            exact
            path="/signup"
            restricted={true}
            component={SignUp} />
          <PublicRoute
            exact
            path="/login"
            restricted={true}
            component={Login} />
        </Switch>
      </Router>
      {/* </AuthProvider> */}
    </Container>
  )
}

export default App
