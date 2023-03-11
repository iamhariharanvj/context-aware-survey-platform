import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import './index.css'
import CreateSurvey from './pages/CreateSurvey'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/survey/create' element={<CreateSurvey />} />

      </Routes>
    </BrowserRouter>
    
  </React.StrictMode>,
)
