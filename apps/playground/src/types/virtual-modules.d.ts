declare module "virtual:pg-react-vendor" {
	export interface ReactVendor {
		/** IIFE that publishes React on `globalThis.PGReactVendor`. */
		iife: string;
		/** Named exports of `react`. */
		reactKeys: string[];
		/** Named exports of `react-dom/client`. */
		reactDomClientKeys: string[];
		/** Named exports of `react/jsx-runtime`. */
		jsxRuntimeKeys: string[];
	}
	const vendor: ReactVendor;
	export default vendor;
}

declare module "virtual:pg-runtime-src" {
	const source: string;
	export default source;
}
