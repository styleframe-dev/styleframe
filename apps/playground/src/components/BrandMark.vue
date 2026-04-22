<script setup lang="ts">
import { computed } from "vue";
import { pgBrandBadge, pgBrandLogotype, pgBrandMark } from "virtual:styleframe";
import logotypeDark from "@/assets/logotype-dark.svg?url";
import logotypeLight from "@/assets/logotype-light.svg?url";
import { useTheme } from "@/state/theme";

const { resolved } = useTheme();
const logotypeSrc = computed(() =>
	resolved.value === "dark" ? logotypeDark : logotypeLight,
);
</script>

<template>
	<div :class="pgBrandMark()">
		<img
			:class="pgBrandLogotype()"
			:src="logotypeSrc"
			alt="Styleframe"
			draggable="false"
		/>
		<span :class="pgBrandBadge()">Playground</span>
	</div>
</template>
