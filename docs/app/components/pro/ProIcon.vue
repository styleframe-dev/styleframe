<template>
	<UPopover
		placement="top"
		mode="hover"
		arrow
		:open-delay="0"
		variant="subtle"
	>
		<template #content>
			<div class="premium-icon-content p-4">
				<ProseStrong>
					<Icon
						name="material-symbols:award-star"
						class="text-warning"
					/>
					Pro Feature
				</ProseStrong>
				<ProseP class="text-sm my-2">
					Unlock advanced capabilities with styleframe Pro. This
					feature requires a Pro license to access.
				</ProseP>
				<UButton class="mt-2" color="neutral" size="sm">
					Upgrade to Pro
				</UButton>
			</div>
		</template>
		<Icon
			name="material-symbols:award-star"
			class="text-warning"
			to="/pricing"
		/>
	</UPopover>
</template>

<style scoped>
.premium-icon-content {
	max-width: 320px;
}
</style>
