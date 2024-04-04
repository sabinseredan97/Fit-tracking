import { MouseEventHandler } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";
import ProfileImg from "@/assets/ProfileImg.jpg";

export default function UserDropDown({
  setNavBar,
}: {
  setNavBar: MouseEventHandler<HTMLAnchorElement>;
}) {
  const { user, logoutCtx } = useContext(AuthContext);

  if (!user) {
    return (
      <Link to="/login">
        <Button className="hover:bg-blue-600 text-lg">Login</Button>
      </Link>
    );
  }

  const title = [
    <img
      key={"img"}
      src={ProfileImg}
      alt="profile image"
      width={30}
      height={30}
      className="rounded-full mt-1"
    />,
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none text-base" asChild>
        <button className="border-none outline-none hover:none">{title}</button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-blue-100">
        <DropdownMenuLabel>{user}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link to={"/profile"} onClick={setNavBar}>
              Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Settings
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link
            to={"https://github.com/sabinseredan97/Fit-tracking"}
            rel="noopener noreferrer"
            target="_blank"
            onClick={setNavBar}
          >
            GitHub
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>Support</DropdownMenuItem>
        <DropdownMenuItem disabled>API</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Button
            variant="secondary"
            className="w-full"
            onClick={() => logoutCtx()}
          >
            Sign Out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
