import './App.css';
import Navbar from './components/navbar/Navbar';
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
import Error from './views/Error';
import Home from './views/Home';
import Container from 'react-bootstrap/Container';
import Register from './views/Register';


function App() {
  return (
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/profileForm" element={<ProfileForm />}/>
          <Route path="/dashboard" element={<Dashboard />}/>
          <Route path="/goals" element={<Goals />}/>
          <Route path="/programs" element={<Programs />}/>
          <Route path="/workouts" element={<Workouts />}/>
          <Route path="/exercises" element={<Exercises />}/>
          <Route path="/profile" element={<Profile />}/>
          <Route path="/contributor" element={<Contributor />}/>
          <Route path="/admin" element={<Admin />}/>
          <Route path="*" element={<Error />}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
