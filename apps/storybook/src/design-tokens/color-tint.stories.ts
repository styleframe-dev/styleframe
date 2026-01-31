import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { defineComponent, h } from "vue";

import ColorVariantSwatch from "../components/ColorVariantSwatch.vue";
import StoryGrid from "../components/StoryGrid.vue";
import "./color-tint.styleframe?css";
import { colorTintPreview } from "./color-tint.styleframe?ts";

const tints = ["base", "50", "100", "150", "200"];

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
			h(ColorVariantSwatch, {
				name: props.tint,
				previewClass: colorTintPreview({ tint: props.tint }),
				label: tintLabels[props.tint],
			});
	},
});

const meta = {
	title: "Design Tokens/Colors/Color Tint",
	component: ColorTintSwatch,
	tags: ["autodocs"],
	argTypes: {
		tint: {
			control: "select",
			options: tints,
		},
	},
} satisfies Meta<typeof ColorTintSwatch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllTints: StoryObj = {
	render: () => ({
		components: { ColorTintSwatch, StoryGrid },
		setup() {
			return { tints };
		},
		template: `
			<StoryGrid :items="tints" layout="grid" v-slot="{ item }">
				<ColorTintSwatch :tint="item" />
			</StoryGrid>
		`,
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
