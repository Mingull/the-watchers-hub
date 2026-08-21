import { boolean, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
	id: varchar("id", { length: 36 }).primaryKey(),
	name: varchar("name", { length: 255 }).notNull(),
	email: varchar("email", { length: 255 }).notNull().unique(),
	emailVerified: boolean("email_verified").default(false).notNull(),
	image: text("image"),
	role: text("role"),
	banned: boolean("banned").default(false),
	banReason: text("ban_reason"),
	banExpires: timestamp("ban_expires", { fsp: 3 }),
	createdAt: timestamp("created_at", { fsp: 3 }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { fsp: 3 }).defaultNow().onUpdateNow({ fsp: 3 }).notNull(),
});
