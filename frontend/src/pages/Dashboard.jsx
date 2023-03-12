import {useState} from 'react';
import Responses from './components/Responses';
import './styles/Dashboard.css';
import { useParams } from 'react-router-dom';
import Analytics from './components/Analytics';
import Editing from './components/Editing';
import Insights from './components/Insights';

const Dashboard = () => {

    const [activeSection, setActiveSection] = useState('responses');
    const {id} = useParams()
    const handleNavigation = (section) => {
      setActiveSection(section);
    }
  
    return (
      <div className="dashboard">
        <nav>
          <ul>
            <li className={activeSection === 'responses' ? 'active' : ''} onClick={() => handleNavigation('responses')}>Responses</li>
            <li className={activeSection === 'analytics' ? 'active' : ''} onClick={() => handleNavigation('analytics')}>Analytics</li>
            <li className={activeSection === 'editing' ? 'active' : ''} onClick={() => handleNavigation('editing')}>Editing</li>
            <li className={activeSection === 'insights' ? 'active' : ''} onClick={() => handleNavigation('insights')}>Insights</li>
          
          </ul>
        </nav>
  
        {activeSection === 'responses' && <Responses surveyId={id} />}
        {activeSection === 'analytics' && <Analytics surveyId={id} />}
        {activeSection === 'editing' && <Editing surveyId={id}/>}
        {activeSection === 'insights' && <Insights surveyId={id} />}
      </div>
    );
  }


  
  
export default Dashboard;