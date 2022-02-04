import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import LoginForm, { LoginFormProps } from '../components/login/LoginForm';
import AuthClient from '../services/AuthClient';

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (values: LoginFormProps) => {
    setIsLoading(true);
    try {
      await AuthClient.loginUser(values.email, values.password);
      navigate('/riffs');
    } catch (err) {
      setError('Ça marche pas');
    } finally {
      setIsLoading(false);
    }
  };

  const form = useForm<LoginFormProps>();

  return <LoginForm form={form} onSubmit={onSubmit} isLoading={isLoading} error={error} />;
};

export default Login;
