export type BlockType = 'bullets' | 'code' | 'text';

export type Block = {
  type: BlockType
  language?: string
  value?: string
  blocks?: Block[]
};

export type Group = {
  id: string
  channelId: string
  name: string
};

export type User = {
  id: string
  name: string
  memberId: string
  type: 'member' | 'lead' | 'unified'
};

export type Message = {
  chatType: 'userChat' | 'groupChat'
  blocks?: Array<Block>
  plainText?: string
  createdAt: number
  personType: 'manager' | 'user' | 'bot'
};

export type GetUserChatMessageDTO = {
  messages: Array<Message>
  users: Array<User>
};

export interface PostMessageDTO {
  groupId: string
  botName: string
  blocks: Block[]
}

export interface GetGroupsDTO {
  groups: Array<Group>
}
export interface GetMessageDTO {
  userChatId: string
}

export interface Auth {
  accessSecret: string
  accessKey: string
}