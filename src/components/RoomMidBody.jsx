import { Spinner } from "react-bootstrap";
import RoomPostCard from "./RoomPostCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchRooms } from "../features/bookings/bookingsSlice";
import { useEffect } from "react";

export default function RoomMidBody() {
  const loading = useSelector((state) => state.bookings.loading);
  const rooms = useSelector((state) => state.bookings.rooms);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRooms());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <div className="d-flex justify-content-center mt-5">
          <Spinner animation="border" size="xl" />
        </div>
      ) : (
        <RoomPostCard rooms={rooms} />
      )}
    </>
  );
}
