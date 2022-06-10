/* Internal dependencies */
import ChannelOpenApiClient from './openApi';

export const keyword = '^ch';

export const client = new ChannelOpenApiClient({
  accessKey: process.env.CHANNEL_ACCESS_KEY ?? '',
  accessSecret: process.env.CHANNEL_ACCESS_SECRET ?? '',
});