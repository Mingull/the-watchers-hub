import { env } from "@/lib/env";
import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { db } from "@mingull/database/client";
import { betterAuth } from "better-auth";
import { admin, lastLoginMethod } from "better-auth/plugins";

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

export type Session = typeof auth.$Infer.Session;
