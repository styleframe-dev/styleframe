import type { Meta, StoryObj } from "@storybook/vue3-vite";

const meta = {
	title: "Theme/Elements/Ol",
	tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => ({
		template: `
			<ol>
				<li>First item</li>
				<li>Second item</li>
				<li>Third item</li>
			</ol>
		`,
	}),
};

export const Nested: Story = {
	render: () => ({
		template: `
			<ol>
				<li>First item</li>
				<li>
					Second item
					<ol>
						<li>Nested item one</li>
						<li>Nested item two</li>
					</ol>
				</li>
				<li>Third item</li>
			</ol>
		`,
	}),
};

export const MixedNesting: Story = {
	render: () => ({
		template: `
			<ol>
				<li>First item</li>
				<li>
					Second item
					<ul>
						<li>Unordered nested item</li>
						<li>Another unordered nested item</li>
					</ul>
				</li>
				<li>Third item</li>
			</ol>
		`,
	}),
};
