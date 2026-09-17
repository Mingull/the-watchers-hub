import { defineRelations } from "drizzle-orm";
import * as schemas from "./schemas/index";

export const relations = defineRelations(schemas, (r) => ({
	users: {
		sessions: r.many.sessions({ from: r.users.id, to: r.sessions.userId }),
		accounts: r.many.accounts({ from: r.users.id, to: r.accounts.userId }),
		media: r.many.media({
			from: r.users.id.through(r.userMedia.userId),
			to: r.media.id.through(r.userMedia.mediaId),
		}),
		history: r.many.watchHistory(),
		interestedFranchises: r.many.franchises({
			from: r.users.id.through(r.userFranchises.userId),
			to: r.franchises.id.through(r.userFranchises.franchiseId),
		}),
		interestedGenres: r.many.genres({
			from: r.users.id.through(r.userGenres.userId),
			to: r.genres.id.through(r.userGenres.genreId),
		}),
	},
	sessions: {
		user: r.one.users({ from: r.sessions.userId, to: r.users.id }),
	},
	accounts: {
		user: r.one.users({ from: r.accounts.userId, to: r.users.id }),
	},
	media: {
		users: r.many.users(),
		watchers: r.many.watchHistory({
			from: r.media.id.through(r.watchHistory.mediaId),
			to: r.watchHistory.id.through(r.watchHistory.userId),
		}),
	},
	userMedia: {
		user: r.one.users({ from: r.userMedia.userId, to: r.users.id }),
		media: r.one.media({ from: r.userMedia.mediaId, to: r.media.id }),
	},
	watchHistory: {
		user: r.one.users({ from: r.watchHistory.userId, to: r.users.id }),
		media: r.one.media({ from: r.watchHistory.mediaId, to: r.media.id }),
	},
	franchises: {
		interestedUsers: r.many.users({
			from: r.franchises.id.through(r.userFranchises.franchiseId),
			to: r.users.id.through(r.userFranchises.userId),
		}),
	},
	genres: {
		interestedUsers: r.many.users({
			from: r.genres.id.through(r.userGenres.genreId),
			to: r.users.id.through(r.userGenres.userId),
		}),
	},
}));
