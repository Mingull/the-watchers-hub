import { Card, CardContent } from "@mingull/ui/components/card";
import { Skeleton } from "@mingull/ui/components/skeleton";

export function SearchResultsSkeleton() {
	return (
		<div className="grid gap-3">
			{Array.from({ length: 5 }).map((_, index) => (
				<Card key={index}>
					<CardContent className="flex gap-4 p-3">
						<Skeleton className="aspect-2/3 w-20 shrink-0 rounded-lg sm:w-24" />

						<div className="flex-1 space-y-3 py-1">
							<Skeleton className="h-5 w-20" />
							<Skeleton className="h-6 w-1/2" />
							<Skeleton className="h-4 w-full" />
							<Skeleton className="h-4 w-2/3" />
						</div>
					</CardContent>
				</Card>
			))}
		</div>
	);
}
