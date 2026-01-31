declare module "culori" {
	interface Color {
		mode: string;
		r?: number;
		g?: number;
		b?: number;
		alpha?: number;
	}

	export function parse(color: string): Color | undefined;
	export function formatHex(color: Color): string | undefined;
	export function formatHex8(color: Color): string | undefined;
}
