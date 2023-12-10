import { useContext, useEffect, useState } from "react";
import { Navbar, Nav, Modal, Button, Image } from "react-bootstrap";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { AuthContext } from "./AuthProvider";
import logo from "../assets/logo.png";
import AuthPage from "../pages/AuthPage";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProfileImage,
  fetchRooms,
} from "../features/bookings/bookingsSlice";
import Footer from "./Footer";
import defaultProfileImage from "../assets/defaultProfileImage.png";

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
    dispatch(fetchRooms());
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  // Add a function to close the modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const dispatch = useDispatch();
  const profileImage = useSelector((state) => state.bookings.profileImage);

  useEffect(() => {
    if (currentUser) {
      dispatch(fetchProfileImage(currentUser.uid));
    }
  }, [dispatch, currentUser]);

  return (
    <>
      <Navbar
        bg="white"
        expand="none"
        sticky="top"
        className="py-3 px-5 border-bottom"
      >
        <Navbar.Brand href="/">
          <img src={logo} height="30px" />
        </Navbar.Brand>

        {currentUser && currentUser.uid === "j2NA6g3BLgZlLt63kubtbEWSM4g2" ? (
          <span className="fs-5 fw-medium fst-italic text-primary ms-auto me-2">
            Admin Account
          </span>
        ) : (
          ""
        )}

        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          className="px-3 pt-2 pb-0 border border-2 rounded-5"
        >
          <i className="bi bi-list fs-3 text-secondary"></i>

          <Image
            src={profileImage || defaultProfileImage}
            style={{
              width: "38px",
              height: "38px",
              objectFit: "cover",
            }}
            className="ms-1 mb-2"
            roundedCircle
          />
        </Navbar.Toggle>

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="text-end border-top mt-3 pt-2">
            {currentUser ? (
              <p className="mt-3 me-2 fw-bold">
                Welcome, {currentUser.email} {currentUser.phoneNumber}!
              </p>
            ) : (
              ""
            )}

            {isLoggedIn ? (
              <>
                {currentUser &&
                currentUser.uid === "j2NA6g3BLgZlLt63kubtbEWSM4g2" &&
                location.pathname !== "/admin" ? ( // no admin page button when /admin
                  <Nav.Link
                    as={Link}
                    to="/admin"
                    className="fw-medium text-primary fst-italic"
                  >
                    Admin Management
                  </Nav.Link>
                ) : (
                  ""
                )}

                {location.pathname !== "/trips" ? ( // no my trips button when /trips
                  <Nav.Link as={Link} to="/trips">
                    Trips
                  </Nav.Link>
                ) : null}

                {location.pathname !== "/profile" ? ( // no my trips button when /trips
                  <Nav.Link as={Link} to="/profile">
                    Profile
                  </Nav.Link>
                ) : null}

                <Nav.Link className="mt-2" onClick={handleLogout}>
                  <i className="bi bi-box-arrow-right me-2"></i>
                  Sign Out
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link className="mt-2" onClick={handleOpenModal}>
                  Sign In / Sign Up
                </Nav.Link>
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

      <Footer handleOpenModal={() => handleOpenModal()} />
    </>
  );
}
