"use client";

import { Search } from "lucide-react";

import { Input } from "@mingull/ui/c/input";

interface SearchInputProps {
	value: string;
	onChange: (value: string) => void;
}

export function SearchInput({ value, onChange }: SearchInputProps) {
	return (
		<div className="relative">
			<Search className="text-muted-foreground absolute top-1/2 left-4 size-5 -translate-y-1/2" />

			<Input
				value={value}
				onChange={(event) => onChange(event.target.value)}
				placeholder="Search movies and series..."
				className="bg-card h-14 rounded-2xl pl-12 text-base shadow-lg"
				autoFocus
			/>
		</div>
	);
}
