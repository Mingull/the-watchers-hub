import { mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { v7 as uuidv7 } from "uuid";

export const genres = mysqlTable("genres", {
	id: varchar("id", { length: 36 })
		.primaryKey()
		.$defaultFn(() => uuidv7()),
	name: varchar("name", { length: 255 }).notNull().unique(),
});
