import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { defineComponent, h } from "vue";

import ColorVariantSwatch from "../components/ColorVariantSwatch.vue";
import StoryGrid from "../components/StoryGrid.vue";
import "./color-shade.styleframe?css";
import { colorShadePreview } from "./color-shade.styleframe?ts";

const shades = ["base", "50", "100", "150", "200"];

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
			h(ColorVariantSwatch, {
				name: props.shade,
				previewClass: colorShadePreview({ shade: props.shade }),
				label: shadeLabels[props.shade],
			});
	},
});

const meta = {
	title: "Design Tokens/Colors/Color Shade",
	component: ColorShadeSwatch,
	tags: ["autodocs"],
	argTypes: {
		shade: {
			control: "select",
			options: shades,
		},
	},
} satisfies Meta<typeof ColorShadeSwatch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllShades: StoryObj = {
	render: () => ({
		components: { ColorShadeSwatch, StoryGrid },
		setup() {
			return { shades };
		},
		template: `
			<StoryGrid :items="shades" layout="grid" v-slot="{ item }">
				<ColorShadeSwatch :shade="item" />
			</StoryGrid>
		`,
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
