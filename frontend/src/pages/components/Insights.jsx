import {useState, useEffect } from "react"
import Axios from 'axios'


const Insights = (props) => {
    const [personas, setPersonas] = useState("");

    const getPersonas = async(surveyText) =>{
        console.log(JSON.stringify(surveyText));
        var initText = "Generate the key points categorized and summarized insights or requirements from the below survey data: Survey Data:"
        var queryText = initText + surveyText;
        await Axios.post('http://localhost:5000/gpt',{"query": queryText})
        .then(response =>response.data)
        .then(data => setPersonas(data))
        .catch(error => console.error(error))
    }

    useEffect(() => {
        Axios.get(`http://localhost:5000/responses/${props.surveyId}`)
        .then(response => JSON.stringify(response.data))
        .then(data => getPersonas(data))
        .catch(err => console.error(err));

    }, [])    

  
    return (
    <div>{personas.split('\n').map(item=> <p>{item}</p>)}</div>
  )
}

export default Insights