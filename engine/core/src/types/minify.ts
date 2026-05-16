export type ShorteningMap = {
	/** Property name shortening: e.g. "margin-top" -> "mt" */
	p: Record<string, string>;
	/** Value shortening: e.g. "primary" -> "p" */
	v: Record<string, string>;
	/** Modifier shortening: e.g. "hover" -> "h" */
	m: Record<string, string>;
};
