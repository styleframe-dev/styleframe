<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";

const currentX = ref(0);
const currentY = ref(0);
const mouseX = ref(0);
const mouseY = ref(0);

let animationId: number | null = null;

const interactiveBubbleStyle = computed(() => {
	return {
		transform: `translate(${Math.round(currentX.value)}px, ${Math.round(currentY.value)}px)`,
	};
});

function move() {
	currentX.value += (mouseX.value - currentX.value) / 20;
	currentY.value += (mouseY.value - currentY.value) / 20;
	animationId = requestAnimationFrame(move);
}

function handleMouseMove(event: MouseEvent) {
	mouseX.value = event.clientX;
	mouseY.value = event.clientY;
}

onMounted(() => {
	move();
});

onBeforeUnmount(() => {
	if (animationId) {
		cancelAnimationFrame(animationId);
	}
});
</script>

<template>
	<div class="morphing-gradient-background">
		<svg xmlns="http://www.w3.org/2000/svg">
			<defs>
				<filter id="goo">
					<feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
					<feBlend in="SourceGraphic" in2="goo" />
				</filter>
			</defs>
		</svg>
		<div class="gradients-container absolute w-full h-full top-0 left-0 overflow-hidden">
			<div class="g1"></div>
			<div class="g2"></div>
			<div class="g3"></div>
			<div class="g4"></div>
			<div class="g5"></div>
			<div class="interactive" :style="interactiveBubbleStyle"></div>
		</div>
		<slot :mousemove="handleMouseMove" />
	</div>
</template>

<style scoped>
@keyframes moveInCircle {
	0% {
		transform: rotate(0deg);
	}
	50% {
		transform: rotate(180deg);
	}
	100% {
		transform: rotate(360deg);
	}
}

@keyframes moveVertical {
	0% {
		transform: translateY(-50%);
	}
	50% {
		transform: translateY(50%);
	}
	100% {
		transform: translateY(-50%);
	}
}

@keyframes moveHorizontal {
	0% {
		transform: translateX(-50%) translateY(-10%);
	}
	50% {
		transform: translateX(50%) translateY(10%);
	}
	100% {
		transform: translateX(-50%) translateY(-10%);
	}
}


.morphing-gradient-background {
	--color-bg1: var(--ui-bg);
	--color-bg2: var(--ui-bg);
	--color1: 18, 113, 255;
	--color2: 221, 74, 255;
	--color3: 100, 220, 255;
	--color4: 200, 50, 50;
	--color5: 180, 180, 50;
	--color-interactive: 140, 100, 255;
	--circle-size: 80%;
	--blending: hard-light;
	--intensity: 0.2;

	background: linear-gradient(40deg, var(--color-bg1), var(--color-bg2));

	svg {
		position: fixed;
		top:0;
		left:0;
		width: 0;
		height: 0;
	}


	.gradients-container {
		filter: url(#goo) blur(40px) ;
		width: 100%;
		height: 100%;
	}

	.g1 {
		position: absolute;
		background: radial-gradient(circle at center, rgba(var(--color1), var(--intensity)) 0, rgba(var(--color1), 0) 50%) no-repeat;
		mix-blend-mode: var(--blending);

		width: var(--circle-size);
		height: var(--circle-size);
		top: calc(50% - var(--circle-size) / 2);
		left: calc(50% - var(--circle-size) / 2);

		transform-origin: center center;
		animation: moveVertical 30s ease infinite;

		opacity: 1;
	}

	.g2 {
		position: absolute;
		background: radial-gradient(circle at center, rgba(var(--color2), var(--intensity)) 0, rgba(var(--color2), 0) 50%) no-repeat;
		mix-blend-mode: var(--blending);

		width: var(--circle-size);
		height: var(--circle-size);
		top: calc(50% - var(--circle-size) / 2);
		left: calc(50% - var(--circle-size) / 2);

		transform-origin: calc(50% - 400px);
		animation: moveInCircle 20s reverse infinite;

		opacity: 1;
	}

	.g3 {
		position: absolute;
		background: radial-gradient(circle at center, rgba(var(--color3), var(--intensity)) 0, rgba(var(--color3), 0) 50%) no-repeat;
		mix-blend-mode: var(--blending);

		width: var(--circle-size);
		height: var(--circle-size);
		top: calc(50% - var(--circle-size) / 2 + 200px);
		left: calc(50% - var(--circle-size) / 2 - 500px);

		transform-origin: calc(50% + 400px);
		animation: moveInCircle 40s linear infinite;

		opacity: 1;
	}

	.g4 {
		position: absolute;
		background: radial-gradient(circle at center, rgba(var(--color4), var(--intensity)) 0, rgba(var(--color4), 0) 50%) no-repeat;
		mix-blend-mode: var(--blending);

		width: var(--circle-size);
		height: var(--circle-size);
		top: calc(50% - var(--circle-size) / 2);
		left: calc(50% - var(--circle-size) / 2);

		transform-origin: calc(50% - 200px);
		animation: moveHorizontal 40s ease infinite;

		opacity: 0.7;
	}

	.g5 {
		position: absolute;
		background: radial-gradient(circle at center, rgba(var(--color5), var(--intensity)) 0, rgba(var(--color5), 0) 50%) no-repeat;
		mix-blend-mode: var(--blending);

		width: calc(var(--circle-size) * 2);
		height: calc(var(--circle-size) * 2);
		top: calc(50% - var(--circle-size));
		left: calc(50% - var(--circle-size));

		transform-origin: calc(50% - 800px) calc(50% + 200px);
		animation: moveInCircle 20s ease infinite;

		opacity: 1;
	}

	.interactive {
		position: absolute;
		background: radial-gradient(circle at center, rgba(var(--color-interactive), var(--intensity)) 0, rgba(var(--color-interactive), 0) 50%) no-repeat;
		mix-blend-mode: var(--blending);

		width: 100%;
		height: 100%;
		top: -50%;
		left: -50%;

		opacity: 0.7;
	}
}
</style>
