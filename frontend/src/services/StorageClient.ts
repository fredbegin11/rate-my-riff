import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from './firebaseService';

class StorageClient {
  uploadFile = (filename: string, file: File) => {
    const fileRef = ref(storage, filename);

    return uploadBytes(fileRef, file);
  };

  getFileUrl = (path: string) => {
    const pathReference = ref(storage, path);

    return getDownloadURL(pathReference);
  };
}

export default new StorageClient();
