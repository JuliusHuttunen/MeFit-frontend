import NavigationMenu from "./NavigationMenu";
import ProfileName from "./ProfileName";
import ProfilePicture from "./ProfilePicture";
import './navbar.css'
import { useState } from "react";

function Navbar() {
    return (
    <div className="navcontainer">
        <NavigationMenu></NavigationMenu>
        <h1>MeFit</h1>
        <div className="profilewrapper">
            <ProfileName></ProfileName>
            <ProfilePicture></ProfilePicture>
        </div>
    </div>
    );
  }
  
  export default Navbar;