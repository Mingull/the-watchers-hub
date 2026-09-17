export type Step<T extends string = string> = {
	id: T;
	title: string;
	subtitle?: string;
};
