import { useEffect, useState } from 'react';
import { EditProfileFormProps } from '../components/form/EditProfileForm';
import AuthClient from '../services/AuthClient';
import { User, updateProfile } from '../services/firebaseService';
import StorageClient from '../services/StorageClient';

interface ProfileHook {
  actions: {
    editProfile: (form: EditProfileFormProps) => void;
  };
  selectors: {
    user: User | null;
  };
}

const useProfile = (): ProfileHook => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    AuthClient.getCurrentUser().then(setUser);
  }, []);

  const editProfile = async (values: EditProfileFormProps) => {
    let fileUrl;

    if (values.photo.length > 0) {
      const fileName = values.photo[0].name;
      fileUrl = await StorageClient.getFileUrl(fileName);
    }

    if (user) {
      updateProfile(user, {
        displayName: values.name,
        photoURL: fileUrl,
      });
    }
  };

  return {
    actions: { editProfile },
    selectors: { user },
  };
};

export default useProfile;
