/* External dependencies */
import { pipe } from '@fxts/core';
import 'dotenv/config';
import express from 'express';

/* Internal dependencies */
import { client } from './client';
import { WebhookResponse } from './types';
import { makeClippingInfoFromCommand } from './utils/makeClippingInfoFromCommand';
import { makeCommandFromWebhook } from './utils/makeCommandFromWebhook';
import { makePostMessageDTO } from './utils/makePostMessageDTO';


const PORT = process.env.PORT || 8000;


const app = express();

app.use(express.json());
app.use(express.urlencoded( { extended : false } ));

app.post('/', 
  async (res: WebhookResponse) => {
    try {
      const postMessageDTO  = await pipe(
        res,
        makeCommandFromWebhook,
        makeClippingInfoFromCommand,
        makePostMessageDTO,
      );
      await client.group.postMessage(postMessageDTO);
    } catch (err) {
      console.log(err);
    }
  });


app.listen(PORT);