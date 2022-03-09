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
import Excersises from './views/Excercises';
import Profile from './views/Profile';
import Contributor from './views/Contributor';
import Admin from './views/Admin';

function App() {
  return (
      <BrowserRouter>
      <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<ProfileForm/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/goals" element={<Goals/>}/>
          <Route path="/programs" element={<Programs/>}/>
          <Route path="/workouts" element={<Workouts/>}/>
          <Route path="/excersises" element={<Excersises/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/contributor" element={<Contributor/>}/>
          <Route path="/admin" element={<Admin/>}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
