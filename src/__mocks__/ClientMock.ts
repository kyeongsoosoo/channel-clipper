import {  GetUserChatMessageDTO, Group } from '../openApi/types';

export const GetGroupsMock: Group[] = 
  [
    {
      'id': '1',
      'channelId': '1',
      'name': '고객피드백',
    },
  ];



export const GetUserChatMessagesMock: GetUserChatMessageDTO = {
  'messages': [
    {
      'chatType': 'userChat',
      'personType': 'user',
      'createdAt': 1654930013312,
      'blocks': [
        {
          'type': 'text',
          'value': '안녕하세요!',
        },
      ],
      'plainText': '안녕하세요!',
    },
    {
      'chatType': 'userChat',
      'personType': 'manager',
      'createdAt': 1654930013312,
      'blocks': [
        {
          'type': 'text',
          'value': '안녕하세요!',
        },
      ],
      'plainText': '안녕하세요!',
    },
    {
      'chatType': 'userChat',
      'personType': 'user',
      'createdAt': 1654930013312,
      'blocks': [
        {
          'type': 'text',
          'value': '안녕히 계세요!',
        },
      ],
      'plainText': '안녕히 계세요!',
    },
  ],
  'users': [
    {
      'id': '1',
      'memberId': '1',
      'type': 'member',
      'name': '테스트유저',
    },
  ],
};