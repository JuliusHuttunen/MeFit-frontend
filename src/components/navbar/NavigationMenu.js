import { useState } from "react";
import Hamburger from "./Hamburger";
import  { useNavigate, useLocation, Link } from "react-router-dom";

function NavigationMenu() {

    const [menuOpen, setMenuOpen] = useState(false)

    const navigate = useNavigate();
    const location = useLocation();

    const toggleMenu = () => {
        setMenuOpen(!menuOpen)
    }

    return (
        <div className="navigation">
            <div onClick={toggleMenu}>
                <Hamburger menuOpen={menuOpen}></Hamburger>
            </div>
            <ul>
                <li><Link to="/dashboard" style={{ textDecoration: 'none', color: '#EDF7F6' }}>Dashboard</Link></li>
                <li><Link to="/goals" style={{ textDecoration: 'none', color: '#EDF7F6' }}>Goals</Link></li>
                <li><Link to="/programs" style={{ textDecoration: 'none', color: '#EDF7F6' }}>Programs</Link></li>
                <li><Link to="/workouts" style={{ textDecoration: 'none', color: '#EDF7F6' }}>Workouts</Link></li>
                <li><Link to="/excercises" style={{ textDecoration: 'none', color: '#EDF7F6' }}>Excersises</Link></li>
                <li><Link to="/profile" style={{ textDecoration: 'none', color: '#EDF7F6' }}>Profile</Link></li>
                <li><Link to="/contributor" style={{ textDecoration: 'none', color: '#EDF7F6' }}>Contributor Tools</Link></li>
                <li><Link to="/admin" style={{ textDecoration: 'none', color: '#EDF7F6' }}>Admin Tools</Link></li>
            </ul>

        <style jsx>{`
            .navigation ul{
                display:${menuOpen ? 'inline' : 'none'};
                background-color: #1e4775;
                height: 100vh;
                width: 15em;
                position: absolute;
                margin: 0;
                padding-top: 2em;
                margin-top: 1.9em;
            }
        `}
        </style> 

        </div>
    );
  }
  
  export default NavigationMenu;