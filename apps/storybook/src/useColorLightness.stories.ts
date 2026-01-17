import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { h, defineComponent } from "vue";

import "./useColorLightness.styleframe?css";
import { colorLightnessPreview } from "./useColorLightness.styleframe?recipe";

const ColorLightnessSwatch = defineComponent({
	name: "ColorLightnessSwatch",
	props: {
		lightness: {
			type: String,
			required: true,
		},
	},
	setup(props) {
		return () =>
			h(
				"div",
				{
					class: "color-lightness-swatch",
				},
				[
					h(
						"div",
						{
							class: colorLightnessPreview({ lightness: props.lightness }),
						},
						props.lightness,
					),
				],
			);
	},
});

const ColorLightnessGrid = defineComponent({
	name: "ColorLightnessGrid",
	setup() {
		const lightnessLevels = [
			"50",
			"100",
			"200",
			"300",
			"400",
			"500",
			"600",
			"700",
			"800",
			"900",
			"950",
		];

		return () =>
			h(
				"div",
				{
					class: "color-lightness-grid",
				},
				lightnessLevels.map((lightness) =>
					h(ColorLightnessSwatch, { lightness }),
				),
			);
	},
});

const meta = {
	title: "Theme/Colors/useColorLightness",
	component: ColorLightnessSwatch,
	tags: ["autodocs"],
	argTypes: {
		lightness: {
			control: "select",
			options: [
				"50",
				"100",
				"200",
				"300",
				"400",
				"500",
				"600",
				"700",
				"800",
				"900",
				"950",
			],
		},
	},
} satisfies Meta<typeof ColorLightnessSwatch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllLightnessLevels: StoryObj = {
	render: () => ({
		components: { ColorLightnessGrid },
		template: "<ColorLightnessGrid />",
	}),
};

export const Lightness50: Story = {
	args: {
		lightness: "50",
	},
};

export const Lightness100: Story = {
	args: {
		lightness: "100",
	},
};

export const Lightness200: Story = {
	args: {
		lightness: "200",
	},
};

export const Lightness300: Story = {
	args: {
		lightness: "300",
	},
};

export const Lightness400: Story = {
	args: {
		lightness: "400",
	},
};

export const Lightness500: Story = {
	args: {
		lightness: "500",
	},
};

export const Lightness600: Story = {
	args: {
		lightness: "600",
	},
};

export const Lightness700: Story = {
	args: {
		lightness: "700",
	},
};

export const Lightness800: Story = {
	args: {
		lightness: "800",
	},
};

export const Lightness900: Story = {
	args: {
		lightness: "900",
	},
};

export const Lightness950: Story = {
	args: {
		lightness: "950",
	},
};
