import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import "bootstrap/dist/css/bootstrap.min.css"
import { i18n } from './i18n';
import { AuthProvider } from './contexts/authCtx/context'
import {
  BrowserRouter as Router,
  Switch
} from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <Router>
        <Switch>
          <App />
        </Switch>
      </Router>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
