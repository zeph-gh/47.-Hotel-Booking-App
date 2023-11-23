import { useContext, useState } from "react";
import { Button, Col, Container, Image, Row, Spinner } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../components/AuthProvider"; // Import your Auth context

export default function BookingPage() {
  const location = useLocation();
  const { room_id, totalPrice, diffDays, checkInDate, checkOutDate, guests } =
    location.state;

  const { currentUser } = useContext(AuthContext); // Get the current user from your Auth context

  const [description, setDescription] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const startDate = new Date(checkInDate);
  const endDate = new Date(checkOutDate);

  // Format dates
  const options = { month: "short", day: "numeric", year: "numeric" };
  const formattedCheckInDate = startDate.toLocaleDateString(undefined, options);
  const formattedCheckOutDate = endDate.toLocaleDateString(undefined, options);

  const handleConfirm = async () => {
    setIsLoading(true);
    const response = await fetch(
      "https://booking-system-api-zeph-goh.sigma-school-full-stack.repl.co/bookings",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          room_id: room_id,
          user_id: currentUser.uid,
          booking_date: new Date().toISOString(),
          check_in_date: checkInDate,
          check_out_date: checkOutDate,
          status: "confirmed",
          description: description,
          phone_number: phoneNumber,
          guests: guests,
          total_price: totalPrice,
          nights: diffDays,
          email: currentUser.email,
        }),
      }
    );

    if (response.ok) {
      alert("Booking confirmed!");
    } else {
      alert("Failed to confirm booking.");
    }
    setIsLoading(false);
  };

  const { room_name, room_type, room_location, room_image } = location.state;

  return (
    <Container className="my-4">
      <h1 className="my-5">Confirm booking</h1>
      <Row>
        <Col md={6}>
          <h3 className="my-3">Your trip</h3>
          <h4>Dates</h4>
          <p>
            {formattedCheckInDate} - {formattedCheckOutDate}
          </p>
          <h4>Guests</h4>
          <p>{guests} guests</p>
          <form>
            <div>
              <label>
                <span>Phone Number:</span>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </label>
            </div>

            <div>
              <label>
                <p>Description:</p>
                <textarea
                  style={{ width: "300px" }}
                  rows="3"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </label>
            </div>

            <Button
              onClick={handleConfirm}
              disabled={isLoading}
              className="mt-3 border-dark"
              variant="light"
            >
              {isLoading ? (
                <div className="d-flex justify-content-center px-3">
                  <Spinner animation="border" size="xl" />
                </div>
              ) : (
                "Confirm"
              )}
            </Button>
          </form>
        </Col>
        <Col md={6} className="border rounded-4 p-4">
          <Row className="border-bottom mb-4">
            <Col xs={5}>
              <Image src={room_image} alt={room_type} fluid />
            </Col>
            <Col xs={7}>
              <h5>{room_name}</h5>
              <p>Type: {room_type}</p>
              <p>Location: {room_location}</p>
            </Col>
          </Row>

          <Row>
            <h4>Price details</h4>
            <p className="border-bottom my-3 pb-3">
              Number of Nights: {diffDays}
            </p>
            <h5>Total Price: ${totalPrice}</h5>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
