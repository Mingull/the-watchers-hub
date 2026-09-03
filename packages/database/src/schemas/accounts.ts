import { index, mysqlTable, text, timestamp, uniqueIndex, varchar } from "drizzle-orm/mysql-core";
import { users } from "./users";

export const accounts = mysqlTable(
	"accounts",
	{
		id: varchar("id", { length: 36 }).primaryKey(),
		issuer: varchar("issuer", { length: 191 }).notNull(),
		accountId: text("account_id").notNull(),
		providerId: text("provider_id").notNull(),
		userId: varchar("user_id", { length: 36 })
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),
		accessToken: text("access_token"),
		refreshToken: text("refresh_token"),
		idToken: text("id_token"),
		accessTokenExpiresAt: timestamp("access_token_expires_at", { fsp: 3 }),
		refreshTokenExpiresAt: timestamp("refresh_token_expires_at", { fsp: 3 }),
		scope: text("scope"),
		password: text("password"),
		createdAt: timestamp("created_at", { fsp: 3 }).defaultNow().notNull(),
		updatedAt: timestamp("updated_at", { fsp: 3 }).defaultNow().onUpdateNow({ fsp: 3 }).notNull(),
	},
	(table) => [uniqueIndex("accounts_issuer_accountId_uidx").on(table.issuer, table.accountId), index("accounts_userId_idx").on(table.userId)],
);
