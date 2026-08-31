"use client";

import { Link } from "@/i18n/navigation";
import { Session } from "@/lib/auth";
import { authClient } from "@/lib/auth/client";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from "@mingull/ui/c/navigation-menu";
import { motion, stagger } from "motion/react";
import * as m from "motion/react-client";
import type { Locale } from "next-intl";
import { useHeaderItems } from "./header-items";

const MotionNavigationMenu = motion.create(NavigationMenu);
const MotionNavigationMenuItem = motion.create(NavigationMenuItem);
type HeaderLink = {
	type: "link";
	title: string;
	href: string;
};

type HeaderDropdown = {
	type: "dropdown";
	title: string;
	items: HeaderLink[];
};

type HeaderCustom = {
	type: "custom";
	key: string;
	render: React.ReactNode;
};

type ItemContext = {
	session: Session | null;
	isPending: boolean;
};

/**
 * Header Item is a single item in the header navigation. It can be a link or a dropdown menu.
 */
export type HeaderItem = (HeaderLink | HeaderDropdown | HeaderCustom) & {
	disabled?: boolean | ((ctx: ItemContext) => boolean);
};
type HeaderProps = {
	locale: Locale;
};

export function Header({ locale }: HeaderProps) {
	const { data: session, isPending } = authClient.useSession();

	const items = useHeaderItems();

	return (
		<m.header initial={{ opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, ease: "easeOut" }} className="sticky top-2.5 z-50 backdrop-blur-xl">
			<div className="bg-background/30 mx-auto flex h-16 max-w-6xl items-center justify-between rounded-4xl border px-6">
				<Link href={{ pathname: "/" }} locale={locale} className="font-mono text-lg leading-none tracking-tight">
					The Watchers Hub
				</Link>

				<MotionNavigationMenu initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { delayChildren: stagger(0.1) } } }}>
					<NavigationMenuList>
						{items.map((category) => {
							if (isDisabled(category, { session, isPending })) return null;
							if (category.type === "custom")
								return (
									<MotionNavigationMenuItem
										key={category.key}
										variants={{ hidden: { opacity: 0, y: -6 }, show: { opacity: 1, y: 0 } }}
										transition={{ duration: 0.25, ease: "easeOut" }}
									>
										<NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
											{category.render}
										</NavigationMenuLink>
									</MotionNavigationMenuItem>
								);
							if (category.type === "dropdown")
								return (
									<NavigationMenuItem key={category.title}>
										<NavigationMenuTrigger>
											<m.p
												key={category.title}
												variants={{ hidden: { opacity: 0, y: -6 }, show: { opacity: 1, y: 0 } }}
												transition={{ duration: 0.25, ease: "easeOut" }}
											>
												{category.title}
											</m.p>
										</NavigationMenuTrigger>
										<NavigationMenuContent className="w-56">
											{category.items?.map((item) => (
												<NavigationMenuLink key={item.href} href={item.href}>
													{item.title}
												</NavigationMenuLink>
											))}
										</NavigationMenuContent>
									</NavigationMenuItem>
								);
							return (
								<MotionNavigationMenuItem
									key={category.href}
									variants={{ hidden: { opacity: 0, y: -6 }, show: { opacity: 1, y: 0 } }}
									transition={{ duration: 0.25, ease: "easeOut" }}
								>
									<NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
										<Link
											// @ts-expect-error
											href={{ pathname: category.href }}
											locale={locale}
											title={category.title}
										>
											{category.title}
										</Link>
									</NavigationMenuLink>
								</MotionNavigationMenuItem>
							);
						})}
					</NavigationMenuList>
				</MotionNavigationMenu>
			</div>
		</m.header>
	);
}

const isDisabled = (item: HeaderItem, ctx: ItemContext) => (typeof item.disabled === "function" ? item.disabled(ctx) : (item.disabled ?? false));
