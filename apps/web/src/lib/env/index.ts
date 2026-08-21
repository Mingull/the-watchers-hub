import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
	shared: {
		BASE_URL: z.url(),
		BETTER_AUTH_URL: z.url(),
	},
	server: {
		API_URL: z.url(),
		TMDB_API_KEY: z.string(),
		NODE_ENV: z.enum(["development", "test", "production"]),
	},
	experimental__runtimeEnv: {
		BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
		BETTER_AUTH_URL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
	},
	emptyStringAsUndefined: true,
});
