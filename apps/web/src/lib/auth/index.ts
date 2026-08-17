import { db } from "@mingull/database/client";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { admin, lastLoginMethod } from "better-auth/plugins";

export const auth = betterAuth({
	database: drizzleAdapter(db, { provider: "mysql", usePlural: true, transaction: true, debugLogs: true }),
	emailAndPassword: {
		enabled: true,
	},
	experimental: { joins: true },
	plugins: [admin(), lastLoginMethod()],
});
