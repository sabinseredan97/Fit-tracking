import { Link } from "react-router-dom";
import "./App.css";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <>{!user ? <Link to="/login">Go to login</Link> : <div>{user}</div>}</>
  );
}

export default App;
