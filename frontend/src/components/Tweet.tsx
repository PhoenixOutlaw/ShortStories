import { Avatar } from "antd";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { RootContext } from "../context/RootContext";

export default function Tweet({ data }: any) {
  const { title, user, content, created_at } = data;
  const {User}:any = useContext(RootContext)
  const date = new Date(created_at).toDateString();
  const nav = useNavigate();
  const onClick = () => nav(`/profile/${user.id}`);
  return (
    <div className="bg-gray-200 rounded-xl flex flex-col px-4 w-full md:w-5/6">
        <div className="flex py-3 space-x-3">
          <Avatar className="cursor-pointer capitalize" onClick={onClick}>
            {user?user.userName[0]:User.userName[0]}
          </Avatar>

          <div className="capitalize">
            <p className="font-medium">
              {user ? user.userName : "You"}
            </p>
            <p className="text-sm font-semibold text-gray-600 ">{title}</p>
          </div>
        </div>
      <div
        className="bg-gray-300 py-2 px-3 rounded-xl w-full font-medium pb-8 "
      >
        <p>{content}</p>
      </div>
      <p className="font-semibold text-gray-600 self-end py-2 px-2">{date}</p>
    </div>
  );
}
