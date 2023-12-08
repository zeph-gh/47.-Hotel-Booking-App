import { Link } from "react-router-dom";

function Footer({ handleOpenModal }) {
  return (
    <>
      <div className="bg-light row py-5">
        <div className="d-none d-lg-block col-md-2"></div>

        <div className="d-none d-lg-block col-md-2">
          <a href="#" className="fw-bold icon">
            HOSTING
          </a>
          <a
            href="#"
            className="d-block pt-4 text-start link-underline link-underline-opacity-0 link-underline-opacity-100-hover link-dark"
          >
            Hosting your home
          </a>
          <a
            href="#"
            className="d-block pt-3 text-start link-underline link-underline-opacity-0 link-underline-opacity-100-hover link-dark"
          >
            AirCover for Hosts
          </a>
          <a
            href="#"
            className="d-block pt-3 text-start link-underline link-underline-opacity-0 link-underline-opacity-100-hover link-dark"
          >
            Hosting resources
          </a>
          <a
            href="#"
            className="d-block pt-3 text-start link-underline link-underline-opacity-0 link-underline-opacity-100-hover link-dark"
          >
            Community forum
          </a>
          <a
            href="#"
            className="d-block pt-3 text-start link-underline link-underline-opacity-0 link-underline-opacity-100-hover link-dark"
          >
            Hosting responsibly
          </a>
          <a
            href="#"
            className="d-block pt-3 text-start link-underline link-underline-opacity-0 link-underline-opacity-100-hover link-dark"
          >
            Airbnb-friendly apartments
          </a>
        </div>

        <div className="d-none d-lg-block col-md-2">
          <a href="#" className="fw-bold icon">
            CORPORATE INFO
          </a>
          <a
            href="#"
            className="d-block pt-4 text-start link-underline link-underline-opacity-0 link-underline-opacity-100-hover link-dark"
          >
            Career
          </a>
          <a
            href="#"
            className="d-block pt-3 text-start link-underline link-underline-opacity-0 link-underline-opacity-100-hover link-dark"
          >
            About us
          </a>
          <a
            href="#"
            className="d-block pt-3 text-start link-underline link-underline-opacity-0 link-underline-opacity-100-hover link-dark"
          >
            Sustainability
          </a>
          <a
            href="#"
            className="d-block pt-3 text-start link-underline link-underline-opacity-0 link-underline-opacity-100-hover link-dark"
          >
            Press
          </a>
          <a
            href="#"
            className="d-block pt-3 text-start link-underline link-underline-opacity-0 link-underline-opacity-100-hover link-dark"
          >
            Investor
          </a>
          <a
            href="#"
            className="d-block pt-3 text-start link-underline link-underline-opacity-0 link-underline-opacity-100-hover link-dark"
          >
            Relations
          </a>
          <a
            href="#"
            className="d-block pt-3 text-start link-underline link-underline-opacity-0 link-underline-opacity-100-hover link-dark"
          >
            Corporate governance
          </a>
        </div>

        <div className="d-none d-lg-block col-md-2">
          <a href="#" className="icon fw-bold">
            SUPPORT
          </a>
          <a
            href="#"
            className="d-block pt-4 text-start link-underline link-underline-opacity-0 link-underline-opacity-100-hover link-dark"
          >
            Help Center
          </a>
          <a
            href="#"
            className="d-block pt-3 text-start link-underline link-underline-opacity-0 link-underline-opacity-100-hover link-dark"
          >
            Get help with a safety issue
          </a>
          <a
            href="#"
            className="d-block pt-3 text-start link-underline link-underline-opacity-0 link-underline-opacity-100-hover link-dark"
          >
            AirCover
          </a>
          <a
            href="#"
            className="d-block pt-3 text-start link-underline link-underline-opacity-0 link-underline-opacity-100-hover link-dark"
          >
            Anti-discrimination
          </a>
          <a
            href="#"
            className="d-block pt-3 text-start link-underline link-underline-opacity-0 link-underline-opacity-100-hover link-dark"
          >
            Disability support
          </a>
        </div>

        <div className="d-none d-lg-block col-md-2">
          <p className="fw-bold">Not a member yet?</p>
          <p>Get 10% off — become a member today</p>
          <Link
            onClick={(event) => {
              event.preventDefault();
              handleOpenModal();
            }}
            className="fw-bold text-start link-underline link-underline-opacity-0 link-underline-opacity-100-hover link-dark"
          >
            READ MORE<i className="fas fa-arrow-right"></i>
          </Link>
        </div>

        {/* -------------md-screen-footer---------- */}

        <div className="d-block d-lg-none px-5">
          <a
            href="#"
            className="icon fw-bold d-flex justify-content-between align-items-center py-5"
          >
            HOSTING<i className="fa-solid fa-plus"></i>
          </a>
          <a
            href="#"
            className="icon fw-bold d-flex justify-content-between align-items-center pb-5"
          >
            CORPORATE INFO<i className="fa-solid fa-plus"></i>
          </a>
          <a
            href="#"
            className="icon fw-bold d-flex justify-content-between align-items-center pb-5"
          >
            SUPPORT<i className="fa-solid fa-plus"></i>
          </a>

          <p className="text-center fw-bold">NOT A MEMBER YET?</p>
          <p className="text-center">Get 10% off - become a member today</p>
          <Link
            onClick={(event) => {
              event.preventDefault();
              handleOpenModal();
            }}
            className="icon fw-bold d-flex justify-content-between align-items-center pb-5"
          >
            READ MORE<i className="fas fa-arrow-right"></i>
          </Link>
        </div>

        <div>
          <div className="text-center pt-5">
            <Link
              to="https://github.com/xweeton"
              className="icon bi bi-github"
              target="_blank"
            ></Link>
            <Link
              to="https://www.linkedin.com/in/goh-chee-man/"
              className="icon bi bi-linkedin ps-4"
              target="_blank"
            ></Link>
            <Link
              to="https://wa.me/+60166363228"
              className="icon bi bi-whatsapp ps-4"
              target="_blank"
            ></Link>
          </div>
          <p className="text-center pt-3">© 2023 Zeph. All right reserved.</p>
        </div>
      </div>
    </>
  );
}

export default Footer;
