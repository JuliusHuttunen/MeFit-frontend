import { useState } from "react";
import Hamburger from "./Hamburger";

function NavigationMenu() {

    const [menuOpen, setMenuOpen] = useState(false)

    const toggleMenu = () => {
        setMenuOpen(!menuOpen)
    }
    return (
        <div className="navigation">
            <div onClick={toggleMenu}>
                <Hamburger menuOpen={menuOpen}></Hamburger>
            </div>
            <ul>
                <li>Dashboard</li>
                <li>Goals</li>
                <li>Programs</li>
                <li>Workouts</li>
                <li>Excersises</li>
                <li>Profile</li>
                <li>Contributor Tools</li>
                <li>Admin Tools</li>
            </ul>

        <style jsx>{`
            .navigation ul{
                display:${menuOpen ? 'inline' : 'none'};
                background-color: white;
                height: 100vh;
                width: 50vw;
                position: absolute;
            }
        `}
            </style>

            </div>
    );
  }
  
  export default NavigationMenu;