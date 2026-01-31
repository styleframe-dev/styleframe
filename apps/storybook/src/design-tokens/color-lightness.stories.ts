import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { defineComponent, h } from "vue";

import ColorVariantSwatch from "../components/ColorVariantSwatch.vue";
import StoryGrid from "../components/StoryGrid.vue";
import "./color-lightness.styleframe?css";
import { colorLightnessPreview } from "./color-lightness.styleframe?ts";

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
			h(ColorVariantSwatch, {
				name: props.lightness,
				previewClass: colorLightnessPreview({ lightness: props.lightness }),
			});
	},
});

const meta = {
	title: "Design Tokens/Colors/Color Lightness",
	component: ColorLightnessSwatch,
	tags: ["autodocs"],
	argTypes: {
		lightness: {
			control: "select",
			options: lightnessLevels,
		},
	},
} satisfies Meta<typeof ColorLightnessSwatch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllLightnessLevels: StoryObj = {
	render: () => ({
		components: { ColorLightnessSwatch, StoryGrid },
		setup() {
			return { lightnessLevels };
		},
		template: `
			<StoryGrid :items="lightnessLevels" layout="grid" v-slot="{ item }">
				<ColorLightnessSwatch :lightness="item" />
			</StoryGrid>
		`,
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
