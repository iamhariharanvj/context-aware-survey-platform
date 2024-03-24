import {useState, useEffect } from "react"
import Axios from 'axios'


const Insights = (props) => {
    const [personas, setPersonas] = useState("");

    const getPersonas = async(surveyText) =>{
        console.log(JSON.stringify(surveyText));
        var initText = "Generate the key points categorized and summarized insights or requirements from the below survey data: Survey Data:"
        var queryText = initText + surveyText;
        await Axios.post('https://context-aware-survey-platform.onrender.com/gpt',{"query": queryText})
        .then(response =>response.data)
        .then(data => setPersonas(data))
        .catch(error => console.error(error))
    }

    useEffect(() => {
        Axios.get(`https://context-aware-survey-platform.onrender.com/responses/${props.surveyId}`)
        .then(response => JSON.stringify(response.data))
        .then(data => getPersonas(data))
        .catch(err => console.error(err));

    }, [])    

  
    return (
    <div>{personas.split('\n').map(item=> <p>{item}</p>)}</div>
  )
}

export default Insights