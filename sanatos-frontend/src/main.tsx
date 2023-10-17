import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './components/Home.tsx'
import './App.css'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import ListDoctors from './components/ListDoctors.tsx'
import CreateDoctor from './components/CreateDoctor.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path = "/" element={<Home/>}/>
        <Route path = "/doctors" element={<ListDoctors/>}/>
        <Route path = "/add-doctor" element={<CreateDoctor/>}/>
      </Routes>
    </Router>
  </React.StrictMode>,
)
