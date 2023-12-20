import { useState } from "react";
import { Collapse } from "react-bootstrap";
import { Link } from "react-router-dom";

function Footer({ currentUser, handleOpenModal }) {
  const [openHosting, setOpenHosting] = useState(false);
  const [openCorpInfo, setOpenCorpInfo] = useState(false);
  const [openSupport, setOpenSupport] = useState(false);

  const [classNameHosting, setClassNameHosting] = useState(true);
  const [classNameCorpInfo, setClassNameCorpInfo] = useState(true);
  const [classNameSupport, setClassNameSupport] = useState(true);

  const handleOpenCollapseHosting = () => {
    setOpenHosting(!openHosting);
    setClassNameHosting(!classNameHosting);
  };

  const handleOpenCollapseCorpInfo = () => {
    setOpenCorpInfo(!openCorpInfo);
    setClassNameCorpInfo(!classNameCorpInfo);
  };

  const handleOpenCollapseSupport = () => {
    setOpenSupport(!openSupport);
    setClassNameSupport(!classNameSupport);
  };

  return (
    <>
      <div className="bg-light row py-5">
        <div className="d-none d-lg-block col-md-2"></div>

        <div className="d-none d-lg-block col-md-2">
          <a className="fw-bold icon">HOSTING</a>
          <a className="d-block pt-4 text-start link-underline link-underline-opacity-0 link-underline-opacity-100-hover link-dark">
            Hosting your home
          </a>
          <a className="d-block pt-3 text-start link-underline link-underline-opacity-0 link-underline-opacity-100-hover link-dark">
            AirCover for Hosts
          </a>
          <a className="d-block pt-3 text-start link-underline link-underline-opacity-0 link-underline-opacity-100-hover link-dark">
            Hosting resources
          </a>
          <a className="d-block pt-3 text-start link-underline link-underline-opacity-0 link-underline-opacity-100-hover link-dark">
            Community forum
          </a>
          <a className="d-block pt-3 text-start link-underline link-underline-opacity-0 link-underline-opacity-100-hover link-dark">
            Hosting responsibly
          </a>
          <a className="d-block pt-3 text-start link-underline link-underline-opacity-0 link-underline-opacity-100-hover link-dark">
            Airbnb-friendly apartments
          </a>
        </div>

        <div className="d-none d-lg-block col-md-2">
          <a className="fw-bold icon">CORPORATE INFO</a>
          <a className="d-block pt-4 text-start link-underline link-underline-opacity-0 link-underline-opacity-100-hover link-dark">
            Career
          </a>
          <a className="d-block pt-3 text-start link-underline link-underline-opacity-0 link-underline-opacity-100-hover link-dark">
            About us
          </a>
          <a className="d-block pt-3 text-start link-underline link-underline-opacity-0 link-underline-opacity-100-hover link-dark">
            Sustainability
          </a>
          <a className="d-block pt-3 text-start link-underline link-underline-opacity-0 link-underline-opacity-100-hover link-dark">
            Press
          </a>
          <a className="d-block pt-3 text-start link-underline link-underline-opacity-0 link-underline-opacity-100-hover link-dark">
            Investor
          </a>
          <a className="d-block pt-3 text-start link-underline link-underline-opacity-0 link-underline-opacity-100-hover link-dark">
            Relations
          </a>
          <a className="d-block pt-3 text-start link-underline link-underline-opacity-0 link-underline-opacity-100-hover link-dark">
            Corporate governance
          </a>
        </div>

        <div className="d-none d-lg-block col-md-2">
          <a className="icon fw-bold">SUPPORT</a>
          <a className="d-block pt-4 text-start link-underline link-underline-opacity-0 link-underline-opacity-100-hover link-dark">
            Help Center
          </a>
          <a className="d-block pt-3 text-start link-underline link-underline-opacity-0 link-underline-opacity-100-hover link-dark">
            Get help with a safety issue
          </a>
          <a className="d-block pt-3 text-start link-underline link-underline-opacity-0 link-underline-opacity-100-hover link-dark">
            AirCover
          </a>
          <a className="d-block pt-3 text-start link-underline link-underline-opacity-0 link-underline-opacity-100-hover link-dark">
            Anti-discrimination
          </a>
          <a className="d-block pt-3 text-start link-underline link-underline-opacity-0 link-underline-opacity-100-hover link-dark">
            Disability support
          </a>
        </div>

        {!currentUser ? (
          <div className="d-none d-lg-block col-md-2">
            <p className="fw-bold">Not a member yet?</p>
            <p className="fw-light">Become a member today</p>
            <Link
              onClick={(event) => {
                event.preventDefault();
                handleOpenModal();
              }}
              className="fw-bold text-start link-underline link-underline-opacity-0 link-underline-opacity-100-hover link-dark"
            >
              Join now!<i className="bi bi-arrow-right"></i>
            </Link>
          </div>
        ) : (
          ""
        )}

        {/* -------------md-screen-footer---------- */}

        <div className="d-block d-lg-none px-5">
          <a
            className="icon fw-bold d-flex justify-content-between align-items-center pt-4 pb-3"
            onClick={handleOpenCollapseHosting}
          >
            HOSTING
            <i
              className={classNameHosting ? "bi bi-plus-lg" : "bi bi-dash-lg"}
            ></i>
          </a>
          <Collapse in={openHosting}>
            <div className="mb-4">
              <a className="d-block pt-4 text-start link-underline link-underline-opacity-0 link-underline-opacity-100-hover link-dark">
                Hosting your home
              </a>
              <a className="d-block pt-3 text-start link-underline link-underline-opacity-0 link-underline-opacity-100-hover link-dark">
                AirCover for Hosts
              </a>
              <a className="d-block pt-3 text-start link-underline link-underline-opacity-0 link-underline-opacity-100-hover link-dark">
                Hosting resources
              </a>
              <a className="d-block pt-3 text-start link-underline link-underline-opacity-0 link-underline-opacity-100-hover link-dark">
                Community forum
              </a>
              <a className="d-block pt-3 text-start link-underline link-underline-opacity-0 link-underline-opacity-100-hover link-dark">
                Hosting responsibly
              </a>
              <a className="d-block pt-3 text-start link-underline link-underline-opacity-0 link-underline-opacity-100-hover link-dark">
                Airbnb-friendly apartments
              </a>
            </div>
          </Collapse>

          <a
            className="icon fw-bold d-flex justify-content-between align-items-center pt-4 pb-3"
            onClick={handleOpenCollapseCorpInfo}
          >
            CORPORATE INFO
            <i
              className={classNameCorpInfo ? "bi bi-plus-lg" : "bi bi-dash-lg"}
            ></i>
          </a>
          <Collapse in={openCorpInfo}>
            <div className="mb-4">
              <a className="d-block pt-4 text-start link-underline link-underline-opacity-0 link-underline-opacity-100-hover link-dark">
                Career
              </a>
              <a className="d-block pt-3 text-start link-underline link-underline-opacity-0 link-underline-opacity-100-hover link-dark">
                About us
              </a>
              <a className="d-block pt-3 text-start link-underline link-underline-opacity-0 link-underline-opacity-100-hover link-dark">
                Sustainability
              </a>
              <a className="d-block pt-3 text-start link-underline link-underline-opacity-0 link-underline-opacity-100-hover link-dark">
                Press
              </a>
              <a className="d-block pt-3 text-start link-underline link-underline-opacity-0 link-underline-opacity-100-hover link-dark">
                Investor
              </a>
              <a className="d-block pt-3 text-start link-underline link-underline-opacity-0 link-underline-opacity-100-hover link-dark">
                Relations
              </a>
              <a className="d-block pt-3 text-start link-underline link-underline-opacity-0 link-underline-opacity-100-hover link-dark">
                Corporate governance
              </a>
            </div>
          </Collapse>

          <a
            className="icon fw-bold d-flex justify-content-between align-items-center pt-4 pb-3"
            onClick={handleOpenCollapseSupport}
          >
            SUPPORT
            <i
              className={classNameSupport ? "bi bi-plus-lg" : "bi bi-dash-lg"}
            ></i>
          </a>
          <Collapse in={openSupport}>
            <div className="mb-5">
              <a className="d-block pt-4 text-start link-underline link-underline-opacity-0 link-underline-opacity-100-hover link-dark">
                Help Center
              </a>
              <a className="d-block pt-3 text-start link-underline link-underline-opacity-0 link-underline-opacity-100-hover link-dark">
                Get help with a safety issue
              </a>
              <a className="d-block pt-3 text-start link-underline link-underline-opacity-0 link-underline-opacity-100-hover link-dark">
                AirCover
              </a>
              <a className="d-block pt-3 text-start link-underline link-underline-opacity-0 link-underline-opacity-100-hover link-dark">
                Anti-discrimination
              </a>
              <a className="d-block pt-3 text-start link-underline link-underline-opacity-0 link-underline-opacity-100-hover link-dark">
                Disability support
              </a>
            </div>
          </Collapse>

          {!currentUser ? (
            <>
              <p className="text-center fw-bold mt-5">NOT A MEMBER YET?</p>
              <p className="text-center fw-light">Become a member today</p>
              <Link
                onClick={(event) => {
                  event.preventDefault();
                  handleOpenModal();
                }}
                className="icon fw-bold d-flex justify-content-between align-items-center pb-5"
              >
                Join now!<i className="bi bi-arrow-right"></i>
              </Link>
            </>
          ) : (
            ""
          )}
        </div>

        <div>
          <div className="text-center pt-5 fs-5">
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
          <p className="text-center pt-3 fw-medium">
            © 2023 Zeph. All right reserved.
          </p>
        </div>
      </div>
    </>
  );
}

export default Footer;
