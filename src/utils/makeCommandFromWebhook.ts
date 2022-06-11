/* Internal dependencies */
import { 
  WebhookResponse,
  MakeCommandReturnType,
} from '../types';

export const makeCommandFromWebhook = (res: WebhookResponse): MakeCommandReturnType => {
  const { body } = res;
  const {  entity } = body;
  const {  plainText = '', chatId: userChatId } = entity;

  const defaultSendingChatRoomName = process.env.DEFAULT_CHANNEL ?? '단체방'; 
  const defaultKeyword = process.env.DEFAULT_KEYWORD ?? '^ch';
    
  const startPoint = plainText.match(/S:\S+/) ? plainText.match(/(?<=S:)\S+/)[0] : '1';
  const clipSize = plainText.match(/#:\S+/) ? plainText.match(/(?<=#:)\S+/)[0] : '1';
  const chatRoom = plainText.match(/R:\S+/) ? plainText.match(/(?<=R:)\S+/)[0] : defaultSendingChatRoomName;
    
  if (!plainText.includes(defaultKeyword)) {throw Error();}
    
  return {
    plainText,
    userChatId,
    startPoint: Number(startPoint) < 1 ? 0 : Number(startPoint) - 1,
    clipSize: Number(clipSize),
    chatRoom,
  };
};