<script setup lang="ts">
import {
	pgBrowserAction,
	pgBrowserActions,
	pgBrowserChrome,
	pgBrowserDot,
	pgBrowserDots,
	pgBrowserUrl,
	pgBrowserUrlText,
	pgBrowserViewport,
	pgHmrDot,
	pgHmrIndicator,
} from "virtual:styleframe";
import Icon from "./Icon.vue";

withDefaults(
	defineProps<{
		url?: string;
		hmrReady?: boolean;
	}>(),
	{
		url: "localhost:5173",
		hmrReady: true,
	},
);
</script>

<template>
	<div style="display: flex; flex-direction: column; height: 100%; min-height: 0">
		<div :class="pgBrowserChrome()">
			<div :class="pgBrowserDots()" aria-hidden="true">
				<span :class="pgBrowserDot({ tone: 'red' })" />
				<span :class="pgBrowserDot({ tone: 'yellow' })" />
				<span :class="pgBrowserDot({ tone: 'green' })" />
			</div>
			<div :class="pgBrowserUrl()">
				<span :class="pgBrowserUrlText()">{{ url }}</span>
				<span :class="pgHmrIndicator()">
					<span v-if="hmrReady" :class="pgHmrDot()" aria-hidden="true" />
					<span>HMR {{ hmrReady ? "ready" : "offline" }}</span>
				</span>
			</div>
			<div :class="pgBrowserActions()">
				<span :class="pgBrowserAction()" aria-hidden="true">
					<Icon name="reload" :size="14" />
				</span>
				<span :class="pgBrowserAction()" aria-hidden="true">
					<Icon name="external" :size="14" />
				</span>
			</div>
		</div>
		<div :class="pgBrowserViewport()">
			<slot />
		</div>
	</div>
</template>
