import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import fetch from 'node-fetch';
import cors from 'cors';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection,doc,getDoc,getDocs, setDoc, addDoc,where,query } from 'firebase/firestore';



const app = express();
app.use(bodyParser.json());
dotenv.config();
app.use(cors());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

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
      const query = req.body.query;
      console.log(query);
  
      try {
          const completion = await openai.chat.completions.create({
              model: 'gpt-3.5-turbo',
              messages: [{role: "system", content: query}],
          });
          return res.send(completion.choices[0].message.content);
      } catch (err) {
          console.log('Internal Server Error: ' + err);
          return res.status(500).send('Internal Server Error: ' + err);
      }
  });

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

app.post('/survey/response', async (req, res) => {
    try {
      const surveyId = req.body.surveyId;
      
      const surveyRef = await addDoc(collection(db, 'responses'), {
        surveyId,
        answers: req.body.answers,
        questions: req.body.questions,
        context: req.body.context
      });
  
      res.status(201).json({
        responseId: surveyRef.id
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: 'Something went wrong'
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
  
  app.get("/responses/:surveyId", async (req, res) => {
    try {
      const surveyId = req.params.surveyId;
  
      // Create a reference to the "responses" collection
      const responsesRef = collection(db, "responses");
  
      // Create a query to fetch all documents with the specified survey ID
      const q = query(responsesRef, where("surveyId", "==", surveyId));
  
      // Fetch all documents that match the query
      const querySnapshot = await getDocs(q);
  
      // Map over the documents and create an array of objects containing the document ID and data
      const documents = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          data: doc.data()
        };
      });
  
      res.send(documents);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error fetching responses");
    }
  });

const PORT = process.env.PORT || 5000;



app.listen(PORT, (err, res) => {
    if(!err) {
    
        console.log(`Server is running in http://localhost:${PORT}`);
    }
})