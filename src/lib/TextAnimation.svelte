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
		 * Controls the flatness of the edge decay curve. Higher values make the curve flatter in the middle, keeping the effect intensity closer to 1 for a larger range of progress. Must be an integer >= 2.
		 * @default 5
		 */
		edgeFlatness?: number;
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
		edgeFlatness = 5,
		styleCallback,
		innerClassName = '',
		...rest
	}: Props = $props();

	/**
	 * Generates an array of effect intensities for each character
	 * @param length - Number of characters
	 * @param progress - Current animation progress (0-1)
	 * @param spread - Effect spread range
	 * @param flatness - Flatness of the edge decay curve (higher values make the curve flatter)
	 */
	function generateEffectArray(length: number, progress: number, spread: number, flatness: number): number[] {
		// Use edge decay function for smooth fade near 0 and 1
		const edgeFactor = 1 - Math.pow((2 * progress) - 1, 2 * flatness);

		const result = new Array(length).fill(0);

		if (edgeFactor <= 0) {
			return result;
		}

		const offset = progress * (length + 2 * spread + 1) - spread - 1;

		const startIdx = Math.max(0, Math.floor(offset - spread * 3));
		const endIdx = Math.min(length - 1, Math.ceil(offset + spread * 3));

		for (let i = startIdx; i <= endIdx; i++) {
			const z = (i - offset) / spread;
			const zSquared = z * z;
			// Use lookup table or approximation instead of full exponential calculation
			// When z^2 > 9, exp(-z^2) < 0.01, can be ignored
			if (zSquared < 9) {
				result[i] = Math.exp(-zSquared) * edgeFactor;
			}
		}

		return result;
	}

	const effectArray = $derived(generateEffectArray(text.length, progress, spread, edgeFlatness));
</script>

<div {...rest}>
	{#each text.split('') as char, i (i)}
			<span class={[innerClassName, char !== " " ? "alphanumeric" : '']}
						style={styleCallback(effectArray[i])}>{char}</span>
	{/each}
</div>

<style>
    .alphanumeric {
        display: inline-block;
    }
</style>
