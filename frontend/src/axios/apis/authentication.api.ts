import api from "../main";

export async function getLoggedUser() {
  const token = localStorage.getItem("token");
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  const gql = {
    query: "query user { getLoggedUser { id name userName role }} ",
  };
  const response = await api({ data: gql });
  if (response.data?.errors?.length) {
    throw new Error(response.data.errors[0].message);
  }
  const res = response.data.data.getLoggedUser;
  return res;
}

export async function loginApi(data: any) {
  const gql = {
    query:
      " mutation signIn($data: SignInInput!) {signIn(data:$data) { user {userName id role} jwttoken}} ",
    variables: {
      data,
    },
  };
  const response: any = await api({ data: gql });
  if (response?.data?.errors?.length) {
    throw new Error(response.data.errors[0].message);
  }
  const res = response.data.data.signIn;
  localStorage.setItem("token", res.jwttoken);
  return res.user;
}

export async function registerApi(data: any) {
  const gql = {
    query:
      "mutation register($data: RegisterInputs!) { register(data: $data) { user{userName role},jwttoken }}",
    variables: {
      data,
    },
  };
  const response: any = await api({ data: gql });
  if (response?.data?.errors?.length) {
    throw new Error(response.data.errors[0].message);
  }
  const res = response.data.data.register;
  localStorage.setItem("token", res.jwttoken);
  return res.user;
}
