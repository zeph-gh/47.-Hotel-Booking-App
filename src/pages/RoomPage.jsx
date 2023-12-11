import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Button,
  Carousel,
  Col,
  Form,
  Image,
  Modal,
  Row,
} from "react-bootstrap";
import roomImages from "../components/roomImages";
import { useDispatch, useSelector } from "react-redux";
import { fetchRoomByRoomId } from "../features/bookings/bookingsSlice";
import RoomMap from "../components/RoomMap";
import LoadingSpinner from "../components/LoadingSpinner";

export default function RoomPage() {
  const { room_id } = useParams(); // get the room id from the URL

  const navigate = useNavigate();

  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);

  const [minCheckoutDate, setMinCheckoutDate] = useState(null);

  const [errorMessage, setErrorMessage] = useState("");

  const [guests, setGuests] = useState(1);

  const dispatch = useDispatch();
  const room = useSelector((state) => state.bookings.room);
  const loading = useSelector((state) => state.bookings.loading);

  const center = {
    lat: room.latitude,
    lng: room.longitude,
  };

  const [modalShow, setModalShow] = useState(false);
  const [modalImage, setModalImage] = useState("");

  useEffect(() => {
    dispatch(fetchRoomByRoomId(room_id));
  }, [room_id, dispatch]);

  const handleCheckInDateChange = (event) => {
    const selectedDate = new Date(event.target.value);
    setCheckInDate(selectedDate);

    const nextDay = new Date(selectedDate);
    nextDay.setDate(selectedDate.getDate() + 1);
    setMinCheckoutDate(nextDay.toISOString().split("T")[0]); // let users pick checkout > checkin only
  };

  const handleCheckOutDateChange = (event) => {
    setCheckOutDate(new Date(event.target.value));
  };

  const handleGuestsChange = (event) => {
    setGuests(event.target.value);
  };

  const calculateTotalPrice = () => {
    if (checkInDate && checkOutDate) {
      const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
      const diffDays = Math.round(
        Math.abs((checkInDate - checkOutDate) / oneDay)
      );
      const totalPrice = diffDays * room.price;
      return Number(totalPrice.toFixed(2));
    }
    return 0;
  };

  const handleReserve = (e) => {
    e.preventDefault();
    // Check if check-in date and check-out date are the same
    if (checkInDate.getTime() === checkOutDate.getTime()) {
      setErrorMessage("Check-in date and check-out date cannot be the same.");
      return;
    }

    // Check if check-out date is before check-in date
    if (checkOutDate < checkInDate) {
      setErrorMessage("Check-out date must be after check-in date.");
      return;
    }

    const totalPrice = calculateTotalPrice();
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const diffDays = Math.round(
      Math.abs((checkInDate - checkOutDate) / oneDay)
    );
    navigate(`/booking/${room_id}`, {
      state: {
        room_id,
        room_name: room.room_name,
        room_type: room.room_type,
        room_location: room.room_location,
        room_image: roomImages[room.room_id][0],
        totalPrice,
        diffDays,
        checkInDate: checkInDate.toISOString(),
        checkOutDate: checkOutDate.toISOString(),
        guests,
      },
    });
    setErrorMessage("");
  };

  const images = roomImages[room_id];

  const handleImageClick = (image) => {
    setModalImage(image);
    setModalShow(true);
  };

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="py-4 mx-md-4 px-md-5 mx-1 px-1">
          <h1 className="my-3 ms-3">{room.room_name}</h1>

          <div className="d-none d-lg-block">
            <Row>
              <Col xs={6} className="mt-4">
                <Image
                  src={images[0]}
                  alt={room.room_type}
                  height="560px"
                  width="100%"
                  className="rounded-xs-bottom-left rounded-xs-top-left"
                  fluid
                  onClick={() => handleImageClick(images[0])}
                />
              </Col>

              <Col xs={6} className="my-4">
                <Row>
                  <Col xs={6}>
                    <Image
                      src={images[1]}
                      alt={room.room_type}
                      height="280px"
                      width="100%"
                      fluid
                      onClick={() => handleImageClick(images[1])}
                    />
                  </Col>

                  <Col xs={6}>
                    <Image
                      src={images[2]}
                      alt={room.room_type}
                      height="280px"
                      width="100%"
                      className="rounded-xs-top-right"
                      fluid
                      onClick={() => handleImageClick(images[2])}
                    />
                  </Col>
                </Row>

                <Row>
                  <Col xs={6}>
                    <Image
                      src={images[0]}
                      alt={room.room_type}
                      height="280px"
                      width="100%"
                      className="mt-4 "
                      fluid
                      onClick={() => handleImageClick(images[0])}
                    />
                  </Col>

                  <Col xs={6}>
                    <Image
                      src={images[1]}
                      alt={room.room_type}
                      height="280px"
                      width="100%"
                      className="mt-4 rounded-xs-bottom-right"
                      fluid
                      onClick={() => handleImageClick(images[1])}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>

          <Modal show={modalShow} size="md" onHide={() => setModalShow(false)}>
            <Modal.Body>
              <Image src={modalImage} className="w-100" />
            </Modal.Body>
          </Modal>

          <div className="d-block d-lg-none mt-5 ">
            <Carousel interval={null} className="h-100 w-100">
              {images.map((image, index) => (
                <Carousel.Item key={index}>
                  <Image
                    src={image}
                    alt={room.room_name}
                    className="rounded-4 h-100 w-100"
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          </div>

          <Row>
            <Col xl={8}>
              <h1 className="my-5 pt-5">Room in {room.room_location}</h1>

              <div className="border-top border-bottom py-5">
                <h5>Room in a rental unit</h5>
                <p>Your own room in a home, plus access to shared spaces.</p>

                <h5 className="pt-3">Shared common spaces</h5>
                <p>Share parts of the home with the Host and other guests.</p>

                <h5 className="pt-3">Free cancellation for 48 hours</h5>
              </div>
            </Col>

            <Col md={12} xl={4}>
              <div className="py-4 px-5 my-5 border rounded-4 shadow-lg">
                <Form onSubmit={handleReserve}>
                  <h3>
                    ${room.price} <span className="fw-light fs-5">night</span>
                  </h3>
                  <div className="my-4 border border-dark rounded-4 p-3">
                    <Form.Group controlId="formCheckIn">
                      <Form.Label>Check-in</Form.Label>
                      <Form.Control
                        type="date"
                        min={new Date().toISOString().split("T")[0]} // let users pick from today to future only
                        onChange={handleCheckInDateChange}
                      />
                    </Form.Group>

                    <Form.Group controlId="formCheckOut">
                      <Form.Label>Check-out</Form.Label>
                      <Form.Control
                        type="date"
                        min={minCheckoutDate}
                        onChange={handleCheckOutDateChange}
                      />
                    </Form.Group>

                    <Form.Group controlId="formGuests">
                      <Form.Label>Guests</Form.Label>
                      <Form.Control as="select" onChange={handleGuestsChange}>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        <option>6</option>
                        <option>7</option>
                        <option>8</option>
                        <option>9</option>
                        <option>10</option>
                      </Form.Control>
                    </Form.Group>
                  </div>

                  <p className="border-top my-4 pt-4 fw-bold fs-5">
                    Total Price: ${calculateTotalPrice()}
                  </p>

                  <Button
                    variant="danger"
                    className="fw-bold py-2 w-100"
                    type="submit"
                  >
                    <span className="fw-medium">Reserve</span>
                  </Button>

                  {errorMessage && (
                    <p className="text-danger">{errorMessage}</p>
                  )}
                </Form>
              </div>
            </Col>
          </Row>

          {room.latitude && room.longitude ? (
            <RoomMap
              center={center}
              room_name={room.room_name}
              location={room.room_location}
              price={room.price}
            />
          ) : null}
        </div>
      )}
    </>
  );
}
