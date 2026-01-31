import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { defineComponent, h } from "vue";

import TypographySwatch from "../components/TypographySwatch.vue";
import StoryGrid from "../components/StoryGrid.vue";
import "./letter-spacing.styleframe?css";
import { letterSpacingPreview } from "./letter-spacing.styleframe?ts";
import { letterSpacingValues } from "./letter-spacing.styleframe";

const letterSpacings = Object.keys(
	letterSpacingValues,
) as (keyof typeof letterSpacingValues)[];

const LetterSpacingSwatch = defineComponent({
	name: "LetterSpacingSwatch",
	props: {
		letterSpacing: {
			type: String,
			required: true,
		},
	},
	setup(props) {
		return () =>
			h(TypographySwatch, {
				name: props.letterSpacing,
				value:
					letterSpacingValues[
						props.letterSpacing as keyof typeof letterSpacingValues
					],
				previewClass: letterSpacingPreview({
					letterSpacing: props.letterSpacing,
				}),
				sampleText: "Letter Spacing",
			});
	},
});

const meta = {
	title: "Design Tokens/Typography/Letter Spacing",
	component: LetterSpacingSwatch,
	tags: ["autodocs"],
	argTypes: {
		letterSpacing: {
			control: "select",
			options: letterSpacings,
		},
	},
} satisfies Meta<typeof LetterSpacingSwatch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllLetterSpacings: StoryObj = {
	render: () => ({
		components: { LetterSpacingSwatch, StoryGrid },
		setup() {
			return { letterSpacings };
		},
		template: `
			<StoryGrid :items="letterSpacings" layout="list" v-slot="{ item }">
				<LetterSpacingSwatch :letter-spacing="item" />
			</StoryGrid>
		`,
	}),
};

export const Tighter: Story = {
	args: {
		letterSpacing: "tighter",
	},
};

export const Tight: Story = {
	args: {
		letterSpacing: "tight",
	},
};

export const Normal: Story = {
	args: {
		letterSpacing: "normal",
	},
};

export const Wide: Story = {
	args: {
		letterSpacing: "wide",
	},
};

export const Wider: Story = {
	args: {
		letterSpacing: "wider",
	},
};
