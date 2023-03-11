import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreateSurvey from './pages/CreateSurvey'
import AnswerSurvey from './pages/AnswerSurvey'

const App = () => {

  
  return (
    <BrowserRouter>
        
       
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/survey/create' element={<CreateSurvey />} />
        <Route path="/survey/answer/:id" element={<AnswerSurvey />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App