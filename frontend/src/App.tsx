import { QueryClient, QueryClientProvider } from 'react-query';
import { Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import CreateLyrics from './screens/CreateLyrics';
import CreateRiff from './screens/CreateRiff';
import Drums from './screens/Drums';
import Login from './screens/Login';
import Lyrics from './screens/Lyrics';
import Profile from './screens/Profile';
import Riffs from './screens/Riffs';
import Setlist from './screens/Setlist';

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
        <Route path="/setlist" element={<PrivateRoute />}>
          <Route path="/setlist" element={<Setlist />} />
        </Route>
        <Route path="/drums" element={<PrivateRoute />}>
          <Route path="/drums" element={<Drums />} />
        </Route>
        <Route path="/lyrics" element={<PrivateRoute />}>
          <Route path="/lyrics" element={<Lyrics />} />
        </Route>
        <Route path="/lyrics/create" element={<PrivateRoute />}>
          <Route path="/lyrics/create" element={<CreateLyrics />} />
        </Route>
        <Route path="/profile" element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="*" element={<Navigate to="/riffs" />} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
