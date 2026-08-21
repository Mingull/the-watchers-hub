import { boolean, int, mysqlTable, primaryKey, timestamp, varchar } from "drizzle-orm/mysql-core";
import { media } from "./media";
import { users } from "./users";

export const userMedia = mysqlTable(
	"user_media",
	{
		userId: varchar("user_id", { length: 36 })
			.references(() => users.id, { onDelete: "cascade" })
			.notNull(),
		mediaId: varchar("media_id", { length: 36 })
			.references(() => media.id, { onDelete: "cascade" })
			.notNull(),
		status: varchar("status", { length: 10, enum: ["planned", "watching", "completed", "dropped"] }).notNull(), // planned | watching | completed | dropped
		rating: int("rating"),
		favorite: boolean("favorite").default(false).notNull(),
		createdAt: timestamp("created_at", { fsp: 3 }).defaultNow().notNull(),
		updatedAt: timestamp("updated_at", { fsp: 3 }).defaultNow().onUpdateNow({ fsp: 3 }).notNull(),
	},
	(table) => [primaryKey({ columns: [table.userId, table.mediaId] })],
);
