import { Spinner } from "react-bootstrap";

export default function LoadingSpinner() {
  return (
    <div className="d-flex justify-content-center">
      <Spinner animation="grow" variant="danger" />
    </div>
  );
}
