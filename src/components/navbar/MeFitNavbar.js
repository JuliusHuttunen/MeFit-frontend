import ProfileName from "./ProfileName";
import ProfilePicture from "./ProfilePicture";
import LoginForm from "./LoginForm";
import { useSelector } from "react-redux";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import "./navbar.css";

function MeFitNavbar() {
  const loggedIn = useSelector((state) => state.utility.loggedIn);
  const userRoles = useSelector((state) => state.utility.user.roles);

  return (
    <Navbar bg="dark" variant="dark" expand={false}>
      <Container fluid>
        {loggedIn ? (
          <Navbar.Toggle aria-controls="offcanvasNavbar" />
        ) : (
          <div></div>
        )}
        <Navbar.Brand href="#">
          <h1>MeFit</h1>
        </Navbar.Brand>
        {loggedIn ? (
          <div className="profilewrapper">
            <ProfileName></ProfileName>
            <ProfilePicture></ProfilePicture>
          </div>
        ) : (
          <LoginForm />
        )}

        <Navbar.Offcanvas
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="start"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel">MeFit</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Link to="/dashboard" className="navbar-item">
                Dashboard
              </Link>
              <Link to="/goals">Goals</Link>
              <Link to="/programs">Programs</Link>
              <Link to="/workouts">Workouts</Link>
              <Link to="/exercises">Exercises</Link>
              <Link to="/profile">Profile</Link>

              {/* {userRoles.includes("contributor") ||
              userRoles.includes("admin") ?  */}
                <Link to="/contributor">Contributor Tools</Link>
               {/* : 
                <li></li>
              } */}
              {/* {userRoles.includes("admin") ?  */}
                <Link to="/admin">Admin Tools</Link>
               {/* : 
                <li></li>
              } */}
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>

    // <div className="navcontainer">
    //     {loggedIn ? <NavigationMenu></NavigationMenu> : <div></div>}
    //     <div className="navtitle"><h1>MeFit</h1></div>
    //     {loggedIn ?
    //     <div className="profilewrapper">
    //         <ProfileName></ProfileName>
    //         <ProfilePicture></ProfilePicture>
    //     </div> :
    //     <LoginForm />
    //     }
    // </div>
  );
}

export default MeFitNavbar;
