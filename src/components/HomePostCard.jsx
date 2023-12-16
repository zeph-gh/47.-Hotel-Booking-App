import { Button, Carousel, Col, Image, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

import {
  fetchRoomImages,
  updateRoomImages,
} from "../features/bookings/bookingsSlice";
import { useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import roomDefaultImages from "./roomDefaultImages";

export default function HomePostCard({ room, roomImages, editMode }) {
  const [showModal, setShowModal] = useState(false);

  const displayImages = roomImages[room.room_id]
    ? roomImages[room.room_id]
    : roomDefaultImages;

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
    if (files.length !== 5) {
      alert("You can only upload 5 images.");
      return;
    }

    dispatch(updateRoomImages({ room_id: room.room_id, files })).then(() =>
      dispatch(fetchRoomImages(room.room_id))
    );
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
              <Carousel interval={3000} style={{ width: "100%" }}>
                {displayImages.map((image, index) => (
                  <Carousel.Item key={index}>
                    <Link
                      to={`/room/${room.room_id}`}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <Image
                        src={image}
                        alt={room.room_name}
                        className="rounded-4"
                        height="100%"
                        width="100%"
                      />
                    </Link>
                  </Carousel.Item>
                ))}
              </Carousel>

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

            <p className="mt-2 mb-0 fw-bold fs-6">
              {room.room_id}. {room.room_name}
            </p>
            <p className="m-0 fw-light">{room.room_type}</p>
            <p className="m-0 fw-light">
              <strong>${room.price}</strong> night
            </p>
          </>
        ) : (
          <div>
            <div style={{ position: "relative" }}>
              <Carousel interval={3000} style={{ width: "100%" }}>
                {displayImages.map((image, index) => (
                  <Carousel.Item key={index}>
                    <Image
                      src={image}
                      alt={room.room_name}
                      className="rounded-4"
                      style={{
                        filter: "grayscale(100%)",
                        objectFit: "cover",
                        height: "100%",
                        width: "100%",
                      }}
                    />
                  </Carousel.Item>
                ))}
              </Carousel>

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
                  className="d-none d-sm-block fs-1"
                  style={{
                    color: "#ff385c",

                    fontWeight: "bold",
                    transform: "rotate(46deg)",
                  }}
                >
                  Booked
                </div>
                <div
                  className="d-block d-sm-none fs-6"
                  style={{
                    color: "#ff385c",

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
            <p className="mt-2 mb-0 fw-bold fs-6">
              {room.room_id}. {room.room_name}
            </p>
            <p className="m-0 fw-light">{room.room_type}</p>
            <p className="m-0 fw-light">
              <strong>${room.price}</strong> night
            </p>
          </div>
        )}
      </Col>

      <Modal show={showModal} onHide={handleCloseModal} centered size="sm">
        <Modal.Body>
          <div className="text-center">
            <p>Only upload 5 images.</p>
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
