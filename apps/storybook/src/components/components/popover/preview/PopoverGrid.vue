<script setup lang="ts">
import Popover from "../Popover.vue";
import PopoverHeader from "../PopoverHeader.vue";
import PopoverBody from "../PopoverBody.vue";
import PopoverFooter from "../PopoverFooter.vue";
import PopoverTitle from "../PopoverTitle.vue";
import PopoverDescription from "../PopoverDescription.vue";

const colors = ["neutral", "light", "dark"] as const;
const variants = ["solid", "outline", "soft", "subtle"] as const;
</script>

<template>
	<div class="popover-section">
		<div v-for="variant in variants" :key="variant">
			<div class="popover-label">{{ variant }}</div>
			<div class="popover-row">
				<Popover
					v-for="color in colors"
					:key="`${variant}-${color}`"
					:color="color"
					:variant="variant"
					style="max-width: 300px"
				>
					<PopoverHeader :color="color" :variant="variant">
						<PopoverTitle>{{ variant.charAt(0).toUpperCase() + variant.slice(1) }} {{ color.charAt(0).toUpperCase() + color.slice(1) }}</PopoverTitle>
					</PopoverHeader>
					<PopoverBody>
						<PopoverDescription>This is a {{ variant }} {{ color }} popover.</PopoverDescription>
					</PopoverBody>
					<PopoverFooter :color="color" :variant="variant">
						Footer content
					</PopoverFooter>
				</Popover>
			</div>
		</div>
	</div>
</template>
