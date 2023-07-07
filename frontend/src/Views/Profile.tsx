import { Avatar } from "antd";
import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import ava from "../assets/avatar.png";
import { getUser } from "../axios/apis/user.api";
import { Loading } from "../components/Loader";
import Tweet from "../components/Tweet";
import Styles from "../styles";

export default function Profile() {
  const { id }: any = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["user", id],
    queryFn: () => getUser(id),
    retry: false,
  });

  if (isLoading)
    return (
      <div className="flex  flex-col justify-center items-center h-3/4">
        <Loading />
      </div>
    );
  return (
    <div className="pb-14 px-5 md:w-5/6 md:mx-auto">
      <div className="flex flex-col justify-center items-center">
        <Avatar
        size={165}
          className="  text-3xl flex justify-center items-center object-contain"
          src={ava}
        >
          t
        </Avatar>
      </div>
      <div className={Styles.container}>
        {Object.keys(data).map((field) =>
          !["profile_pic", "stories"].includes(field) ? (
            <p key={field} className="capitalize text-lg font-semibold">
              {field}:{" "}
              <span className="ml-2">{data[field] ? data[field] : "..."}</span>
            </p>
          ) : null
        )}
      </div>
      <div className={`${Styles.container} py-9 text-lg`}>
        <p className="text-center  font-bold ">Stories</p>
        <div className=" flex flex-col space-y-5 mt-2 text-black text-xl items-center">
          {data?.stories.map((story: any) => (
            <Tweet key={story.id} data={story} />
          ))}
        </div>
      </div>
    </div>
  );
}
