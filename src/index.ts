/* External dependencies */
import 'dotenv/config';
import express from 'express';
import { WebhookResponse } from './types';

const PORT = process.env.PORT || 8000;

const app = express();

app.use(express.json());
app.use(express.urlencoded( { extended : false } ));


app.post('/', 
  (res: WebhookResponse) => {
    try {
      const { body } = res;
      
      console.log(body);
    } catch (err) {
      console.log(err);
    }
  });


app.listen(PORT);