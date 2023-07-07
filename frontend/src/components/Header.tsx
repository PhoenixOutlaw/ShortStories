import { useContext, useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate} from "react-router-dom";
import logo from "../assets/dogo.png";
import { RootContext } from "../context/RootContext";
import { Dropdown, Avatar } from "antd";
import avatar from "../assets/avatar.png";
import Icon, {
  DollarCircleFilled,
  HomeFilled,
  SearchOutlined,
  SettingFilled,
  UserOutlined,
} from "@ant-design/icons";
import useScrollDirection from "../utils/Scroll";

export default function Header() {
  const { setUser, User }: any = useContext(RootContext);
  const LINKS = [
    {
      title: "home",
      authorized: [],
      icon: HomeFilled,
      to: "/home",
    },
    {
      title: "search",
      authorized: [],
      icon: SearchOutlined,
      to: "/",
    },
    {
      title: "profile",
      authorized: [],
      icon: UserOutlined,
      to: `/profile/${User.id}`,
    },
    {
      title: "dashboard",
      authorized: ["admin"],
      icon: DollarCircleFilled,
      to: "/dashboard",
    },
    {
      title: "settings",
      authorized: [],
      icon: SettingFilled,
      to: "/",
    },
  ];
  const nav = useNavigate();
  const route = useLocation().pathname.split("/")[1];
  const [animation, setanimation] = useState(false)
  const HoverOptions: any = [
    {
      key: "1",
      label: <Link to={`/profile/${User.id}`}>Profile</Link>,
    },
    {
      key: "2",
      label: (
        <button
          className="bg-sky-400 px-2 rounded-lg text-white"
          onClick={logOut}
        >
          Log Out
        </button>
      ),
    },
  ];
  function logOut() {
    localStorage.removeItem("token");
    setUser(null);
  }
  useEffect(() => {
   setanimation(true)
  }, [])
  
  return (
    <>
      <TopHeader HoverOptions={HoverOptions} />

      <div className={navbarContainerClassNames}>
        <div className="flex sm:space-y-5 items-center  lg:items-start sm:flex-col w-fit">
          <img
            src={logo}
            alt="logo"
            className="h-20 w-20 cursor-pointer mb-32 rounded-full  border-2 object-cover hidden sm:inline"
            onClick={() => nav("/home")}
          />
          {LINKS.map(({ icon, ...item }, i) => {
            if (!item.authorized.length || item.authorized.includes(User.role))
              return (
                <NavLink
                  key={i}
                  to={item.to}
                  className={`flex space-x-5 text-white items-center  ${
                    route.includes(item.title) ? "bg-sky-400" : null
                  } hover:bg-sky-400 px-6 py-2 rounded-3xl w-auto lg:w-full`}
                  style={{ transition: "1s" }}
                >
                  {icon && (
                    <Icon
                      style={{ fontSize: "30px" }}
                      component={icon as React.ForwardRefExoticComponent<any>}
                    />
                  )}
                  <p className="capitalize text-xl font-semibold hidden lg:inline">
                    {item.title}
                  </p>
                </NavLink>
              );
            return null;
          })}
        </div>
        <Dropdown
          menu={{ items: HoverOptions }}
          placement="top"
          trigger={["click"]}
          className=" relative cursor-pointer hidden sm:inline "
        >
          <div className=" font-semibold text-white text-xl space-x-3 items-center bg-gray-800 rounded-full w-fit lg:w-full  lg:pr-3 lg:flex">
            <Avatar size={55} icon={<img src={avatar} alt="avatar" />} />
            <div className="hidden lg:inline">
              <p className="capitalize">{User.name}</p>
              <p className="text-sm ml-1">@{User.userName}</p>
            </div>
          </div>
        </Dropdown>
      </div>
    </>
  );
}

export function TopHeader({ HoverOptions }: any) {
  const scrollDirection = useScrollDirection();
  const route = useLocation().pathname.split("/").slice(1);
  const nav = useNavigate();

  return (
    <div
      className={`sticky z-30 ${
        scrollDirection === "down" ? "-top-20" : "top-0"
      } h-20 bg-sky-300 px-10 flex items-center justify-between sm:hidden transition-all`}
    >
      <img src={logo} alt="" className="w-14 h-14 rounded-full object-cover" onClick={()=>nav('/home')}/>
      <p className="text-2xl font-semibold capitalize">{route[0]}</p>
      <Dropdown
        menu={{ items: HoverOptions }}
        placement="bottomLeft"
        trigger={["click"]}
        className=" relative cursor-pointer sm:hidden "
      >
          <Avatar size={55} icon={<img src={avatar} alt="avatar" />} />
      </Dropdown>{" "}
    </div>
  );
}
const smNavbarContainerClassNames =
  "z-30 flex fixed bottom-0 w-full h-fit bg-twitter items-center justify-evenly py-3  transition-all ";
const lgContainerClassNames = " lg:items-start lg:pl-20 ";
const mdNavbarContainerClassNames =
  "sm:sticky sm:pb-14 sm:w-auto sm:top-0 sm:h-screen sm:flex-col sm:justify-between sm:px-5 sm:py-8";
const navbarContainerClassNames =
  smNavbarContainerClassNames +
  mdNavbarContainerClassNames +
  lgContainerClassNames;
