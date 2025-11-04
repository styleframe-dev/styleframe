<script lang="ts" setup>
import type { PricingPlanProps } from "@nuxt/ui";

const features: PricingPlanProps["features"] = [
	{
		title: "All styleframe core features",
	},
	{
		title: "40+ composables",
	},
	{
		title: "Unlimited developers",
	},
	{
		title: "Unlimited projects",
	},
	{
		title: "Unlimited major, patch & minor updates",
	},
	{
		title: "Lifetime access",
	},
];

const button: PricingPlanProps["button"] = {
	label: "Get started for free",
	trailingIcon: "i-lucide-arrow-right",
	color: "neutral",
	variant: "outline",
	to: "/docs/getting-started/introduction",
};
</script>

<template>
	<UPricingPlan
		title="Community"
		description="Our community version is open-source and free to use. Forever."
		price="Free"
		orientation="horizontal"
		variant="soft"
		:features="features"
		:button="button"
	/>
</template>
