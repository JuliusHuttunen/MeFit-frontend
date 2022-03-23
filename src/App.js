import './App.css';
import MeFitNavbar from './components/navbar/MeFitNavbar';
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";
import ProfileForm from './components/Profile/ProfileForm';
import Dashboard from './views/Dashboard';
import Goals from './views/Goals';
import Programs from './views/Programs';
import Workouts from './views/Workouts';
import Exercises from './views/Exercises';
import Profile from './views/Profile';
import Contributor from './views/Contributor';
import Admin from './views/Admin';
import Logout from './views/Logout';
import Home from './views/Home';
import Authenticated from './components/authentication/Authenticated'
import NotAuthenticated from './components/authentication/NotAuthenticated'

function App() {
  return (
    <BrowserRouter>
      <MeFitNavbar />
      <NotAuthenticated>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Logout />} />
        </Routes>
      </NotAuthenticated>
      <Authenticated>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profileForm" element={<ProfileForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/goals" element={<Goals />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/exercises" element={<Exercises />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/contributor" element={<Contributor />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<Logout />} />
        </Routes>
      </Authenticated>
    </BrowserRouter>
  );
}

export default App;