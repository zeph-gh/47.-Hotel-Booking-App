import { Carousel, Col, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import roomImages from "./roomImages";

export default function HomePostCard({ rooms }) {
  return (
    <div className="mx-5 mb-5 p-5">
      {rooms.length > 0 && (
        <Row>
          {rooms.map((room) => {
            const images = roomImages[room.room_id];
            return (
              <Col md={6} xl={4} xxl={3} key={room.room_id} className="mb-5">
                {room.availability ? (
                  <Link
                    to={`/room/${room.room_id}`}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <Carousel interval={null} style={{ width: "100%" }}>
                      {images.map((image, index) => (
                        <Carousel.Item key={index}>
                          <Image
                            src={image}
                            alt={room.room_name}
                            className="rounded-4"
                            height="100%"
                            width="100%"
                          />
                        </Carousel.Item>
                      ))}
                    </Carousel>

                    <p className="mt-2 mb-0 fw-bold fs-6">{room.room_name}</p>
                    <p className="m-0 fw-light">{room.room_type}</p>
                    <p className="m-0 fw-light">
                      <strong>${room.price}</strong> night
                    </p>
                  </Link>
                ) : (
                  <div>
                    <div style={{ position: "relative" }}>
                      <Image
                        src={images[0]}
                        alt={room.room_name}
                        className="rounded-4"
                        style={{
                          filter: "grayscale(100%)",
                          objectFit: "cover",
                          height: "100%",
                          width: "100%",
                        }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          bottom: 0,
                          height: "100%",
                          width: "100%",
                          background:
                            "linear-gradient(to bottom left, #ff385c 30%, transparent 47%)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          borderTopRightRadius: "15px",
                        }}
                      >
                        <div
                          style={{
                            color: "#ff385c",
                            fontSize: "3em",
                            fontWeight: "bold",
                            transform: "rotate(46deg)",
                          }}
                        >
                          Booked
                        </div>
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
