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
import KeycloakService from "../../KeycloakService";
import RenderOnRole from "../authentication/RenderOnRole"
import LogoutButton from "./LogoutButton";
import Authenticated from "../authentication/Authenticated"
import { useEffect, useState } from "react";

function MeFitNavbar() {
  const loggedIn = KeycloakService.isAuthenticated()
  const [userRoles, setUserRoles] = useState(["contributor", "admin"])

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
            <LogoutButton></LogoutButton>
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
            <Offcanvas.Title  id="offcanvasNavbarLabel"><h1>MeFit</h1></Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className="bg-dark">
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Link className="nav-link text-white h5" to="/dashboard">
                Dashboard
              </Link>
              <Link className="nav-link text-white h5" to="/goals">Goals</Link>
              <Link className="nav-link text-white h5" to="/programs">Programs</Link>
              <Link className="nav-link text-white h5" to="/workouts">Workouts</Link>
              <Link className="nav-link text-white h5" to="/exercises">Exercises</Link>
              <Link className="nav-link text-white h5" to="/profile">Profile</Link>
              {/* RenderOnRole not working yet :((*/}
              <RenderOnRole roles={"contributor"}>
                <Link className="nav-link text-white h5" to="/contributor">Contributor Tools</Link>
              </RenderOnRole>
              <RenderOnRole roles={"admin"}>
                <Link className="nav-link text-white h5" to="/admin">Admin Tools</Link>
              </RenderOnRole>
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
