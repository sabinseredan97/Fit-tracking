import NavBar from "../components/NavBar";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <div className="root-layout">
      <NavBar />
      <main className="pt-10">
        <Outlet />
      </main>
    </div>
  );
}
