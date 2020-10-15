import React from 'react'
import './index.css'

import { BrowserRouter as Router } from 'react-router-dom'

import Routes from './pages/routes'

export default function App() {
  return (
    <Router>
      <Routes />
    </Router>
  )
}
