/* External dependencies */
import { v4 as uuid } from 'uuid';

/* Internal dependencies */
import { baseUrl, SenderTypes } from './constants';
import { get, post } from './fetch';
import { PostMessageDTO, Auth, GetMessageDTO } from './types';
import { makeSenderUrl, makeUrl } from './utils';


interface SenderBase {
  client: ChannelOpenApiClient
  url: string
}

class GroupOpenApiSender implements SenderBase {
  client: ChannelOpenApiClient;

  url: string;

  constructor(client: ChannelOpenApiClient) {
    this.client = client;
    this.url = makeSenderUrl(
      makeUrl(baseUrl, this.client.appVersion),
      SenderTypes.Group,
    );
  }

  postMessage({
    groupId,
    botName,
    blocks,
  }: PostMessageDTO) {
    return post(this.client.auth)(
      `${this.url}/${groupId}/messages`,
      { botName },
      {
        requestId: uuid(),
        blocks,
      },
    );
  }
}
class UserChatOpenApiSender implements SenderBase {
  client: ChannelOpenApiClient;

  url: string;

  constructor(client: ChannelOpenApiClient) {
    this.client = client;
    this.url = makeSenderUrl(
      makeUrl(baseUrl, this.client.appVersion),
      SenderTypes.UserChats,
    );
  }

  getMessages({
    userChatId,
  }: GetMessageDTO) {
    return get(this.client.auth)(
      `${this.url}/${userChatId}/messages`,
    );
  }
}

interface ChannelOpenApiClientConstructor {
  accessSecret: string
  accessKey: string
}

class ChannelOpenApiClient {
  auth: Auth;

  appVersion: string = 'v5';

  constructor(config: ChannelOpenApiClientConstructor) {
    const { accessSecret, accessKey } = config;

    this.auth = {
      accessSecret,
      accessKey,
    };
  }

  get group() {
    return new GroupOpenApiSender(this);
  }

  get user() {
    return new UserChatOpenApiSender(this);
  }
}

export default ChannelOpenApiClient;