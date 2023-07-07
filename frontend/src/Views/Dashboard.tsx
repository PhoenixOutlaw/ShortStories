import { Avatar, Pagination } from "antd";
import React from "react";
import { useQuery } from "react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getAllUsers } from "../axios/apis/user.api";
import { Loading } from "../components/Loader";
import Styles from "../styles";

export default function Dashboard() {
  const searchParams = useSearchParams()[0];
  const page = parseInt(searchParams.get("page") ?? "1");
  const LIMIT = 5;
  const nav = useNavigate();
  const { data, isLoading } = useQuery({
    queryKey: ["users", page],
    queryFn: () => getAllUsers(page, LIMIT),
  });
  const onPageChange = (page: number, pageSize: number) => {
    nav(`/dashboard?page=${page}`);
  };
  if (isLoading)
    return (
      <div className="flex  flex-col justify-center items-center h-3/4">
        <Loading />
      </div>
    );

  return (
    <div className="text-base px-5 pb-2 md:w-5/6 md:mx-auto">
      <p className={`${Styles.container} text-center text-xl`}>users</p>
      <div className="mb-8 flex flex-col items-center">
        {data?.items.map((user: any) =>
          user.role === "admin" ? null : <UserCard data={user} key={user.id} />
        )}
        <Pagination
          className="mt-8"
          defaultCurrent={1}
          current={data?.meta.currentPage}
          pageSize={LIMIT}
          total={data?.meta.totalItems-1}
          onChange={onPageChange}
          disabled={page > data?.meta.totalPages}
        />
      </div>
    </div>
  );
}

function UserCard({ data }: any) {
  const nav = useNavigate();
  const onClick = () => nav(`/profile/${data.id}`);
  return (
    <div
      className={`${Styles.container} w-full flex space-x-10 items-center cursor-pointer shadow-black hover:shadow-xl `}
      onClick={onClick}
    >
      <div className="ml-14">
        <Avatar className=" h-16 w-16 flex justify-center items-center">
          {data?.userName[0]}
        </Avatar>
      </div>
      <div>
        {Object.keys(data).map((field) =>
          !["profile_pic"].includes(field) ? (
            <p key={field} className="capitalize text-lg font-semibold">
              {field}:{" "}
              <span className="ml-2">{data[field] ? data[field] : "..."}</span>
            </p>
          ) : null
        )}
      </div>
    </div>
  );
}
