import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
export default function NotFound() {
  return (
    <div className="w-screen h-screen bg-slate-200 flex flex-col justify-center items-center text-center">
      <h1 className="text-9xl font-bold text-white drop-shadow-lg shadow-black hover:scale-110 transition  duration-300 ">
        404
      </h1>
      <p className="text-xl md:text-2xl w-[300px] md:w-[800px] my-10">
        We&apos;re sorry but it looks like that page doesn&apos;t exist anymore.
      </p>
      <NavLink to={"/"}>
        <Button
          variant="contained"
          startIcon={<HomeIcon />}
          sx={{
            color: "#white",
            fontWeight: "bold",
            borderColor: "#c1121f",
            backgroundColor: "#0077b6",
            cursor: "pointer",
            transition: "all 0.5s ease",

            "&:hover": {
              backgroundColor: "#0077b6",
              transform: "scale(1.1)",
              color: "white",
            },
          }}
        >
          Back Home
        </Button>
      </NavLink>
    </div>
  );
}
