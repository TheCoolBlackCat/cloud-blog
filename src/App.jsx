import "./App.css";
import Posts from "./components/Posts";
import Post from "./components/Post";

const getParams = () => {
  const location = window.location.search; // '?a=123&b=hello'
  if (!location) {
    return {};
  }
  const pairs = location.slice(1).split("&"); // ['a=123', 'b=hello']
  const entries = pairs.map((x) => x.split("=")); // [['a', '123'], ['b', 'hello']]
  return Object.fromEntries(entries); // {a: '123', 'b': 'hello'}
};

function App() {
  const { post } = getParams();

  if (post) {
    return <Post postUid={post} />;
  }

  return <Posts />;
}

export default App;
