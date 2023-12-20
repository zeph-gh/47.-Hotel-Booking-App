import { useDispatch, useSelector } from "react-redux";
import { fetchRooms } from "../features/bookings/bookingsSlice";
import { useEffect } from "react";
import HomePostCard from "../components/HomePostCard";
import LoadingSpinner from "../components/LoadingSpinner";
import { Row } from "react-bootstrap";
import AddRoom from "../components/AddRoom";
import BackToTopButton from "../components/BackToTopButton";

export default function HomePage({ editMode }) {
  const loading = useSelector((state) => state.bookings.loading);
  const rooms = useSelector((state) => state.bookings.rooms);
  const roomImages = useSelector((state) => state.bookings.roomImages);
  const dispatch = useDispatch();

  const sortedRooms = [...rooms].sort((a, b) => a.room_id - b.room_id);

  useEffect(() => {
    dispatch(fetchRooms());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <div className="my-5">
          <LoadingSpinner />
        </div>
      ) : (
        <>
          <div className="mb-5 d-none d-sm-block">
            {editMode ? <AddRoom /> : ""}

            {rooms.length > 0 ? (
              <>
                <Row className="p-5 mx-5">
                  {sortedRooms.map((room) => (
                    <HomePostCard
                      key={room.room_id}
                      room={room}
                      roomImages={roomImages}
                      editMode={editMode}
                    />
                  ))}
                </Row>
              </>
            ) : (
              ""
            )}
          </div>

          <div className="mb-5 d-sm-none" style={{ position: "relative" }}>
            {editMode ? <AddRoom /> : ""}

            {rooms.length > 0 ? (
              <>
                <Row className="mx-3 p-3 pt-5">
                  {sortedRooms.map((room) => (
                    <HomePostCard
                      key={room.room_id}
                      room={room}
                      roomImages={roomImages}
                      editMode={editMode}
                    />
                  ))}
                </Row>
              </>
            ) : (
              ""
            )}
          </div>

          <BackToTopButton />
        </>
      )}
    </>
  );
}
