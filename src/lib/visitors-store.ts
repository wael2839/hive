import { createPool, type Pool, type RowDataPacket } from "mysql2/promise";

type VisitorRow = RowDataPacket & { total: number };

let initialized = false;

function getPool(): Pool {
  const g = globalThis as typeof globalThis & { __hiveMysqlPool?: Pool };
  if (g.__hiveMysqlPool) return g.__hiveMysqlPool;

  const host = process.env.MYSQL_HOST;
  const user = process.env.MYSQL_USER;
  const database = process.env.MYSQL_DATABASE;
  if (!host || !user || !database) {
    throw new Error("Missing MySQL env vars: MYSQL_HOST, MYSQL_USER, MYSQL_DATABASE");
  }

  g.__hiveMysqlPool = createPool({
    host,
    port: Number(process.env.MYSQL_PORT || "3306"),
    user,
    password: process.env.MYSQL_PASSWORD,
    database,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });
  return g.__hiveMysqlPool;
}

async function ensureSchema() {
  if (initialized) return;
  const pool = getPool();
  await pool.query(`
    CREATE TABLE IF NOT EXISTS site_visitors (
      id TINYINT UNSIGNED NOT NULL PRIMARY KEY,
      total BIGINT UNSIGNED NOT NULL DEFAULT 0,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);
  await pool.query("INSERT IGNORE INTO site_visitors (id, total) VALUES (1, 0)");
  initialized = true;
}

export async function getVisitorTotal(): Promise<number> {
  await ensureSchema();
  const pool = getPool();
  const [rows] = await pool.query<VisitorRow[]>("SELECT total FROM site_visitors WHERE id = 1 LIMIT 1");
  const total = rows[0]?.total ?? 0;
  return Number.isFinite(total) && total >= 0 ? Math.floor(total) : 0;
}

export async function incrementVisitorTotal(): Promise<number> {
  await ensureSchema();
  const pool = getPool();
  await pool.query("UPDATE site_visitors SET total = total + 1 WHERE id = 1");
  const [rows] = await pool.query<VisitorRow[]>("SELECT total FROM site_visitors WHERE id = 1 LIMIT 1");
  const total = rows[0]?.total ?? 0;
  return Number.isFinite(total) && total >= 0 ? Math.floor(total) : 0;
}
