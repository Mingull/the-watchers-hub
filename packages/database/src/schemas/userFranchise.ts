import { mysqlTable, primaryKey, varchar } from "drizzle-orm/mysql-core";
import { franchises } from "./franchises";
import { users } from "./users";

export const userFranchises = mysqlTable(
	"user_franchise",
	{
		userId: varchar("user_id", { length: 36 })
			.references(() => users.id, { onDelete: "cascade" })
			.notNull(),
		franchiseId: varchar("franchise_id", { length: 36 })
			.references(() => franchises.id, { onDelete: "cascade" })
			.notNull(),
	},
	(table) => [primaryKey({ columns: [table.userId, table.franchiseId] })],
);
