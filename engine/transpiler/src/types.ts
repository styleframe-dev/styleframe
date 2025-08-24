export type OutputLine = {
	code: string;
	level: number;
};

export type OutputFile = {
	name: string;
	content: OutputLine[];
	layer?: string;
};

export type Output = {
	files: OutputFile[];
};

export type ConsumeOptions = Pick<OutputLine, "level">;
