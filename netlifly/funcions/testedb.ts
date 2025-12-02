import { Handler } from '@netlify/functions';
import { getPool } from './db';

export const handler: Handler = async () => {
  try {
    const pool = getPool();
    const result = await pool.query('SELECT NOW()'); // testa a conexão
    return {
      statusCode: 200,
      body: JSON.stringify({ time: result.rows[0].now }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Erro ao conectar no banco', details: err }),
    };
  }
};
