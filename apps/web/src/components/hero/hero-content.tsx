"use client";

import { Badge } from "@mingull/ui/components/badge";
import * as m from "motion/react-client";
import { useTranslations } from "next-intl";

type HeroContentProps = {
	hasQuery: boolean;
};

const eyebrowVariants = { idle: { fontSize: "0.75rem", letterSpacing: "0.28em" }, searching: { fontSize: "0.7rem", letterSpacing: "0.22em" } };
const titleVariants = { idle: { fontSize: "3.5rem", lineHeight: 1 }, searching: { fontSize: "2.5rem", lineHeight: 1.1 } };
const subtitleVariants = { idle: { fontSize: "1rem" }, searching: { fontSize: "0.95rem" } };

export function HeroContent({ hasQuery = false }: HeroContentProps) {
	const t = useTranslations("homepage.hero");
	return (
		<m.div layout className="mb-8 text-center" variants={{ idle: { marginBottom: 112 }, searching: { marginBottom: 56 } }} animate={hasQuery ? "searching" : "idle"}>
			<m.p
				initial={false}
				variants={eyebrowVariants}
				animate={hasQuery ? "searching" : "idle"}
				transition={{ type: "spring", stiffness: 280, damping: 32 }}
				className="text-muted-foreground font-mono font-semibold uppercase"
			>
				{t("eyebrow")}
			</m.p>

			<m.h1
				initial={false}
				variants={titleVariants}
				animate={hasQuery ? "searching" : "idle"}
				transition={{ type: "spring", stiffness: 250, damping: 30 }}
				className="font-serif font-bold tracking-tight"
			>
				{t.rich("title", {
					br: () => <br />,
					special: (children) => <span className="text-primary">{children}</span>,
				})}
			</m.h1>

			<m.p
				initial={false}
				variants={subtitleVariants}
				animate={hasQuery ? "searching" : "idle"}
				transition={{ type: "spring", stiffness: 250, damping: 30 }}
				className="text-muted-foreground mx-auto max-w-2xl"
			>
				{t("subtitle")}
			</m.p>

			<m.div
				initial={false}
				animate={hasQuery ? "searching" : "idle"}
				variants={{ idle: { y: 0 }, searching: { y: -12 } }}
				transition={{ duration: 0.25 }}
				className="mt-7 flex flex-wrap items-center justify-center gap-2"
			>
				<Badge variant="outline" className="text-muted-foreground">
					{t("badges.one")}
				</Badge>
				<Badge variant="outline" className="text-muted-foreground">
					{t("badges.two")}
				</Badge>
				<Badge variant="outline" className="text-muted-foreground">
					{t("badges.three")}
				</Badge>
			</m.div>
		</m.div>
	);
}
