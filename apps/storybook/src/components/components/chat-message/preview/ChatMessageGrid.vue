<script setup lang="ts">
import ChatMessage from "../ChatMessage.vue";
import ChatMessageAvatar from "../ChatMessageAvatar.vue";
import ChatMessageContent from "../ChatMessageContent.vue";

const colors = ["neutral", "light", "dark"] as const;
const variants = ["solid", "outline", "soft", "subtle", "ghost"] as const;
const sides = ["start", "end"] as const;

const initial = (color: string) => color.charAt(0).toUpperCase();
</script>

<template>
	<div class="chat-message-section">
		<div v-for="variant in variants" :key="variant">
			<div class="chat-message-label">{{ variant }}</div>
			<div class="chat-message-row">
				<ChatMessage
					v-for="side in sides"
					:key="`${variant}-${side}`"
					:variant="variant"
					:side="side"
				>
					<ChatMessageAvatar :variant="variant">
						{{ initial(side === "start" ? "AI" : "Me") }}
					</ChatMessageAvatar>
					<ChatMessageContent :variant="variant">
						{{ variant }} bubble on {{ side }}.
					</ChatMessageContent>
				</ChatMessage>
				<ChatMessage
					v-for="color in colors"
					:key="`${variant}-${color}`"
					:color="color"
					:variant="variant"
				>
					<ChatMessageAvatar :color="color" :variant="variant">
						{{ initial(color) }}
					</ChatMessageAvatar>
					<ChatMessageContent :color="color" :variant="variant">
						{{ color }} {{ variant }} bubble.
					</ChatMessageContent>
				</ChatMessage>
			</div>
		</div>
	</div>
</template>
