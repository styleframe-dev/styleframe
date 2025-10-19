<script setup lang="ts">
const tiers = [
	{
		id: "solo",
		title: "Solo",
		price: "$149",
		description: "For indie hackers, freelancers and solo founders.",
		billingPeriod: "one-time payment",
		billingCycle: "plus local taxes",
		button: {
			label: "Buy now",
			variant: "subtle" as const,
			to: "https://buy.polar.sh/polar_cl_Emg2oNVEHjBUEHvxleSZxjHaCmlT9fgYtrACU4QVLUm",
			target: "_blank",
		},
	},
	{
		id: "startup",
		title: "Startup",
		price: "$499",
		description: "For small teams, startups and agencies.",
		billingPeriod: "one-time payment",
		billingCycle: "plus local taxes",
		button: {
			label: "Buy now",
			to: "https://buy.polar.sh/polar_cl_IiKynjOnqr8efgtVhbSaNSvWt6G6LbHW2Oqpq4KLobS",
			target: "_blank",
		},
		highlight: true,
	},
	{
		id: "organization",
		title: "Organization",
		price: "$999",
		billingPeriod: "one-time payment",
		billingCycle: "plus local taxes",
		description: "For growing teams and large organizations.",
		button: {
			label: "Buy now",
			variant: "subtle" as const,
			to: "https://buy.polar.sh/polar_cl_7fMDcYiwaF2MA2CiXXJILg7tiltaMHPIF8BaN2OCIDQ",
			target: "_blank",
		},
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
				tiers: { solo: "1", startup: "5", organization: "20" },
			},
			{
				id: "projects",
				title: "Unlimited Projects",
				tiers: { solo: true, startup: true, organization: true },
			},
			{
				id: "features",
				title: "All styleframe Pro features",
				tiers: { solo: true, startup: true, organization: true },
			},
			{
				id: "discord",
				title: "Access to private Discord channels",
				tiers: { solo: true, startup: true, organization: true },
			},
			{
				id: "updates",
				title: "Unlimited minor & patch updates",
				tiers: { solo: true, startup: true, organization: true },
			},
			{
				id: "lifetime",
				title: "Lifetime access",
				tiers: { solo: true, startup: true, organization: true },
			},
			{
				id: "featureRequests",
				title: "Prioritized feature requests",
				tiers: { solo: false, startup: false, organization: true },
			},
			{
				id: "support",
				title: "Support",
				tiers: {
					solo: "Standard",
					startup: "Priority",
					organization: "Dedicated",
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
