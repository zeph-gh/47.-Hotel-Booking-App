import { useRef, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  deleteRoom,
  editRoom,
  fetchRoomImages,
  fetchRooms,
  updateRoomImages,
} from "../features/bookings/bookingsSlice";
import { toast } from "react-toastify";

export default function EditMode({
  room,
  handleOpenModal,
  showModal,
  handleCloseModal,
}) {
  const [showModalEdit, setShowModalEdit] = useState(false);

  const dispatch = useDispatch();

  const fileInput = useRef();

  const handleShowFile = () => {
    fileInput.current.click();
  };

  const handleUploadFile = (event) => {
    const files = Array.from(event.target.files);
    if (files.length !== 5) {
      toast.error("You can only upload 5 images.");
      return;
    }
    handleCloseModal();
    dispatch(updateRoomImages({ room_id: room.room_id, files })).then(() =>
      dispatch(fetchRoomImages(room.room_id))
    );

    toast.success("Success to upload room images");
  };

  const handleOpenModalEdit = () => {
    setShowModalEdit(true);
  };

  const handleCloseModalEdit = () => {
    setShowModalEdit(false);
  };

  const [roomDetails, setRoomDetails] = useState({
    room_name: room.room_name,
    room_type: room.room_type,
    price: room.price,
    availability: room.availability,
    room_location: room.room_location,
    latitude: room.latitude,
    longitude: room.longitude,
  });

  const handleInputChange = (event) => {
    let { name, value } = event.target;

    // for generate a real boolean not string true false
    if (name === "availability") {
      value = value === "true" ? true : false;
    }

    setRoomDetails({
      ...roomDetails,
      [name]: value,
    });
  };

  const handleEditRoom = (event) => {
    event.preventDefault();
    handleCloseModalEdit();
    handleCloseModal();
    dispatch(editRoom({ room_id: room.room_id, roomDetails: roomDetails }))
      .then(toast.success("Success to edit room's details by admin."))
      .catch((error) => {
        toast.error("Failed to edit room's details. Please try again.");
        console.error(error);
      });
  };

  const handleDeleteRoom = (event) => {
    event.preventDefault();
    handleCloseModal();
    dispatch(deleteRoom(room.room_id))
      .then(() => {
        toast.success("Success to delete room by admin.");
        dispatch(fetchRooms());
      })
      .catch((error) => {
        toast.error("Failed to delete room. Please try again.");
        console.error(error);
      });
  };

  return (
    <>
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

      <Modal show={showModal} onHide={handleCloseModal} centered size="sm">
        <Modal.Header closeButton>
          <Modal.Title>Edit Room</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center border border-secondary border-2 p-2">
            <p>
              <strong>
                {room.room_id}. {room.room_name}
              </strong>
            </p>

            <div className="mb-2">
              <Button variant="light" className="px-3" onClick={handleShowFile}>
                <i className="bi bi-upload me-2"></i>
                Upload Images
              </Button>
            </div>

            <div className="mb-2">
              <Button
                variant="light"
                className="px-3"
                onClick={handleOpenModalEdit}
              >
                <i className="bi bi-pencil me-2"></i>
                Update Details
              </Button>
            </div>

            <div className="mb-2">
              <Button
                variant="danger"
                className="px-3"
                onClick={handleDeleteRoom}
              >
                <i className="bi bi-trash me-2 text-light"></i>
                Delete Room
              </Button>
            </div>
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

      {/* -----------edit room details------------- */}
      <Modal
        show={showModalEdit}
        onHide={handleCloseModalEdit}
        centered
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center border border-secondary border-2 p-2">
            <p>
              <strong>
                {room.room_id}. {room.room_name}
              </strong>
            </p>
            <div className="text-start w-100">
              <Form onSubmit={handleEditRoom}>
                <Form.Group controlId="room_name">
                  <Form.Label>Name:</Form.Label>
                  <Form.Control
                    type="text"
                    name="room_name"
                    value={roomDetails.room_name}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group controlId="room_type">
                  <Form.Label>Type:</Form.Label>
                  <Form.Control
                    type="text"
                    name="room_type"
                    value={roomDetails.room_type}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group controlId="price">
                  <Form.Label>Price:</Form.Label>
                  <Form.Control
                    type="number"
                    name="price"
                    value={roomDetails.price}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group controlId="availability">
                  <Form.Label>Availability:</Form.Label>
                  <Form.Select
                    name="availability"
                    value={roomDetails.availability}
                    onChange={handleInputChange}
                  >
                    <option value={true}>True</option>
                    <option value={false}>False</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group controlId="room_location">
                  <Form.Label>Location:</Form.Label>
                  <Form.Control
                    type="text"
                    name="room_location"
                    value={roomDetails.room_location}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group controlId="latitude">
                  <Form.Label>Latitude:</Form.Label>
                  <Form.Control
                    type="number"
                    name="latitude"
                    value={roomDetails.latitude}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group controlId="longitude">
                  <Form.Label>Longitude:</Form.Label>
                  <Form.Control
                    type="number"
                    name="longitude"
                    value={roomDetails.longitude}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
