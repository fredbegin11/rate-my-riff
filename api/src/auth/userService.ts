import { Request, Response } from 'express';
import admin from './firebaseService';

export const createUser = async (req: Request, res: Response) => {
  const { email, phoneNumber, password, firstName, lastName, photoUrl } = req.body;

  const user = await admin.auth().createUser({
    email,
    phoneNumber,
    password,
    displayName: `${firstName} ${lastName}`,
    photoURL: photoUrl,
  });

  return res.send(user);
};
