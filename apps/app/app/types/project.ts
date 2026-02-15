export interface Project {
	id: string;
	name: string;
	description: string;
	createdAt: string;
	updatedAt: string;
}

export type DesignTokenType =
	| "color"
	| "dimension"
	| "number"
	| "string"
	| "duration"
	| "reference";

export interface DesignToken {
	id: string;
	name: string;
	value: string;
	type: DesignTokenType;
}

export type TokenNamespace =
	| "color"
	| "spacing"
	| "typography"
	| "border"
	| "shadow"
	| "easing";

export interface DesignSystem {
	id: string;
	projectId: string;
	name: string;
	description: string;
	namespaces: Record<TokenNamespace, DesignToken[]>;
	createdAt: string;
	updatedAt: string;
}
