import { useEffect, useState } from "react";
import { Col, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import homeImages from "./homeImages";

export default function RoomPostCard() {
  const [rooms, setRooms] = useState([]);
  const url =
    "https://booking-system-api-zeph-goh.sigma-school-full-stack.repl.co/rooms";

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => setRooms(data))
      .catch((error) => console.error("Error:", error));
  }, [url]);

  return (
    <div className="mx-5 mb-5 p-5">
      {rooms.length > 0 && (
        <Row>
          {rooms.map((room) => {
            const src = homeImages[room.room_id];
            return (
              <Col md={6} xl={4} xxl={3} key={room.room_id} className="mb-5">
                {room.availability ? (
                  <Link
                    to={`/room/${room.room_id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <Image
                      src={src}
                      alt={room.room_name}
                      className="rounded-4"
                      height="280px"
                    />
                    <p className="mt-2 mb-0 fw-bold fs-6">{room.room_name}</p>
                    <p className="m-0 fw-light">{room.room_type}</p>
                    <p className="m-0 fw-light">
                      <strong>${room.price}</strong> night
                    </p>
                  </Link>
                ) : (
                  <div style={{ position: "relative" }}>
                    <Image
                      src={src}
                      alt={room.room_name}
                      className="rounded-4"
                      style={{ filter: "grayscale(100%)" }}
                      height="280px"
                    />
                    <div
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        width: "90%",
                        height: "100%",
                        background:
                          "linear-gradient(to bottom left, #ff385c 42%, transparent 47%)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <div
                        style={{
                          color: "#ff385c",
                          fontSize: "3em",
                          fontWeight: "bold",
                          transform: "rotate(55deg)",
                        }}
                      >
                        Booked
                      </div>
                    </div>
                    <p className="mt-2 mb-0 fw-bold fs-6">{room.room_name}</p>
                    <p className="m-0 fw-light">{room.room_type}</p>
                    <p className="m-0 fw-light">
                      <strong>${room.price}</strong> night
                    </p>
                  </div>
                )}
              </Col>
            );
          })}
        </Row>
      )}
    </div>
  );
}
