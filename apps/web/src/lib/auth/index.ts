import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { i18n, locales, type MiddlewareOptions } from "@better-auth/i18n";
import { type MiddlewareOptions } from "@better-auth/i18n";
import { db } from "@mingull/database/client";
import { betterAuth } from "better-auth";
import { admin, lastLoginMethod, username } from "better-auth/plugins";
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
	plugins: [admin(), username(), lastLoginMethod(), i18n({ translations: { en: locales.en, nl: locales.nl } })],
});

export type Session = typeof auth.$Infer.Session;
