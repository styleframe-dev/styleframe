import type { Meta, StoryObj } from "@storybook/vue3-vite";

const meta = {
	title: "Theme/Elements/Hr",
	tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => ({
		template: `
			<div>
				<p>Content above the horizontal rule.</p>
				<hr />
				<p>Content below the horizontal rule.</p>
			</div>
		`,
	}),
};
