import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { defineComponent, h } from "vue";

import TypographySwatch from "../components/TypographySwatch.vue";
import StoryGrid from "../components/StoryGrid.vue";
import "./font-size.styleframe?css";
import { fontSizePreview } from "./font-size.styleframe?ts";
import { fontSizeValues } from "./font-size.styleframe";

const fontSizes = Object.keys(
	fontSizeValues,
) as (keyof typeof fontSizeValues)[];

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
			h(TypographySwatch, {
				name: props.fontSize,
				value: fontSizeValues[props.fontSize as keyof typeof fontSizeValues],
				previewClass: fontSizePreview({ fontSize: props.fontSize }),
				sampleText: "The quick brown fox",
			});
	},
});

const meta = {
	title: "Design Tokens/Typography/Font Size",
	component: FontSizeSwatch,
	tags: ["autodocs"],
	argTypes: {
		fontSize: {
			control: "select",
			options: fontSizes,
		},
	},
} satisfies Meta<typeof FontSizeSwatch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllFontSizes: StoryObj = {
	render: () => ({
		components: { FontSizeSwatch, StoryGrid },
		setup() {
			return { fontSizes };
		},
		template: `
			<StoryGrid :items="fontSizes" layout="list" v-slot="{ item }">
				<FontSizeSwatch :font-size="item" />
			</StoryGrid>
		`,
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
