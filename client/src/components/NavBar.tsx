import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { getRequest, getUserData } from "../api/axios";
import { Button } from "./ui/button";

export default function NavBar() {
  const { user, logoutCtx } = useContext(AuthContext);

  async function onClick() {
    const response = await getRequest();
    console.log(response);
  }

  function logoutUser() {
    logoutCtx();
  }

  async function getUserInfo() {
    const respone = await getUserData();
    console.log(respone);
  }

  return (
    <div className="bg-blue-400 flex flex-row mx-auto w-full">
      <div className="p-1 flex flex-initial gap-2">
        <Link to="/overview">Overview</Link>
        <Link to="/profile">Profile</Link>
        <Button className="border rounded-md bg-black p-1" onClick={onClick}>
          Get request
        </Button>
        <Button className="border rounded-md bg-black p-1" onClick={logoutUser}>
          Log out
        </Button>
        <Button
          className="border rounded-md bg-black p-1"
          onClick={getUserInfo}
        >
          Get user info
        </Button>
      </div>
      <div>{user}</div>
    </div>
  );
}
