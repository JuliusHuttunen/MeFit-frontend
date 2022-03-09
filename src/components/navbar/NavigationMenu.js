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
                <li><Link to="/dashboard" style={{ textDecoration: 'none' }}>Dashboard</Link></li>
                <li><Link to="/goals">Goals</Link></li>
                <li><Link to="/programs">Programs</Link></li>
                <li><Link to="/workouts">Workouts</Link></li>
                <li><Link to="/excersises">Excersises</Link></li>
                <li><Link to="/profile">Profile</Link></li>
                <li><Link to="/contributor">Contributor Tools</Link></li>
                <li><Link to="/admin">Admin Tools</Link></li>
            </ul>

        <style jsx>{`
            .navigation ul{
                display:${menuOpen ? 'inline' : 'none'};
                background-color: #2660A4;
                height: 100vh;
                width: 10%;
                position: absolute;
                margin: 0;
                padding-top: 2em;
                margin-top: 0px;
            }
        `}
        </style> 

        </div>
    );
  }
  
  export default NavigationMenu;