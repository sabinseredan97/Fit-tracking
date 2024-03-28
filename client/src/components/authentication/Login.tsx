import { useContext, useState } from "react";
import Cookies from "js-cookie";
import { getRequest, getUserData, login } from "../../api/axios";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export default function Login() {
  const { logoutCtx } = useContext(AuthContext);
  const [data, setData] = useState({ email: "", password: "" });
  const [headerBearer, setHeaderBearer] = useState(
    Cookies.get(".AspNetCore.Identity.Application")
  );

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      await login(data);
      setHeaderBearer(Cookies.get(".AspNetCore.Identity.Application"));
      axios.defaults.headers.common["Authorization"] = `Bearer ${headerBearer}`;
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

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
    <div className="bg-gray-400 flex justify-center border rounded-full gap-2 mt-2">
      <div className="m-auto p-1">
        <div className="gap-2">
          <form onSubmit={onSubmit}>
            <input
              name="email"
              type="text"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setData({ ...data, email: e.target.value })
              }
            />
            <input
              name="password"
              type="text"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setData({ ...data, password: e.target.value })
              }
            />
            <button className="border rounded-md bg-black p-1" type="submit">
              Log in
            </button>
          </form>
          <button className="border rounded-md bg-black p-1" onClick={onClick}>
            Get request
          </button>
          <button
            className="border rounded-md bg-black p-1"
            onClick={logoutUser}
          >
            Log out
          </button>
          <button
            className="border rounded-md bg-black p-1"
            onClick={getUserInfo}
          >
            Get user info
          </button>
        </div>
      </div>
    </div>
  );
}
