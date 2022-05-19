import 'dotenv/config';
import { Request, Response } from 'express';
import { ServerlessContext, ServerlessFunction } from './types';
import Twilio from 'twilio';

const { TWILIO_ACCOUNT_SID, TWILIO_API_KEY_SID, TWILIO_API_KEY_SECRET } = process.env;

const twilioClient = Twilio(TWILIO_API_KEY_SID, TWILIO_API_KEY_SECRET, {
  accountSid: TWILIO_ACCOUNT_SID,
});

const context: ServerlessContext = {
  ACCOUNT_SID: TWILIO_ACCOUNT_SID,
  TWILIO_API_KEY_SID,
  TWILIO_API_KEY_SECRET,
  ROOM_TYPE: 'group',
};

export function createExpressHandler(serverlessFunction: ServerlessFunction) {
  return (req: Request, res: Response) => {
    serverlessFunction(context, req.body, (_, serverlessResponse) => {
      const { statusCode, headers, body } = serverlessResponse;

      res
        .status(statusCode)
        .set(headers)
        .json(body);
    });
  };
}
