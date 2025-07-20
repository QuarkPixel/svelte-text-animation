# Text Animation Component

A smooth text animation component for Svelte applications that provides customizable character-by-character animations with optimized performance.

![Example Animation](https://raw.githubusercontent.com/QuarkPixel/svelte-text-animation/master/assets/example.gif)

You can check out the [Demo](https://svelte.dev/playground/434018293cfb415b925f19b47ef4a85c?version=5.33.1) in a Svelte Playground!

## Installation

```bash
npm install svelte-text-animation
```

## Usage

```svelte
<script>
import { TextAnimation, map } from 'svelte-text-animation';
import { Tween } from 'svelte/motion';

let progress = new Tween(0);

const animate = () => {
    progress.target = progress.current === 0 ? 1 : 0;
};
</script>

<TextAnimation
    text="Hello World"
    progress={progress.current}
    styleCallback={(i) => `font-weight: ${map(i, 200, 900)}`}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| text | string | required | The text to be animated |
| progress | number | required | Animation progress (0-1) |
| styleCallback | function | required | Style generator function |
| spread | number | 3 | Number of characters affected on each side |
| edgeFlatness | number | 5 | Controls the flatness of the edge decay curve. Higher values make the curve flatter in the middle, keeping the effect intensity closer to 1 for a larger range. Must be an integer >= 2. |
| innerClassName | string | "" | CSS class for character spans |

## Examples

### Basic Font Weight Animation
```svelte
<TextAnimation
    text="Dynamic Weight"
    progress={progress}
    styleCallback={(i) => `font-weight: ${map(i, 200, 900)}`}
/>
```

### Color Animation
```svelte
<TextAnimation
    text="Color Fade"
    progress={progress}
    styleCallback={(i) => `color: rgba(255, 0, 0, ${i})`}
/>
```

### Advanced Variable Font Animation with Optimized Performance
```svelte
<script>
import { Tween } from 'svelte/motion';
import { cubicInOut } from 'svelte/easing';
import TextAnimation, { map } from 'svelte-text-animation';

const progress = new Tween(0, { 
    duration: 3800, 
    easing: cubicInOut 
});

// Auto animation
progress.target = 1;
setInterval(() => (progress.target = progress.target == 0 ? 1 : 0), 4300);
</script>

<link href="https://fonts.googleapis.com/css2?family=Climate+Crisis:YEAR@1979..2050&display=swap" rel="stylesheet" />

<TextAnimation
    text="Variable Font Magic"
    className="climate-crisis"
    progress={progress.current}
    spread={5}
    edgeFlatness={5}
    styleCallback={(intensity) => `
        font-size: ${map(intensity, 5, 4)}rem;
        font-variation-settings: "YEAR" ${map(intensity, 1979, 2040)};
    `}
/>

<style>
    :global(.climate-crisis) {
        font-family: 'Climate Crisis', sans-serif;
        font-optical-sizing: auto;
        font-weight: 400;
        font-style: normal;
    }
</style>
```

## Features

- Optimized performance with edge decay function for smooth animations
- Configurable curve flatness for customizable animation profiles
- Efficient effect calculation with intensity thresholds
- Built-in `map` utility function for value interpolation
- Automatic handling of non-space characters for better display
- Svelte 5.0.0 compatible

## Requirements

- Svelte 5.0.0 or higher

## License

MIT
