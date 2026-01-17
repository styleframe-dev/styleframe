import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { h, defineComponent } from "vue";

import "./useFontWeight.styleframe?css";
import { fontWeightPreview } from "./useFontWeight.styleframe?recipe";

const fontWeightValues: Record<string, string> = {
	extralight: "200",
	light: "300",
	normal: "400",
	medium: "500",
	semibold: "600",
	bold: "700",
	black: "900",
};

const FontWeightSwatch = defineComponent({
	name: "FontWeightSwatch",
	props: {
		fontWeight: {
			type: String,
			required: true,
		},
	},
	setup(props) {
		return () =>
			h(
				"div",
				{
					class: "font-weight-swatch",
				},
				[
					h("div", { class: "font-weight-name" }, props.fontWeight),
					h(
						"div",
						{ class: "font-weight-value" },
						fontWeightValues[props.fontWeight],
					),
					h(
						"span",
						{
							class: fontWeightPreview({ fontWeight: props.fontWeight }),
						},
						"The quick brown fox jumps over the lazy dog",
					),
				],
			);
	},
});

const FontWeightGrid = defineComponent({
	name: "FontWeightGrid",
	setup() {
		const fontWeights = [
			"extralight",
			"light",
			"normal",
			"medium",
			"semibold",
			"bold",
			"black",
		];

		return () =>
			h(
				"div",
				{
					class: "font-weight-grid",
				},
				fontWeights.map((fontWeight) => h(FontWeightSwatch, { fontWeight })),
			);
	},
});

const meta = {
	title: "Theme/Typography/useFontWeight",
	component: FontWeightSwatch,
	tags: ["autodocs"],
	argTypes: {
		fontWeight: {
			control: "select",
			options: [
				"extralight",
				"light",
				"normal",
				"medium",
				"semibold",
				"bold",
				"black",
			],
		},
	},
} satisfies Meta<typeof FontWeightSwatch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllFontWeights: StoryObj = {
	render: () => ({
		components: { FontWeightGrid },
		template: "<FontWeightGrid />",
	}),
};

export const ExtraLight: Story = {
	args: {
		fontWeight: "extralight",
	},
};

export const Light: Story = {
	args: {
		fontWeight: "light",
	},
};

export const Normal: Story = {
	args: {
		fontWeight: "normal",
	},
};

export const Medium: Story = {
	args: {
		fontWeight: "medium",
	},
};

export const Semibold: Story = {
	args: {
		fontWeight: "semibold",
	},
};

export const Bold: Story = {
	args: {
		fontWeight: "bold",
	},
};

export const Black: Story = {
	args: {
		fontWeight: "black",
	},
};
