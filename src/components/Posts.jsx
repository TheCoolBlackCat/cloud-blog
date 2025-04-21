import { getPosts } from "../api";

function Posts() {
  const [posts, isLoading, error] = getPosts();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Something went wrong!</p>;
  }

  return (
    <div>
      <h1>All Posts</h1>
      <div className="posts">
        {posts.map((post) => {
          return (
            <div key={post.postUid}>
              <h3>{post.title}</h3>
              <p>{post.body.slice(0, 8)}...</p>
              <a href={`/?post=${post.postUid}`}>Read More</a>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Posts;
