import type {
	DeclarationsCallbackContext,
	Styleframe,
	TokenValue,
	Variable,
} from "@styleframe/core";

export const defaultAddressConfig = {
	marginBottom: "@spacing",
} as const;

export interface AddressElementConfig {
	marginBottom?: TokenValue;
}

export interface AddressElementResult {
	addressMarginBottom: Variable<"address.margin-bottom">;
}

export function useAddressDesignTokens(
	ctx: DeclarationsCallbackContext,
	config: AddressElementConfig = {},
): Partial<AddressElementResult> {
	const result: Partial<AddressElementResult> = {};

	if (config.marginBottom !== undefined)
		result.addressMarginBottom = ctx.variable(
			"address.margin-bottom",
			config.marginBottom,
		);

	return result;
}

export function useAddressSelectors(
	ctx: DeclarationsCallbackContext,
	config: Required<AddressElementConfig>,
): AddressElementResult {
	const result = useAddressDesignTokens(ctx, config) as AddressElementResult;

	ctx.selector("address", {
		marginBottom: ctx.ref(result.addressMarginBottom),
		fontStyle: "normal",
		lineHeight: "inherit",
	});

	return result;
}

export function useAddressElement(
	s: Styleframe,
	config: AddressElementConfig = {},
): AddressElementResult {
	return useAddressSelectors(s, {
		marginBottom: config.marginBottom ?? defaultAddressConfig.marginBottom,
	});
}
