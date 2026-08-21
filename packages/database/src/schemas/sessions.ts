import { index, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";
import { users } from "./users";

export const sessions = mysqlTable(
	"sessions",
	{
		id: varchar("id", { length: 36 }).primaryKey(),
		userId: varchar("user_id", { length: 36 })
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),
		expiresAt: timestamp("expires_at", { fsp: 3 }).notNull(),
		token: varchar("token", { length: 255 }).notNull().unique(),
		ipAddress: text("ip_address"),
		userAgent: text("user_agent"),
		impersonatedBy: text("impersonated_by"),
		createdAt: timestamp("created_at", { fsp: 3 }).defaultNow().notNull(),
		updatedAt: timestamp("updated_at", { fsp: 3 }).defaultNow().onUpdateNow({ fsp: 3 }).notNull(),
	},
	(table) => [index("sessions_userId_idx").on(table.userId)],
);
