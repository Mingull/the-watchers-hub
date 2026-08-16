import { Header, type HeaderItem } from "@/components/header";
import Providers from "@/components/providers";
import { IntlProvider } from "@/components/providers/intl-provider";
import { routing } from "@/i18n/routing";
import "@mingull/ui/globals.css";
import { cn } from "@mingull/ui/lib/utils";
import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { Leckerli_One, Merriweather, Poppins, Roboto_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { Suspense } from "react";

const poppins = Poppins({ subsets: ["latin"], weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"], variable: "--font-sans" });
const merriweather = Merriweather({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700", "800", "900"], variable: "--font-serif" });
const robotoMono = Roboto_Mono({ subsets: ["latin"], weight: ["100", "200", "300", "400", "500", "600", "700"], variable: "--font-mono" });
const leckerliOne = Leckerli_One({ subsets: ["latin"], weight: "400", variable: "--font-special" });

export function generateStaticParams() {
	return routing.locales.map((locale) => ({ locale }));
}

export const generateMetadata = async (): Promise<Metadata> => {
	return {
		title: { template: "%s | The Watchers Hub", default: "The Watchers Hub" },
		description: "Your personal entertainment hub for discovering, tracking, and organizing movies and series.",
	};
};

export default async function RootLayout({ children, params }: LayoutProps<"/[locale]">) {
	const { locale } = await params;
	if (!hasLocale(routing.locales, locale)) {
		notFound();
	}

	const headerItems = [
		{
			type: "dropdown",
			title: "Explore",
			items: [
				{ title: "Browse", href: "/" },
				{ title: "Movies", href: "/movies" },
				{ title: "Series", href: "/series" },
			],
		},
		{
			type: "dropdown",
			title: "Watchlist",
			items: [
				{ title: "Movies", href: "/watchlist/movies" },
				{ title: "Series", href: "/watchlist/series" },
			],
		},
	] satisfies HeaderItem[];

	return (
		<html lang={locale} suppressHydrationWarning>
			<head>
				<meta name="apple-mobile-web-app-title" content="Mingull" />
			</head>
			<body
				className={cn(
					"bg-background text-foreground flex min-h-screen flex-col font-sans antialiased",
					poppins.variable,
					merriweather.variable,
					robotoMono.variable,
					leckerliOne.variable,
				)}
			>
				<Suspense>
					<IntlProvider locale={locale}>
						<Providers>
							<Header locale={locale} items={headerItems} />
							<main className="grow">{children}</main>
							{/* <Footer /> */}
						</Providers>
						{/* </DefaultsProvider> */}
					</IntlProvider>
				</Suspense>
			</body>
		</html>
	);
}
