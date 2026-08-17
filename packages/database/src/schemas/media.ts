import { int, mysqlTable, timestamp, varchar } from "drizzle-orm/mysql-core";
import { v7 as uuidv7 } from "uuid";

export const media = mysqlTable("media", {
	id: varchar("id", { length: 36 })
		.primaryKey()
		.$defaultFn(() => uuidv7()),
	tmdbId: int("tmdb_id").notNull().unique(),
	type: varchar("type", { length: 10, enum: ["movie", "tv"] }).notNull(), // movie | tv
	title: varchar("title", { length: 255 }).notNull(),
	posterPath: varchar("poster_path", { length: 255 }),
	createdAt: timestamp("created_at", { fsp: 3 }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { fsp: 3 }).defaultNow().onUpdateNow().notNull(),
});
