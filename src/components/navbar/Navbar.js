import NavigationMenu from "./NavigationMenu";
import ProfileName from "./ProfileName";
import ProfilePicture from "./ProfilePicture";
import './navbar.css'
import LoginForm from "./LoginForm";
import { useSelector } from "react-redux"

function Navbar() {

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