import { BrowserRouter, Routes, Route , Link} from 'react-router-dom';
import CreateSurvey from './pages/CreateSurvey'
import AnswerSurvey from './pages/AnswerSurvey'
import Homepage from './pages/Homepage';
import './pages/styles/Navbar.css'
import Navbar from './pages/components/Navbar';
import AboutUs from './pages/AboutUs';
import SuccessPage from './pages/SuccessPage';
import Dashboard from './pages/Dashboard';

const App = () => {

  
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/about' element={<AboutUs />} />
        <Route path='/survey/create' element={<CreateSurvey />} />
        <Route path="/survey/answer/:id" element={<AnswerSurvey />} />
        <Route path="/survey/answer/success" element={<SuccessPage />} />
        <Route path="/admin/:id" element={<Dashboard />} />



      </Routes>
    </BrowserRouter>
  )
}

export default App