<script setup lang="ts">
import { calendarDay } from "virtual:styleframe";

const props = withDefaults(
	defineProps<{
		type?: "day" | "month" | "year";
		variant?: "solid" | "outline" | "soft" | "subtle";
		selected?: boolean;
		today?: boolean;
		outside?: boolean;
		disabled?: boolean;
		booked?: boolean;
		range?: "none" | "start" | "middle" | "end";
	}>(),
	{ range: "none" },
);
</script>

<template>
	<button
		type="button"
		:class="
			calendarDay({
				type: props.type,
				variant: props.variant,
				selected: props.selected ? 'true' : 'false',
				today: props.today ? 'true' : 'false',
				outside: props.outside ? 'true' : 'false',
				disabled: props.disabled ? 'true' : 'false',
				booked: props.booked ? 'true' : 'false',
				range: props.range,
			})
		"
		:disabled="props.disabled || props.booked"
		:aria-selected="props.selected || undefined"
		:data-today="props.today || undefined"
	>
		<slot />
	</button>
</template>
