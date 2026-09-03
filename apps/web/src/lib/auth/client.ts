import { env } from "@/lib/env";
import { i18nClient } from "@better-auth/i18n/client";
import { adminClient, lastLoginMethodClient, usernameClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
	/** The base URL of the server (optional if you're using the same domain) */
	baseURL: env.BETTER_AUTH_URL,
	plugins: [adminClient(), usernameClient(), lastLoginMethodClient(), i18nClient()],
});
