import { Handler } from "@netlify/functions";
import bcrypt from "bcryptjs";
import { Client } from "pg";

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

client.connect();

const handler: Handler = async (event) => {
  if (!event.body) return { statusCode: 400, body: "No data" };
  const { email, senha, nome } = JSON.parse(event.body);

  try {
    const hash = await bcrypt.hash(senha, 10);

    const result = await client.query(
      "INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3) RETURNING id, nome, email",
      [nome, email, hash]
    );

    return {
      statusCode: 200,
      body: JSON.stringify({ user: result.rows[0] }),
    };
  } catch (err: any) {
    if (err.code === "23505") {
      return { statusCode: 400, body: JSON.stringify({ error: "Email já existe" }) };
    }
    console.error(err);
    return { statusCode: 500, body: JSON.stringify({ error: "Erro interno" }) };
  }
};

export { handler };
