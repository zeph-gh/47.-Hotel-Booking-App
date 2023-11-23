import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  Image,
  Row,
  Spinner,
} from "react-bootstrap";
import roomImages from "../components/roomImages";

export default function RoomPage() {
  const { room_id } = useParams(); // get the room id from the URL
  const [room, setRoom] = useState(null);

  const navigate = useNavigate();

  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);

  const [errorMessage, setErrorMessage] = useState("");

  const [guests, setGuests] = useState(1);

  useEffect(() => {
    // Fetch room details from your API
    fetch(
      `https://booking-system-api-zeph-goh.sigma-school-full-stack.repl.co/rooms/${room_id}`
    )
      .then((response) => response.json())
      .then((data) => setRoom(data))
      .catch((error) => console.error("Error:", error));
  }, [room_id]);

  if (!room) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <Spinner animation="border" size="xl" />
      </div>
    );
  }

  const handleCheckInDateChange = (event) => {
    setCheckInDate(new Date(event.target.value));
  };

  const handleCheckOutDateChange = (event) => {
    setCheckOutDate(new Date(event.target.value));
  };

  const handleGuestsChange = (event) => {
    setGuests(event.target.value); // Add this line
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

  const images = roomImages[room.room_id];

  return (
    <div className="py-4 mx-5 px-5">
      <h1 className="my-3">{room.room_name}</h1>
      <Container>
        <Row>
          <Col xxl={6} className="mt-4">
            <Image
              src={images[0]}
              alt={room.room_type}
              height="600px"
              className="rounded-xxl-start rounded-xs-start"
            />
          </Col>

          <Col xxl={6} className="my-4">
            <Row>
              <Col md={6}>
                <Image src={images[1]} alt={room.room_type} height="300px" />
              </Col>

              <Col md={6}>
                <Image
                  src={images[2]}
                  alt={room.room_type}
                  height="300px"
                  className="rounded-xxl-top-right "
                />
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Image
                  src={images[0]}
                  alt={room.room_type}
                  height="300px"
                  className="rounded-xs-bottom-left"
                />
              </Col>

              <Col md={6}>
                <Image
                  src={images[1]}
                  alt={room.room_type}
                  height="300px"
                  className="rounded-xxl-bottom-right rounded-xs-bottom-right"
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>

      <Row>
        <Col md={9}>
          <h1 className="my-5">Room in {room.room_location}</h1>

          <div className="border-top border-bottom py-5">
            <h5>Room in a rental unit</h5>
            <p>Your own room in a home, plus access to shared spaces.</p>

            <h5>Shared common spaces</h5>
            <p>Share parts of the home with the Host and other guests.</p>

            <h5>Free cancellation for 48 hours</h5>
          </div>
        </Col>

        <Col md={3}>
          <div className="p-4 my-5 border rounded-4">
            <Form onSubmit={handleReserve}>
              <h4>${room.price} night</h4>
              <div className="my-5 border border-dark p-3">
                <Form.Group controlId="formCheckIn">
                  <Form.Label>Check-in</Form.Label>
                  <Form.Control
                    type="date"
                    onChange={handleCheckInDateChange}
                  />
                </Form.Group>

                <Form.Group controlId="formCheckOut">
                  <Form.Label>Check-out</Form.Label>
                  <Form.Control
                    type="date"
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
                  </Form.Control>
                </Form.Group>
              </div>

              <p className="border-top my-4 pt-4 fw-bold fs-5">
                Total Price: ${calculateTotalPrice()}
              </p>

              <Button
                variant="light"
                className="border-dark fw-bold w-100"
                type="submit"
              >
                Reserve
              </Button>
              {errorMessage && <p className="text-danger">{errorMessage}</p>}
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
}
