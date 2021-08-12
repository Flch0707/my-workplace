import React from 'react'
import SignUp from './auth/SignUp'
import Login from './auth/Login'
import Dashboard from './Dashboard'
import { Container } from 'react-bootstrap'
import { AuthProvider } from '../context/authCtx'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
function App() {

  return (
    <Container
      style={{ minHeight: "100vh" }}
      className="d-flex align-items-center justify-content-center">
      <AuthProvider>
        <Router>
          <Switch>
            <Route exact path="/" component={Dashboard}></Route>
            <Route path="/signup" component={SignUp} />
            <Route path="/login" component={Login} />
          </Switch>
        </Router>
      </AuthProvider>
    </Container>
  )
}

export default App
