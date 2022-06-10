/* Internal dependencies */
import { keyword } from '../consts';
import { WebhookResponse, MakeCommandReturnType } from '../types';

export const makeCommandFromWebhook = (res: WebhookResponse): MakeCommandReturnType => {
  const { body } = res;
  const {  entity } = body;
  const {  plainText = '', chatId: userChatId } = entity;
    
  const startPoint = plainText.match(/S:\S+/) ? plainText.match(/(?<=S:)\S+/)[0] : '1';
  const clipSize = plainText.match(/#:\S+/) ? plainText.match(/(?<=#:)\S+/)[0] : '1';
  const chatRoom = plainText.match(/R:\S+/) ? plainText.match(/(?<=R:)\S+/)[0] : '고객피드백';
    
  if (!plainText.includes(keyword)) {throw Error();}
    
  return {
    plainText,
    userChatId,
    startPoint: Number(startPoint) < 1 ? 0 : Number(startPoint) - 1,
    clipSize: Number(clipSize),
    chatRoom,
  };
};