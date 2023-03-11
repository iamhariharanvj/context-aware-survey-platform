import {useState} from 'react'
const Question = (props) => {
  
    const [question, setQuestion] = useState(props.question);

    return (
    <div id="questions">
        <input type="text" value={question} onChange={e=>setQuestion(e.target.value)} />
        <br />
    </div>
  )
}

export default Question