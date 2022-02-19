import { auth, User } from './firebaseService';

class AuthClient {
  loginUser = (email: string, password: string) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  signOut = () => {
    return auth.signOut();
  };

  getCurrentUser = (): Promise<User | null> => {
    return new Promise<User | null>((resolve, reject) => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        unsubscribe();
        resolve(user);
      }, reject);
    });
  };

  getCurrentUserDisplayName = () => auth.currentUser?.displayName || '-';
}

export default new AuthClient();
