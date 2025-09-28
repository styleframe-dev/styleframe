<script setup lang="ts">
const tiers = [
	{
		id: "solo",
		title: "Solo",
		price: "$149",
		description: "For indie hackers.",
		billingPeriod: "one-time payment",
		billingCycle: "plus local taxes",
		button: { label: "Buy now", variant: "subtle" as const },
	},
	{
		id: "team",
		title: "Team",
		price: "$449",
		description: "For growing teams.",
		billingPeriod: "one-time payment",
		billingCycle: "plus local taxes",
		button: { label: "Buy now" },
		highlight: true,
	},
	{
		id: "enterprise",
		title: "Enterprise",
		price: "Custom",
		description: "For large organizations.",
		button: { label: "Contact sales", color: "neutral" as const },
	},
];

const sections = [
	{
		id: "features",
		title: "",
		features: [
			{
				id: "developers",
				title: "Number of developers",
				tiers: { solo: "1", team: "5", enterprise: "Unlimited" },
			},
			{
				id: "projects",
				title: "Unlimited Projects",
				tiers: { solo: true, team: true, enterprise: true },
			},
			{
				id: "features",
				title: "All styleframe Pro features",
				tiers: { solo: true, team: true, enterprise: true },
			},
			{
				id: "access",
				title: "Access to the Pro GitHub repository",
				tiers: { solo: true, team: true, enterprise: true },
			},
			{
				id: "updates",
				title: "Unlimited minor & patch updates",
				tiers: { solo: true, team: true, enterprise: true },
			},
			{
				id: "lifetime",
				title: "Lifetime access",
				tiers: { solo: true, team: true, enterprise: true },
			},
			{
				id: "featureRequests",
				title: "Prioritized feature requests",
				tiers: { solo: false, team: false, enterprise: true },
			},
			{
				id: "support",
				title: "Support",
				tiers: {
					solo: "Standard",
					team: "Priority",
					enterprise: "Dedicated",
				},
			},
		],
	},
];
</script>

<template>
	<UPricingTable :tiers="tiers" :sections="sections">
		<!-- Customize specific tier title -->
		<template #team-title="{ tier }">
			<div class="flex items-center gap-2">
				<UIcon name="i-lucide-crown" class="size-4 text-amber-500" />
				{{ tier.title }}
			</div>
		</template>

		<!-- Customize specific section title -->
		<template #section-security-title="{ section }">
			<div class="flex items-center gap-2">
				<UIcon
					name="i-lucide-shield-check"
					class="size-4 text-green-500"
				/>
				<span class="font-semibold text-green-700">{{
					section.title
				}}</span>
			</div>
		</template>

		<template #feature-developers-value="{ feature, tier }">
			<UBadge
				:label="String(feature.tiers?.[tier.id])"
				color="primary"
				variant="soft"
			/>
		</template>

		<template #feature-support-value="{ feature, tier }">
			<UBadge
				:label="String(feature.tiers?.[tier.id])"
				color="primary"
				variant="soft"
			/>
		</template>
	</UPricingTable>
</template>
