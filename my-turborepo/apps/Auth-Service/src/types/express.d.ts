import * as express from 'express';
import type { User } from '@repo/db';

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
