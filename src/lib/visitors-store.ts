import { createPool, type Pool, type RowDataPacket } from "mysql2/promise";

type VisitorRow = RowDataPacket & { total: number };

let initialized = false;

function fromEnv(...names: string[]): string | undefined {
  for (const name of names) {
    const raw = process.env[name];
    if (!raw) continue;
    const v = raw.trim();
    if (v) return v;
  }
  return undefined;
}

function getPool(): Pool {
  const g = globalThis as typeof globalThis & { __hiveMysqlPool?: Pool };
  if (g.__hiveMysqlPool) return g.__hiveMysqlPool;

  const host = fromEnv("MYSQL_HOST", "DB_HOST");
  const user = fromEnv("MYSQL_USER", "DB_USER");
  const database = fromEnv("MYSQL_DATABASE", "DB_DATABASE", "DB_NAME");
  const password = fromEnv("MYSQL_PASSWORD", "DB_PASSWORD");
  const portRaw = fromEnv("MYSQL_PORT", "DB_PORT") ?? "3306";
  const port = Number(portRaw);
  if (!host || !user || !database) {
    throw new Error(
      "Missing MySQL env vars: MYSQL_HOST/MYSQL_USER/MYSQL_DATABASE (or DB_HOST/DB_USER/DB_DATABASE)",
    );
  }
  if (!Number.isFinite(port) || port <= 0) {
    throw new Error(`Invalid MySQL port: ${portRaw}`);
  }

  g.__hiveMysqlPool = createPool({
    host,
    port,
    user,
    password,
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
  const total = Number(rows[0]?.total ?? 0);
  return Number.isFinite(total) && total >= 0 ? Math.floor(total) : 0;
}

export async function incrementVisitorTotal(): Promise<number> {
  await ensureSchema();
  const pool = getPool();
  await pool.query("UPDATE site_visitors SET total = total + 1 WHERE id = 1");
  const [rows] = await pool.query<VisitorRow[]>("SELECT total FROM site_visitors WHERE id = 1 LIMIT 1");
  const total = Number(rows[0]?.total ?? 0);
  return Number.isFinite(total) && total >= 0 ? Math.floor(total) : 0;
}
