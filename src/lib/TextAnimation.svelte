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
		// 使用边缘衰减函数，让效果在接近 0 和 1 时平滑衰减
		const edgeFactor = 4 * progress * (1 - progress);

		if (edgeFactor <= 0) {
			return Array(length).fill(0);
		}

		const offset = progress * (length + 2 * spread + 1) - spread - 1;
		// const offset = progress * length;
		const gaussianLikeFunction = (x: number): number => {
			const z = (x - offset) / spread;
			return Math.exp(-1 * z * z) * edgeFactor;
		};

		return Array.from({ length }, (_, i) => gaussianLikeFunction(i));
	}

	const effectArray = $derived(generateEffectArray(text.length, progress, spread));
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
