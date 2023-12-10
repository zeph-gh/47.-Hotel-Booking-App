import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

const containerStyle = {
  flex: 1,
  height: "400px",
};

export default function RoomMap({ center, room_name, location, price }) {
  return (
    <div style={{ display: "flex" }} className="my-5">
      <MapContainer center={center} zoom={5} style={containerStyle}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={center}>
          <Popup>
            <p className="fs-6 fw-bold text-center mb-2 border-bottom border-dark">
              {room_name}
            </p>
            <div className="fs-6 fst-italic fw-light text-center">
              {" "}
              {location}
            </div>
            <div className="fs-5 text-center"> ${price}</div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
