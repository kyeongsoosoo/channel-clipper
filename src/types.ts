import {
  Group,
  Message,
  User, 
} from './openApi/types';

type ChannelWebhookEvent = string;

// NOTE: Didn't describe for unused fields
// If you need more fields, see: https://developers.channel.io/docs/send-a-message-to-a-group-1
type ChannelWebhookEntity = {
  plainText: string
  personType: string
  chatId: string
};

export interface TypedResponseBody<T> extends Express.Response {
  body: T
}

export type WebhookResponse = TypedResponseBody<{
  event: ChannelWebhookEvent
  entity: ChannelWebhookEntity
}>;

export type MakeCommandReturnType = {
  plainText: string
  userChatId: string
  clipSize: number
  startPoint: number
  chatRoom: string
};

export type ClippingContentType = {
  user: User
  message: Array<Message>
};

export type ClippingInfoType = {
  chatRoom: Group
  clipContent: ClippingContentType
};