import { useEffect, useState } from "react";
import PieChart from "../chart/PieChart";
import { UserIcon } from "@heroicons/react/24/solid";
import AxiosClient from "../AxiosClient";
import Loading from "../components/Loading";

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(1);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    AxiosClient.get("/users")
      .then(({ data }) => {
        setUsers(data.data);
        setTotal(data.meta.total);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="w-full h-[90%] md:h-[50%]  flex flex-col md:flex-row  justify-around items-center">
    <div className="w-[250px] h-[270px] lg:w-[350px] lg:h-[350px] p-6  border-gray-200 rounded-lg bg-white  dark:bg-gray-800 dark:border-gray-700 flex flex-col justify-around items-center shadow-lg">
        <div>
          <UserIcon className="h-[150px] w-[150px] text-[#219ebc]" />
        </div>
        <div>
          {loading && <Loading />}
          {!loading && (
            <h1 className="text-3xl font-bold text-gray-600">Users: {total}</h1>
          )}
        </div>
      </div>
      <PieChart />
    </div>
  );
}
