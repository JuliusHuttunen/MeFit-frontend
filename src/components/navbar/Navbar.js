import NavigationMenu from "./NavigationMenu";
import ProfileName from "./ProfileName";
import ProfilePicture from "./ProfilePicture";
import './navbar.css'

function Navbar() {
    return (
    <div className="navcontainer">
        <p>MeFit</p>
        <NavigationMenu></NavigationMenu>
        <ProfileName></ProfileName>
        <ProfilePicture></ProfilePicture>
    </div>
    );
  }
  
  export default Navbar;