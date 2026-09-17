import { accounts, franchises, genres, media, sessions, userFranchises, userGenres, userMedia, users, verifications, watchHistory } from "./schemas";

export const authSchemas = {
	accounts,
	sessions,
	users,
	verifications,
};

export const schemas = {
	...authSchemas,
	franchises,
	genres,
	media,
	userFranchises,
	userGenres,
	userMedia,
	watchHistory,
};

export { accounts, franchises, genres, media, sessions, userFranchises, userGenres, userMedia, users, verifications, watchHistory };
