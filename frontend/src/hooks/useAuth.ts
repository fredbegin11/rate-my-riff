import { useMutation, useQuery, useQueryClient } from 'react-query';
import { EditProfileFormProps } from '../components/form/EditProfileForm';
import { LoginFormProps } from '../components/login/LoginForm';
import AuthClient from '../services/AuthClient';
import { User, updateProfile } from '../services/firebaseService';
import { HookAction } from './HookAction';

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

  const {
    mutate: editProfile,
    isError: isEditProfileError,
    isSuccess: isEditProfileSuccess,
    isLoading: isEditProfileLoading,
  } = useMutation('editProfile', async (values: EditProfileFormProps) => {
    if (user) {
      await updateProfile(user, { displayName: values.name });
    }

    await queryClient.invalidateQueries('currentUser');
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
