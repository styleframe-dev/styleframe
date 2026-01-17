import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { h, defineComponent } from "vue";

import "./useFontSize.styleframe?css";
import { fontSizePreview } from "./useFontSize.styleframe?recipe";

const fontSizeValues: Record<string, string> = {
	xs: "0.75rem",
	sm: "0.875rem",
	md: "1rem",
	lg: "1.125rem",
	xl: "1.25rem",
	"2xl": "1.5rem",
	"3xl": "1.875rem",
	"4xl": "2.25rem",
};

const FontSizeSwatch = defineComponent({
	name: "FontSizeSwatch",
	props: {
		fontSize: {
			type: String,
			required: true,
		},
	},
	setup(props) {
		return () =>
			h(
				"div",
				{
					class: "font-size-swatch",
				},
				[
					h("div", { class: "font-size-name" }, props.fontSize),
					h(
						"div",
						{ class: "font-size-value" },
						fontSizeValues[props.fontSize],
					),
					h(
						"span",
						{
							class: fontSizePreview({ fontSize: props.fontSize }),
						},
						"The quick brown fox",
					),
				],
			);
	},
});

const FontSizeGrid = defineComponent({
	name: "FontSizeGrid",
	setup() {
		const fontSizes = ["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl"];

		return () =>
			h(
				"div",
				{
					class: "font-size-grid",
				},
				fontSizes.map((fontSize) => h(FontSizeSwatch, { fontSize })),
			);
	},
});

const meta = {
	title: "Theme/Typography/useFontSize",
	component: FontSizeSwatch,
	tags: ["autodocs"],
	argTypes: {
		fontSize: {
			control: "select",
			options: ["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl"],
		},
	},
} satisfies Meta<typeof FontSizeSwatch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllFontSizes: StoryObj = {
	render: () => ({
		components: { FontSizeGrid },
		template: "<FontSizeGrid />",
	}),
};

export const ExtraSmall: Story = {
	args: {
		fontSize: "xs",
	},
};

export const Small: Story = {
	args: {
		fontSize: "sm",
	},
};

export const Medium: Story = {
	args: {
		fontSize: "md",
	},
};

export const Large: Story = {
	args: {
		fontSize: "lg",
	},
};

export const ExtraLarge: Story = {
	args: {
		fontSize: "xl",
	},
};

export const DoubleExtraLarge: Story = {
	args: {
		fontSize: "2xl",
	},
};

export const TripleExtraLarge: Story = {
	args: {
		fontSize: "3xl",
	},
};

export const QuadrupleExtraLarge: Story = {
	args: {
		fontSize: "4xl",
	},
};
