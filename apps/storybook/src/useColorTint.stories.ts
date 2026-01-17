import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { h, defineComponent } from "vue";

import "./useColorTint.styleframe?css";
import { colorTintPreview } from "./useColorTint.styleframe?recipe";

const tintLabels: Record<string, string> = {
	base: "Base",
	"50": "Tint 50 (+5%)",
	"100": "Tint 100 (+10%)",
	"150": "Tint 150 (+15%)",
	"200": "Tint 200 (+20%)",
};

const ColorTintSwatch = defineComponent({
	name: "ColorTintSwatch",
	props: {
		tint: {
			type: String,
			required: true,
		},
	},
	setup(props) {
		return () =>
			h(
				"div",
				{
					class: "color-tint-swatch",
				},
				[
					h(
						"div",
						{
							class: colorTintPreview({ tint: props.tint }),
						},
						props.tint === "base" ? "Base" : props.tint,
					),
					h("span", { class: "color-tint-label" }, tintLabels[props.tint]),
				],
			);
	},
});

const ColorTintGrid = defineComponent({
	name: "ColorTintGrid",
	setup() {
		const tints = ["base", "50", "100", "150", "200"];

		return () =>
			h(
				"div",
				{
					class: "color-tint-grid",
				},
				tints.map((tint) => h(ColorTintSwatch, { tint })),
			);
	},
});

const meta = {
	title: "Theme/Colors/useColorTint",
	component: ColorTintSwatch,
	tags: ["autodocs"],
	argTypes: {
		tint: {
			control: "select",
			options: ["base", "50", "100", "150", "200"],
		},
	},
} satisfies Meta<typeof ColorTintSwatch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllTints: StoryObj = {
	render: () => ({
		components: { ColorTintGrid },
		template: "<ColorTintGrid />",
	}),
};

export const Base: Story = {
	args: {
		tint: "base",
	},
};

export const Tint50: Story = {
	args: {
		tint: "50",
	},
};

export const Tint100: Story = {
	args: {
		tint: "100",
	},
};

export const Tint150: Story = {
	args: {
		tint: "150",
	},
};

export const Tint200: Story = {
	args: {
		tint: "200",
	},
};
