import NavigationMenu from "./NavigationMenu";
import ProfileName from "./ProfileName";
import ProfilePicture from "./ProfilePicture";
import './navbar.css'
import { useState, useEffect } from "react";
import LoginForm from "./LoginForm";
import { useDispatch, useSelector } from "react-redux"
import { createTestProfile } from '../../redux/utilitySlice'

function Navbar() {

    useEffect(() => {
        createProfile()
    }, []);

    const dispatch = useDispatch()

    const createProfile = () => {
        console.log("Profile created")
        dispatch(createTestProfile())
    }


    const loggedIn = useSelector((state) => state.utility.loggedIn)

    return (
    <div className="navcontainer">
        {loggedIn ? <NavigationMenu></NavigationMenu> : <div></div>}
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