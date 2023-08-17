import { Card, Typography } from "@material-tailwind/react";
import Loading from "../components/Loading";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { TrashIcon } from "@heroicons/react/24/solid";
import { NavLink } from "react-router-dom";
import Modals from "../components/Modals";
import { useState } from "react";
import AxiosClient from "../AxiosClient";

const TABLE_HEAD = ["ID", "NAME", "EMAIL", "AGE", "GANDER ", "ACTION"];

export default function DataTable({ users, loading, deleteUser }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [id, setId] = useState("");
  return (
    <>
      <Modals
        open={open}
        handleOpen={handleOpen}
        handleClose={handleClose}
        deleteUser={deleteUser}
        userId={id}
      />
      <Card className=" min-h-[45%] w-full overflow-scroll xl:overflow-hidden mt-10 shadow-md rounded-md">
        <table className="w-full min-w-max table-auto text-left">
          <thead className="bg-[#d5bdaf]">
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                >
                  <Typography
                    variant="small"
                    color="black"
                    className="font-normal leading-none font-bold"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading && (
              <div className="absolute top-[50%] left-[50%]">
                <Loading />
              </div>
            )}

            {!loading &&
              users.map((item, index) => {
                const isLast = index === users.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={item.id}>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {item.id}
                      </Typography>
                    </td>
                    <td className={`${classes} bg-blue-gray-50/50`}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {item.name}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {item.email}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {item.age}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {item.sex}
                      </Typography>
                    </td>
                    <td className={`${classes} bg-blue-gray-50/50`}>
                      <Typography
                        as="a"
                        variant="small"
                        color="blue-gray"
                        className="font-medium flex cursor-pointer"
                      >
                        <NavLink to={`/users/${item.id}`}>
                          <PencilSquareIcon className="h-6 w-6 text-blue-800 mr-6" />
                        </NavLink>
                        <TrashIcon
                          key={item.id}
                          className="h-6 w-6 text-red-500"
                          onClick={() => {
                            handleOpen();
                            setId(item.id);
                          }}
                        />
                      </Typography>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </Card>
    </>
  );
}
