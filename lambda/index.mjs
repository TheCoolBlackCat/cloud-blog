import { createClient } from "@supabase/supabase-js";
import { version as uuidVersion } from "uuid";
import { validate as uuidValidate } from "uuid";

const isUid = (uuid) => uuidValidate(uuid) && uuidVersion(uuid) === 4;

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const selectedColumns = "post_uid,title,body,created_at,users(user_uid,name)";

const mapResponse = (supabasePost) => {
  if (!supabasePost) return undefined;
  return {
    postUid: supabasePost.post_uid,
    title: supabasePost.title,
    body: supabasePost.body,
    createdAt: supabasePost.created_at,
    author: supabasePost.users.name,
  };
};

const handleRequest = async (event) => {
  const postUid = event.queryStringParameters?.postUid;
  console.log("postUid:", postUid);

  if (postUid) {
    if (!isUid(postUid)) {
      return { statusCode: 400, message: "Invalid postUid" };
    }
    // Get Single Post
    const { data, error } = await supabase
      .from("posts")
      .select(selectedColumns)
      .eq("post_uid", postUid)
      .maybeSingle();

    if (!data) {
      return { statusCode: 404, message: "No post with that UID exists" };
    }

    if (error) {
      console.error("supabase error:", error);
      return { statusCode: 500, message: "An error occured" };
    }

    return {
      statusCode: 200,
      body: { post: mapResponse(data) },
    };
  }

  // Get All Posts
  const { data, error } = await supabase.from("posts").select(selectedColumns);

  if (error) {
    console.error("supabase error:", error);
    return { statusCode: 500, message: "An error occured" };
  }
  return {
    statusCode: 200,
    body: { posts: data.map(mapResponse) },
  };
};

export const handler = async (event) => {
  return JSON.stringify(await handleRequest(event));
};
