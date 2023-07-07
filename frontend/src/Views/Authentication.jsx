import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import logo from "../assets/logo.png";
import { RootContext } from "../context/RootContext";

export default function Authentication() {
  const { User } = useContext(RootContext);
  if(User)
  return  <Navigate to='/home'/>

  return (
    <div className="bg-gray-50 h-screen w-screen justify-center items-center flex">
      <div className="relative overflow-hidden flex flex-col items-center justify-center w-4/6 bg-white py-6 px-3 rounded-xl shadow-lg max-w-lg">
        <div className="">
          <div />
          <img
            src={logo}
            alt=""
            className="w-20 h-20 mb-4 relative rounded-full"
          />
        </div>
        <Outlet />
      </div>
    </div>
  );
}
