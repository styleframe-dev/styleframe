import type { Meta, StoryObj } from "@storybook/vue3-vite";

const meta = {
	title: "Theme/States/Selection",
	tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => ({
		template: `
			<div>
				<p>Select this text to see the custom selection highlight color applied by the global element styles.</p>
				<p>The selection uses the primary color as background with white text for contrast.</p>
			</div>
		`,
	}),
};
