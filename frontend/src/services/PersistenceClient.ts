import { ref, set, get } from 'firebase/database';
import { database } from './firebaseService';

class PersistenceClient {
  writeData = (path: string, data: any) => {
    return set(ref(database, path), data);
  };

  getData = async (path: string) => {
    const result = await get(ref(database, path));
    return result.val();
  };

  deleteData = (path: string) => {
    return set(ref(database, path), null);
  };
}

export default new PersistenceClient();
