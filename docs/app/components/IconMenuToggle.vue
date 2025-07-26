<script setup lang="ts">
import { motion } from 'motion-v'

const props = defineProps<{
  open: boolean
}>()

const lineVariants = {
  normal: {
    rotate: 0,
    y: 0,
    opacity: 1,
  },
  close: (custom: number) => ({
    rotate: custom === 1 ? 45 : custom === 3 ? -45 : 0,
    y: custom === 1 ? 6 : custom === 3 ? -6 : 0,
    opacity: custom === 2 ? 0 : 1,
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 20,
    },
  }),
}

const state = computed(() => {
  return props.open ? 'close' : 'normal'
})
</script>

<template>
  <UButton
    size="sm"
    variant="ghost"
    color="neutral"
    class="-me-1.5"
    square
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="size-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <motion.line
        x1="4"
        y1="6"
        x2="20"
        y2="6"
        :variants="lineVariants"
        :animate="state"
        :custom="1"
        class="outline-none"
      />
      <motion.line
        x1="4"
        y1="12"
        x2="20"
        y2="12"
        :variants="lineVariants"
        :animate="state"
        :custom="2"
        class="outline-none"
      />
      <motion.line
        x1="4"
        y1="18"
        x2="20"
        y2="18"
        :variants="lineVariants"
        :animate="state"
        :custom="3"
        class="outline-none"
      />
    </svg>
  </UButton>
</template>
