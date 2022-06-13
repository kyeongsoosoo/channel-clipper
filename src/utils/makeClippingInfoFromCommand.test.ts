/* Internal dependencies */
import { ClippingContentType } from '../types';
import {
  GetGroupsMock,
  GetUserChatMessagesMock,
} from '../__mocks__/ClientMock';
import { makeWebhookResponseMock } from '../__mocks__/WebhookResponseMock';
import {  
  getTargetChatRoomFromCommand,
  makeClippingContentFromCommand, 
} from './makeClippingInfoFromCommand';
import { makeCommandFromWebhook } from './makeCommandFromWebhook';

describe('makeClippingInfoFromCommand', () => {
  let webhookRes = makeWebhookResponseMock('^ch R:고객피드백');
  let command = makeCommandFromWebhook(webhookRes);

  describe('getTargetChatRoomFromCommand', () => {
    it('should return matched groupChatRoom with command target chatRoom name', async () => {
      const targetChatRoom = await getTargetChatRoomFromCommand(command, GetGroupsMock);

      expect(targetChatRoom.name).toBe(command.chatRoom);
    });
  });

  describe('makeClippingContentFromCommand', () => {
    let clipContent: ClippingContentType;
    
    it('should return user with given user chat', async () => {  
      clipContent = await makeClippingContentFromCommand(command, GetUserChatMessagesMock);
      expect(clipContent.user.name).toBe(GetUserChatMessagesMock.users[0].name);
    });
    
    it('should return clipped message with given user chat', async () => {  
      clipContent = await makeClippingContentFromCommand(command, GetUserChatMessagesMock);
      expect(clipContent.message[0].plainText).toBe(GetUserChatMessagesMock.messages[0].plainText);
    });
    
    it('should return matched number of clipped messages with given user chat', async () => {  
      webhookRes = makeWebhookResponseMock('^ch R:고객피드백 #:2');
      command = makeCommandFromWebhook(webhookRes);
      
      clipContent = await makeClippingContentFromCommand(command, GetUserChatMessagesMock);
      expect(clipContent.message[0].plainText).toBe(GetUserChatMessagesMock.messages[2].plainText);
      expect(clipContent.message[1].plainText).toBe(GetUserChatMessagesMock.messages[0].plainText);
    });

    it('should return clipped messages from starting point with given user chat', async () => {  
      webhookRes = makeWebhookResponseMock('^ch R:고객피드백 S:2');
      command = makeCommandFromWebhook(webhookRes);
      
      clipContent = await makeClippingContentFromCommand(command, GetUserChatMessagesMock);
      expect(clipContent.message[0].plainText).toBe(GetUserChatMessagesMock.messages[2].plainText);
    });
  });
});