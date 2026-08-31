import { defineRelations } from "drizzle-orm";
import * as schemas from "./schemas/index";

export const relations = defineRelations(schemas, (r) => ({
	users: {
		sessions: r.many.sessions(),
		accounts: r.many.accounts(),
		media: r.many.media({
			from: r.users.id.through(r.userMedia.userId),
			to: r.media.id.through(r.userMedia.mediaId),
		}),
		history: r.many.watchHistory(),
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
}));
