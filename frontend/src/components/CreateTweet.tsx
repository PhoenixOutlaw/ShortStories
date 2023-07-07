import React, { useContext } from "react";
import { Avatar } from "antd";
import Styles from "../styles";
import { useForm } from "react-hook-form";
import { RootContext } from "../context/RootContext";
import { useMutation, useQueryClient } from "react-query";
import { createNewTweet } from "../axios/apis/tweets.api";
import notify from "../utils/Notify";
import { Loading } from "./Loader";
import { AxiosError } from "axios";

type Props = {
  handleOk?: () => void;
  onCancel?: () => void;
};
export default function CreateTweet({handleOk}:Props) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  const queryClient = useQueryClient();
  const { User }: any = useContext(RootContext);
  const createTweet = useMutation(createNewTweet, {
    onSuccess: () => {
      notify.success("new tweet created successfully");
      handleOk?.()
      queryClient.invalidateQueries({ queryKey: ["Stories", 1] });
    },
    onError: (err: AxiosError<{ message: string }>) => {
      notify.error(err.response?.data.message ?? "something went wrong");
    },
  });

  const onSubmit = (data: any) => {
    createTweet.mutate(data);
    reset();
  };
  return (
    <div className="bg-gray-200 rounded-lg flex items-stretch space-x-4 p-4 pb-8 w-full md:w-5/6">
      <div>
        <Avatar>{User?.userName?.[0]}</Avatar>
      </div>
      {createTweet.isLoading ? (
        <Loading />
      ) : (
        <form
          className="space-y-3 flex flex-col w-full text-base"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            type="text"
            placeholder="title"
            className={"bg-gray-100" + Styles.input_type_1}
            {...register("title", { required: true })}
          />
          <textarea
            placeholder="Write your story"
            className={
              "bg-gray-100 w-full resize-y h-20 max-h-28 " + Styles.input_type_1
            }
            {...register("content", { required: true })}
          />
          <button className="self-end bg-twitter rounded-xl px-3 py-1 text-white text-sm mr-4">
            submit
          </button>
        </form>
      )}
    </div>
  );
}
