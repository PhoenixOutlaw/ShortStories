import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { RootContext } from "../context/RootContext";
import Forbidden from "../Views/Forbidden";

export default function AuthGuard({ element, role = [] }) {
  const { User } = useContext(RootContext);
  if(!User)
      return <Navigate to='/auth/login'/>

  if(!role.length)
      return element;

  else if(["admin"].includes(User.role))
      return element;

  else if(role.includes(User.role))
      return element;

  else
      return <Forbidden/>
}
