import { useEffect, useState } from "react";
import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL;
const axiosClient = axios.create({
  baseURL,
  timeout: 1000,
});

export const getPosts = () => {
  const [apiState, setApiState] = useState([[], true, undefined]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axiosClient.get();
        setApiState([data.body.posts, false, undefined]);
      } catch (error) {
        setApiState([[], false, error]);
      }
    };
    // Prevents infinite requests
    if (apiState[1]) {
      fetchData();
    }
  }, [apiState]);

  return apiState;
};

export const getPost = (postUid) => {
  const [apiState, setApiState] = useState([undefined, true, undefined]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axiosClient.get(undefined, { params: {postUid} });
        setApiState([data.body.post, false, undefined]);
      } catch (error) {
        setApiState([null, false, error]);
      }
    };
    // Prevents infinite requests
    // This will prevent changing the param on the fly, but thats okay here
    if (apiState[1]) {
      fetchData();
    }
  }, [apiState, postUid]);

  return apiState;
};
