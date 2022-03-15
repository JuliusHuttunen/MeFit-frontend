import NavigationMenu from "./NavigationMenu";
import ProfileName from "./ProfileName";
import ProfilePicture from "./ProfilePicture";
import './navbar.css'
import { useState } from "react";
import LoginForm from "./LoginForm";
import { useSelector } from "react-redux"

function Navbar() {

    const loggedIn = useSelector((state) => state.utility.loggedIn)

    return (
    <div className="navcontainer">
        <NavigationMenu></NavigationMenu>
        <div className="navtitle"><h1>MeFit</h1></div>
        {loggedIn ?  
        <div className="profilewrapper">
            <ProfileName></ProfileName>
            <ProfilePicture></ProfilePicture>
        </div> : 
        <LoginForm />
        }
    </div>
    );
  }
  
  export default Navbar;