import { Spinner } from "react-bootstrap";

export default function LoadingSpinner() {
  return (
    <div className="d-flex justify-content-center my-5">
      <Spinner animation="grow" variant="danger" />
    </div>
  );
}
