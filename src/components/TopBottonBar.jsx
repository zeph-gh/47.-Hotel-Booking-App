import { useContext, useEffect, useState } from "react";
import { Navbar, Nav, Modal, Button, Image } from "react-bootstrap";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { AuthContext } from "./AuthProvider";
import logo from "../assets/logo.png";
import logoSm from "../assets/logo-sm.png";
import AuthPage from "../pages/AuthPage";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProfileImage,
  fetchRooms,
} from "../features/bookings/bookingsSlice";
import Footer from "./Footer";
import defaultProfileImage from "../assets/defaultProfileImage.png";

export default function TopBottonBar({ editMode, setEditMode }) {
  const auth = getAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const { currentUser } = useContext(AuthContext);

  const [showModal, setShowModal] = useState(false);

  const [profileImage, setProfileImage] = useState(defaultProfileImage);

  const [navExpanded, setNavExpanded] = useState(false);

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
    setProfileImage(defaultProfileImage);
    setNavExpanded(false);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  // Add a function to close the modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const dispatch = useDispatch();
  const profileImageFromRedux = useSelector(
    (state) => state.bookings.profileImage
  );

  const toggleEditMode = () => {
    setEditMode(!editMode);
    setNavExpanded(false);
  };

  useEffect(() => {
    if (currentUser) {
      setProfileImage(profileImageFromRedux);
      dispatch(fetchProfileImage(currentUser.uid));
      setNavExpanded(false);
      setShowModal(false);
    }
  }, [dispatch, currentUser, profileImageFromRedux]);

  return (
    <>
      <Navbar
        bg="white"
        expand="none"
        sticky="top"
        expanded={navExpanded}
        onToggle={setNavExpanded}
        className="py-3 pe-4 border-bottom"
      >
        <Navbar.Brand href="/">
          <img src={logo} className="d-none d-sm-block ms-5" height="30px" />

          <img src={logoSm} className="d-block d-sm-none ms-3" height="40px" />
        </Navbar.Brand>

        {currentUser && currentUser.uid === "j2NA6g3BLgZlLt63kubtbEWSM4g2" ? (
          <>
            <span className="fs-5 fw-medium fst-italic text-primary ms-auto me-2 d-md-block d-none">
              Admin Account
            </span>
            <span className="fs-6 fw-medium fst-italic text-primary ms-auto me-2 d-sm-block d-md-none d-none">
              Admin Account
            </span>
            <span className="fs-6 fw-medium fst-italic text-primary ms-auto me-2 d-block d-sm-none">
              A.A
            </span>
          </>
        ) : (
          ""
        )}

        <Navbar.Toggle
          aria-controls="navbar-option"
          className="px-3 py-2 border border-2 rounded-5 d-flex align-items-center"
        >
          <i className="bi bi-list fs-3 text-secondary"></i>

          <Image
            src={profileImage}
            style={{
              width: "38px",
              height: "38px",
              objectFit: "cover",
            }}
            className="ms-1 d-none d-sm-block"
            roundedCircle
          />

          <Image
            src={profileImage}
            style={{
              width: "24px",
              height: "24px",
              objectFit: "cover",
            }}
            className="ms-1 d-block d-sm-none"
            roundedCircle
          />
        </Navbar.Toggle>

        <Navbar.Collapse id="navbar-option">
          <Nav className="text-end border-top mt-3 pt-2">
            <div className="custom-navbar-collapse">
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
                  location.pathname !== "/admin/bookings" ? (
                    <Nav.Link
                      as={Link}
                      to="/admin/bookings"
                      onClick={() => setNavExpanded(false)}
                      className="fw-medium text-primary fst-italic"
                    >
                      Bookings Management
                    </Nav.Link>
                  ) : (
                    ""
                  )}

                  {currentUser &&
                  currentUser.uid === "j2NA6g3BLgZlLt63kubtbEWSM4g2" ? (
                    <Nav.Link
                      className={`fw-medium  fst-italic ${
                        editMode ? "text-danger" : "text-primary"
                      }`}
                      onClick={toggleEditMode}
                    >
                      Rooms Management:{" "}
                      <span>{`${editMode ? "ON" : "OFF"}`}</span>
                    </Nav.Link>
                  ) : (
                    ""
                  )}

                  {location.pathname !== "/trips" ? ( // no my trips button when /trips
                    <Nav.Link
                      as={Link}
                      to="/trips"
                      onClick={() => setNavExpanded(false)}
                    >
                      Trips
                    </Nav.Link>
                  ) : null}

                  {location.pathname !== "/profile" ? ( // no my trips button when /trips
                    <Nav.Link
                      as={Link}
                      to="/profile"
                      onClick={() => setNavExpanded(false)}
                    >
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
            </div>
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

      <Footer
        currentUser={currentUser}
        handleOpenModal={() => handleOpenModal()}
      />
    </>
  );
}
