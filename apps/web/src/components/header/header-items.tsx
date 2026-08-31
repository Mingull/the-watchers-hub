"use client";

import { HeaderItem } from "@/components/header";
import { LanguageSelector } from "@/components/language-selector";
import { UserMenu } from "@/components/user-menu";
import { useTranslations } from "next-intl";

export function useHeaderItems(): HeaderItem[] {
	const t = useTranslations("header");
	return [
		{ type: "link", title: t("items.timelines"), href: "/timelines" },
		{ type: "custom", key: "language-selector", render: <LanguageSelector />, disabled: ({ session, isPending }) => !isPending && !!session },
		{ type: "link", title: t("items.sign-in"), href: "/sign-in", disabled: ({ session, isPending }) => !isPending && !!session },
		{ type: "custom", key: "user", render: <UserMenu />, disabled: ({ session, isPending }) => !isPending && !session },
	];
}
