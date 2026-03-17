import type { Meta, StoryObj } from "@storybook/vue3-vite";

const meta = {
	title: "Theme/States/Focus",
	tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => ({
		template: `
			<div style="display: flex; gap: 1rem; align-items: center;">
				<button>Button</button>
				<input type="text" placeholder="Text input" />
				<a href="#">Link</a>
				<select>
					<option>Select</option>
				</select>
			</div>
		`,
	}),
};
