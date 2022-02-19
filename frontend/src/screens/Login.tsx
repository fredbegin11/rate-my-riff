import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import LoginForm, { LoginFormProps } from '../components/login/LoginForm';
import useAuth from '../hooks/useAuth';

const Login = () => {
  const navigate = useNavigate();

  const {
    actions: {
      login: { action: login, isError, isLoading },
    },
  } = useAuth({
    onLoginSuccess: () => navigate('/riffs'),
  });

  const form = useForm<LoginFormProps>();

  return <LoginForm form={form} onSubmit={login} isLoading={isLoading} isError={isError} />;
};

export default Login;
