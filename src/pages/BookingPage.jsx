import { useContext, useState } from "react";
import { Button, Col, Container, Image, Row, Spinner } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../components/AuthProvider";
import { useDispatch } from "react-redux";
import {
  confirmBooking,
  sendConfirmationEmail,
} from "../features/bookings/bookingsSlice";

export default function BookingPage() {
  const location = useLocation();
  const { room_id, totalPrice, diffDays, checkInDate, checkOutDate, guests } =
    location.state;

  const navigate = useNavigate();

  const { currentUser } = useContext(AuthContext);

  const [description, setDescription] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const startDate = new Date(checkInDate);
  const endDate = new Date(checkOutDate);

  // Format dates
  const options = { month: "short", day: "numeric", year: "numeric" };
  const formattedCheckInDate = startDate.toLocaleDateString(undefined, options);
  const formattedCheckOutDate = endDate.toLocaleDateString(undefined, options);

  const dispatch = useDispatch();

  const handleConfirm = async () => {
    setIsLoading(true);

    const bookingData = {
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
    };

    try {
      dispatch(confirmBooking(bookingData));
      alert("Booking confirmed!");

      const emailData = {
        to: currentUser.email,
        subject: "Booking Confirmation",
        text: "Thank you for your booking! We will remind you 1 day before your trip.",
      };

      dispatch(sendConfirmationEmail(emailData));
      console.log("Email sent successfully");
    } catch (error) {
      alert(error.message);
    }

    setIsLoading(false);

    navigate("/");
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
