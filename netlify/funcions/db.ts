import { Pool } from 'pg';

let pool: Pool | null = null;

export function getPool() {
  if (pool) return pool;

  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false } as any,
  });

  return pool;
}
