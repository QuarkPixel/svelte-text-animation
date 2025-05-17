<script lang="ts">
	import { Tween } from 'svelte/motion';
	import TextAnimation from '$lib/TextAnimation.svelte';
	import { cubicInOut } from 'svelte/easing';

	const DURATION = 3800;

	const progress = new Tween(0, { duration: DURATION, easing: cubicInOut });

	const examples: {
		text: string;
		className: string;
		styleCallback: (intensity: number) => string;
		spread?: number;
	}[] = [
		{
			text: 'Made by Xuancong Meng!',
			className: 'climate-crisis',
			styleCallback: (intensity: number): string => `
				font-size: ${5 - intensity}rem;
				font-variation-settings: "YEAR" ${1979 + intensity * 61};
			`
		},
		{
			text: 'Svelte Text Animation',
			className: 'anybody',
			styleCallback: (intensity: number): string => `
				font-weight: ${100 + intensity * 800};
				font-variation-settings: "wdth" ${150 - intensity * 70};
			`,
			spread: 5
		},
		{
			text: 'the Cake is a Lie',
			className: 'anybody',
			styleCallback: (intensity: number): string => `
				font-weight: ${900 - intensity * 800};
				font-variation-settings: "wdth" ${80 + intensity * 70};
			`,
			spread: 5
		}
	];

	progress.target = 1;
	setInterval(() => (progress.target = progress.target == 0 ? 1 : 0), DURATION + 500);
</script>

<link
	href="https://fonts.googleapis.com/css2?family=Climate+Crisis:YEAR@1979..2050&display=swap"
	rel="stylesheet"
/>
<link
	href="https://fonts.googleapis.com/css2?family=Anybody:wdth,wght@50..150,100..900&display=swap"
	rel="stylesheet"
/>

<div class="text">
	{#each examples as { text, className, styleCallback, spread }, i (i)}
		<TextAnimation class={className} {text} progress={progress.current} {styleCallback} {spread} />
	{/each}
</div>

<style>
    .text {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        height: 100vh;
        user-select: none;
        font-size: 5rem;
    }

    :global(.climate-crisis) {
        font-family: 'Climate Crisis', sans-serif;
        font-optical-sizing: auto;
        font-weight: 400;
        font-style: normal;
    }

    :global(.anybody) {
        font-family: 'Anybody', sans-serif;
        font-optical-sizing: auto;
        font-style: normal;
    }

    :global(*) {
        margin: 0;
        padding: 0;
    }
</style>
