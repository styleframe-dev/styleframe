<script setup lang="ts">
import Tabs from "../Tabs.vue";
import TabsContent from "../TabsContent.vue";
import TabsList from "../TabsList.vue";
import TabsTrigger from "../TabsTrigger.vue";

const orientations = ["horizontal", "vertical"] as const;
</script>

<template>
	<div class="tabs-section">
		<div v-for="orientation in orientations" :key="orientation">
			<div class="tabs-label">{{ orientation }}</div>
			<div class="tabs-row">
				<div class="tabs-demo">
					<Tabs :orientation="orientation" model-value="overview">
						<TabsList>
							<TabsTrigger value="overview">Overview</TabsTrigger>
							<TabsTrigger value="activity">Activity</TabsTrigger>
							<TabsTrigger value="reports">Reports</TabsTrigger>
						</TabsList>
						<TabsContent value="overview">Overview panel</TabsContent>
						<TabsContent value="activity">Activity panel</TabsContent>
						<TabsContent value="reports">Reports panel</TabsContent>
					</Tabs>
				</div>
			</div>
		</div>
	</div>
</template>
