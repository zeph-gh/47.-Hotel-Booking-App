import { Button } from "react-bootstrap";

export default function ErrorPage() {
  return (
    <div
      className="d-flex justify-content-center vh-100"
      style={{
        backgroundImage: 'url("https://picsum.photos/id/250/2000/4000")',
        backgroundSize: "cover",
      }}
    >
      <div className="mt-5 pt-5 text-center text-light">
        <h1 className="fw-bold">Oops...............</h1>
        <p className="my-4 fs-3 fw-medium">Page not found</p>
        <Button variant="light" className="fw-bold" href="/">
          Back to homepage
        </Button>
      </div>
    </div>
  );
}
