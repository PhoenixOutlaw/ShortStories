import { useState } from "react";
import { useQuery } from "react-query";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import { getLoggedUser } from "./axios/apis/authentication.api";
import Loader, { Loading } from "./components/Loader";
import { RootContext } from "./context/RootContext";
import router from "./Router/main";
import notify from "./utils/Notify";
function App() {
  const token = localStorage.getItem("token");
  const [User, setUser] = useState(null);
  const { isLoading, isError, error } = useQuery({
    queryKey: "User",
    queryFn: getLoggedUser,
    onSuccess(data) {
      setUser(data);
      notify.success("Welcome back");
    },
    onError(error: any) {
      notify.error(error.message);
    },
    enabled: token && !User ? true : false,
    retry: false,
  });
  if (isLoading) return <Loader />;

  return (
    <RootContext.Provider value={{ User, setUser }}>
      <RouterProvider router={router} fallbackElement={<Loading />} />
    </RootContext.Provider>
  );
}

export default App;
