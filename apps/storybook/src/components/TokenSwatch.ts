import { h, defineComponent, type PropType, type VNode } from "vue";

export type SwatchLayout = "box" | "row" | "text" | "color-variant";
export type RenderPreviewFn = (
	value: string,
	previewClass: string,
) => VNode | VNode[];

export interface TokenSwatchProps {
	name: string;
	value?: string;
	previewClass: string;
	sampleText?: string;
	layout?: SwatchLayout;
	label?: string;
	previewTag?: string;
}

/**
 * Reusable token swatch component for displaying design tokens.
 *
 * Layouts:
 * - "box": Preview box with name below (colors, borders, shadows)
 * - "row": Name | Value | Preview in a horizontal row (spacing, sizing)
 * - "text": Name on top with sample text preview below (typography)
 * - "color-variant": Preview with inner text and optional label (shades, tints)
 */
export const TokenSwatch = defineComponent({
	name: "TokenSwatch",
	props: {
		name: {
			type: String,
			required: true,
		},
		value: {
			type: String,
			default: undefined,
		},
		previewClass: {
			type: String,
			required: true,
		},
		sampleText: {
			type: String,
			default: undefined,
		},
		layout: {
			type: String as PropType<SwatchLayout>,
			default: "box",
		},
		label: {
			type: String,
			default: undefined,
		},
		previewTag: {
			type: String,
			default: "div",
		},
	},
	setup(props) {
		return () => {
			switch (props.layout) {
				case "row":
					return h("div", { class: "token-swatch token-swatch--row" }, [
						h("div", { class: "token-swatch__name" }, props.name),
						props.value !== undefined
							? h("div", { class: "token-swatch__value" }, props.value)
							: null,
						h(
							props.previewTag,
							{ class: `token-swatch__preview ${props.previewClass}` },
							props.sampleText,
						),
					]);

				case "text":
					return h("div", { class: "token-swatch token-swatch--text" }, [
						h("div", { class: "token-swatch__name" }, props.name),
						props.value !== undefined
							? h("div", { class: "token-swatch__value" }, props.value)
							: null,
						h(
							props.previewTag,
							{ class: `token-swatch__preview ${props.previewClass}` },
							props.sampleText,
						),
					]);

				case "color-variant":
					return h(
						"div",
						{ class: "token-swatch token-swatch--color-variant" },
						[
							h(
								props.previewTag,
								{ class: `token-swatch__preview ${props.previewClass}` },
								props.name,
							),
							props.label !== undefined
								? h("span", { class: "token-swatch__label" }, props.label)
								: null,
						],
					);

				case "box":
				default:
					return h("div", { class: "token-swatch token-swatch--box" }, [
						h(props.previewTag, {
							class: `token-swatch__preview ${props.previewClass}`,
						}),
						h("span", { class: "token-swatch__name" }, props.name),
					]);
			}
		};
	},
});

export interface TokenGridProps {
	items: string[];
	layout?: "grid" | "list";
}

/**
 * Reusable token grid component for displaying a collection of swatches.
 *
 * Layouts:
 * - "grid": Flex wrap grid layout (default)
 * - "list": Vertical column layout
 */
export const TokenGrid = defineComponent({
	name: "TokenGrid",
	props: {
		items: {
			type: Array as PropType<string[]>,
			required: true,
		},
		layout: {
			type: String as PropType<"grid" | "list">,
			default: "grid",
		},
	},
	setup(props, { slots }) {
		return () =>
			h(
				"div",
				{
					class: `token-grid token-grid--${props.layout}`,
				},
				props.items.map((item) => slots.default?.({ item })),
			);
	},
});

/**
 * Helper function to create a swatch component with preset configuration.
 *
 * @param name - Component name
 * @param propName - Name of the prop that receives the token value
 * @param getPreviewClass - Function to get the preview class from the token value
 * @param options - Additional options
 * @param options.layout - Swatch layout type
 * @param options.values - Map of token names to display values
 * @param options.sampleText - Sample text to display in the preview
 * @param options.getLabel - Function to get a label from the token value
 * @param options.previewTag - HTML tag for the preview element
 * @param options.renderPreview - Custom render function for the preview content
 * @param options.formatName - Function to format the displayed name
 */
export function createSwatchComponent(
	name: string,
	propName: string,
	getPreviewClass: (value: string) => string,
	options: {
		layout?: SwatchLayout;
		values?: Record<string, string>;
		sampleText?: string;
		getLabel?: (value: string) => string;
		previewTag?: string;
		renderPreview?: RenderPreviewFn;
		formatName?: (value: string) => string;
	} = {},
) {
	return defineComponent({
		name,
		props: {
			[propName]: {
				type: String,
				required: true,
			},
		},
		setup(props) {
			return () => {
				const value = props[propName] as string;
				const previewClass = getPreviewClass(value);
				const displayName = options.formatName?.(value) ?? value;

				// If custom renderPreview is provided, use a row layout with custom content
				if (options.renderPreview) {
					return h("div", { class: "token-swatch token-swatch--row" }, [
						h("div", { class: "token-swatch__name" }, displayName),
						options.values?.[value] !== undefined
							? h(
									"div",
									{ class: "token-swatch__value" },
									options.values[value],
								)
							: null,
						options.renderPreview(value, previewClass),
					]);
				}

				return h(TokenSwatch, {
					name: displayName,
					value: options.values?.[value],
					previewClass,
					sampleText: options.sampleText,
					layout: options.layout ?? "box",
					label: options.getLabel?.(value),
					previewTag: options.previewTag ?? "div",
				});
			};
		},
	});
}

/**
 * Helper function to create a grid component for a swatch type.
 */
export function createGridComponent(
	name: string,
	items: string[],
	SwatchComponent: ReturnType<typeof defineComponent>,
	propName: string,
	layout: "grid" | "list" = "grid",
) {
	return defineComponent({
		name,
		setup() {
			return () =>
				h(
					TokenGrid,
					{ items, layout },
					{
						default: ({ item }: { item: string }) =>
							h(SwatchComponent, { [propName]: item }),
					},
				);
		},
	});
}
