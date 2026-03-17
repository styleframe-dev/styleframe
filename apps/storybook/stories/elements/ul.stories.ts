import type { Meta, StoryObj } from "@storybook/vue3-vite";

const meta = {
	title: "Theme/Elements/Ul",
	tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => ({
		template: `
			<ul>
				<li>First item</li>
				<li>Second item</li>
				<li>Third item</li>
			</ul>
		`,
	}),
};

export const Nested: Story = {
	render: () => ({
		template: `
			<ul>
				<li>First item</li>
				<li>
					Second item
					<ul>
						<li>Nested item one</li>
						<li>Nested item two</li>
					</ul>
				</li>
				<li>Third item</li>
			</ul>
		`,
	}),
};

export const MixedNesting: Story = {
	render: () => ({
		template: `
			<ul>
				<li>First item</li>
				<li>
					Second item
					<ol>
						<li>Ordered nested item</li>
						<li>Another ordered nested item</li>
					</ol>
				</li>
				<li>Third item</li>
			</ul>
		`,
	}),
};
