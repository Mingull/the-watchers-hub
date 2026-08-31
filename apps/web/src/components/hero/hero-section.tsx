"use client";

import { SearchInput } from "@/components/search/search-input";
import * as m from "motion/react-client";
import type { ReactNode } from "react";
import { HeroContent } from "./hero-content";

type HeroSectionProps = {
	hasQuery: boolean;
	query: string;
	resultsCount?: number;
	onQueryChange: (value: string) => void;
	children?: ReactNode;
};

export function HeroSection({ hasQuery, query, resultsCount, onQueryChange, children }: HeroSectionProps) {
	return (
		<m.div
			className="mx-auto w-full max-w-5xl"
			initial={false}
			variants={{
				idle: { marginTop: 96 },
				searching: { marginTop: 42 },
			}}
			animate={hasQuery ? "searching" : "idle"}
			transition={{ type: "spring", stiffness: 165, damping: 26 }}
		>
			<HeroContent hasQuery={hasQuery} />

			<m.div layout transition={{ type: "spring", stiffness: 240, damping: 28 }}>
				<SearchInput value={query} onChange={onQueryChange} resultsCount={resultsCount} />
			</m.div>

			{children}
		</m.div>
	);
}
