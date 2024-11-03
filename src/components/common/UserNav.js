import { Container, Nav, Navbar } from "react-bootstrap";
import icon from "../../assets/images/icon.png";

function UserNav() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/"><img src={icon} alt="Sapiens" /></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/create-users">Create User</Nav.Link>
            <Nav.Link href="/view-users">View User</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default UserNav;