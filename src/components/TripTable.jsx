import { Button, Container, Nav, Table } from "react-bootstrap";
import LoadingSpinner from "./LoadingSpinner";
import { useDispatch } from "react-redux";
import { cancelTrip, fetchTrips } from "../features/bookings/bookingsSlice";
import { useState } from "react";
import { toast } from "react-toastify";

export default function TripTable({ filteredTrips, filter, setFilter }) {
  const [isLoadingButton, setIsLoadingButton] = useState(false);

  const dispatch = useDispatch();

  const handleCancel = async (booking_id) => {
    setIsLoadingButton(true);
    const action = await dispatch(cancelTrip(booking_id));

    if (cancelTrip.fulfilled.match(action)) {
      toast.success("Success to cancel trip.");
    } else if (cancelTrip.rejected.match(action)) {
      console.error(action.error);
      toast.error("Failed to cancel trip.");
    }
    setIsLoadingButton(false);
    dispatch(fetchTrips());
  };

  return (
    <>
      <Nav
        variant="tabs"
        defaultActiveKey="cancelled"
        justify
        className="mt-5 fw-bold"
      >
        <Nav.Item>
          <Nav.Link
            eventKey="confirmed"
            className="custom-nav-link"
            onClick={() => setFilter("confirmed")}
          >
            Confirmed
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="cancelled"
            className="custom-nav-link"
            onClick={() => setFilter("cancelled")}
          >
            Cancelled
          </Nav.Link>
        </Nav.Item>
      </Nav>

      <Container className="my-3">
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Trip</th>
              <th>Room Name</th>
              <th>Room Type</th>
              <th>Room Location</th>
              <th>Room Number</th>
              <th>Booking Date</th>
              <th>Check-in Date</th>
              <th>Check-out Date</th>
              <th>Status</th>
              <th>Description</th>
              <th>Phone Number</th>
              {filter !== "cancelled" && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {filteredTrips.map((trip, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{trip.room_name}</td>
                <td>{trip.room_type}</td>
                <td>{trip.room_location}</td>
                <td>{trip.room_id}</td>
                <td>
                  {new Date(trip.booking_date).toLocaleDateString("en-CA")}
                </td>
                <td>
                  {new Date(trip.check_in_date).toLocaleDateString("en-CA")}
                </td>
                <td>
                  {new Date(trip.check_out_date).toLocaleDateString("en-CA")}
                </td>
                <td>{trip.status}</td>
                <td>{trip.description}</td>
                <td>{trip.phone_number}</td>
                {filter !== "cancelled" && (
                  <td>
                    <Button
                      className="btn btn-outline-dark w-100"
                      variant="light"
                      disabled={isLoadingButton}
                      onClick={() => handleCancel(trip.booking_id)}
                    >
                      {isLoadingButton ? <LoadingSpinner /> : "Cancel"}
                    </Button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
}
