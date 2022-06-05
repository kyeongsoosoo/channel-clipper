/* External dependencies */
import 'dotenv/config';
import express from 'express';
import moment from 'moment';
import ChannelOpenApiClient from './openApi';

import { WebhookResponse } from './types';

type ChannelUser = {
  id: string
  name: string
  memberId: string
};

type BlockMessage = {
  type: 'text' | 'code' | 'bullets'
  value: string
  blocks: Array<BlockMessage>
};

type ChannelMessage = {
  chatType: 'userChat' | 'groupChat'
  blocks?: Array<BlockMessage>
  plainText?: string
  createdAt: number
  personType: 'manager' | 'user' | 'bot'
};

type UserChatResponse = {
  messages: Array<ChannelMessage>
  users: Array<ChannelUser>
};

const PORT = process.env.PORT || 8000;

const app = express();

app.use(express.json());
app.use(express.urlencoded( { extended : false } ));

const client = new ChannelOpenApiClient({
  accessKey: process.env.CHANNEL_ACCESS_KEY ?? '',
  accessSecret: process.env.CHANNEL_ACCESS_SECRET ?? '',
});

const summonTargetManagerInfo = {
  id: '209463',
  username: 'Novela',
};

app.get('/', (req, res) => {
  res.send('hi');
});

const botName = '하이봇';

app.post('/', 
  async (res: WebhookResponse) => {
    try {
      const { body } = res;
      const {  entity } = body;
      const {  plainText = '', chatId: userChatId } = entity;

      const keyword = '/channel';

      const isTrigger = plainText.includes(keyword);

      if (!isTrigger) return;

      const { id } = summonTargetManagerInfo;

      console.log(id);

      const userChat = await (await client.user.getMessages({ userChatId })).json() as UserChatResponse;


      const filterChat = (messages: Array<ChannelMessage>) => messages.filter(chatBlock => chatBlock.personType === 'user' && chatBlock.blocks);

      const userMessage = filterChat(userChat.messages);

      const momentedDate = moment(userMessage[0].createdAt);
      const date = momentedDate.format('YYYY년 MM월 DD일');
      

      console.log(   userChat.users[0].name, userMessage[0].plainText);
      await client.group.postMessage({
        groupId: '158345',
        botName,
        blocks: [
          { type: 'text', value:`<b>${userChat.users[0].name}</b>님이 남긴 피드백 - ${date}` },
          { type: 'bullets', blocks: [
            {
              type: 'text',
              value:`${userMessage[0].plainText}`,
            }, 
            {
              type: 'text',
              value:`${userMessage[1].plainText}`,
            }, 
          ] },
        ],
      });
    } catch (err) {
      console.log(err);
    }
  });


app.listen(PORT);