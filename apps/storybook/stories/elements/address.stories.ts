import type { Meta, StoryObj } from "@storybook/vue3-vite";

const meta = {
	title: "Theme/Elements/Address",
	tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => ({
		template: `
			<address>
				<strong>Company Name</strong><br />
				123 Main Street<br />
				Suite 456<br />
				San Francisco, CA 94102
			</address>
		`,
	}),
};

export const WithLink: Story = {
	render: () => ({
		template: `
			<address>
				<a href="mailto:contact@example.com">contact@example.com</a><br />
				<a href="tel:+1234567890">(123) 456-7890</a>
			</address>
		`,
	}),
};
