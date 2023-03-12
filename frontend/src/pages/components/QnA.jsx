import React from 'react'

const QnA = (props) => {
  return (
    <div>
        <p class="question">{props.question}</p>
        <p>{props.answer}</p>
        <br></br>
    </div>
  )
}

export default QnA