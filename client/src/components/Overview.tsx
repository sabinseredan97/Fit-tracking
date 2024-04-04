import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function Overview() {
  const { user } = useContext(AuthContext);

  return (
    <div className="p-1">
      {!user ? <Navigate to="/login" replace={true} /> : "Overview"}
    </div>
  );
}
