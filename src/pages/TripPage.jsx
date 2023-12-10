import { useCallback, useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../components/AuthProvider";
import { Button, Container, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";

export default function TripPage() {
  const [trips, setTrips] = useState([]);
  const [filter, setFilter] = useState("cancelled");
  const [isLoading, setIsLoading] = useState(false);

  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const fetchTrips = useCallback(async () => {
    setIsLoading(true);
    const response = await fetch(
      `https://booking-system-api-zeph-goh.sigma-school-full-stack.repl.co/trips/${currentUser.uid}`
    );
    const data = await response.json();
    setTrips(data);
    setIsLoading(false);
  }, [currentUser.uid]);

  useEffect(() => {
    fetchTrips();
  }, [fetchTrips]);

  const handleCancel = async (booking_id) => {
    const response = await fetch(
      `https://booking-system-api-zeph-goh.sigma-school-full-stack.repl.co/trips/${booking_id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: "cancelled",
        }),
      }
    );

    if (response.ok) {
      // If the request was successful, refetch the trips
      fetchTrips();
      alert("Success to cancel trip.");
    } else {
      alert("Failed to cancel trip.");
    }
  };

  const filteredTrips =
    trips.length > 0
      ? trips.filter((trip) => {
          if (filter === "") return true; // If no filter is set, show all trips
          return trip.status === filter; // Otherwise, only show trips that match the filter
        })
      : [];

  return (
    <div>
      {isLoading ? (
        <LoadingSpinner />
      ) : filteredTrips.length > 0 ? (
        <>
          <h1 className="my-4 ms-5">Your Trips</h1>
          <Nav
            variant="tabs"
            defaultActiveKey="cancelled"
            justify
            className="mt-5 fw-bold"
          >
            <Nav.Item>
              <Nav.Link
                eventKey="confirmed"
                onClick={() => setFilter("confirmed")}
              >
                Confirmed
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                eventKey="cancelled"
                onClick={() => setFilter("cancelled")}
              >
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
                      {new Date(trip.check_out_date).toLocaleDateString(
                        "en-CA"
                      )}
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
                      <td
                        style={{ border: "1px solid black", padding: "10px" }}
                      >
                        <button onClick={() => handleCancel(trip.booking_id)}>
                          Cancel
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </Container>
        </>
      ) : (
        <Container className="mt-5">
          <Button
            variant="light"
            className="border-dark"
            onClick={() => window.location.reload()} // refresh to go back, navigate same page not working
          >
            <i className="bi bi-arrow-90deg-left"></i>
          </Button>
          <h3 className="mt-4">
            {filter === "confirmed"
              ? "No trips booked...yet!"
              : "No trips cancelled!"}
          </h3>
          <p>
            {filter === "confirmed"
              ? "Time to dust off your bags and start planning your next adventure"
              : "Enjoy Your Trip!"}
          </p>
          <Button
            variant="light"
            className="border-dark rounded-3 px-5 py-2 mt-3"
            onClick={() => navigate("/")}
          >
            Start searching
          </Button>
        </Container>
      )}
    </div>
  );
}
