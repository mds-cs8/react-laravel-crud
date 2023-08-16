// @ts-ignore
import { NavLink } from "react-router-dom";
import AxiosClient from "../AxiosClient";
import { createRef, useState } from "react";
import { useStateContext } from "../context/ContextProviader.jsx";
import { Alert } from "@mui/material";

export default function Login() {
  const [errorMsg, setErrorMsg] = useState(null);
  const { setUser, setToken } = useStateContext();
  const emailRef = createRef();
  const passwordRef = createRef();
  const onSubmit = (ev) => {
    ev.preventDefault();

    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    AxiosClient.post("/login", payload)
      .then(({ data }) => {
        setUser(data.user);
        setToken(data.token);
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          setErrorMsg(response.data.errors);
        }
      });
  };
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="w-[95%] md:w-[500px] my-5">
        <div className="w-[100%] bg-white rounded-3xl mx-auto overflow-hidden shadow-xl">
          <div className="relative h-48 bg-[#023e8a]  rounded-bl-4xl">
            <svg
              className="absolute bottom-0"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1440 320"
            >
              <path
                fill="#ffffff"
                fillOpacity="1"
                d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,85.3C672,75,768,85,864,122.7C960,160,1056,224,1152,245.3C1248,267,1344,245,1392,234.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              ></path>
            </svg>
          </div>
          <div className="px-10 pt-4 pb-8 bg-white rounded-tr-4xl">
            <h1 className="text-2xl font-semibold text-gray-900">
              Login to your account
            </h1>
            <form className="mt-12" onSubmit={onSubmit}>
              <div className="relative">
                <input
                  ref={emailRef}
                  id="email"
                  name="email"
                  type="text"
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
              <div className="mt-10 relative">
                <input
                  ref={passwordRef}
                  id="password"
                  type="password"
                  name="password"
                  className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-rose-600"
                  placeholder="Password"
                />
                <label
                  htmlFor="password"
                  className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                >
                  Password
                </label>
              </div>

              {errorMsg && (
                <Alert variant="filled" severity="error" sx={{ width: "100%" }}>
                  {Object.keys(errorMsg).map((key) => (
                    <p className="font-bold" key={key}>
                      * {errorMsg[key][0]}
                    </p>
                  ))}
                </Alert>
              )}

              <button className="mt-10 px-4 py-2 rounded bg-green-500 hover:bg-green-700 text-white font-semibold text-center block w-full focus:outline-none cursor-pointer">
                Log in
              </button>
            </form>
            <p className="mt-4 block text-sm text-center font-medium">
              Do not have account ?{" "}
              <NavLink to="/signup" className=" text-rose-600 hover:underline ">
                create account
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
