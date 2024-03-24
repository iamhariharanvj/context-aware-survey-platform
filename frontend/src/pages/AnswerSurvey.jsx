import {Link, Navigate, useParams} from 'react-router-dom'
import {useState, useEffect} from 'react'
import Axios from 'axios'
import './styles/AnswerSurvey.css'
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDgo6qlVwJX5TIubmUuIaKBOzOr4n5o3WU",
    authDomain: "survey-sparrows.firebaseapp.com",
    projectId: "survey-sparrows",
    storageBucket: "survey-sparrows.appspot.com",
    messagingSenderId: "58499752618",
    appId: "1:58499752618:web:bbe3b933122418c6bba6d3",
    measurementId: "G-FPGHNVR456"
};


var questions = []
var answers = []


const AnswerSurvey = () => {
  let {id} = useParams();
  const [surveyExists, setSurveyExists] = useState(false);
  const [red,setRed] = useState(false);
  const [goals, setGoals] = useState("");
  const [sampleQuestions, setSampleQuestions] = useState("")
  useEffect(() => {
    Axios.get(`http://localhost:5000/surveys/${id}`).then((response) => {
      setSurveyExists(response.data.exists);
      setRed(!response.data.exists);
      if(response.data.exists){
        setGoals(response.data.goals)
        setSampleQuestions(response.data.questions.toString())
      }
      
    });
  }, []);

    return ( 
    <div>
        {red?console.log("REDIRECTING"):null}
        {surveyExists ? <AnswerSurveyBody goals={goals} questions={sampleQuestions} /> : null}
    </div>
  )
}



var qna = "";
var time = new Date()
    

const AnswerSurveyBody = (props) => {

  const app = initializeApp(firebaseConfig);
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  var onlyContext = "";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [instaId, setInstaId] = useState("");
  const [githubId, setGithubId] = useState("");
  const [count, setCount] = useState(1);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(()=>{
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position)=> {
        var latitude = position.coords.latitude
        var longitude = position.coords.longitude

        Axios.post('http://localhost:5000/getPlaces',{"longitude": longitude, "latitude": latitude})
        .then(response => {
          setLocation(response.data)
          return response.data;
        })
        .catch(err => {
          return err.message;
        })

      });

    }

    }, [])

  const handleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const { displayName, email, photoURL } = result.user;
      setName(displayName)
      setEmail(email)
      console.log("Logged in user:", displayName, email, photoURL);
      await getNextQuestion();
      setIsLoggedIn(true);

    } catch (error) {
      console.error(error);

    }
  };

  const [ques,setQuest] = useState("")
  const [ans,setAns] = useState("")
  let {id} = useParams();

  const [context, setContext] = useState("");
  

  const getNextQuestion = async()=>{

    if(count!=5){
    await Axios.get(`http://localhost:4000/translate?text=${ans}`)
    .then(response => response.data)
    .then(data =>{
        console.log(data);
        
    })
    qna += `Question: ${ques} Answer: ${ans}`
    questions.push(ques)
    answers.push(ans)
    console.log(questions)
    console.log(answers)

    await getContext(qna);
    
    
    
    var query = `Generate a single next personalized survey queries to ask based
     on previous questions, location, time gender and emotion with the details below\nGoals: \n${props.goals}\n Sample Questions: \n${props.sampleQuestions} \nCurrent Location: ${location}\nCurrent Time: ${time.toLocaleString()}\nName: ${name}}\nOther Demographics:${context}\n\nPrevious Questions and responses:\n${qna}\n\nNew Question related to survey goals:`
    

    

    await Axios.post('http://localhost:5000/gpt', {"query": query})
    .then(response => response.data)
    .then(data => setQuest(data))
    .catch(err => alert(err))
    setAns("");
    setCount(count+1)

    }
    else{
        qna += `Question: ${ques} Answer: ${ans}`
        questions.push(ques)
        answers.push(ans)
        console.log(questions)
        console.log(answers)

        
    Axios.post('http://localhost:5000/survey/response', {
        "questions": questions,
        "answers": answers,
        "context": onlyContext,
        "surveyId": id,
    })
    .then(response => response.data)
    .then(data => {
    
        console.log('success');
        window.location.href = "/survey/answer/success"
    
    })
    .catch(err => alert(err))
    }
}


  const getContext = async () => {
    if (githubId.length<2){
        setGithubId("null")
    }
    if (instaId.length<2){
        setInstaId("Null")
    }
    
    onlyContext = `Name: ${name}\nCurrent Location: ${location}\nCurrent Time: ${time.toLocaleString()}}\n` + context;
    setContext(context + "Previously asked questions and users responses" + qna)

    if(context.length >2){
        Axios.get(`http://localhost:4000/get_content?instagramid=${instaId}&githubid=${githubId}&name=${name}&email=${email}&goals=${props.goals}&context=${context}`)
        .then(response => response.data)
        .then(data => setContext(data.content))
        .catch(err=>alert(err));  
    }
    else{
        Axios.get(`http://localhost:4000/get_content?instagramid=${instaId}&githubid=${githubId}&name=${name}&email=${email}&goals=${props.goals}`)
        .then(response => response.data)
        .then(data => setContext(data.content))
        .catch(err=>alert(err));  
        
    }
    console.log(onlyContext);

    
  }


  

  return (
    <div>
        {!isLoggedIn?
        <div className="form-container">
            <input className="input-field" value={instaId} onChange={(e) => setInstaId(e.target.value)} placeholder="Enter your Instagram ID (Optional)" />
            <br />
            <input className="input-field" value={githubId} onChange={(e) => setGithubId(e.target.value)} placeholder="Enter your GitHub ID (Optional)" />
            <br />
            <button className="sign-in-btn" onClick={handleSignIn}>Sign in with Google</button>
        </div>
        :
        <div className="question-container">
            <h1 className="question-title">Question: {ques}</h1>
            <input type="text" value={ans} placeholder="Enter your answer" onChange={(e)=>setAns(e.target.value)} className="answer-input" />
            <button onClick={()=>getNextQuestion()} className="next-btn">Next Question</button>
        </div>
        }
    </div>
    

  );
};


export default AnswerSurvey