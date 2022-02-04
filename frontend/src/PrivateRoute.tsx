import { UserInfo } from 'firebase/auth';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { auth } from './services/firebaseService';

const PrivateRoute = () => {
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user: UserInfo | null) => {
      if (!user) {
        navigate('/login');
      }
    });
  }, []);

  return <Outlet />;
};

export default PrivateRoute;
