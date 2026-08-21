import { db } from "@mingull/database/client";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { admin, lastLoginMethod } from "better-auth/plugins";
import { env } from "@/lib/env";

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "mysql",
		usePlural: true,
		transaction: true,
		debugLogs: env.NODE_ENV !== "production",
	}),
	emailAndPassword: {
		enabled: true,
	},
	experimental: { joins: true },
	plugins: [admin(), lastLoginMethod()],
});
