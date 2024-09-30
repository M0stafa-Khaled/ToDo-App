import { Outlet } from "react-router-dom";
import { NavbarWithMegaMenu } from "../components/Navbar";

function RootLayout() {
  return (
    <div className="container min-h-screen">
      <div className="sticky top-0 border-t-8 border-transparent z-10">
        <NavbarWithMegaMenu />
      </div>
      <Outlet />
    </div>
  );
}

export default RootLayout;
