import type { Meta, StoryObj } from "@storybook/vue3-vite";

const meta = {
	title: "Theme/Elements/Summary",
	tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => ({
		template: `
			<details>
				<summary>Click to expand</summary>
				<p>This content is revealed when the summary is clicked. The summary element has a pointer cursor.</p>
			</details>
		`,
	}),
};

export const Multiple: Story = {
	render: () => ({
		template: `
			<div>
				<details>
					<summary>Section one</summary>
					<p>Content for section one.</p>
				</details>
				<details>
					<summary>Section two</summary>
					<p>Content for section two.</p>
				</details>
				<details>
					<summary>Section three</summary>
					<p>Content for section three.</p>
				</details>
			</div>
		`,
	}),
};
