import dayjs from "dayjs";
import { getPost } from "../api";
import relativeTime from "dayjs/plugin/relativeTime"

dayjs.extend(relativeTime)
const formatDate = d => dayjs(d).fromNow()

function Post({postUid}) {
  const [post, isLoading, error] = getPost(postUid);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Something went wrong!</h1>;
  }

  if (!post) {
    return <h1>Post not found!</h1>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <span>
        <strong>{post.author}</strong> - {formatDate(post.createdAt)}
      </span>
      <p>{post.body}</p>
      <a href="/">Back Home</a>
    </div>
  );
}

export default Post;
