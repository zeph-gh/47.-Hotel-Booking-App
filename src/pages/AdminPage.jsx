import { useEffect, useState } from "react";
import { Button, Nav } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  cancelBooking,
  deleteBooking,
  fetchBookings,
  reconfirmBooking,
} from "../features/bookings/bookingsSlice";
import LoadingSpinner from "../components/LoadingSpinner";

export default function AdminPage() {
  const [filter, setFilter] = useState("cancelled");
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingButton, setIsLoadingButton] = useState(false);

  const dispatch = useDispatch();
  const bookings = useSelector((state) => state.bookings.bookings);

  useEffect(() => {
    dispatch(fetchBookings());
    setIsLoading(false);
  }, [dispatch]);

  const handleCancel = async (booking_id) => {
    setIsLoadingButton(true);
    const action = await dispatch(cancelBooking(booking_id));

    if (cancelBooking.fulfilled.match(action)) {
      alert("Success to cancel trip.");
    } else if (cancelBooking.rejected.match(action)) {
      console.error(action.error);
      alert("Failed to cancel trip.");
    }
    setIsLoadingButton(false);
  };

  const handleReconfirm = async (booking_id) => {
    setIsLoadingButton(true);
    const action = await dispatch(reconfirmBooking(booking_id));

    if (reconfirmBooking.fulfilled.match(action)) {
      alert("Success to confirm trip.");
    } else if (reconfirmBooking.rejected.match(action)) {
      console.error(action.error);
      alert("Failed to confirm trip.");
    }
    setIsLoadingButton(false);
  };

  const handleDelete = async (booking_id) => {
    setIsLoadingButton(true);
    const action = await dispatch(deleteBooking(booking_id));

    if (deleteBooking.fulfilled.match(action)) {
      alert("Success to delete trip.");
    } else if (deleteBooking.rejected.match(action)) {
      console.error(action.error);
      alert("Failed to delete trip.");
    }
    setIsLoadingButton(false);
    dispatch(fetchBookings()); // re-fetch again for renew table
  };

  const sortedAndFilteredBookings =
    bookings.length > 0
      ? [...bookings]
          // in Redux, the state is immutable, should create a copy of the bookings (...) array before sorting it
          .sort((a, b) => a.booking_id - b.booking_id)
          .filter((booking) => {
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
        <LoadingSpinner />
      ) : sortedAndFilteredBookings.length > 0 ? (
        <div className="my-4 table-responsive">
          <table
            className="text-center"
            style={{ border: "1px solid black", borderCollapse: "collapse" }}
          >
            <thead>
              <tr>
                <th style={{ border: "1px solid black", padding: "10px" }}>
                  No
                </th>
                <th style={{ border: "1px solid black", padding: "10px" }}>
                  Booking Date
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
              {sortedAndFilteredBookings.map((booking, index) => {
                return (
                  <tr key={index}>
                    <td style={{ border: "1px solid black", padding: "10px" }}>
                      {index + 1}
                    </td>
                    <td style={{ border: "1px solid black", padding: "10px" }}>
                      {new Date(booking.booking_date).toLocaleDateString(
                        "en-CA"
                      )}
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
                    {filter === "confirmed" ? (
                      <td
                        style={{ border: "1px solid black", padding: "10px" }}
                      >
                        <Button
                          onClick={() => handleCancel(booking.booking_id)}
                          disabled={isLoadingButton}
                          className="border-dark w-100"
                          variant="light"
                        >
                          {isLoadingButton ? <LoadingSpinner /> : "Cancel"}
                        </Button>
                      </td>
                    ) : (
                      <>
                        <td
                          style={{ border: "1px solid black", padding: "10px" }}
                        >
                          <Button
                            onClick={() => handleReconfirm(booking.booking_id)}
                            disabled={isLoadingButton}
                            className="border-dark w-100"
                            variant="light"
                          >
                            {isLoadingButton ? <LoadingSpinner /> : "Confirm"}
                          </Button>

                          <Button
                            onClick={() => handleDelete(booking.booking_id)}
                            disabled={isLoadingButton}
                            className="border-dark w-100"
                            variant="light"
                          >
                            {isLoadingButton ? <LoadingSpinner /> : "Delete"}
                          </Button>
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
