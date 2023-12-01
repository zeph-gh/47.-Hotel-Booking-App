import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../components/AuthProvider";
import { Button, Modal } from "react-bootstrap";
import AuthPage from "../pages/AuthPage";
import { useNavigate } from "react-router-dom";

export default function RequireAdminAuth({ children }) {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => {
    setShowModal(false);
    navigate("/");
  };

  useEffect(() => {
    if (!currentUser || currentUser.uid !== "j2NA6g3BLgZlLt63kubtbEWSM4g2") {
      setShowModal(true);
    }
  }, [currentUser]);

  if (!currentUser || currentUser.uid !== "j2NA6g3BLgZlLt63kubtbEWSM4g2") {
    return (
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
    );
  }

  return children;
}
