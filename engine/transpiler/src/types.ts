export type OutputFile = {
	name: string;
	content: string[];
	layer?: string;
};

export type Output = {
	files: OutputFile[];
};
