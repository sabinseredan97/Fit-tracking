import { Link } from "react-router-dom";
import "./App.css";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <>
      {!user ? (
        <div className="flex gap-4">
          <Link to="/login">Go to login</Link>
          <Link to="/register">Go to register</Link>
        </div>
      ) : (
        <div>{user}</div>
      )}
    </>
  );
}

export default App;
