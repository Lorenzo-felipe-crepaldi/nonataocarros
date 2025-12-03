import { Handler } from "@netlify/functions";
import { Client } from "pg";

export const handler: Handler = async () => {
  try {
    const client = new Client({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false }
    });

    await client.connect();

    const result = await client.query("SELECT NOW()");
    await client.end();

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Conectado ao banco com sucesso!",
        hora_do_banco: result.rows[0].now,
      }),
    };

  } catch (error: any) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error.message,
      }),
    };
  }
};
