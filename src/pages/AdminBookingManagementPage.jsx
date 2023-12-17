import { useEffect, useState } from "react";
import { Nav } from "react-bootstrap";

import LoadingSpinner from "../components/LoadingSpinner";
import AdminBookingManagementTable from "../components/AdminBookingManagementTable";
import { fetchBookings } from "../features/bookings/bookingsSlice";
import { useDispatch } from "react-redux";

export default function AdminBookingManagementPage() {
  const [filter, setFilter] = useState("cancelled");
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBookings());
    setIsLoading(false);
  }, [dispatch]);

  return (
    <>
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
      ) : (
        <AdminBookingManagementTable filter={filter} />
      )}
    </>
  );
}
