/*Internal Dependencies */
import { WebhookResponse } from '../types';


export const makeWebhookResponseMock = (plainText: string): WebhookResponse => ({
  body:{
    event: 'test',
    entity: {
      plainText,
      chatId: 'testId',
      personType: 'tester',
    },
  },
}); 