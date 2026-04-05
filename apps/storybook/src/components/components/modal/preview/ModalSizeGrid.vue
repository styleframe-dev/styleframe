<script setup lang="ts">
import Modal from "../Modal.vue";
import ModalHeader from "../ModalHeader.vue";
import ModalBody from "../ModalBody.vue";
import ModalFooter from "../ModalFooter.vue";
import ModalTitle from "../ModalTitle.vue";
import ModalDescription from "../ModalDescription.vue";

const colors = ["neutral", "light", "dark"] as const;
const sizes = ["sm", "md", "lg"] as const;
const sizeTitles: Record<string, string> = {
	sm: "Small",
	md: "Medium",
	lg: "Large",
};
</script>

<template>
	<div class="modal-section">
		<div v-for="size in sizes" :key="size">
			<div class="modal-label">{{ size }}</div>
			<div class="modal-row">
				<Modal
					v-for="color in colors"
					:key="`${size}-${color}`"
					:color="color"
					:size="size"
				>
					<ModalHeader :color="color" :size="size">
						<ModalTitle>{{ sizeTitles[size] }} {{ color.charAt(0).toUpperCase() + color.slice(1) }}</ModalTitle>
					</ModalHeader>
					<ModalBody :size="size">
						<ModalDescription>This is a {{ size }} {{ color }} modal.</ModalDescription>
					</ModalBody>
					<ModalFooter :color="color" :size="size">
						Footer content
					</ModalFooter>
				</Modal>
			</div>
		</div>
	</div>
</template>
