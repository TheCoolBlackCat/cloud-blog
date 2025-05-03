import { useEffect, useState } from "react";
import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL;
const axiosClient = axios.create({
  baseURL,
  timeout: 1000,
});

const queryState = (
  url,
  handler,
  { params = undefined, defaultValue = undefined }
) => {
  const [apiState, setApiState] = useState([defaultValue, true, undefined]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axiosClient.get(url, { params });
        const res = handler(data);
        setApiState([res, false, undefined]);
      } catch (error) {
        setApiState([null, false, error]);
      }
    };
    // Prevents infinite requests
    if (apiState[1]) {
      fetchData();
    }
  }, [apiState, params]);

  return apiState;
};

export const getPosts = () => {
  return queryState(undefined, (data) => data.body.posts, { defaultValue: [] });
};

export const getPost = (postUid) => {
  return queryState(undefined, (data) => data.body.post, {
    params: { postUid },
  });
};
