import { auth } from './firebaseService';

class AuthClient {
  loginUser = (email: string, password: string) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  signOut = () => {
    return auth.signOut();
  };

  getToken = () => {
    return auth.currentUser?.getIdToken();
  };

  getCurrentUser = () => {
    return auth.currentUser;
  };
}

export default new AuthClient();
