declare module "culori" {
	export const oklch: (color: string) => {
		l: number;
		c: number;
		h: number;
		alpha: number;
	};
}
