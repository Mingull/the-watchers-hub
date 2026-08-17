import { index, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

export const verifications = mysqlTable(
	"verifications",
	{
		id: varchar("id", { length: 36 }).primaryKey(),
		identifier: varchar("identifier", { length: 255 }).notNull(),
		value: text("value").notNull(),
		expiresAt: timestamp("expires_at", { fsp: 3 }).notNull(),
		createdAt: timestamp("created_at", { fsp: 3 }).defaultNow().notNull(),
		updatedAt: timestamp("updated_at", { fsp: 3 }).defaultNow().onUpdateNow().notNull(),
	},
	(table) => [index("verifications_identifier_idx").on(table.identifier)],
);
