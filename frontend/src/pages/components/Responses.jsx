import {useState, useEffect} from 'react'
import Axios from 'axios'
import QnA from './QnA'

const Responses = (props) => {

    const [responses, setResponses] = useState([])
    const [key, setKey] = useState(0)
    const [demographics, setDemographics] = useState("")
    const [length,setLength] = useState(0)

    useEffect(() => {
        Axios.get(`http://localhost:5000/responses/${props.surveyId}`)
        .then(response => response.data)
        .then(data => {
            var responseList = []
            setLength(data.length);
            for(var i = 0; i < data[key].data.questions.length; i++) {
                
                var res = data[key].data
                setDemographics(res.context)
                
                responseList.push({
                    "question": res.questions[i],
                    "answer": res.answers[i]
                })
            }

            setResponses(responseList)
            

        })
        .catch(err => console.error(err));

    }, [key])    

    return (
    <div>
        <button onClick={()=>{
            if (key-1 < 0) {
            setKey((key+length) -1)
            }
            else{
            setKey(key-1)
            
        }}}>Previous</button>

        <p>Response {key+1}/{length}</p>

        <button onClick={()=>{
            if (key+1 >= length) {
                setKey((key-length) +1)
            }
            else{
                setKey(key+1)

        }}}>Next</button>

        
        
        <p>User Demographics {demographics.split('\n').map(item=><p>{item}</p>)}</p>
        {responses.map((item)=> <QnA question={item.question} answer={item.answer} />)}
        
    </div>  
    )
}

export default Responses