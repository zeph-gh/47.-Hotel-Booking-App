import { Button, Carousel, Col, Image, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

import {
  fetchRoomImages,
  updateRoomImages,
} from "../features/bookings/bookingsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import roomImages from "./roomImages";

export default function HomePostCard({ room, editMode }) {
  const [showModal, setShowModal] = useState(false);

  const images = useSelector((state) => state.bookings.roomImages);
  const displayImages = images.length > 0 ? images : roomImages[room.room_id];

  console.log(images);

  const dispatch = useDispatch();

  const fileInput = useRef();

  const handleOpenModal = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShowFile = () => {
    fileInput.current.click();
  };

  const handleUploadFile = (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 5) {
      alert("You can only upload a maximum of 5 images.");
      return;
    }
    console.log(files);

    dispatch(updateRoomImages({ room_id: room.room_id, files }));
  };

  useEffect(() => {
    dispatch(fetchRoomImages(room.room_id));
  }, [dispatch, room.room_id]);

  return (
    <>
      <Col md={6} xl={4} xxl={3} key={room.room_id} className="mb-5">
        {room.availability ? (
          <>
            <div style={{ position: "relative" }}>
              <Link
                to={`/room/${room.room_id}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                <Carousel interval={null} style={{ width: "100%" }}>
                  {displayImages.map((image, index) => (
                    <Carousel.Item key={index}>
                      <Image
                        src={image}
                        alt={room.room_name}
                        className="rounded-4"
                        height="100%"
                        width="100%"
                      />
                    </Carousel.Item>
                  ))}
                </Carousel>
              </Link>

              {editMode && (
                <div
                  className="shake"
                  style={{ position: "absolute", top: 10, right: 110 }}
                >
                  <Button
                    variant="warning"
                    className="rounded-4 px-3"
                    onClick={handleOpenModal}
                  >
                    <i className="bi bi-gear-fill"></i>
                    <span className="ms-2 fw-medium">Edit</span>
                  </Button>
                </div>
              )}
            </div>

            <p className="mt-2 mb-0 fw-bold fs-6">{room.room_name}</p>
            <p className="m-0 fw-light">{room.room_type}</p>
            <p className="m-0 fw-light">
              <strong>${room.price}</strong> night
            </p>
          </>
        ) : (
          <div>
            <div style={{ position: "relative" }}>
              <Image
                src={images[0] || roomImages[room.room_id][0]}
                alt={room.room_name}
                className="rounded-4"
                style={{
                  filter: "grayscale(100%)",
                  objectFit: "cover",
                  height: "100%",
                  width: "100%",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  height: "100%",
                  width: "100%",
                  background:
                    "linear-gradient(to bottom left, #ff385c 30%, transparent 47%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderTopRightRadius: "15px",
                }}
              >
                <div
                  style={{
                    color: "#ff385c",
                    fontSize: "3em",
                    fontWeight: "bold",
                    transform: "rotate(46deg)",
                  }}
                >
                  Booked
                </div>
              </div>

              {editMode && (
                <div
                  className="shake"
                  style={{ position: "absolute", top: 10, right: 110 }}
                >
                  <Button
                    variant="warning"
                    className="rounded-4 px-3"
                    onClick={handleOpenModal}
                  >
                    <i className="bi bi-gear-fill"></i>
                    <span className="ms-2 fw-medium">Edit</span>
                  </Button>
                </div>
              )}
            </div>
            <p className="mt-2 mb-0 fw-bold fs-6">{room.room_name}</p>
            <p className="m-0 fw-light">{room.room_type}</p>
            <p className="m-0 fw-light">
              <strong>${room.price}</strong> night
            </p>
          </div>
        )}
      </Col>

      <Modal
        show={showModal}
        onHide={handleCloseModal}
        animation={false}
        centered
      >
        <Modal.Body>
          <div>
            image
            <Button variant="light" className="px-3" onClick={handleShowFile}>
              <i className="bi bi-upload"></i>
            </Button>
          </div>
          <input
            type="file"
            ref={fileInput}
            onChange={handleUploadFile}
            multiple
            style={{ display: "none" }}
          />
        </Modal.Body>
      </Modal>
    </>
  );
}
