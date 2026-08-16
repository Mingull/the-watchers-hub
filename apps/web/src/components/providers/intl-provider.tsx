import { Locale, NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

export async function IntlProvider({ locale, children }: Readonly<{ locale: Locale; children: React.ReactNode }>) {
	const messages = await getMessages();

	return (
		<NextIntlClientProvider locale={locale} messages={messages}>
			{children}
		</NextIntlClientProvider>
	);
}
