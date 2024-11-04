import { Outlet } from "react-router-dom";
import Navbar from "./NavBar";

function Layout() {
  return (
    <div>
      <Navbar data-testid="navbar" />
      <main>
        <Outlet data-testid="outlet" />
      </main>
    </div>
  );
}

export default Layout;
