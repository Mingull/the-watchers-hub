import { env } from "@/lib/env";
import { TMDB } from "tmdb-ts";

export const tmdbClient = new TMDB(env.TMDB_API_KEY, {
	fetch: (url, init) => fetch(url, { ...init, next: { revalidate: 3600 } }), // revalidate every hour
});
