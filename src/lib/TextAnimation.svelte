<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		/**
		 * The text to be animated
		 */
		text: string;
		/**
		 * Animation progress from 0 to 1
		 */
		progress: number;
		/**
		 * Number of characters affected on each side of the current position
		 * @default 3
		 */
		spread?: number;
		/**
		 * Callback function to generate style string for each character
		 * @param intensity - Value between 0 and 1 indicating effect strength
		 */
		styleCallback: (intensity: number) => string;
		/**
		 * CSS class for individual character spans
		 */
		innerClassName?: string;
	}

	const {
		text,
		progress,
		spread = 3,
		styleCallback,
		innerClassName = '',
		...rest
	}: Props = $props();

	/**
	 * Generates an array of effect intensities for each character
	 * @param length - Number of characters
	 * @param progress - Current animation progress (0-1)
	 * @param spread - Effect spread range
	 */
	function generateEffectArray(length: number, progress: number, spread: number): number[] {
		const offset = progress * (length + 2 * spread + 1) - spread - 1;
		const gaussianLikeFunction = (x: number): number => {
			const z = (x - offset) / spread;
			return Math.exp(-1.6 * z * z);
			// return Math.abs(z) > 1 ? 0 : Math.exp(-1.6 * z * z);
		};

		return Array.from({ length }, (_, i) => gaussianLikeFunction(i));
	}

	const effectArray = $derived(generateEffectArray(text.length, progress, spread));
</script>

<div {...rest}>
	{#each text.split('') as char, i (i)}
		<span class={innerClassName} style={styleCallback(effectArray[i])}>{char}</span>
	{/each}
</div>
