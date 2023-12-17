import { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../components/AuthProvider";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import TripTable from "../components/TripTable";
import { useDispatch, useSelector } from "react-redux";
import { fetchTrips } from "../features/bookings/bookingsSlice";

export default function TripPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState("cancelled");

  const { currentUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const trips = useSelector((state) => state.bookings.trips);
  const dispatch = useDispatch();

  const filteredTrips =
    trips.length > 0
      ? trips.filter((trip) => {
          if (filter === "") return true; // If no filter is set, show all trips
          return trip.status === filter; // Otherwise, only show trips that match the filter
        })
      : [];

  useEffect(() => {
    dispatch(fetchTrips(currentUser.uid));
    setIsLoading(false);
  }, [dispatch, currentUser.uid]);

  return (
    <div>
      {isLoading ? (
        <LoadingSpinner />
      ) : filteredTrips.length > 0 ? (
        <TripTable
          filteredTrips={filteredTrips}
          filter={filter}
          setFilter={setFilter}
        />
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
