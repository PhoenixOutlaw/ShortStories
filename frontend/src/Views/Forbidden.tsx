import React from "react";
import { useNavigate} from "react-router-dom";
import img from "../assets/forbidden.png";
export default function Forbidden() {
    const nav = useNavigate()
  return (
    <div className="flex  flex-col justify-center items-center h-screen">
      <img className="w-3/4" src={img} alt="" />
      <button className="rounded-full bg-twitter px-3 py-1 capitalize text-white"
      onClick={()=>nav(-1)}
      >
        go back
      </button>
    </div>
  );
}
