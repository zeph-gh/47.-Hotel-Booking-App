import { useContext, useEffect, useRef } from "react";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { AuthContext } from "../components/AuthProvider";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProfileImage,
  updateProfileImage,
} from "../features/bookings/bookingsSlice";

export default function ProfilePage() {
  const { currentUser } = useContext(AuthContext);

  const dispatch = useDispatch();
  const profileImage = useSelector((state) => state.bookings.profileImage);

  const fileInput = useRef();

  const handleShowFile = () => {
    fileInput.current.click();
  };

  const handleUploadFile = (event) => {
    // file object for uploading
    const file = event.target.files[0];

    dispatch(updateProfileImage({ user_id: currentUser.uid, file }));
  };

  useEffect(() => {
    dispatch(fetchProfileImage(currentUser.uid));
  }, [dispatch, currentUser.uid]);

  return (
    <>
      <Container className="my-4">
        <Row>
          <Col lg={3} className="text-center mb-3">
            <Image
              src={profileImage || "src/assets/profileImage.png"}
              style={{
                width: "200px",
                height: "200px",
                objectFit: "cover",
              }}
              roundedCircle
            />

            <div>
              <Button
                variant="light"
                className="rounded-4 px-3 shadow-lg"
                style={{ marginTop: "-20px" }}
                onClick={handleShowFile}
              >
                <i className="bi bi-camera-fill"></i>
                <span className="ms-2 fw-medium">Edit</span>
              </Button>
              <input
                type="file"
                ref={fileInput}
                onChange={handleUploadFile}
                style={{ display: "none" }}
              />
            </div>
          </Col>

          <Col lg={9}>
            <h2 className="fw-bold mt-3">Your profile</h2>
            <div className="mt-5 border-top border-bottom py-4 ps-4">
              <label>
                <p className="mt-0 mb-1">Email Address </p>
                <input type="email" value={currentUser.email} disabled />
              </label>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
