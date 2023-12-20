import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

export default function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="scroll-to-top">
      {isVisible && (
        <div
          onClick={scrollToTop}
          style={{ position: "fixed", bottom: "20px", right: "20px" }}
        >
          <Button variant="light" style={{ opacity: 0.9 }}>
            <i className="bi bi-arrow-up"></i>
          </Button>
        </div>
      )}
    </div>
  );
}
