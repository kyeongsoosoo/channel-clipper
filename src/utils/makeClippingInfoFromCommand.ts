/* External dependencies */
import { 
  curry, 
  pipe,
  find,
  drop,
  filter,
  take,
  toArray, 
} from '@fxts/core';

/* Internal dependencies */
import { client } from '../consts';
import { 
  GetUserChatMessageDTO, 
  Group, 
  Message,
} from '../openApi/types';
import { 
  MakeCommandReturnType,
  ClippingContentType,
  ClippingInfoType,
} from '../types';


const getClippingMessagesFromCommandAndUserChat = (command: MakeCommandReturnType, userChat: GetUserChatMessageDTO) => {
  const getAllmessages = (chat: GetUserChatMessageDTO) => chat.messages;
  const isUserMessage = (chatBlock: Message) => chatBlock.personType === 'user' && chatBlock.blocks;
    
  const clippingMessages = pipe(
    userChat,
    getAllmessages,
    filter(isUserMessage),
    drop(command.startPoint),
    take(command.clipSize),
    toArray,
  );
    
  return clippingMessages;
};
    
const getUserFromUserChat = (userChat: GetUserChatMessageDTO) => {
  return pipe(
    userChat,
    user => user.users,
    find(user => user.type === 'member'),
  );
};

export const getGroupChatRooms = async () => {
  return (await (await client.group.getGroups()).json()).groups as Array<Group>;
};

export const getTargetChatRoomFromCommand = async (command: MakeCommandReturnType, chatRooms: Group[]) => {
  const findMatchedChatRoomFromCommand = (c: MakeCommandReturnType, chatRoom:Group) => chatRoom.name === c.chatRoom;
  const findMatchedChatRoom = curry(findMatchedChatRoomFromCommand)(command);

    
  const targetChatRoom =  pipe(
    chatRooms,
    find(findMatchedChatRoom),
  );
    
  return targetChatRoom;
};

const makeClippingContentFromCommandAndUserChat = (command: MakeCommandReturnType, userChat: GetUserChatMessageDTO): ClippingContentType => {    
  return {
    user: getUserFromUserChat(userChat),
    message: getClippingMessagesFromCommandAndUserChat(command, userChat),
  };
};

const getUserChatMessages = async (userChatId: string) => {
  return  await (await client.user.getMessages({ userChatId })).json() as GetUserChatMessageDTO;
};
    
export const makeClippingContentFromCommand = async (command: MakeCommandReturnType, userChat: GetUserChatMessageDTO) => {  
  const makeClippingContentFromUserChat = curry(makeClippingContentFromCommandAndUserChat)(command);
    
  const content = pipe(
    userChat,
    makeClippingContentFromUserChat,
  );
    
  return content;
};
  
export const makeClippingInfoFromCommand = async (command: MakeCommandReturnType):Promise<ClippingInfoType> => {
  const chatRooms = await getGroupChatRooms();
  const userChat = await getUserChatMessages(command.userChatId);

  return {
    chatRoom: await getTargetChatRoomFromCommand(command, chatRooms),
    clipContent: await makeClippingContentFromCommand(command, userChat),
  };
};

