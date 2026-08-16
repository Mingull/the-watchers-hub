import type { MediaSearchResult } from "@/lib/tmdb/search";
import { Badge } from "@mingull/ui/c/badge";
import { Card, CardContent } from "@mingull/ui/c/card";
import Image from "next/image";
import Link from "next/link";

function getPosterUrl(path: string | null) {
	if (!path) {
		return null;
	}

	return `https://image.tmdb.org/t/p/w342${path}`;
}

export function SearchResultCard({ media }: { media: MediaSearchResult }) {
	const title = media.type === "movie" ? media.title : media.name;
	const date = media.type === "movie" ? media.releaseDate : media.firstAirDate;
	const posterUrl = getPosterUrl(media.posterPath);

	const href = media.type === "movie" ? `/movies/${media.id}` : `/series/${media.id}`;

	return (
		<Link href={href}>
			<Card className="group hover:bg-accent/50 overflow-hidden transition-colors">
				<CardContent className="flex gap-4 p-3">
					<div className="bg-muted relative aspect-2/3 w-20 shrink-0 overflow-hidden rounded-lg sm:w-24">
						{posterUrl ?
							<Image src={posterUrl} alt={title} fill sizes="96px" className="object-cover transition-transform duration-300 group-hover:scale-105" />
						:	<div className="text-muted-foreground flex h-full items-center justify-center p-2 text-center text-xs">No poster</div>}
					</div>

					<div className="min-w-0 py-1">
						<div className="flex flex-wrap items-center gap-2">
							<Badge variant="secondary">{media.type === "movie" ? "Movie" : "Series"}</Badge>

							{date && <span className="text-muted-foreground text-sm">{date.slice(0, 4)}</span>}
						</div>

						<h3 className="mt-2 text-lg font-semibold">{title}</h3>
						<p className="text-muted-foreground mt-2 line-clamp-2 text-sm leading-6">{media.overview || "No description available."}</p>

						<div className="mt-3 flex items-center gap-1 text-sm">
							<span>★</span>
							<span className="font-medium">{media.voteAverage.toFixed(1)}</span>
							<span className="text-muted-foreground">({media.voteCount.toLocaleString()})</span>
						</div>
					</div>
				</CardContent>
			</Card>
		</Link>
	);
}
