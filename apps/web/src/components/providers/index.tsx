"use client";
import { ThemeProvider } from "next-themes";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { ToastProvider } from "./toast-provider";

export default function Providers({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<ThemeProvider enableSystem attribute="class" defaultTheme="system" disableTransitionOnChange>
			<NuqsAdapter>{children}</NuqsAdapter>
			<ToastProvider />
		</ThemeProvider>
	);
}
