import type { Styleframe, TokenValue, Variable } from "@styleframe/core";

export const defaultAddressValues = {
	marginBottom: "@spacing",
} as const;

export interface AddressElementConfig {
	marginBottom?: TokenValue;
}

export interface AddressElementResult {
	addressMarginBottom: Variable<"address.margin-bottom">;
}

export function useAddressElement(
	s: Styleframe,
	config: AddressElementConfig = {},
): AddressElementResult {
	const marginBottom = config.marginBottom ?? defaultAddressValues.marginBottom;

	const addressMarginBottom = s.variable("address.margin-bottom", marginBottom);

	s.selector("address", {
		marginBottom: s.ref(addressMarginBottom),
		fontStyle: "normal",
		lineHeight: "inherit",
	});

	return { addressMarginBottom };
}
