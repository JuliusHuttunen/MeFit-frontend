import './App.css';
import Navbar from './components/navbar/Navbar';
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";
import Test from './components/test/Test';
import ProfileForm from './components/Profile/ProfileForm';

function App() {
  return (
    <div>
      <Navbar></Navbar>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProfileForm/>}>
        </Route>
        <Route path="dashboard" element={<Test/>}>
        </Route>
        <Route path="goals" element={<Test/>}>
        </Route>
        <Route path="programs" element={<Test/>}>
        </Route>
        <Route path="workouts" element={<Test/>}>
        </Route>
        <Route path="excersises" element={<Test/>}>
        </Route>
        <Route path="profile" element={<Test/>}>
        </Route>
        <Route path="contributor" element={<Test/>}>
        </Route>
        <Route path="admin" element={<Test/>}>
        </Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
