import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import RoomPostCard from "./RoomPostCard";

export default function RoomMidBody() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const url =
    "https://booking-system-api-zeph-goh.sigma-school-full-stack.repl.co/rooms";

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setRooms(data);
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false); // Ensure loading is set to false even if there's an error
      });
  }, [url]);

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
