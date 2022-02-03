import axios from 'axios';
import AuthClient from './AuthClient';

class RiffClient {
  getRiffs = async () => {
    const token = await AuthClient.getToken();
    return axios.get(`http://${process.env.REACT_APP_API_URL}/riffs`, { headers: { authorization: `Bearer ${token}` } });
  };
}

export default new RiffClient();
