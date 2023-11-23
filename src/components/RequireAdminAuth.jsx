import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../components/AuthProvider";

export default function RequireAdminAuth({ children }) {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (!currentUser || currentUser.uid !== "j2NA6g3BLgZlLt63kubtbEWSM4g2") {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  return children;
}
