import {useState,useEffect} from 'react'
import Axios from 'axios'
import Question from './Question';
const Editing = (props) => {

    const [goals, setGoals] = useState("");
    const [questions, setQuestions] = useState([]);


    useEffect(() => {
        Axios.get(`http://localhost:5000/surveys/${props.surveyId}`)
        .then(response => response.data)
        .then(data => {
            setGoals(data.goals);
            setQuestions(data.questions);
        })
        .catch(err => console.error(err))
    },[])  

    const getQuestionsText = () => {
        const questionsDivs = document.querySelectorAll('#questions input[type="text"]');
        const questionsText = [];
        questionsDivs.forEach(question => {
            if (question.value.length > 5){
                questionsText.push(question.value.trim());
            }
    }) 

    return questionsText;};

    const updateDetails = (req, res) => {
        
        const updatedQues = getQuestionsText();

        Axios.put(`http://localhost:5000/survey/edit/${props.surveyId}`, {
            "goals": goals,
            "questions": updatedQues
        })
        .then(response => response.data)
        .then(data => alert("Updated Successfully"))
        .catch(error => console.error(error))

    }

  return (
    <div className="editingcontainer">
        <div className="goals">
        <p>Goal</p>
        <textarea value={goals} onChange={(e)=>setGoals(e.target.value)}></textarea>
        <p>Questions</p>
        {questions.map(question => <Question question={question} />)}
        <button className="btn-start" onClick={()=>updateDetails()}>Update</button>
        </div>
        
    </div>
  )
}

export default Editing