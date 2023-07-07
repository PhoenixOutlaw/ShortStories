import { Pagination } from "antd";
import React, { useContext } from "react";
import { useQuery } from "react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getAllTweets } from "../axios/apis/tweets.api";
import CreateTweet from "../components/CreateTweet";
import { Loading } from "../components/Loader";
import Tweet from "../components/Tweet";
import { RootContext } from "../context/RootContext";
import notify from "../utils/Notify";
import PopupModel from "../components/Popupmodel";

export default function Stories() {
  const { User }: any = useContext(RootContext);
  const nav = useNavigate();
  const searchParams = useSearchParams()[0];
  const page = parseInt(searchParams.get("page") ?? "1");
  const LIMIT = 5;
  const { isLoading, data, isError } = useQuery({
    queryKey: ["Stories", page],
    queryFn: () => getAllTweets(page, LIMIT),
    onError(error) {
      notify.error((error as Error).message);
    },
    enabled: User ? true : false,
    retry: false,
  });

  const onPageChange = (page: number, pageSize: number) => {
    nav(`/home?page=${page}`);
  };
  return (
    <div className="px-5 pb-3 ">
      <div className="pb-5 border-gray-50 border-b-4 flex flex-col items-center">
        <div className="w-full block sm:hidden">
          <PopupModel Element={CreateTweet} />
        </div>
        <div className="w-full hidden sm:flex sm:justify-center">
          <CreateTweet />
        </div>
      </div>
      <div>
        {isLoading ? (
          <Loading />
        ) : (
          <div className="tweets_list my-3  pb-28 space-y-4 flex flex-col  items-center">
            {data?.items.map((item: any) => (
              <Tweet key={item.id} data={item} />
            ))}
            <Pagination
              defaultCurrent={1}
              current={data?.meta.currentPage}
              pageSize={LIMIT}
              total={data?.meta.totalItems}
              onChange={onPageChange}
              disabled={page > data?.meta.totalPages}
            />
          </div>
        )}
      </div>
    </div>
  );
}
