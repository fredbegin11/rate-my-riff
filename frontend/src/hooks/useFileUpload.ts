import StorageClient from '../services/StorageClient';

interface FileUploadHook {
  actions: {
    uploadFile: (fileName: string, file: File) => void;
    getFileUrl: (fileName: string) => void;
  };
}

const useFileUpload = (): FileUploadHook => {
  const uploadFile = (fileName: string, file: File) => StorageClient.uploadFile(fileName, file);

  const getFileUrl = (fileName: string) => StorageClient.getFileUrl(fileName);

  return {
    actions: { uploadFile, getFileUrl },
  };
};

export default useFileUpload;
