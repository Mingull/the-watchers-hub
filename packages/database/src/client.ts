import "dotenv/config";
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
	throw new Error("DATABASE_URL is not set");
}

const pool = mysql.createPool(process.env.DATABASE_URL!);

console.log({ pool, poolName: pool.constructor?.name, configInPool: "config" in pool, config: pool.config });

export const db = drizzle({
	client: pool.pool,
	// relations: relations,
});

export type Transaction = Parameters<Parameters<typeof db.transaction>[0]>[0];
export type DBLike = typeof db | Transaction;
