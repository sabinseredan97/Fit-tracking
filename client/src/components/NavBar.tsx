import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Button } from "./ui/button";
import { HamburgerMenuIcon, Cross1Icon } from "@radix-ui/react-icons";
import UserDropDown from "./UserDropDown";

export default function NavBar() {
  const [navbar, setNavbar] = useState(false);
  const { user } = useContext(AuthContext);

  return (
    <>
      <nav className="w-full bg-black fixed top-0 left-0 right-0 z-10">
        <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
          <div>
            <div className="flex items-center justify-between py-2 md:py-2 md:block">
              {/* LOGO */}
              <Link to="/">
                <h2 className="text-2xl text-blue-600 font-bold ">
                  Fit-tracking
                </h2>
              </Link>
              {/* HAMBURGER BUTTON FOR MOBILE */}
              <div className="md:hidden">
                <Button
                  className="h-8 p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                  onClick={() => setNavbar(!navbar)}
                >
                  {navbar ? <Cross1Icon /> : <HamburgerMenuIcon />}
                </Button>
              </div>
            </div>
          </div>
          <div>
            <div
              className={`flex-1 justify-self-center sm:pb-3 sm:mt-8 md:block md:pb-0 md:mt-0 ${
                navbar ? "p-12 md:p-0 block" : "hidden"
              }`}
            >
              <ul className="h-screen md:h-auto items-center justify-center md:flex ">
                {user && (
                  <>
                    <li className="text-xl text-white py-1 px-6 text-center border-b-2 md:border-b-0 hover:bg-blue-600 border-blue-900 md:hover:text-blue-600 md:hover:bg-transparent">
                      <Link to="/overview">Overview</Link>
                    </li>
                  </>
                )}
                <li className="text-xl text-white py-1 px-6 text-center border-b-2 md:border-b-0 hover:bg-blue-600 border-blue-900 md:hover:text-blue-600 md:hover:bg-transparent">
                  <UserDropDown setNavBar={() => setNavbar(!navbar)} />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
