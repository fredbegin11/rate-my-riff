import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { auth } from './services/firebaseService';

const PrivateRoute = () => {
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user: any) => {
      if (!user) {
        navigate('/login');
      }
    });
  }, []);

  return <Outlet />;
};

export default PrivateRoute;
