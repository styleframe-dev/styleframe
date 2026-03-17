import type { Meta, StoryObj } from "@storybook/vue3-vite";

const meta = {
	title: "Theme/Elements/Code",
	tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => ({
		template: `<p>Use the <code>console.log()</code> method to print to the console.</p>`,
	}),
};

export const WithSamp: Story = {
	render: () => ({
		template: `<p>The output was: <samp>Hello, world!</samp></p>`,
	}),
};

export const InlineComparison: Story = {
	render: () => ({
		template: `
			<p>Regular text compared to <code>inline code</code> and <samp>sample output</samp>.</p>
		`,
	}),
};
