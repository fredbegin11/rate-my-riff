import { Request, Response, NextFunction } from 'express';
import admin from '../auth/firebaseService';

export type AuthenticatedRequest = Request & { authId?: string; authToken?: string };

const getAuthToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    req.authToken = req.headers.authorization.split(' ')[1];
  } else {
    req.authToken = null;
  }

  next();
};

export const checkIfAuthenticated = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  getAuthToken(req, res, async () => {
    try {
      const { authToken } = req;
      const userInfo = await admin.auth().verifyIdToken(authToken);
      req.authId = userInfo.uid;
      return next();
    } catch (e) {
      return res.status(401).send({ error: 'You are not authorized to make this request' });
    }
  });
};
