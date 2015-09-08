# Roller
A JavaScript and CSS boilerplate framework for various smooth modern scrolling effects. This framework based on pure JavaScript and does not need jQuery.

## License
Licensed as Apache License 2.0 by Cubic Creative Company Limited.

## Basic Usage
First, each page should link to a JavaScript and CSS file.

```HTML
<link href="minified/cb-roller-min.css" rel="stylesheet" media="screen">
<script src="minified/cb-roller-min.js"></script>
```

Each scrolling effect `div` block should be assigned with `roller` class. It may also has `roller-page` or `roller-page-half` modifier class as well, which will expand its height to viewport size.

```HTML
<div class="roller roller-page">
</div>
```

### Background
Inside each block, there should be `div` for background image assigned with `roller-bg` class. Note that image picture should be described with `style` attribute or any custom CSS.

```HTML
<div class="roller roller-page">
  <div class="roller-bg" style="background-image: url(assets/background.jpg);"></div>
</div>
```

### Effects
To apply one or more scrolling effects each background or any other DOM element inside each block, `roller-scroll` modifier class should be added alongside with each effect type. Effects will be applied when user scrolled to topmost area of each block.

- Parallax `roller-para`
- Zoom `roller-zoom`
- Blur `roller-blur`
- Fade `roller-fade`

Note that multiple effects may be applied, simply assign more class to it.

```HTML
<div class="roller roller-page">
  <div class="roller-bg roller-scroll roller-zoom roller-blur" style="background-image: url(assets/background.jpg);"></div>
</div>
```

### Ratio
To make effects more or less applied to an element compared to scroll amount, assign `roller-scroll-ratio` attribute to it. Default is `1`.

```HTML
<div class="roller roller-page">
  <div class="roller-bg roller-scroll roller-para" roller-scroll-ratio="0.5" style="background-image: url(assets/background.jpg);"></div>
</div>
```

### Offset
To make effects applied to the element sooner or later after user scrolled to specific location, assign `roller-scroll-offset` attribute to it. Set it to `1` will delay the effect until the block scrolled to center of the viewport. Default is `0`.

```HTML
<div class="roller roller-page">
  <div class="roller-bg roller-scroll roller-para" roller-scroll-offset="1" style="background-image: url(assets/background.jpg);"></div>
</div>
```
