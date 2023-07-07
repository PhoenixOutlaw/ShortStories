import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { loginApi, registerApi } from "../axios/apis/authentication.api";
import { RootContext } from "../context/RootContext";
import Styles from "../styles";
import notify from "../utils/Notify";
import { Loading } from "./Loader";

interface auth {
  login?: boolean;
}
export default function Auth({ login }: auth) {
  const loginFields = [
    {
      fieldName: "userName",
      type: "text",
      placeholder: "Username",
      rules: {},
    },
    {
      fieldName: "password",
      type: "password",
      placeholder: "Password",
      rules: {
        validate: (val: string) => {
          let re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{4,}$/;
          if (!re.test(val))
            return "Your password must contain min 8 letter, with at least a symbol, upper and lower case letters and a number";
        },
      },
    },
  ];
  const registerFields = [
    {
      fieldName: "name",
      type: "text",
      placeholder: "Name",
      rules: {},
    },
    ...loginFields,
    {
      fieldName: "confirmPassword",
      type: "password",
      placeholder: "Re-enter Password",
      rules: {
        validate: (val: string) => {
          if (watch("password") !== val) {
            return "Your passwords does not match";
          }
        },
      },
    },
    {
      fieldName: "profile_pic",
      type: "text",
      placeholder: "profile pic",
      rules: { required: false },
    },
  ];
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  const nav = useNavigate();
  const { setUser }: any = useContext(RootContext);

  const loginUser = useMutation(loginApi, {
    onSuccess: (data) => {
      notify.success("login successful");
      setUser(data);
    },
    onError: (error: Error) => {
      notify.error(error.message);
    },
  });
  const registerUser = useMutation(registerApi, {
    onSuccess: (data) => {
      notify.success("login successful");
      setUser(data);
    },
    onError: (error: Error) => {
      notify.error(error.message);
    },
  });

  const onRegister = (data: any) => {
    delete data.confirmPassword;
    if (!data.profile_pic.length) delete data.profile_pic;
    console.log(data);
    registerUser.mutate(data);
  };
  const onLogin = (data: any) => loginUser.mutate(data);
  const onSubmit = (data: any) => {
    login ? onLogin(data) : onRegister(data);
  };
  const onRedirect = () => {
    reset();
    nav(`/auth/${login ? "register" : "login"}`);
  };

  if (loginUser.isLoading || registerUser.isLoading)
    return (
      <div className="my-10">
        <Loading />
      </div>
    );
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-3 flex flex-col w-full items-center justify-center"
    >
      {(login ? loginFields : registerFields).map(
        ({ fieldName, rules, placeholder, type, ...v }: any) => (
          <div key={fieldName} className="w-4/5">
            <label htmlFor={fieldName} className="pl-1 text-xs capitalize">
              {fieldName}
            </label>
            <input
              type={type}
              // value={v?.value}
              placeholder={placeholder}
              {...register(fieldName, { required: true, ...rules })}
              className={`${Styles.input_type_1} ${
                errors[fieldName] ? "outline-red-500" : null
              } focus:shadow-lg w-full  `}
            />

            {errors[fieldName] && (
              <p className="text-red-500 text-xs ml-1">
                {errors[fieldName]?.message?.toString()}
              </p>
            )}
          </div>
        )
      )}
      <button
        type="submit"
        className="bg-twitter text-white px-3 py-1 rounded-xl self-center"
      >
        submit
      </button>
      <p className="text-xs capitalize mt-3">
        {!login ? "Already registered" : "dont have a account"} /{" "}
        <span className="text-twitter cursor-pointer" onClick={onRedirect}>
          {login ? "register" : "login"}
        </span>
      </p>
    </form>
  );
}
