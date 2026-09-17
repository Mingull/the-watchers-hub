"use server";

import { auth } from "@/lib/auth";
import { userFranchises, userGenres } from "@mingull/database";
import { db } from "@mingull/database/client";

type SignUpParams = {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
	username: string;
	franchises?: string[];
	genres?: string[];
};

export async function signUp({ email, password, firstName, lastName, username, franchises, genres }: SignUpParams) {
	// Sign up the user
	let session: Awaited<ReturnType<typeof auth.api.signUpEmail>>;
	try {
		session = await auth.api.signUpEmail({ body: { email, password, firstName, lastName, name: `${firstName} ${lastName}`, username } });
	} catch (error) {
		return { error: error instanceof Error ? error : new Error("Failed to sign up.") };
	}

	// When user is successfully signed up, save their franchises and genres in the database if they are provided
	try {
		await db.transaction(async (tx) => {
			if (franchises?.length) await tx.insert(userFranchises).values(franchises.map((franchiseId) => ({ userId: session.user.id, franchiseId })));

			if (genres?.length) await tx.insert(userGenres).values(genres.map((genreId) => ({ userId: session.user.id, genreId })));
		});
	} catch (error) {
		return { error: error instanceof Error ? error : new Error("Failed to save user data.") };
	}

	return { success: true };
}
