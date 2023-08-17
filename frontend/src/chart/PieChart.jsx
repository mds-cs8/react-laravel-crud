import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";
import { plugins } from "chart.js/auto";
import { useEffect, useState } from "react";
import AxiosClient from "../AxiosClient";

// eslint-disable-next-line react/prop-types
export default function PieChart() {
  const [male, setMale] = useState([]);
  const [female, setFemale] = useState([0]);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getUser();
  }, [users]);

  function getUser() {
    AxiosClient.get("/users/all")
      .then(({ data }) => {
        setUsers(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    let m = users.filter((m) => m.sex == "male");
    setMale(m);
    let f = users.filter((m) => m.sex == "female");
    setFemale(f);
  }, [users]);

  return (
    <div className="w-[250px] h-[270px] lg:w-[350px] lg:h-[350px] p-6  border-gray-200 rounded-lg bg-white  dark:bg-gray-800 dark:border-gray-700 flex flex-col justify-around items-center shadow-lg">
      <h1 className="text-black text-lg font-black">Users Gander</h1>
      <Doughnut
        datasetIdKey="id"
        data={{
          labels: ["Male", "Female"],

          datasets: [
            {
              data: [male.length, female.length],
            },
          ],
        }}
        options={{
          borderColor: "",

          animation: {
            animateRotate: true,
            animateScale: true,
          },
          spacing: 5,
          plugins: {
            legend: {
              display: {},
            },
          },
        }}
      />
    </div>
  );
}
