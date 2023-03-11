import {useState, useEffect} from 'react'
import Axios from 'axios'
import Question from './components/Question';

const CreateSurvey = () => {

    const [text, setText] = useState("")
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

        console.log(goals);
        console.log(questionsText);
    
      }


    const getSampleQuestions = async ()=>{
        const questions = await Axios.post('http://localhost:5000/gpt', {"query": "Generate sample survey questions for the following goals: " + goals})
        .then(response => response.data)
        .then(data => {
            console.log(data)
            const res = data.split("?")
            
            setQuestions(res)

           

        })
        .catch(err => alert(err.message))
    }

  return (
    <div>
        <p>Why are you creating this survey? (Goals of the survey)</p>
        <br />
        <textarea cols="80" rows="20" onChange={(e) => setGoals(e.target.value)} />
        <br />
        <button onClick={()=>getSampleQuestions() }>Submit</button>
        <p>Sample Questions</p>
        <div id="questions">
        {questions.map((question,key) => <Question question={question+"?"} />)}
        </div>

        <button onClick={()=> getQuestionsText()} >Submit</button>
    </div>
  )
}

export default CreateSurvey