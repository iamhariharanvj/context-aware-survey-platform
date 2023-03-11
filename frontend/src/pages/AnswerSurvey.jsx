import {useParams} from 'react-router-dom'
import {useState, useEffect} from 'react'
import Axios from 'axios'
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDgo6qlVwJX5TIubmUuIaKBOzOr4n5o3WU",
    authDomain: "survey-sparrows.firebaseapp.com",
    projectId: "survey-sparrows",
    storageBucket: "survey-sparrows.appspot.com",
    messagingSenderId: "58499752618",
    appId: "1:58499752618:web:bbe3b933122418c6bba6d3",
    measurementId: "G-FPGHNVR456"
};


const AnswerSurvey = () => {
  let {id} = useParams();
  const [surveyExists, setSurveyExists] = useState(false);
  const [redirect,setRedirect] = useState(false);

  useEffect(() => {
    Axios.get(`http://localhost:5000/surveys/${id}`).then((response) => {
      setSurveyExists(response.data.exists);
      setRedirect(!response.data.exists);
    });
  }, []);

    return ( 
    <div>
        {redirect?console.log("REDIRECTING"):null}
        {surveyExists ? <AnswerSurveyBody /> : null}
    </div>
  )
}




const AnswerSurveyBody = () => {

  const app = initializeApp(firebaseConfig);
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [instaId, setInstaId] = useState("");
  const [githubId, setGithubId] = useState("");


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
    } catch (error) {
      console.error(error);

    }
  };

  return (
    <div>
        <input value={instaId} onChange={(e)=>setInstaId(e.target.value)} placeholder="Enter your instagram id" />
        <br />
        <input value={githubId} onChange={(e)=>setGithubId(e.target.value)} placeholder="Enter your github id" />
        <br />
        <button onClick={handleSignIn}>Sign in with Google</button>

        <br></br>
        <h1>{name}</h1>
        <h1>{email}</h1>
        <h1>{location}</h1>
        <h1>{instaId}</h1>
        <h1>{githubId}</h1>

     
    </div>
  );
};


export default AnswerSurvey