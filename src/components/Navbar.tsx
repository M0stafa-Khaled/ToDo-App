import React from "react";
import { Navbar, Collapse, Button, IconButton } from "@material-tailwind/react";
import {
  ArrowRightEndOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Link, NavLink } from "react-router-dom";
import Cookies from "universal-cookie";
import toast from "react-hot-toast";
import { UserCircleIcon } from "@heroicons/react/24/solid";

function NavList() {
  return (
    <ul className="mt-4 mb-6 p-0 space-y-2 lg:space-y-0 space-x-0 lg:space-x-2 flex flex-col items-start lg:items-center lg:mt-0 lg:mb-0 lg:flex-row lg:p-1">
      <NavLink
        to={"/home"}
        className="w-full lg:w-auto font-medium h-fit text-white py-2 px-3 hover:bg-[#AFAFAF] hover:text-[#2D3B42] rounded-lg transition-all duration-300"
      >
        Home
      </NavLink>
    </ul>
  );
}

export function NavbarWithMegaMenu() {
  const [openNav, setOpenNav] = React.useState(false);
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);
  const cookie = new Cookies();
  const jwt = cookie.get("jwt");
  const onLogoutHandler = async () => {
    cookie.remove("jwt");
    toast.success("Logout successfully", {
      position: "bottom-center",
      duration: 3000,
      style: {
        background: "#fff",
        color: "#121212",
        padding: "10px",
      },
      iconTheme: {
        primary: "rgb(16 194 0)",
        secondary: "#fff",
      },
    });
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };

  return (
    <Navbar
      variant="gradient"
      color="blue-gray"
      className="mx-auto max-w-screen-xl px-4 py-3 from-blue-gray-900 to-blue-gray-800"
    >
      <div className="flex items-center justify-between text-white">
        <Link to="/" className="font-bold tracking-widest">
          <span className="text-[#FFC107]">TODO</span>HUB
        </Link>
        <div className="hidden lg:block">
          <NavList />
        </div>
        <div className="hidden gap-2 lg:flex">
          {!jwt ? (
            <>
              <Button
                variant="text"
                size="md"
                className="font-outfit border hover:border-gray-500 text-white bg-blue-gray-800 py-0 px-0"
              >
                <Link
                  to={"/"}
                  className="flex justify-center items-center py-3 px-6  tracking-widest"
                >
                  Log In
                </Link>
              </Button>

              <Button
                size="md"
                className="font-outfit border py-0 px-0 bg-white text-blue-gray-800"
              >
                <Link
                  to="/register"
                  className=" flex items-center w-full h-full tracking-widest py-3 px-6"
                >
                  Sign Up
                </Link>
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="gradient"
                color="blue"
                size="md"
                className="font-outfit text-white py-0 px-0"
              >
                <Link
                  to={"/account"}
                  className="flex justify-center items-center py-3 px-6"
                >
                  Account
                  <UserCircleIcon className="size-6 ml-3" />
                </Link>
              </Button>
              <Button
                variant="gradient"
                color="red"
                size="md"
                className="font-outfit text-white py-3 px-6 flex justify-center items-center"
                onClick={onLogoutHandler}
              >
                Log Out
                <ArrowRightEndOnRectangleIcon className="size-6 ml-3" />
              </Button>
            </>
          )}
        </div>

        <IconButton
          variant="text"
          color="blue-gray"
          className="lg:hidden text-white"
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>

      <Collapse open={openNav}>
        <NavList />
        <div className="flex w-full flex-nowrap items-center gap-2 flex-col md:flex-row lg:hidden">
          {!jwt ? (
            <>
              <Button
                variant="text"
                size="md"
                fullWidth
                className="font-outfit border hover:border-gray-500 text-white bg-blue-gray-800 py-0 px-0"
              >
                <Link
                  to={"/"}
                  className="flex items-center tracking-widest justify-center w-full h-full py-4"
                >
                  Log In
                </Link>
              </Button>
              <Button
                size="md"
                fullWidth
                className="font-outfit border py-0 px-0 bg-white text-blue-gray-800"
              >
                <Link
                  to="/register"
                  className="flex items-center tracking-widest justify-center w-full h-full py-4"
                >
                  Sign Up
                </Link>
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="gradient"
                color="blue"
                size="md"
                className="w-full font-outfit text-white py-0 px-0"
              >
                <Link
                  to={"/account"}
                  className="flex justify-center items-center py-3"
                >
                  Account
                  <UserCircleIcon className="size-6 ml-3" />
                </Link>
              </Button>
              <Button
                variant="gradient"
                color="red"
                size="md"
                className="font-outfit text-white py-3 px-0 w-full flex justify-center items-center"
                onClick={onLogoutHandler}
              >
                Log Out
                <ArrowRightEndOnRectangleIcon className="size-6 ml-3" />
              </Button>
            </>
          )}
        </div>
      </Collapse>
    </Navbar>
  );
}
