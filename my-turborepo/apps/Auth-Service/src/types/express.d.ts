import * as express from 'express';
import { User } from '@repo/auth-db';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        user:User
        // Add other user properties here
      };
    }
  }
}
