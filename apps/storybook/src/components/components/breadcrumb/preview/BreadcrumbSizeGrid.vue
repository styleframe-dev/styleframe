<script setup lang="ts">
import Breadcrumb from "../Breadcrumb.vue";
import BreadcrumbItem from "../BreadcrumbItem.vue";

const sizes = ["sm", "md", "lg"] as const;
</script>

<template>
	<div class="breadcrumb-section">
		<div v-for="size in sizes" :key="size">
			<div class="breadcrumb-label">{{ size }}</div>
			<Breadcrumb :size="size">
				<BreadcrumbItem :size="size" href="#">Home</BreadcrumbItem>
				<BreadcrumbItem :size="size" href="#">Library</BreadcrumbItem>
				<BreadcrumbItem :size="size" active>Current</BreadcrumbItem>
			</Breadcrumb>
		</div>
	</div>
</template>
