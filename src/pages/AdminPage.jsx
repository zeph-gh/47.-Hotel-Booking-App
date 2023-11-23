import { useCallback, useEffect, useState } from "react";
import { Nav, Spinner } from "react-bootstrap";

export default function AdminPage() {
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState("cancelled");
  const [isLoading, setIsLoading] = useState(false);

  const fetchBookings = useCallback(async () => {
    setIsLoading(true);
    const response = await fetch(
      "https://booking-system-api-zeph-goh.sigma-school-full-stack.repl.co/bookings"
    );
    const data = await response.json();
    setBookings(data);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

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
      fetchBookings();
      alert("Success to cancel trip.");
    } else {
      alert("Failed to cancel trip.");
    }
  };

  const handleConfirm = async (booking_id) => {
    const response = await fetch(
      `https://booking-system-api-zeph-goh.sigma-school-full-stack.repl.co/trips/${booking_id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: "confirmed",
        }),
      }
    );

    if (response.ok) {
      // If the request was successful, refetch the trips
      fetchBookings();
      alert("Success to confirm trip.");
    } else {
      alert("Failed to confirm trip.");
    }
  };

  const handleDelete = async (booking_id) => {
    const response = await fetch(
      `https://booking-system-api-zeph-goh.sigma-school-full-stack.repl.co/bookings/${booking_id}`,
      {
        method: "Delete",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      // If the request was successful, refetch the trips
      fetchBookings();
      alert("Success to delete booking.");
    } else {
      alert("Failed to delete booking.");
    }
  };

  const filteredBookings =
    bookings.length > 0
      ? bookings.filter((booking) => {
          if (filter === "") return true; // If no filter is set, show all bookings
          return booking.status === filter; // Otherwise, only show bookings that match the filter
        })
      : [];

  return (
    <div>
      <h1 className="my-4 ms-5">Admin Bookings Managament</h1>
      <Nav
        variant="pills"
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
      {isLoading ? (
        <div className="d-flex justify-content-center mt-5">
          <Spinner animation="border" size="xl" />
        </div>
      ) : filteredBookings.length > 0 ? (
        <div className="my-4">
          <table
            className="text-center"
            style={{ border: "1px solid black", borderCollapse: "collapse" }}
          >
            <thead>
              <tr>
                <th style={{ border: "1px solid black", padding: "10px" }}>
                  Booking
                </th>
                <th style={{ border: "1px solid black", padding: "10px" }}>
                  User ID
                </th>
                <th style={{ border: "1px solid black", padding: "10px" }}>
                  User Email
                </th>
                <th style={{ border: "1px solid black", padding: "10px" }}>
                  Room Number
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
                  Check-in Date
                </th>
                <th style={{ border: "1px solid black", padding: "10px" }}>
                  Check-out Date
                </th>
                <th style={{ border: "1px solid black", padding: "10px" }}>
                  Price/night
                </th>
                <th style={{ border: "1px solid black", padding: "10px" }}>
                  Total nights
                </th>
                <th style={{ border: "1px solid black", padding: "10px" }}>
                  Total Price
                </th>
                <th style={{ border: "1px solid black", padding: "10px" }}>
                  Total Guests
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
                <th style={{ border: "1px solid black", padding: "10px" }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((booking, index) => {
                return (
                  <tr key={index}>
                    <td style={{ border: "1px solid black", padding: "10px" }}>
                      {index + 1}
                    </td>
                    <td style={{ border: "1px solid black", padding: "10px" }}>
                      {booking.user_id}
                    </td>
                    <td style={{ border: "1px solid black", padding: "10px" }}>
                      {booking.email}
                    </td>
                    <td style={{ border: "1px solid black", padding: "10px" }}>
                      {booking.room_id}
                    </td>
                    <td style={{ border: "1px solid black", padding: "10px" }}>
                      {booking.room_name}
                    </td>
                    <td style={{ border: "1px solid black", padding: "10px" }}>
                      {booking.room_type}
                    </td>
                    <td style={{ border: "1px solid black", padding: "10px" }}>
                      {booking.room_location}
                    </td>
                    <td style={{ border: "1px solid black", padding: "10px" }}>
                      {new Date(booking.check_in_date).toLocaleDateString(
                        "en-CA"
                      )}
                    </td>
                    <td style={{ border: "1px solid black", padding: "10px" }}>
                      {new Date(booking.check_out_date).toLocaleDateString(
                        "en-CA"
                      )}
                    </td>
                    <td style={{ border: "1px solid black", padding: "10px" }}>
                      {booking.price}
                    </td>
                    <td style={{ border: "1px solid black", padding: "10px" }}>
                      {booking.nights}
                    </td>
                    <td style={{ border: "1px solid black", padding: "10px" }}>
                      {booking.total_price}
                    </td>
                    <td style={{ border: "1px solid black", padding: "10px" }}>
                      {booking.guests}
                    </td>
                    <td style={{ border: "1px solid black", padding: "10px" }}>
                      {booking.status}
                    </td>
                    <td style={{ border: "1px solid black", padding: "10px" }}>
                      {booking.description}
                    </td>
                    <td style={{ border: "1px solid black", padding: "10px" }}>
                      {booking.phone_number}
                    </td>
                    {filter !== "cancelled" ? (
                      <td
                        style={{ border: "1px solid black", padding: "10px" }}
                      >
                        <button
                          onClick={() => handleCancel(booking.booking_id)}
                        >
                          Cancel
                        </button>
                      </td>
                    ) : (
                      <>
                        <td
                          style={{ border: "1px solid black", padding: "10px" }}
                        >
                          <button
                            onClick={() => handleConfirm(booking.booking_id)}
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => handleDelete(booking.booking_id)}
                          >
                            Delete
                          </button>
                        </td>
                      </>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="mt-5">
          <h3>No bookings found...</h3>
        </div>
      )}
    </div>
  );
}
