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
    <div>
      <Navbar></Navbar>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProfileForm/>}>
        </Route>
        <Route path="dashboard" element={<Dashboard/>}>
        </Route>
        <Route path="goals" element={<Goals/>}>
        </Route>
        <Route path="programs" element={<Programs/>}>
        </Route>
        <Route path="workouts" element={<Workouts/>}>
        </Route>
        <Route path="excersises" element={<Excersises/>}>
        </Route>
        <Route path="profile" element={<Profile/>}>
        </Route>
        <Route path="contributor" element={<Contributor/>}>
        </Route>
        <Route path="admin" element={<Admin/>}>
        </Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
