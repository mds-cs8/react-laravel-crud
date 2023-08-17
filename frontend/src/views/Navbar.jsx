// ? --------------- IMPORT LIBRARY , COMPONENTS , CONTEXTS ---------------------------
import { Bars3CenterLeftIcon } from "@heroicons/react/24/solid";
import Chip from "@mui/material/Chip";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useStateContext } from "../context/ContextProviader";
import { useEffect } from "react";
import AxiosClient from "../AxiosClient";
// ? ---------------END IMPORT LIBRARY , COMPONENTS , CONTEXTS ---------------------------

// eslint-disable-next-line react/prop-types
export default function NavBar({ showNav, setShowNav, logout }) {
  const { user, setUser } = useStateContext();

  useEffect(() => {
    AxiosClient.get("/user").then(({ data }) => {
      setUser(data);
    });
  }, []);

  return (
    <div
      className={`bg-white z-40 shadow-lg fixed w-full h-16 flex justify-between items-center transition-all duration-[400ms] ${
        showNav ? "pl-56" : ""
      }`}
    >
      <div className="pl-4 md:pl-16">
        <Bars3CenterLeftIcon
          className="h-8 w-8 text-[#023e8a] cursor-pointer hover:rotate-180 transition-all duration-500	"
          onClick={() => setShowNav(!showNav)}
        />
      </div>
      <div className="flex items-center pr-4 md:pr-16 gap-4  ">
        <Chip
          className="hover:shadow-md"
          onClick={(e) => {
            logout(e);
          }}
          sx={{
            transition: "all 0.5s ease",
            color: "#c1121f",
            fontWeight: "bold",
            borderColor: "#c1121f",
            backgroundColor: "#fff",
            border: "2px solid #c1121f ",
            cursor: "pointer",

            "&:hover": {
              border: "2px solid #c1121f ",
              backgroundColor: "#c1121f",
              color: "#fff",
            },
          }}
          label="Logout"
        />
        <Chip
          avatar={<AccountCircleIcon />}
          label={user.name}
          variant="outlined"
          className="hover:shadow-md"
        />
      </div>
    </div>
  );
}
