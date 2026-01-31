declare module "culori" {
	export interface Oklch {
		mode: "oklch";
		l: number;
		c: number;
		h?: number;
		alpha?: number;
	}

	export function oklch(color: string | object): Oklch;
	export function clampChroma<T extends object>(
		color: T,
		mode?: string,
		rgbGamut?: string,
	): T;
	export function formatHex(color: object | undefined): string | undefined;
}
