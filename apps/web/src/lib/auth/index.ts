import { drizzleAdapter } from "@better-auth/drizzle-adapter/relations-v2";
import { authSchemas } from "@mingull/database";
import { db } from "@mingull/database/client";
import { betterAuth } from "better-auth";
import { admin, lastLoginMethod, username } from "better-auth/plugins";

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "mysql",
		usePlural: true,
		transaction: true,
		debugLogs: process.env.NODE_ENV !== "production",
		schema: authSchemas,
	}),
	emailAndPassword: {
		enabled: true,
	},
	user: {
		additionalFields: {
			firstName: {
				type: "string",
				required: true,
				description: "The user's first name",
			},
			lastName: {
				type: "string",
				required: true,
				description: "The user's last name",
			},
		},
	},
	socialProviders: {
		discord: {
			clientId: process.env.DISCORD_CLIENT_ID ?? "",
			clientSecret: process.env.DISCORD_CLIENT_SECRET ?? "",
			mapProfileToUser: (profile) => ({ firstName: profile.name.split(" ")[0], lastName: profile.name.split(" ")[1] }),
		},
		google: {
			clientId: process.env.GOOGLE_CLIENT_ID ?? "",
			clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
			mapProfileToUser: (profile) => ({ firstName: profile.name.split(" ")[0], lastName: profile.name.split(" ")[1] }),
		},
		github: {
			clientId: process.env.GITHUB_CLIENT_ID ?? "",
			clientSecret: process.env.GITHUB_CLIENT_SECRET ?? "",
			mapProfileToUser: (profile) => ({ firstName: profile.name.split(" ")[0], lastName: profile.name.split(" ")[1] }),
		},
	},
	advanced: { database: { joins: true } },
	plugins: [
		admin(),
		username(),
		lastLoginMethod(),
		// i18n({ translations: { en: locales.en, nl: locales.nl } }) // This is commented out as the plugin causes some TS inference issues
	],
});

export type Session = typeof auth.$Infer.Session;
