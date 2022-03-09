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
                <div className="hamburgerlistwrapper">
                <li>Dashboard</li>
                <li>Goals</li>
                <li>Programs</li>
                <li>Workouts</li>
                <li>Excersises</li>
                <li>Profile</li>
                <li>Contributor Tools</li>
                <li>Admin Tools</li>
                </div>
            </ul>

        <style jsx>{`
            .navigation ul{
                display:${menuOpen ? 'inline' : 'none'};
                background-color: #123155;
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