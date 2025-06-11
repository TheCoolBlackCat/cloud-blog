import { Client } from 'pg'
const client = new Client()

export const selectSinglePost = async (postUid) => {
//     await client.connect()
 
// const result = await client.query('SELECT $1::text as name', ['brianc'])
// console.log(result)
 
// await client.end()
  return {
    data: {
      postUid: "3585a829-5e04-43bd-ae3a-ff23c79ac34c",
      title: "My Awesome Post",
      body: "This is a post about how awesome it is to write a blog post!",
      createdAt: "2025-04-21T19:13:03.262695",
      author: "Steve Jobs",
    },
    error: undefined,
  };
};

export const selectAllPosts = async () => {
  return { data: [], error: undefined };
};
