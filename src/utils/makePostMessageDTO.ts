/* External dependencies */
import { 
  pipe, 
  map,
  toArray,
} from '@fxts/core';

/* Internal dependencies */
import { 
  Block,
  Message,
  PostMessageDTO,
  User, 
} from '../openApi/types';
import {
  ClippingContentType,
  ClippingInfoType,
} from '../types';

  
const makeClipTileFromClipContent = (clipContent: ClippingContentType):Block => {
  const formatMessage = (user: User): Block => ({ type: 'text', value:`<b>${user.name}</b>님이 남긴 피드백` });
  
  return pipe(
    clipContent,
    content => content.user,
    formatMessage,
  );
};
    
const makeClipBodyFromClipContent = (clipContent: ClippingContentType): Block => {
  const formatMessage = (message: Message): Block => ({
    type: 'text',
    value: `${message.plainText}`,
  });
    
  const listBlocks: Array<Block> = pipe(
    clipContent,
    content=> content.message,
    map(formatMessage),
    toArray,
  );
    
  const body: Block = { type: 'bullets', blocks: listBlocks };
    
  return body;
};
    
export const getFormattedBlock = (clipContent: ClippingContentType) => {
  const title = makeClipTileFromClipContent(clipContent);
  const body = makeClipBodyFromClipContent(clipContent);
    
  return [
    title,
    body,
  ];
    
};
    
export const makePostMessageDTO = (clipperPost: ClippingInfoType): PostMessageDTO => {
  const groupId = clipperPost.chatRoom.id;
  const botName = process.env.BOT_NAME ?? '클리퍼봇';
    
  return {
    groupId,
    botName,
    blocks: getFormattedBlock(clipperPost.clipContent),
  };
};
    