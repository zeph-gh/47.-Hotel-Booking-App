import { useDispatch, useSelector } from "react-redux";
import { fetchRooms } from "../features/bookings/bookingsSlice";
import { useEffect } from "react";
import HomePostCard from "../components/HomePostCard";
import LoadingSpinner from "../components/LoadingSpinner";
import { Row } from "react-bootstrap";

export default function HomePage({ editMode }) {
  const loading = useSelector((state) => state.bookings.loading);
  const rooms = useSelector((state) => state.bookings.rooms);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRooms());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="mx-5 mb-5 p-5">
          {rooms.length > 0 ? (
            <>
              <Row>
                {rooms.map((room) => (
                  <HomePostCard
                    key={room.room_id}
                    room={room}
                    editMode={editMode}
                  />
                ))}
              </Row>
            </>
          ) : (
            ""
          )}
        </div>
      )}
    </>
  );
}
