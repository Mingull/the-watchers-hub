"use client";

import { Search } from "lucide-react";

import { Input } from "@mingull/ui/c/input";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@mingull/ui/components/input-group";
import { useTranslations } from "next-intl";

interface SearchInputProps {
	value: string;
	resultsCount?: number;
	onChange: (value: string) => void;
}

export function SearchInput({ value, resultsCount = 0, onChange }: SearchInputProps) {
	const t = useTranslations("homepage.search");
	return (
		<InputGroup className="h-14 rounded-2xl">
			<InputGroupAddon>
				<Search />
			</InputGroupAddon>
			{/* <Search className="text-muted-foreground absolute top-1/2 left-4 size-5 -translate-y-1/2" /> */}
			<InputGroupInput
				value={value}
				onChange={(event) => onChange(event.target.value)}
				placeholder={t("placeholder")}
				// className="bg-card h-14 rounded-2xl pl-12 text-base shadow-lg"
				autoFocus
			/>
			{resultsCount > 0 ?
				<InputGroupAddon align="inline-end">{t("results", { count: resultsCount })}</InputGroupAddon>
			:	null}
		</InputGroup>
	);
}
