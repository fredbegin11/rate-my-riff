import { QueryClient, QueryClientProvider } from 'react-query';
import { Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import CreateRiff from './screens/CreateRiff';
import Drums from './screens/Drums';
import Login from './screens/Login';
import Riffs from './screens/Riffs';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/riffs" element={<PrivateRoute />}>
          <Route path="/riffs" element={<Riffs />} />
        </Route>
        <Route path="/riffs/create" element={<PrivateRoute />}>
          <Route path="/riffs/create" element={<CreateRiff />} />
        </Route>
        <Route path="/drums" element={<PrivateRoute />}>
          <Route path="/drums" element={<Drums />} />
        </Route>
        <Route path="*" element={<Navigate to="/riffs" />} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
