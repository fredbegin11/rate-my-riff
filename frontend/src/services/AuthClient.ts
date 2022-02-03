import axios from 'axios';
import { auth } from './firebaseService';

class AuthClient {
  createUserAccount = () => (data: any) => {
    return axios.post(`${process.env.REACT_APP_API_URL}/auth/signup`, data).then((res) => res.data);
  };

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
