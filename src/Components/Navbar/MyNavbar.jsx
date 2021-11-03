import React from "react";

import { Container, Navbar, Nav, NavDropdown,  } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const MyNavbar = () => {
    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="success" variant="dark" fixed="top" >
                <Container>
                    <Navbar.Brand as={NavLink} exact to="/"><b>Undergraduate Admission</b></Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={NavLink} exact to={"/"}>Home</Nav.Link>
                            <Nav.Link as={NavLink} exact to="/apply">Apply</Nav.Link>
                           </Nav>
                        <Nav>
                            <Nav.Link as={NavLink} exact to={"/login"}>Login</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default MyNavbar;
