import { routing } from "@/i18n/routing";
import "@mingull/ui/globals.css";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";

export default async function AuthLayout({ children, params }: LayoutProps<"/[locale]">) {
	const { locale } = await params;
	if (!hasLocale(routing.locales, locale)) {
		notFound();
	}

	return <main className="grow">{children}</main>;
}
