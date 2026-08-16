import Image from "next/image";
import Link from "next/link";

import type { SearchMediaResult } from "@/lib/tmdb/search";

type MediaSearchResultsProps = {
	query: string;
	results: SearchMediaResult;
};

function getImageUrl(path: string | null, size: "w185" | "w342" = "w342") {
	if (!path) {
		return null;
	}

	return `https://image.tmdb.org/t/p/${size}${path}`;
}

export function MediaSearchResults({ query, results }: MediaSearchResultsProps) {
	if (results.results.length === 0) {
		return (
			<div className="border-border/50 bg-card/30 rounded-2xl border p-10 text-center">
				<h2 className="text-lg font-semibold">No results found</h2>

				<p className="text-muted-foreground mt-2 text-sm">We couldn't find anything matching "{query}".</p>
			</div>
		);
	}

	return (
		<div>
			<div className="mb-6 flex items-end justify-between">
				<div>
					<p className="text-muted-foreground text-sm">Search results for</p>
					<h2 className="text-2xl font-semibold tracking-tight">"{query}"</h2>
				</div>

				<p className="text-muted-foreground text-sm">{results.totalResults.toLocaleString()} results</p>
			</div>

			<div className="grid gap-4">
				{results.results.map((media) => {
					const isMovie = media.type === "movie";

					const title = isMovie ? media.title : media.name;
					const originalTitle = isMovie ? media.originalTitle : media.originalName;

					const date = isMovie ? media.releaseDate : media.firstAirDate;

					const imageUrl = getImageUrl(media.posterPath);

					return (
						<Link
							key={`${media.type}-${media.id}`}
							href={isMovie ? `/movies/${media.id}` : `/tv/${media.id}`}
							className="group border-border/50 bg-card/30 hover:bg-card/70 flex gap-5 rounded-2xl border p-3 transition-colors"
						>
							<div className="bg-muted relative aspect-2/3 w-24 shrink-0 overflow-hidden rounded-xl">
								{imageUrl ?
									<Image src={imageUrl} alt={title} fill sizes="96px" className="object-cover transition-transform duration-300 group-hover:scale-105" />
								:	<div className="text-muted-foreground flex h-full items-center justify-center p-3 text-center text-xs">No poster</div>}
							</div>

							<div className="min-w-0 py-1">
								<div className="flex items-center gap-2">
									<span className="bg-muted rounded-full px-2 py-1 text-xs font-medium">{isMovie ? "Movie" : "Series"}</span>

									{date && <span className="text-muted-foreground text-sm">{date.slice(0, 4)}</span>}
								</div>

								<h3 className="mt-2 truncate text-lg font-semibold">{title}</h3>

								{originalTitle !== title && <p className="text-muted-foreground truncate text-sm">{originalTitle}</p>}

								<p className="text-muted-foreground mt-3 line-clamp-2 text-sm leading-6">{media.overview || "No description available."}</p>

								<div className="mt-3 flex items-center gap-2 text-sm">
									<span>★</span>
									<span className="font-medium">{media.voteAverage.toFixed(1)}</span>
									<span className="text-muted-foreground">({media.voteCount.toLocaleString()})</span>
								</div>
							</div>
						</Link>
					);
				})}
			</div>
		</div>
	);
}
