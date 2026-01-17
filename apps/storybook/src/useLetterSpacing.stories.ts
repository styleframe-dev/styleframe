import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { h, defineComponent } from "vue";

import "./useLetterSpacing.styleframe?css";
import { letterSpacingPreview } from "./useLetterSpacing.styleframe?recipe";

const letterSpacingValues: Record<string, string> = {
	tighter: "-0.05em",
	tight: "-0.025em",
	normal: "normal",
	wide: "0.05em",
	wider: "0.1em",
};

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
			h(
				"div",
				{
					class: "letter-spacing-swatch",
				},
				[
					h("div", { class: "letter-spacing-name" }, props.letterSpacing),
					h(
						"div",
						{ class: "letter-spacing-value" },
						letterSpacingValues[props.letterSpacing],
					),
					h(
						"span",
						{
							class: letterSpacingPreview({
								letterSpacing: props.letterSpacing,
							}),
						},
						"Letter Spacing",
					),
				],
			);
	},
});

const LetterSpacingGrid = defineComponent({
	name: "LetterSpacingGrid",
	setup() {
		const letterSpacings = ["tighter", "tight", "normal", "wide", "wider"];

		return () =>
			h(
				"div",
				{
					class: "letter-spacing-grid",
				},
				letterSpacings.map((letterSpacing) =>
					h(LetterSpacingSwatch, { letterSpacing }),
				),
			);
	},
});

const meta = {
	title: "Theme/Typography/useLetterSpacing",
	component: LetterSpacingSwatch,
	tags: ["autodocs"],
	argTypes: {
		letterSpacing: {
			control: "select",
			options: ["tighter", "tight", "normal", "wide", "wider"],
		},
	},
} satisfies Meta<typeof LetterSpacingSwatch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllLetterSpacings: StoryObj = {
	render: () => ({
		components: { LetterSpacingGrid },
		template: "<LetterSpacingGrid />",
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
