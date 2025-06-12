import { Client } from "pg";

const selectedColumns = "post_uid, title, body, created_at, u.name";

const connectAndGetClient = async () => {
  const client = new Client({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: { rejectUnauthorized: false },
  });

  await client.connect();

  return client;
};

const mapRecord = (record) => {
  if (!record) return undefined;
  return {
    postUid: record.post_uid,
    title: record.title,
    body: record.body,
    createdAt: record.created_at,
    author: record.name,
  };
};
export const selectSinglePost = async (postUid) => {
  if (!postUid) {
    return { data: undefined, error: "postUid was undefined." };
  }

  const client = await connectAndGetClient();

  try {
    const result = await client.query(
      `SELECT ${selectedColumns} FROM posts p
    INNER JOIN users u ON u.user_uid = p.user_uid
    WHERE post_uid = $1
    LIMIT 1`,
      [postUid],
    );

    if (result.rowCount === 0) {
      return { data: undefined, error: "No post with that UID exists" };
    }

    const mappedResult = mapRecord(result.rows.at(0));
    return {
      data: mappedResult,
      error: undefined,
    };
  } catch (error) {
    return {
      data: undefined,
      error: error.message || "An error occurred while fetching posts",
    };
  } finally {
    await client.end();
  }
};

export const selectAllPosts = async () => {
  const client = await connectAndGetClient();

  try {
    const result = await client.query(
      `SELECT post_uid, title, body, created_at, u.user_uid, u.name FROM posts p
    INNER JOIN users u ON u.user_uid = p.user_uid
    LIMIT 100`,
    );
    const mappedResult = result.rows.map((record) => mapRecord(record));

    return { data: mappedResult, error: undefined };
  } catch (error) {
    return {
      data: undefined,
      error: error.message || "An error occurred while fetching posts",
    };
  } finally {
    await client.end();
  }
};
