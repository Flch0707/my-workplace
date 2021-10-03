import React from 'react'
import ReactDOM from 'react-dom'
import App from './modules/global/components/App'
import "bootstrap/dist/css/bootstrap.min.css"
import './index.css';

import { i18n } from './i18n';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
