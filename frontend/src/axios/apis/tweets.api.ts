import api from "../main";

export async function getAllTweets(page: number, limit: number) {
  const gql = {
    query: `query  {allStories(page:${page}, limit:${limit}){items{id,title,content,created_at,user{userName}}meta{totalItems,itemCount,totalPages}}}`,
  };
  const response = await api({ data: gql });
  if (response?.data?.errors?.length) {
    throw new Error(response.data.errors[0].message);
  }
  const res = response.data.data.allStories;
  return res;
}

export async function getTweet(id: string) {
  const gql = {
    query: `query  {getstory(id:${id}){id,title,content,created_at}}`,
  };
  const response = await api({ data: gql });
  if (response?.data?.errors?.length) {
    throw new Error(response.data.errors[0].message);
  }
  const res = response.data.data.getstory; 
  return res;
}

export async function createNewTweet(data: { title: string; content: string }) {
  const gql = {
    query: "mutation addStory($data: AddStoryInput!) {addStory(data: $data)}",
    variables: {
      data,
    },
  };
  const response = await api({ data: gql });
  if (response?.data?.errors?.length) {
    throw new Error(response.data.errors[0].message);
  }
  const res = response.data.data.addStory;
  return res;
}
