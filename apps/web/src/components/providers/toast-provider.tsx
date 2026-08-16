"use client";
import { Toaster } from "@mingull/ui/c/sonner";
import { useTheme } from "next-themes";

export function ToastProvider() {
	const { resolvedTheme } = useTheme();

	return <Toaster position="top-right" theme={resolvedTheme === "dark" ? "dark" : "light"} />;
}
