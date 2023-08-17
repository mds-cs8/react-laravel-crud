import { Alert } from "@mui/material";
import AxiosClient from "../AxiosClient";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import { toast } from "react-toastify";
export default function UserForm() {
  const navigate = useNavigate();
  let { id } = useParams();
  const [user, setUser] = useState({
    id: null,
    name: "",
    age: "",
    email: "",
    password: "",
    password_confirmation: "",
    sex: "",
  });
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);

  if (id) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      setLoading(true);
      AxiosClient.get(`/users/${id}`)
        .then(({ data }) => {
          setLoading(false);
          setUser(data);
        })
        .catch(() => {
          setLoading(false);
        });
    }, []);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if (user.id) {
      AxiosClient.put(`/users/${user.id}`, user)
        .then(() => {
          navigate("/users");
          toast.success("user updated", {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        })
        .catch((err) => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
        });
    } else {
      AxiosClient.post("/users", user)
        .then(() => {
            toast.success("user added", {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
          navigate("/users");
        })
        .catch((err) => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
        });
    }
  };

  return (
    <div className="w-[95%] md:w-[500px] ">
      <div className="w-[100%] bg-white rounded-3xl mx-auto overflow-hidden shadow-xl">
        <div className="px-10 pt-2 pb-8 bg-white rounded-tr-4xl">
          {user.id && (
            <h1 className="text-2xl font-semibold text-gray-900">
              Update User: {user.name}
            </h1>
          )}
          {!user.id && (
            <h1 className="text-2xl font-semibold text-gray-900">
              Add New User
            </h1>
          )}
          <form className="mt-12" onSubmit={onSubmit}>
            {loading && (
              <div className="w-full flex justify-center items-center">
                <Loading />
              </div>
            )}

            {!loading && (
              <div>
                <div className="relative flex justify-between">
                  <input
                    value={user.name}
                    onChange={(e) => {
                      setUser({ ...user, name: e.target.value });
                    }}
                    id="name"
                    name="name"
                    type="text"
                    className="peer h-10 w-[48%] border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-rose-600"
                    placeholder="ahmed"
                  />
                  <label
                    htmlFor="name"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    name
                  </label>

                  <input
                    value={user.age}
                    onChange={(e) => {
                      setUser({ ...user, age: e.target.value });
                    }}
                    id="age"
                    name="age"
                    type="number"
                    className="peer h-10 w-[48%] border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-rose-600"
                    placeholder=""
                  />
                  <label
                    htmlFor="age"
                    className="absolute left-[52%] -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    age
                  </label>
                </div>
                <div className="mt-10 relative">
                  <input
                    value={user.email}
                    onChange={(e) => {
                      setUser({ ...user, email: e.target.value });
                    }}
                    id="email"
                    name="email"
                    type="email"
                    className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-rose-600"
                    placeholder="john@doe.com"
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Email address
                  </label>
                </div>

                <div className="mt-10 relative w-full flex justify-between">
                  <input
                    value={user.password}
                    onChange={(e) => {
                      setUser({ ...user, password: e.target.value });
                    }}
                    id="password"
                    name="password"
                    type="password"
                    className="peer h-10 w-[48%] border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-rose-600"
                    placeholder=""
                  />
                  <label
                    htmlFor="password"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Password
                  </label>

                  <input
                    value={user.password_confirmation}
                    onChange={(e) => {
                      setUser({
                        ...user,
                        password_confirmation: e.target.value,
                      });
                    }}
                    id="password_confirmation"
                    name="password_confirmation"
                    type="password"
                    className="peer h-10 w-[48%] border-b-2  border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-rose-600"
                    placeholder=""
                  />
                  <label
                    htmlFor="password_confirmation"
                    className="absolute left-[52%] -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    re-password
                  </label>
                </div>
                <div className="mt-10  ">
                  <select
                    onChange={(e) => {
                      setUser({ ...user, sex: e.target.value });
                    }}
                    value={user.sex}
                    name="sex"
                    id="sex"
                    className="peer h-10 w-[48%] border-b-2  border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-rose-600"
                  >
                    <option value="">choose gender</option>
                    <option value="male">male</option>
                    <option value="female">female</option>
                  </select>
                </div>

                {errors && (
                  <Alert
                    variant="filled"
                    severity="error"
                    sx={{ width: "100%" }}
                  >
                    {Object.keys(errors).map((key) => (
                      <p className="font-bold" key={key}>
                        * {errors[key][0]}
                      </p>
                    ))}
                  </Alert>
                )}

                <button className="mt-10 px-4 py-2 rounded bg-green-500 hover:bg-green-700 text-white font-semibold text-center block w-full focus:outline-none cursor-pointer">
                  Add
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
