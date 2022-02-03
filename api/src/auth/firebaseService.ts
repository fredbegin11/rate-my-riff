import admin from 'firebase-admin';

const serviceAccount = require('../../secrets/rate-my-riff-a78c7-firebase-adminsdk-7zrls-80cf5d06a1.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.DATABASE_URL,
});

export default admin;
