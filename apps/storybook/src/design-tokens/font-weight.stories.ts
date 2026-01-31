import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { defineComponent, h } from "vue";

import TypographySwatch from "../components/TypographySwatch.vue";
import StoryGrid from "../components/StoryGrid.vue";
import "./font-weight.styleframe?css";
import { fontWeightPreview } from "./font-weight.styleframe?ts";
import { fontWeightValues } from "./font-weight.styleframe";

const fontWeights = Object.keys(
	fontWeightValues,
) as (keyof typeof fontWeightValues)[];

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
			h(TypographySwatch, {
				name: props.fontWeight,
				value:
					fontWeightValues[props.fontWeight as keyof typeof fontWeightValues],
				previewClass: fontWeightPreview({ fontWeight: props.fontWeight }),
				sampleText: "The quick brown fox jumps over the lazy dog",
			});
	},
});

const meta = {
	title: "Design Tokens/Typography/Font Weight",
	component: FontWeightSwatch,
	tags: ["autodocs"],
	argTypes: {
		fontWeight: {
			control: "select",
			options: fontWeights,
		},
	},
} satisfies Meta<typeof FontWeightSwatch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllFontWeights: StoryObj = {
	render: () => ({
		components: { FontWeightSwatch, StoryGrid },
		setup() {
			return { fontWeights };
		},
		template: `
			<StoryGrid :items="fontWeights" layout="list" v-slot="{ item }">
				<FontWeightSwatch :font-weight="item" />
			</StoryGrid>
		`,
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
