<script lang="ts">
	import { Tween } from 'svelte/motion';
	import { TextAnimation, map } from '$lib/index.js';
	import { cubicInOut } from 'svelte/easing';

	const DURATION = 3800;

	const progress = new Tween(0, { duration: DURATION, easing: cubicInOut });

	const examples: {
		text: string;
		className: string;
		styleCallback: (intensity: number) => string;
		spread?: number;
		innerClassName?: string;
	}[] = [
		{
			text: 'Made by Xuancong Meng!',
			className: 'climate-crisis',
			styleCallback: (intensity: number): string => `
				font-size: ${map(intensity, 5, 4)}rem;
				font-variation-settings: "YEAR" ${map(intensity, 1979, 2040)};
			`
		},
		{
			text: 'Svelte Text Animation',
			className: 'anybody',
			styleCallback: (intensity: number): string => `
				font-weight: ${map(intensity, 100, 900)};
				font-variation-settings: "wdth" ${map(intensity, 150, 80)};
			`,
			spread: 5
		},
		{
			text: 'the Cake is a Lie',
			className: 'anybody',
			styleCallback: (intensity: number): string => `
				font-weight: ${map(intensity, 900, 100)};
				font-variation-settings: "wdth" ${map(intensity, 80, 150)};
				--height: ${map(intensity, 0, 100)}%;
			`,
			innerClassName: 'wave',
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
	{#each examples as { text, className, styleCallback, spread, innerClassName }, i (i)}
		<TextAnimation class={className} {text} progress={progress.current} {styleCallback} {spread} {innerClassName} />
	{/each}
</div>


<style>
    .text {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        height: 100vh;
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

    :global(.wave) {
        position: relative;
				display: inline-block;
				min-width: 20px;

        &::after {
            content: "";
            display: block;
            width: 100%;
            height: var(--height, 0);
            position: absolute;
            top: calc(100% - var(--height, 0));
            background-color: #0003;
            backdrop-filter: invert(1);
        }
    }

    :global(*) {
        margin: 0;
        padding: 0;
    }
</style>
