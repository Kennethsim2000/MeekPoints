import { Client } from "pg";

const connectionString = process.env.DATABASE_URL || "";

const clientPromise = async () => {
  // clientPromise is a function that returns a promise containing this client object
  const client = new Client({
    connectionString,
  });
  await client.connect();
  return client;
};

export default clientPromise;
