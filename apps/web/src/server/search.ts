"use server";

import { searchMedia, type SearchMediaOptions, type SearchMediaResult } from "@/lib/tmdb/search";

export async function searchMediaAction(query: string, options: SearchMediaOptions = {}): Promise<SearchMediaResult> {
	return searchMedia(query, options);
}
