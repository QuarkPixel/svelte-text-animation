# Text Animation Component

A smooth text animation component for Svelte applications that provides customizable character-by-character animations.

![Example Animation](https://raw.githubusercontent.com/QuarkPixel/svelte-text-animation/master/assets/example.gif)

## Installation

```bash
npm install svelte-text-animation
```

## Usage

```svelte
<script>
import TextAnimation from 'svelte-text-animation';
import { Tween } from 'svelte/motion';

let progress = new Tween(0);

const animate = () => {
    progress.target = progress.current === 0 ? 1 : 0;
};
</script>

<TextAnimation
    text="Hello World"
    progress={progress.current}
    styleCallback={(i) => `font-weight: ${200 + i * 700}`}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| text | string | required | The text to be animated |
| progress | number | required | Animation progress (0-1) |
| styleCallback | function | required | Style generator function |
| spread | number | 3 | Number of characters affected on each side |
| innerClassName | string | "" | CSS class for character spans |

## Examples

### Basic Font Weight Animation
```svelte
<TextAnimation
    text="Dynamic Weight"
    progress={progress}
    styleCallback={(i) => `font-weight: ${200 + i * 700}`}
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

### Advanced Variable Font Animation
```svelte
<script>
import { Tween } from 'svelte/motion';
import { cubicInOut } from 'svelte/easing';
import TextAnimation from 'svelte-text-animation';

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
    styleCallback={(intensity) => `
        font-size: ${5 - intensity}rem;
        font-variation-settings: "YEAR" ${1979 + intensity * 61};
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

## Requirements

- Svelte 5.0.0 or higher

## License

MIT