import { useContext, useEffect, useState } from "react";
import { Navbar, Nav, Modal, Button } from "react-bootstrap";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { AuthContext } from "./AuthProvider";
import logo from "../assets/logo.png";
import AuthPage from "../pages/AuthPage";

export default function TopBottonBar() {
  const auth = getAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [auth]);

  const handleLogout = () => {
    auth.signOut();
    setIsLoggedIn(false);
    navigate("/");
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  // Add a function to close the modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Navbar bg="white" expand="lg" className="py-4 px-5 border-bottom">
        <Navbar.Brand href="/">
          <img src={logo} height="30px" />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {currentUser ? (
              <p className="mt-2 me-5 fw-bold">
                Welcome, {currentUser.email} {currentUser.phoneNumber}!
              </p>
            ) : (
              ""
            )}
            {isLoggedIn ? (
              <>
                {currentUser.uid === "j2NA6g3BLgZlLt63kubtbEWSM4g2" &&
                location.pathname !== "/admin" ? (
                  <Nav.Link as={Link} to="/admin">
                    Admin Page
                  </Nav.Link>
                ) : null}
                {location.pathname !== "/trips" ? (
                  <Nav.Link as={Link} to="/trips">
                    My Trips
                  </Nav.Link>
                ) : null}
                <Nav.Link onClick={handleLogout}>Sign Out</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link onClick={handleOpenModal}>Sign In / Sign Up</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Sign In / Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AuthPage />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* --------outlet------------ */}
      <Outlet />
    </>
  );
}
