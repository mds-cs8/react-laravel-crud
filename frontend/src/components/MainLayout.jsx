// * THIS MAINLAYOUT IF THE USER HAS TOKEN WILL GO INSIDE CHILDREN IN THIS LAYOUT ( USERS , DASHBOARD)
// @ts-nocheck

// ? ---------------IMPORT LIBRARY , COMPONENTS , CONTEXTS ---------------------------
import { useState, useEffect, Fragment } from "react";
import SideBar from "../views/SideBar";
import NavBar from "../views/Navbar";
import { Transition } from "@headlessui/react";
import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/ContextProviader";
import AxiosClient from "../AxiosClient";
// ? ---------------END IMPORT LIBRARY , COMPONENTS , CONTEXTS ---------------------------
export default function MainLayout() {
  const { user, token, setUser, setToken } = useStateContext();
  const [showNav, setShowNav] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    document.title = `${
      user.name ? "RAKAYA | " + user.name : "RAKAYA | SYSTEM"
    } `;
  }, [user]);
  // * check if user has token to enter this page
  if (!token) {
    return <Navigate to={"/login"} />;
  }
  // * end check if user has token to enter this page

  // ! this function for responsive sidebar
  function handleResize() {
    if (innerWidth <= 640) {
      setShowNav(false);
      setIsMobile(true);
    } else {
      setShowNav(true);
      setIsMobile(false);
    }
  }

  function resize() {
    if (typeof window != "undefined") {
      addEventListener("resize", handleResize);
    }

    return () => {
      removeEventListener("resize", handleResize);
    };
  }
  resize();
  // !  end this function for responsive sidebar

  // useEffect(() => {
  //   if (typeof window != "undefined") {
  //     addEventListener("resize", handleResize);
  //   }

  //   return () => {
  //     removeEventListener("resize", handleResize);
  //   };
  // }, []);

  // * logout function reset user and token
  function logout(e) {
    e.preventDefault();
    AxiosClient.post("/logout")
      .then(() => {
        setUser({});
        setToken(null);
      })
      .catch((err) => {
        const response = err.response;
        console.log(response);
      });
  }

  return (
    <>
      <NavBar showNav={showNav} setShowNav={setShowNav} logout={logout} />
      <Transition
        as={Fragment}
        show={showNav}
        enter="transform transition duration-[400ms]"
        enterFrom="-translate-x-full"
        enterTo="translate-x-0"
        leave="transform duration-[400ms] transition ease-in-out"
        leaveFrom="translate-x-0"
        leaveTo="-translate-x-full"
      >
        <SideBar
          // @ts-ignore
          showNav={showNav}
          setShowNav={setShowNav}
        />
      </Transition>
      <main
        className={`pt-16 transition-all duration-[400ms] ${
          showNav && !isMobile ? "pl-56" : ""
        }`}
      >
        <div className="px-4 md:px-16 w-full h-screen flex flex-col justify-center items-center">
          <Outlet />
        </div>
      </main>
    </>
  );
}
