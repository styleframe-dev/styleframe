<script setup lang="ts">
import type { ContentNavigationItem } from "@nuxt/content";

const navigation = inject<Ref<ContentNavigationItem[]>>("navigation");
</script>

<template>
  <UContainer>
    <UPage>
      <template #left>
        <UPageAside>
          <DocsAsideLeftTop />

          <UContentNavigation
            highlight
            variant="link"
            :navigation="navigation"
          />
        </UPageAside>
      </template>

      <slot />
    </UPage>
  </UContainer>
</template>
