import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';

const app = express();
app.use(bodyParser.json());
dotenv.config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  
  });
const openai = new OpenAIApi(configuration)

app.get('/', (req, res) => {
    res.send("Server is up!");
})

app.post('/gpt', async (req, res) => {
    
      
      
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