import { mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";
import { v7 as uuidv7 } from "uuid";
import { media } from "./media";
import { users } from "./users";

export const watchHistory = mysqlTable("watch_history", {
	id: varchar("id", { length: 36 })
		.primaryKey()
		.$defaultFn(() => uuidv7()),
	userId: varchar("user_id", { length: 36 })
		.references(() => users.id, { onDelete: "cascade" })
		.notNull(),
	mediaId: varchar("media_id", { length: 36 })
		.references(() => media.id, { onDelete: "cascade" })
		.notNull(),
	notes: text("notes"),
	createdAt: timestamp("created_at", { fsp: 3 }).defaultNow().notNull(),
	watchedAt: timestamp("watched_at", { fsp: 3 }).defaultNow().notNull(),
});
