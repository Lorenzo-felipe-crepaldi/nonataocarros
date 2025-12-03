import { Handler } from "@netlify/functions";
import { Client } from "pg";

export const handler: Handler = async () => {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    await client.connect();

    const result = await client.query("SELECT NOW()");
    
    return {
      statusCode: 200,
      body: JSON.stringify({
        status: "Conexão com Neon OK",
        hora: result.rows[0].now,
      }),
    };

  } catch (error: any) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error.message
      }),
    };
  } finally {
    await client.end();
  }
};
