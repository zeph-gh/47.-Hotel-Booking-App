import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addRoom, fetchRooms } from "../features/bookings/bookingsSlice";
import { toast } from "react-toastify";

export default function AddRoom() {
  const [roomDetails, setRoomDetails] = useState({
    room_id: "",
    room_name: "",
    room_type: "",
    price: "",
    availability: true,
    room_location: "",
    latitude: "",
    longitude: "",
  });

  const [showModalAddRoom, setShowModalAddRoom] = useState(false);
  const handleOpenModalAddRoom = () => {
    setShowModalAddRoom(true);
  };
  const handleCloseModalAddRoom = () => {
    setShowModalAddRoom(false);
    setRoomDetails("");
  };

  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    let { name, value } = event.target;

    // Convert availability to boolean
    if (name === "availability") {
      value = value === "true" ? true : false;
    }

    setRoomDetails((prevRoomDetails) => ({
      ...prevRoomDetails,
      [name]: value,
    }));
  };

  const rooms = useSelector((state) => state.bookings.rooms);

  const handleAddRoom = (event) => {
    event.preventDefault();

    if (rooms.some((room) => room.room_id === Number(roomDetails.room_id))) {
      toast.error(
        "Room NUMBER exists. Please try again with another room NUMBER."
      );
    } else {
      handleCloseModalAddRoom();

      dispatch(addRoom(roomDetails))
        .then(toast.success("Success to add new room by admin."))
        .catch((error) => {
          toast.error("Failed to add new room by admin. Please try again.");
          console.error(error);
        });
    }

    setRoomDetails("");
    dispatch(fetchRooms());
  };

  return (
    <>
      <div
        className="d-flex mt-1"
        style={{
          zIndex: "999",
          position: "fixed",
          width: "100%",
        }}
      >
        <div className="shake mx-auto">
          <Button
            variant="success"
            className="rounded-4 px-3 py-2"
            onClick={handleOpenModalAddRoom}
          >
            <i className="bi bi-plus-circle text-light"></i>
            <span className="ms-2 fw-medium">Add Room</span>
          </Button>
        </div>
      </div>

      <Modal show={showModalAddRoom} onHide={handleCloseModalAddRoom} centered>
        <Modal.Header closeButton>
          <Modal.Title>New Room Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center border border-secondary border-2 p-2">
            <div className="text-start w-100">
              <Form onSubmit={handleAddRoom}>
                <Form.Group controlId="room_id">
                  <Form.Label>Number:</Form.Label>
                  <Form.Control
                    type="number"
                    name="room_id"
                    value={roomDetails.room_id}
                    onChange={handleInputChange}
                    placeholder="00"
                    min="1"
                    max="100000"
                    required
                  />
                </Form.Group>

                <Form.Group controlId="room_name">
                  <Form.Label>Name:</Form.Label>
                  <Form.Control
                    type="text"
                    name="room_name"
                    value={roomDetails.room_name}
                    onChange={handleInputChange}
                    placeholder="The Skytop"
                    minLength="1"
                    maxLength="20"
                    required
                  />
                </Form.Group>

                <Form.Group controlId="room_type">
                  <Form.Label>Type:</Form.Label>
                  <Form.Control
                    type="text"
                    name="room_type"
                    value={roomDetails.room_type}
                    onChange={handleInputChange}
                    placeholder="Heaven view"
                    minLength="1"
                    maxLength="20"
                    required
                  />
                </Form.Group>

                <Form.Group controlId="price">
                  <Form.Label>Price:</Form.Label>
                  <Form.Control
                    type="number"
                    name="price"
                    value={roomDetails.price}
                    onChange={handleInputChange}
                    placeholder="99.99"
                    required
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
                    placeholder="Heaven"
                    minLength="1"
                    maxLength="20"
                    required
                  />
                </Form.Group>

                <Form.Group controlId="latitude">
                  <Form.Label>Latitude:</Form.Label>
                  <Form.Control
                    type="number"
                    name="latitude"
                    value={roomDetails.latitude}
                    onChange={handleInputChange}
                    placeholder="-90 to 90"
                    min="-90"
                    max="90"
                    required
                  />
                </Form.Group>

                <Form.Group controlId="longitude">
                  <Form.Label>Longitude:</Form.Label>
                  <Form.Control
                    type="number"
                    name="longitude"
                    value={roomDetails.longitude}
                    onChange={handleInputChange}
                    placeholder="-180 to 180"
                    min="-180"
                    max="180"
                    required
                  />
                </Form.Group>

                <Button
                  variant="warning"
                  type="submit"
                  className="px-3 mt-3 w-100"
                >
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
