"use client";

import type { SearchMediaResult } from "@/lib/tmdb/search";
import { stagger } from "motion";
import * as m from "motion/react-client";
import { SearchResultCard } from "./search-result-card";
import { SearchResultsSkeleton } from "./search-results-skeleton";

type SearchResultsProps = {
	query: string;
	results: SearchMediaResult | null;
	isLoading: boolean;
};
export function SearchResults({ query, results, isLoading }: SearchResultsProps) {
	if (isLoading && !results) {
		return <SearchResultsSkeleton />;
	}

	if (!results) {
		return null;
	}

	if (results.results.length === 0) {
		return (
			<div className="py-12 text-center">
				<h2 className="text-lg font-semibold">No results found</h2>
				<p className="text-muted-foreground mt-2 text-sm">Nothing matched "{query}".</p>
			</div>
		);
	}

	return (
		<div>
			<div className="mb-5 flex items-end justify-between">
				<div>
					<p className="text-muted-foreground text-sm">Search results for</p>
					<h2 className="text-2xl font-semibold tracking-tight">{query}</h2>
				</div>

				<div className="flex items-center gap-3">
					{isLoading && <span className="text-muted-foreground text-xs">Updating...</span>}
					<p className="text-muted-foreground text-sm">{results.totalResults.toLocaleString()}</p>
				</div>
			</div>

			<m.div className="grid gap-3" initial={false} animate="show" variants={{ show: { transition: { delayChildren: stagger(0.1) } } }}>
				{results.results.map((media) => (
					<m.div
						key={`${media.type}-${media.id}`}
						variants={{ show: { opacity: 1, y: 0 }, hidden: { opacity: 0, y: 12 } }}
						initial="hidden"
						animate="show"
						transition={{ duration: 0.2, ease: "easeOut" }}
					>
						<SearchResultCard media={media} />
					</m.div>
				))}
			</m.div>
		</div>
	);
}
