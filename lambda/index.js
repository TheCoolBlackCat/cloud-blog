import { version as uuidVersion } from "uuid";
import { validate as uuidValidate } from "uuid";
import { selectSinglePost, selectAllPosts } from "./db.js";

const isUid = (uuid) => uuidValidate(uuid) && uuidVersion(uuid) === 4;

const handleRequest = async (event) => {
  const postUid = event.queryStringParameters?.postUid;
  console.log("postUid:", postUid);

  if (postUid) {
    if (!isUid(postUid)) {
      return { statusCode: 400, message: "Invalid postUid" };
    }
    // Get Single Post
    const { data, error } = await selectSinglePost(postUid);

    if (!data) {
      return { statusCode: 404, message: "No post with that UID exists" };
    }

    if (error) {
      console.error("DB Error:", error);
      return { statusCode: 500, message: "An error occured" };
    }

    return {
      statusCode: 200,
      body: { post: data },
    };
  }

  // Get All Posts
  const { data, error } = await selectAllPosts();

  if (error) {
    console.error("DB Error:", error);
    return { statusCode: 500, message: "An error occured" };
  }
  return {
    statusCode: 200,
    body: { posts: data },
  };
};

export const handler = async (event) => {
  const response = await handleRequest(event);
  return {
    ...response,
    body: JSON.stringify(
      response.message
        ? { message: response.message }
        : { body: response.body },
    ),
  };
};
