import { Handler } from "@netlify/functions";
import bcrypt from "bcryptjs";
import { Client } from "pg";

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

client.connect();

const handler: Handler = async (event) => {
  if (!event.body) return { statusCode: 400, body: "No data" };
  const { email, senha } = JSON.parse(event.body);

  try {
    const res = await client.query(
      "SELECT id, nome, email, senha FROM usuarios WHERE email=$1",
      [email]
    );

    if (res.rows.length === 0)
      return { statusCode: 400, body: JSON.stringify({ error: "Usuário não encontrado" }) };

    const user = res.rows[0];
    const match = await bcrypt.compare(senha, user.senha);

    if (!match)
      return { statusCode: 400, body: JSON.stringify({ error: "Senha incorreta" }) };

    return { statusCode: 200, body: JSON.stringify({ user: { id: user.id, nome: user.nome, email: user.email } }) };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: JSON.stringify({ error: "Erro interno" }) };
  }
};

export { handler };
