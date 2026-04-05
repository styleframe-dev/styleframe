<script setup lang="ts">
import Modal from "../Modal.vue";
import ModalHeader from "../ModalHeader.vue";
import ModalBody from "../ModalBody.vue";
import ModalFooter from "../ModalFooter.vue";
import ModalTitle from "../ModalTitle.vue";
import ModalDescription from "../ModalDescription.vue";

const sizes = ["sm", "md", "lg"] as const;
const sizeTitles: Record<string, string> = {
	sm: "Small",
	md: "Medium",
	lg: "Large",
};
const sizeWidths: Record<string, string> = {
	sm: "320px",
	md: "480px",
	lg: "640px",
};
</script>

<template>
	<div class="modal-section">
		<div v-for="size in sizes" :key="size">
			<div class="modal-label">{{ sizeTitles[size] }} ({{ size }})</div>
			<div
				style="position: relative; background: rgba(0, 0, 0, 0.75); border-radius: 8px; padding: 24px; display: flex; align-items: center; justify-content: center;"
			>
				<Modal
					:size="size"
					:style="{ maxWidth: sizeWidths[size], width: '100%' }"
				>
					<ModalHeader :size="size">
						<ModalTitle>{{ sizeTitles[size] }} Modal</ModalTitle>
					</ModalHeader>
					<ModalBody :size="size">
						<ModalDescription>This is a {{ size }} modal showing the {{ sizeTitles[size].toLowerCase() }} size variant.</ModalDescription>
					</ModalBody>
					<ModalFooter :size="size">
						Footer content
					</ModalFooter>
				</Modal>
			</div>
		</div>
	</div>
</template>
