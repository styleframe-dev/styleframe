<script lang="ts" setup>
import type { PricingPlanProps } from "@nuxt/ui";

const button: PricingPlanProps["button"] = {
	label: "Get started for free",
	trailingIcon: "i-lucide-arrow-right",
	color: "neutral",
	variant: "outline",
	to: "/docs/getting-started/introduction",
};

const variant = "none" as PricingPlanProps["variant"];
</script>

<template>
	<UPricingPlan
		title="Free in Development"
		description="Try styleframe Pro for free in development, no credit card required. Upgrade when  ready to deploy."
		orientation="horizontal"
		:variant="variant"
		:button="button"
	/>
</template>
