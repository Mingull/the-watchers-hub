import { env } from "@/lib/env";
import { adminClient, inferAdditionalFields, lastLoginMethodClient, usernameClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import type { auth } from ".";

export const authClient = createAuthClient({
	/** The base URL of the server (optional if you're using the same domain) */
	baseURL: env.BETTER_AUTH_URL,
	plugins: [
		adminClient(),
		usernameClient(),
		lastLoginMethodClient(),
		// i18nClient(), // This is commented out as the plugin causes some TS inference issues
		inferAdditionalFields<typeof auth>(),
	],
});
