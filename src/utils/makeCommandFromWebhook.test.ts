/* Internal Dependencies */
import { makeWebhookResponseMock } from '../__mocks__/WebhookResponseMock';
import { makeCommandFromWebhook } from './makeCommandFromWebhook';

describe('makeCommandFromWebhook', () => {
  beforeAll(() => {
    process.env = {
      DEFAULT_CHANNEL: '단체방',
      DEFAULT_KEYWORD: '^ch',
    };
  });

  it('should throw error when plainText does not include keyword', () => {
    const webhookRes = makeWebhookResponseMock('test without keyword');

    expect(() => makeCommandFromWebhook(webhookRes)).toThrow(Error);
  });

  it('should return default value when option is not given', () => {
    const webhookRes = makeWebhookResponseMock(process.env.DEFAULT_KEYWORD);
    const command = makeCommandFromWebhook(webhookRes);

    expect(command.clipSize).toBe(1);
    expect(command.startPoint).toBe(0);
    expect(command.chatRoom).toBe(process.env.DEFAULT_CHANNEL);
  });

  it('should return given chatRoom when chatRoom option is given', () => {
    const webhookRes = makeWebhookResponseMock(`${process.env.DEFAULT_KEYWORD} R:테스트방`);
    const command = makeCommandFromWebhook(webhookRes);

    expect(command.chatRoom).toBe('테스트방');
  });

  it('should return given startPoint when startPoint option is given', () => {
    const webhookRes = makeWebhookResponseMock(`${process.env.DEFAULT_KEYWORD} S:4`);
    const command = makeCommandFromWebhook(webhookRes);

    expect(command.startPoint).toBe(3);
  });

  it('should return given clipSize when clipSize option is given', () => {
    const webhookRes = makeWebhookResponseMock(`${process.env.DEFAULT_KEYWORD} #:3`);
    const command = makeCommandFromWebhook(webhookRes);

    expect(command.clipSize).toBe(3);
  });
});