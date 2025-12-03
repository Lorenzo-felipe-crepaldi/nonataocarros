import { Handler } from "@netlify/functions";
import { getPool } from "./db";

export const handler: Handler = async () => {
  try {
    const pool = getPool();
    const result = await pool.query("SELECT * FROM carros");
    return {
      statusCode: 200,
      body: JSON.stringify(result.rows),
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err }) };
  }
};
