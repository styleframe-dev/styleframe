import type { Meta, StoryObj } from "@storybook/vue3-vite";

const meta = {
	title: "Theme/Elements/Dd",
	tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => ({
		template: `
			<dl>
				<dt>Term</dt>
				<dd>The definition description has no left margin and bottom spacing.</dd>
			</dl>
		`,
	}),
};
