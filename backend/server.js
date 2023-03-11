import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';
import fetch from 'node-fetch';
import cors from 'cors';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection,doc,getDoc, setDoc, addDoc } from 'firebase/firestore';



const app = express();
app.use(bodyParser.json());
dotenv.config();
app.use(cors());


const firebaseConfig = {
    apiKey: "AIzaSyDgo6qlVwJX5TIubmUuIaKBOzOr4n5o3WU",
    authDomain: "survey-sparrows.firebaseapp.com",
    projectId: "survey-sparrows",
    storageBucket: "survey-sparrows.appspot.com",
    messagingSenderId: "58499752618",
    appId: "1:58499752618:web:bbe3b933122418c6bba6d3",
    measurementId: "G-FPGHNVR456"
  };

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);
  

app.get('/', (req, res) => {
    res.send("Server is up!");
})

app.post('/getPlaces', (req, res) => {
    const latitude = req.body.latitude;
    const longitude = req.body.longitude;
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${process.env.MAPBOX_API_ACCESS_TOKEN}`
    fetch(url)
    .then(function(response) {
        return response.json();
      })
    .then((data) => {
        res.send(data.features[0].place_name);
      })
    .catch((err) => {
        res.send('Fetch Error :-S', err);
      });

    })

app.post('/gpt', async (req, res) => {
    
      
    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
      
      });
    const openai = new OpenAIApi(configuration)
    
    const query = req.body.query;

    try{
    const completion = await openai.createCompletion({
        model:'text-davinci-003',
        prompt: query,
        max_tokens: 1000,
      })
        console.log(completion);
        return res.send(completion.data.choices[0].text);
    }
    catch(err){
        console.log('Internal Server Error');
        return res.send(err);    
    }
})

app.put('/survey/edit/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { goals, questions } = req.body;
  
      const surveyRef = doc(db, 'surveys', id);
      await setDoc(surveyRef, { goals, questions });
  
      res.send(`Survey with ID ${id} updated successfully`);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error updating survey');
    }
  });

app.post('/survey/create', async (req, res) => {
  try {
    const surveyId = Math.random().toString(36).substring(2, 10);
    
    const surveyRef = await addDoc(collection(db, 'surveys'), {
      surveyId,
      goals: req.body.goals,
      questions: req.body.questions
    });

    res.status(201).json({
      surveyId: surveyRef.id
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Something went wrong.'
    });
  }
});

app.get('/surveys/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const surveyRef = doc(db, 'surveys', id);
      const surveyDoc = await getDoc(surveyRef);
  
      if (!surveyDoc.exists()) {
        res.send({"exists": false});
      } else {
        const surveyData = surveyDoc.data();
        res.send({...surveyData, "exists": true});
      }
    } catch (error) {
      console.error(error);
      res.send({"exists": false});
    }
  });
  
const PORT = process.env.PORT || 5000;



app.listen(PORT, (err, res) => {
    if(!err) {
    
        console.log(`Server is running in http://localhost:${PORT}`);
    }
})