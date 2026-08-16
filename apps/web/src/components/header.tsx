"use client";

import { Link } from "@/i18n/navigation";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@mingull/ui/c/navigation-menu";
import * as m from "motion/react-client";
import type { Locale } from "next-intl";

type LinkItem = {
	type: "link";
	title: string;
	href: string;
};

type DropdownItem = {
	type: "dropdown";
	title: string;
	items: Omit<LinkItem, "type">[];
};

/**
 * Header Item is a single item in the header navigation. It can be a link or a dropdown menu.
 */
export type HeaderItem = LinkItem | DropdownItem;
type HeaderProps = {
	locale: Locale;
	items: HeaderItem[];
};

export function Header({ locale, items }: HeaderProps) {
	return (
		<m.header initial={{ opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, ease: "easeOut" }} className="sticky top-2.5 z-50 backdrop-blur-xl">
			<div className="bg-background/30 mx-auto flex h-16 max-w-6xl items-center justify-between rounded-4xl border px-6">
				<Link href={{ pathname: "/" }} locale={locale} className="font-special text-lg leading-none tracking-wide">
					The Watchers Hub
				</Link>

				<m.nav className="flex items-center gap-1" initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}>
					{items.map((category) => {
						if (category.type === "dropdown") {
							return (
								<NavigationMenu key={category.title} className="w-auto">
									<NavigationMenuList>
										<NavigationMenuItem>
											<NavigationMenuTrigger>
												<m.p
													key={category.title}
													variants={{ hidden: { opacity: 0, y: -6 }, show: { opacity: 1, y: 0 } }}
													transition={{ duration: 0.25, ease: "easeOut" }}
													className="text-muted-foreground hover:text-foreground rounded-md px-3 py-2 text-sm font-medium transition-colors"
												>
													{category.title}
												</m.p>
											</NavigationMenuTrigger>
											<NavigationMenuContent className="w-56">
												{category.items.map((item) => (
													<NavigationMenuLink key={item.href} href={item.href}>
														{item.title}
													</NavigationMenuLink>
												))}
											</NavigationMenuContent>
										</NavigationMenuItem>
									</NavigationMenuList>
								</NavigationMenu>
							);
						}
						if (category.type === "link") {
							return (
								<m.div
									key={category.href}
									variants={{ hidden: { opacity: 0, y: -6 }, show: { opacity: 1, y: 0 } }}
									transition={{ duration: 0.25, ease: "easeOut" }}
								>
									<Link
										// @ts-expect-error
										href={{ pathname: category.href }}
										locale={locale}
										className="text-muted-foreground hover:text-foreground rounded-md px-3 py-2 text-sm font-medium transition-colors"
										title={category.title}
									>
										{category.title}
									</Link>
								</m.div>
							);
						}
					})}
				</m.nav>
			</div>
		</m.header>
	);
}
