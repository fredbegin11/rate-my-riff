import { useMutation, useQuery, useQueryClient } from 'react-query';
import { EditProfileFormProps } from '../components/form/EditProfileForm';
import { LoginFormProps } from '../components/login/LoginForm';
import AuthClient from '../services/AuthClient';
import { User, updateProfile } from '../services/firebaseService';
import StorageClient from '../services/StorageClient';
import { HookAction } from './HookAction';
import useFileUpload from './useFileUpload';

interface AuthHook {
  actions: {
    login: HookAction;
    editProfile: HookAction;
  };
  selectors: {
    user: User | null;
    isError: boolean;
    isLoading: boolean;
  };
}

interface Props {
  onLoginSuccess?: () => void;
}

const useAuth = (props: Props = {}): AuthHook => {
  const queryClient = useQueryClient();
  const { data: user = null, isError, isLoading } = useQuery('currentUser', () => AuthClient.getCurrentUser());

  const {
    actions: { uploadFile },
  } = useFileUpload();

  const {
    mutate: login,
    isError: isLoginError,
    isSuccess: isLoginSuccess,
    isLoading: isLoginLoading,
  } = useMutation(
    'login',
    async (values: LoginFormProps) => {
      await AuthClient.loginUser(values.email, values.password);
    },
    {
      onSuccess: props.onLoginSuccess,
    }
  );

  console.log('isLoginError: ', isLoginError);

  const {
    mutate: editProfile,
    isError: isEditProfileError,
    isSuccess: isEditProfileSuccess,
    isLoading: isEditProfileLoading,
  } = useMutation('editProfile', async (values: EditProfileFormProps) => {
    if (values.photo.length > 0) {
      await uploadFile(values.photo[0].name, values.photo[0]);
    }

    let fileUrl;
    if (values.photo.length > 0) {
      const fileName = values.photo[0].name;
      fileUrl = await StorageClient.getFileUrl(fileName);
    }

    if (user) {
      await updateProfile(user, {
        displayName: values.name,
        photoURL: fileUrl,
      });
    }

    queryClient.invalidateQueries('currentUser');
  });

  return {
    actions: {
      login: {
        action: login,
        isSuccess: isLoginSuccess,
        isLoading: isLoginLoading,
        isError: isLoginError,
      },
      editProfile: {
        action: editProfile,
        isSuccess: isEditProfileSuccess,
        isLoading: isEditProfileLoading,
        isError: isEditProfileError,
      },
    },
    selectors: { user, isError, isLoading },
  };
};

export default useAuth;
