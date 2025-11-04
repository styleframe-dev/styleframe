<template>
  <MorphingGradientBackground v-slot="{ onMousemove }">
    <UMain class="flex items-center justify-center" @mousemove="onMousemove">
      <UContainer class="py-8">
        <slot />
      </UContainer>
    </UMain>
  </MorphingGradientBackground>
</template>
