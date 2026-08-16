"use client";

import { Badge } from "@mingull/ui/components/badge";
import * as m from "motion/react-client";

type HeroContentProps = {
	hasQuery: boolean;
};

const eyebrowVariants = { idle: { fontSize: "0.75rem", letterSpacing: "0.28em" }, searching: { fontSize: "0.7rem", letterSpacing: "0.22em" } };
const titleVariants = { idle: { fontSize: "3.5rem", lineHeight: 1 }, searching: { fontSize: "2.5rem", lineHeight: 1.1 } };
const subtitleVariants = { idle: { fontSize: "1rem" }, searching: { fontSize: "0.95rem" } };

export function HeroContent({ hasQuery = false }: HeroContentProps) {
	return (
		<m.div layout className="mb-8 text-center" variants={{ idle: { marginBottom: 112 }, searching: { marginBottom: 56 } }} animate={hasQuery ? "searching" : "idle"}>
			<m.p
				initial={false}
				variants={eyebrowVariants}
				animate={hasQuery ? "searching" : "idle"}
				transition={{ type: "spring", stiffness: 280, damping: 32 }}
				className="text-muted-foreground font-mono font-semibold uppercase"
			>
				The Watchers Hub
			</m.p>

			<m.h1
				initial={false}
				variants={titleVariants}
				animate={hasQuery ? "searching" : "idle"}
				transition={{ type: "spring", stiffness: 250, damping: 30 }}
				className="font-serif font-bold tracking-tight"
			>
				Every Universe. Every Story.
				<br />
				One Timeline. One <span className="text-primary">Watcher</span>.
			</m.h1>

			<m.p
				initial={false}
				variants={subtitleVariants}
				animate={hasQuery ? "searching" : "idle"}
				transition={{ type: "spring", stiffness: 250, damping: 30 }}
				className="text-muted-foreground mx-auto max-w-2xl"
			>
				Track what you've watched, continue where you left off, discover what's next, and explore every timeline.
			</m.p>

			<m.div
				initial={false}
				animate={hasQuery ? "searching" : "idle"}
				variants={{ idle: { y: 0 }, searching: { y: -12 } }}
				transition={{ duration: 0.25 }}
				className="mt-7 flex flex-wrap items-center justify-center gap-2"
			>
				<Badge variant="outline" className="text-muted-foreground">
					Watch Tracking
				</Badge>
				<Badge variant="outline" className="text-muted-foreground">
					Franchise Timelines
				</Badge>
				<Badge variant="outline" className="text-muted-foreground">
					Personal History
				</Badge>
			</m.div>
		</m.div>
	);
}
