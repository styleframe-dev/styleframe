<script setup lang="ts">
useSeoMeta({
	title: "Projects",
	description: "Manage your Styleframe projects",
});

const projectsStore = useProjectsStore();
const projects = computed(() => projectsStore.allProjects);
</script>

<template>
	<main class="my-10">
		<h1 class="text-xl font-bold">Projects</h1>
		<p class="text-gray-500 mt-1">Select a project to manage its design tokens.</p>

		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
			<NuxtLink
				v-for="project in projects"
				:key="project.id"
				:to="`/dashboard/project/${project.id}/tokens/color`"
			>
				<UPageCard class="h-full hover:ring-2 hover:ring-[var(--ui-primary)] transition-shadow">
					<template #title>{{ project.name }}</template>
					<template #description>{{ project.description }}</template>
				</UPageCard>
			</NuxtLink>
		</div>
	</main>
</template>
