import type { AvailableLanguage } from "tmdb-ts";
import { tmdbClient } from "./client";

export type MediaSearchResult =
	| {
			type: "movie";
			id: number;
			title: string;
			originalTitle: string;
			overview: string;
			posterPath: string | null;
			backdropPath: string | null;
			releaseDate: string | null;
			popularity: number;
			voteAverage: number;
			voteCount: number;
			adult: boolean;
	  }
	| {
			type: "tv";
			id: number;
			name: string;
			originalName: string;
			overview: string;
			posterPath: string | null;
			backdropPath: string | null;
			firstAirDate: string | null;
			popularity: number;
			voteAverage: number;
			voteCount: number;
			adult: boolean;
	  };

export interface SearchMediaOptions {
	page?: number;
	includeAdult?: boolean;
	language?: AvailableLanguage;
}

export interface SearchMediaResult {
	page: number;
	totalPages: number;
	totalResults: number;
	results: MediaSearchResult[];
}

export async function searchMedia(query: string, options: SearchMediaOptions = {}): Promise<SearchMediaResult> {
	const trimmedQuery = query.trim();

	if (!trimmedQuery) return { page: 1, totalPages: 0, totalResults: 0, results: [] };

	const response = await tmdbClient.search.multi({
		query: trimmedQuery,
		page: options.page ?? 1,
		include_adult: options.includeAdult ?? false,
		language: options.language ?? "en-US",
	});

	return {
		page: response.page,
		totalPages: response.total_pages,
		totalResults: response.total_results,
		results: response.results.flatMap((result): MediaSearchResult[] => {
			switch (result.media_type) {
				case "movie":
					return [
						{
							type: "movie",
							id: result.id,
							title: result.title,
							originalTitle: result.original_title,
							overview: result.overview,
							posterPath: result.poster_path,
							backdropPath: result.backdrop_path,
							releaseDate: result.release_date || null,
							popularity: result.popularity,
							voteAverage: result.vote_average,
							voteCount: result.vote_count,
							adult: result.adult,
						},
					];

				case "tv":
					return [
						{
							type: "tv",
							id: result.id,
							name: result.name,
							originalName: result.original_name,
							overview: result.overview,
							posterPath: result.poster_path,
							backdropPath: result.backdrop_path,
							firstAirDate: result.first_air_date || null,
							popularity: result.popularity,
							voteAverage: result.vote_average,
							voteCount: result.vote_count,
							adult: result.adult,
						},
					];

				default:
					return [];
			}
		}),
	};
}
