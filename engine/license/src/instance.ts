import { LICENSE_PROPERTY_NAME } from "./constants";

export function markLicenseRequired(s: object): void {
	if (isLicenseRequired(s)) return;

	Object.defineProperty(s, LICENSE_PROPERTY_NAME, {
		value: true,
		writable: false,
		configurable: false,
		enumerable: true,
	});
}

export function isLicenseRequired(s: object): boolean {
	// biome-ignore lint/suspicious/noPrototypeBuiltins: license property is not supposed to be accessible
	return Object.prototype.hasOwnProperty.call(s, LICENSE_PROPERTY_NAME);
}
