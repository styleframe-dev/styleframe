import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { h, defineComponent } from "vue";

import "./useColorShade.styleframe?css";
import { colorShadePreview } from "./useColorShade.styleframe?recipe";

const shadeLabels: Record<string, string> = {
	base: "Base",
	"50": "Shade 50 (-5%)",
	"100": "Shade 100 (-10%)",
	"150": "Shade 150 (-15%)",
	"200": "Shade 200 (-20%)",
};

const ColorShadeSwatch = defineComponent({
	name: "ColorShadeSwatch",
	props: {
		shade: {
			type: String,
			required: true,
		},
	},
	setup(props) {
		return () =>
			h(
				"div",
				{
					class: "color-shade-swatch",
				},
				[
					h(
						"div",
						{
							class: colorShadePreview({ shade: props.shade }),
						},
						props.shade === "base" ? "Base" : props.shade,
					),
					h("span", { class: "color-shade-label" }, shadeLabels[props.shade]),
				],
			);
	},
});

const ColorShadeGrid = defineComponent({
	name: "ColorShadeGrid",
	setup() {
		const shades = ["base", "50", "100", "150", "200"];

		return () =>
			h(
				"div",
				{
					class: "color-shade-grid",
				},
				shades.map((shade) => h(ColorShadeSwatch, { shade })),
			);
	},
});

const meta = {
	title: "Theme/Colors/useColorShade",
	component: ColorShadeSwatch,
	tags: ["autodocs"],
	argTypes: {
		shade: {
			control: "select",
			options: ["base", "50", "100", "150", "200"],
		},
	},
} satisfies Meta<typeof ColorShadeSwatch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllShades: StoryObj = {
	render: () => ({
		components: { ColorShadeGrid },
		template: "<ColorShadeGrid />",
	}),
};

export const Base: Story = {
	args: {
		shade: "base",
	},
};

export const Shade50: Story = {
	args: {
		shade: "50",
	},
};

export const Shade100: Story = {
	args: {
		shade: "100",
	},
};

export const Shade150: Story = {
	args: {
		shade: "150",
	},
};

export const Shade200: Story = {
	args: {
		shade: "200",
	},
};
