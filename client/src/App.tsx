import { Link } from "react-router-dom";
import "./App.css";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { Button } from "./components/ui/button";
import { getRequest, getUserData } from "./api/axios";

function App() {
  const { user } = useContext(AuthContext);

  async function getUser() {
    try {
      const response = await getUserData();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  async function getReq() {
    try {
      const response = await getRequest();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="p-1">
      {!user ? (
        <div className="flex gap-4">
          <p className="mt-1">You are not logged in please:</p>
          <Button variant="link" className="text-blue-600">
            <Link to="/login">Login</Link>
          </Button>
          <p className="mt-1">or</p>
          <Button variant="link" className="text-blue-600">
            <Link to="/register">Register</Link>
          </Button>
        </div>
      ) : (
        <div>{user}</div>
      )}
      <Button variant="outline" className="mr-2" onClick={getUser}>
        Get user data
      </Button>
      <Button variant="outline" onClick={getReq}>
        Get Request
      </Button>
    </div>
  );
}

export default App;
