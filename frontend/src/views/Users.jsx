// @ts-nocheck
import { useEffect, useState } from "react";
import AxiosClient from "../AxiosClient.js";
import DataTable from "../views/DataTable.jsx";
import { Button, Stack } from "@mui/material";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import Pagenation from "../components/Pagenation.jsx";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [numPage, setNumPage] = useState();
  const [pageLink, setPageLink] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getUser();
  }, []);

  function getUser(url = "/users") {
    setLoading(true);
    AxiosClient.get(url)
      .then(({ data }) => {
        setUsers(data.data);
        setNumPage(data.last_page);
        setPageLink(data.meta.links);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function deleteUser(user) {
    toast.success("user deleted", {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    AxiosClient.delete(`/users/${user}`).then(() => {
      getUser();
    });
  }

  return (
    <>
      {/* Same as */}
      <div className="w-full h-[90%] md:h-[100%]  flex flex-col items-center mt-10">
        <div className="w-full h-[100px] bg-white flex justify-between items-center p-5 shadow-md rounded-md">
          <h1 className="text-3xl text-black font-bold">Users</h1>
          <NavLink to={"/users/add"}>
            <Button
              size="small"
              sx={{ fontSize: "12px" }}
              variant="contained"
              endIcon={<PlusCircleIcon className="h-6 w-6 text-white" />}
            >
              Add New User
            </Button>
          </NavLink>
        </div>
        <DataTable users={users} loading={loading} deleteUser={deleteUser} />
        <Stack className="my-10 w-[70%] h-auto flex flex-wrap justify-center items-center">
          <Pagenation links={pageLink} getUser={getUser} />
        </Stack>
      </div>
    </>
  );
}
