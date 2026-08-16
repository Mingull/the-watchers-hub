"use client";

import { HeroSection } from "@/components/hero/hero-section";
import { SearchResults } from "@/components/search/search-results";
import { searchMediaAction } from "@/lib/actions/search";
import type { SearchMediaResult } from "@/lib/tmdb/search";
import { useDebounce } from "@mingull/ui/hooks/use-debounce";
import { useQueryState } from "nuqs";
import { useEffect, useState } from "react";

export default function HomePage(_props: PageProps<"/[locale]">) {
	const [results, setResults] = useState<SearchMediaResult | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [query, setQuery] = useQueryState("q", {
		defaultValue: "",
		shallow: true,
	});
	const debouncedQuery = useDebounce(query, 400);

	useEffect(() => {
		const trimmedQuery = debouncedQuery.trim();

		if (!trimmedQuery) {
			setResults(null);
			setIsLoading(false);

			return;
		}

		let cancelled = false;

		async function search() {
			setIsLoading(true);

			try {
				const result = await searchMediaAction(trimmedQuery);

				if (!cancelled) setResults(result);
			} catch {
				if (!cancelled) setResults(null);
			} finally {
				if (!cancelled) setIsLoading(false);
			}
		}
		void search();

		return () => {
			cancelled = true;
		};
	}, [debouncedQuery]);

	const hasQuery = query.trim().length > 0;

	return (
		<section className="min-h-screen">
			<HeroSection hasQuery={hasQuery} query={query} onQueryChange={setQuery}>
				{hasQuery && <SearchResults query={query} results={results} isLoading={isLoading} />}
			</HeroSection>
		</section>
	);
}
