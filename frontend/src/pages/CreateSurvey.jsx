import {useState, useEffect} from 'react'
import Axios from 'axios'

const CreateSurvey = () => {

    const [goals, setGoals] = useState();
    const [questions, setQuestions] = useState([]);
    const getSampleQuestions = async ()=>{
        const questions = await Axios.post('http://localhost:5000/gpt', {"query": "Generate sample survey questions for the following goals: " + goals})
        .then(response => response.data)
        .then(data => {

            const res = data.split("?")
            console.log(res)
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
        {questions.map((question,key) => <div><input value={question+"?"} onChange={(e) => questions[key]=e.target.value} /> <br> </br></div>)}
    </div>
  )
}

export default CreateSurvey