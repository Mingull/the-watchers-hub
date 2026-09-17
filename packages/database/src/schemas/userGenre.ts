import { mysqlTable, primaryKey, varchar } from "drizzle-orm/mysql-core";
import { genres } from "./genres";
import { users } from "./users";

export const userGenres = mysqlTable(
	"user_genre",
	{
		userId: varchar("user_id", { length: 36 })
			.references(() => users.id, { onDelete: "cascade" })
			.notNull(),
		genreId: varchar("genre_id", { length: 36 })
			.references(() => genres.id, { onDelete: "cascade" })
			.notNull(),
	},
	(table) => [primaryKey({ columns: [table.userId, table.genreId] })],
);
