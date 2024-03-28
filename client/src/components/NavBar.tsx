import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function NavBar() {
  const { user } = useContext(AuthContext);
  return (
    <div className="bg-blue-400 flex w-full">
      <div className="p-1 flex flex-initial gap-2">
        <Link to="/overview">Overview</Link>
        <Link to="/profile">Profile</Link>
        <div>{user}</div>
      </div>
    </div>
  );
}
