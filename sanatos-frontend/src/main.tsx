import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './components/Home.tsx'
import './App.css'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import ListPatients from './components/ListPatients.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path = "/" element={<Home/>}/>
        <Route path = "/patients" element={<ListPatients/>}/>
      </Routes>
    </Router>
  </React.StrictMode>,
)
