import { Handler } from "@netlify/functions";
import { getPool } from "./db";

export const handler: Handler = async (event) => {
  try {
    const { modelo, marca, ano } = JSON.parse(event.body || "{}");
    const pool = getPool();
    const result = await pool.query(
      "INSERT INTO carros (modelo, marca, ano) VALUES ($1, $2, $3) RETURNING *",
      [modelo, marca, ano]
    );
    return { statusCode: 200, body: JSON.stringify(result.rows[0]) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err }) };
  }
};
