import { createBrowserRouter } from "react-router-dom";
import Login from "./views/Login";
import Signup from "./views/Signup";
import Users from "./views/Users";
import GuestLayout from "./components/GuestLayout";
import MainLayout from "./components/MainLayout";
import Dashboard from "./views/Dashboard";
import NotFound from "./views/NotFound";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/users",
        element: <Users />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/",
        element: <Dashboard />,
      },
    ],
  },

  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
