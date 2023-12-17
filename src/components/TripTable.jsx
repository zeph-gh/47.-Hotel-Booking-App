import { Button, Container, Nav } from "react-bootstrap";
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
      <h1 className="my-4 ms-5">Your Trips</h1>
      <Nav
        variant="tabs"
        defaultActiveKey="cancelled"
        justify
        className="mt-5 fw-bold"
      >
        <Nav.Item>
          <Nav.Link eventKey="confirmed" onClick={() => setFilter("confirmed")}>
            Confirmed
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="cancelled" onClick={() => setFilter("cancelled")}>
            Cancelled
          </Nav.Link>
        </Nav.Item>
      </Nav>

      <Container>
        <table
          className="text-center mt-5"
          style={{ border: "1px solid black", borderCollapse: "collapse" }}
        >
          <thead>
            <tr>
              <th style={{ border: "1px solid black", padding: "10px" }}>
                Trip
              </th>
              <th style={{ border: "1px solid black", padding: "10px" }}>
                Room Name
              </th>
              <th style={{ border: "1px solid black", padding: "10px" }}>
                Room Type
              </th>
              <th style={{ border: "1px solid black", padding: "10px" }}>
                Room Location
              </th>
              <th style={{ border: "1px solid black", padding: "10px" }}>
                Room Number
              </th>
              <th style={{ border: "1px solid black", padding: "10px" }}>
                Booking Date
              </th>
              <th style={{ border: "1px solid black", padding: "10px" }}>
                Check-in Date
              </th>
              <th style={{ border: "1px solid black", padding: "10px" }}>
                Check-out Date
              </th>
              <th style={{ border: "1px solid black", padding: "10px" }}>
                Status
              </th>
              <th style={{ border: "1px solid black", padding: "10px" }}>
                Description
              </th>
              <th style={{ border: "1px solid black", padding: "10px" }}>
                Phone Number
              </th>
              {filter !== "cancelled" && (
                <th style={{ border: "1px solid black", padding: "10px" }}>
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {filteredTrips.map((trip, index) => (
              <tr key={index}>
                <td style={{ border: "1px solid black", padding: "10px" }}>
                  {index + 1}
                </td>
                <td style={{ border: "1px solid black", padding: "10px" }}>
                  {trip.room_name}
                </td>
                <td style={{ border: "1px solid black", padding: "10px" }}>
                  {trip.room_type}
                </td>
                <td style={{ border: "1px solid black", padding: "10px" }}>
                  {trip.room_location}
                </td>
                <td style={{ border: "1px solid black", padding: "10px" }}>
                  {trip.room_id}
                </td>
                <td style={{ border: "1px solid black", padding: "10px" }}>
                  {new Date(trip.booking_date).toLocaleDateString("en-CA")}
                </td>
                <td style={{ border: "1px solid black", padding: "10px" }}>
                  {new Date(trip.check_in_date).toLocaleDateString("en-CA")}
                </td>
                <td style={{ border: "1px solid black", padding: "10px" }}>
                  {new Date(trip.check_out_date).toLocaleDateString("en-CA")}
                </td>
                <td style={{ border: "1px solid black", padding: "10px" }}>
                  {trip.status}
                </td>
                <td style={{ border: "1px solid black", padding: "10px" }}>
                  {trip.description}
                </td>
                <td style={{ border: "1px solid black", padding: "10px" }}>
                  {trip.phone_number}
                </td>
                {filter !== "cancelled" && (
                  <td style={{ border: "1px solid black", padding: "10px" }}>
                    <Button
                      className="border-dark w-100"
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
        </table>
      </Container>
    </>
  );
}
