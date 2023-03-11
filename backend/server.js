import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
app.use(bodyParser.json());
dotenv.config();
app.use(cors());



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
        console.log(err);
        return res.send(err);    
    }
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, (err, res) => {
    if(!err) {
    
        console.log(`Server is running in http://localhost:${PORT}`);
    }
})