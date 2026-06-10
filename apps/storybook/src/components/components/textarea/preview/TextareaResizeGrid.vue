<script setup lang="ts">
import Textarea from "../Textarea.vue";

const resizes = ["none", "vertical", "horizontal", "both"] as const;
</script>

<template>
	<div class="textarea-section">
		<div v-for="resize in resizes" :key="resize">
			<div class="textarea-label">{{ resize }}</div>
			<div class="textarea-row">
				<Textarea
					:resize="resize"
					:rows="3"
					:placeholder="`resize: ${resize}`"
				/>
			</div>
		</div>
	</div>
</template>
