import { useDispatch, useSelector } from "react-redux";
import { fetchRooms } from "../features/bookings/bookingsSlice";
import { useEffect } from "react";
import LoadingSpinner from "./LoadingSpinner";
import HomePostCard from "./HomePostCard";

export default function HomeMidBody() {
  const loading = useSelector((state) => state.bookings.loading);
  const rooms = useSelector((state) => state.bookings.rooms);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRooms());
  }, [dispatch]);

  return <>{loading ? <LoadingSpinner /> : <HomePostCard rooms={rooms} />}</>;
}
