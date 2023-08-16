// * THIS GUESTLAYOUT IF THE USER  !TOKEN WILL GO INSIDE CHILDREN IN THIS LAYOUT ( LOGIN , SIGNUP)

// ? ---------------IMPORT LIBRARY , COMPONENTS , CONTEXTS ---------------------------
import { useStateContext } from "../context/ContextProviader";
import { Navigate, Outlet } from "react-router-dom";
// ? ---------------END IMPORT LIBRARY , COMPONENTS , CONTEXTS ---------------------------

export default function GuestLayout() {
  // @ts-ignore
  const { token } = useStateContext();

    // * check if user has token to enter this page
  if (token) {
    return <Navigate to={"/"} />;
  }
  return (
    <div>
      <Outlet />
    </div>
  );
}
