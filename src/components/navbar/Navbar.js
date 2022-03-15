import NavigationMenu from "./NavigationMenu";
import ProfileName from "./ProfileName";
import ProfilePicture from "./ProfilePicture";
import './navbar.css'
import { useState } from "react";
import LoginForm from "./LoginForm";

function Navbar() {
    return (
    <div className="navcontainer">
        <NavigationMenu></NavigationMenu>
        <div className="navtitle"><h1>MeFit</h1></div>
        <LoginForm />
        {/* <div className="profilewrapper">
             <ProfileName></ProfileName>
             <ProfilePicture></ProfilePicture>
        </div> */}
    </div>
    );
  }
  
  export default Navbar;