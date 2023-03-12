import {useState, useEffect} from 'react'
import Axios from 'axios'
import './styles/CreateSurvey.css'
import Question from './components/Question';

const CreateSurvey = () => {

    const [text, setText] = useState("")
    const [defined, setDefined] = useState(false)
    const [goals, setGoals] = useState();
    const [questions, setQuestions] = useState([]);

    function getQuestionsText() {
        const questionsDivs = document.querySelectorAll('#questions input[type="text"]');
        const questionsText = [];
        questionsDivs.forEach(question => {
            if (question.value.length > 5){
                questionsText.push(question.value.trim());
            }
        });

        Axios.post('http://localhost:5000/survey/create', {"goals":goals, "questions":questionsText})
        .then(response => response.data)
        .then(data => alert("Your code is "+ data.surveyId))
        .catch(error => alert("Error: "+ error.message))
    
      }


    const getSampleQuestions = async ()=>{
        await Axios.post('http://localhost:5000/gpt', {"query": "Generate sample survey questions for the following goals: " + goals})
        .then(response => response.data)
        .then(data => {
            console.log(data)
            const res = data.split("?")    
            setQuestions(res)
            setDefined(true)

           

        })
        .catch(err => alert(err.message))
    }

  return (
    <div className="container">
    {!defined?
    <div className="goals">
      <h1>Why are you creating this survey? (Goals of the survey)</h1>
      <textarea
        cols="30"
        rows="10"
        onChange={(e) => setGoals(e.target.value)}
      ></textarea>
      <button className="btn-start" onClick={() => getSampleQuestions()}>
        Submit
      </button>
    </div>
    :
    <div classname="goals">
        <h1>Sample Questions</h1>
        <div id="questionList">
        {questions.map((question,key) => <Question question={question+"?"} />)}
        </div>

        <button className="btn-start" onClick={()=> getQuestionsText()}>
            Create Survey
        </button>
    </div>
    }
  </div>
  

  )
}

export default CreateSurvey