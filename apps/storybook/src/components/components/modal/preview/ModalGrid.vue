<script setup lang="ts">
import Modal from "../Modal.vue";
import ModalHeader from "../ModalHeader.vue";
import ModalBody from "../ModalBody.vue";
import ModalFooter from "../ModalFooter.vue";
import ModalTitle from "../ModalTitle.vue";
import ModalDescription from "../ModalDescription.vue";

const colors = ["neutral", "light", "dark"] as const;
const variants = ["solid", "soft", "subtle"] as const;
</script>

<template>
	<div class="modal-section">
		<div v-for="variant in variants" :key="variant">
			<div class="modal-label">{{ variant }}</div>
			<div class="modal-row">
				<div
					v-for="color in colors"
					:key="`${variant}-${color}`"
					style="position: relative; background: rgba(0, 0, 0, 0.75); border-radius: 8px; padding: 24px; display: flex; align-items: center; justify-content: center;"
				>
					<Modal
						:color="color"
						:variant="variant"
						style="max-width: 300px"
					>
						<ModalHeader :color="color" :variant="variant">
							<ModalTitle>{{ variant.charAt(0).toUpperCase() + variant.slice(1) }} {{ color.charAt(0).toUpperCase() + color.slice(1) }}</ModalTitle>
						</ModalHeader>
						<ModalBody>
							<ModalDescription>This is a {{ variant }} {{ color }} modal.</ModalDescription>
						</ModalBody>
						<ModalFooter :color="color" :variant="variant">
							Footer content
						</ModalFooter>
					</Modal>
				</div>
			</div>
		</div>
	</div>
</template>
