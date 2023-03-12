import {useState, useEffect } from "react"
import Axios from 'axios'


const Analytics = (props) => {
    const [personas, setPersonas] = useState("");

    const getPersonas = async(surveyText) =>{
        console.log(JSON.stringify(surveyText));
        var initText = "Classify this survey data into distinct personas with relevant imaginary name age gender and other demographics and tell insights on the questions of the survey mentioned below, The insights should match the questions asked: Survey Data:"
        var queryText = initText + surveyText;
        await Axios.post('http://localhost:5000/gpt',{"query": queryText})
        .then(response =>response.data)
        .then(data => setPersonas(data))
        .catch(error => console.error(error))
    }

    const [ans, getAns] = useState("")
    const [perQuery, setPerQuery] = useState("")

    const getPredictedAnswers = async(question, personas) =>{
        var queryText = `Generate the predicted answers of each personas for these survey question:${question} by the following personas:${personas}`
        await Axios.post('http://localhost:5000/gpt',{"query": queryText})
        .then(response =>response.data)
        .then(data => getAns(data))
        .catch(error => console.error(error))
    }

    useEffect(() => {
        Axios.get(`http://localhost:5000/responses/${props.surveyId}`)
        .then(response => JSON.stringify(response.data))
        .then(data => getPersonas(data))
        .catch(err => console.error(err));

    }, [])    

  
    return (
    <div>
        {personas.split('\n').map(item=> <p>{item}</p>)}
        <input type="text" value={perQuery} onChange={(e)=>setPerQuery(e.target.value)} placeholder="Enter a query"/>    
        <button onClick={()=>getPredictedAnswers(perQuery, personas)}>Ask</button>
        {ans}
    </div>
    
  )
}

export default Analytics