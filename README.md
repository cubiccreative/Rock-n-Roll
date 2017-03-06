# Rock'n'Roll
A JavaScript and CSS boilerplate framework for various smooth modern scrolling effects. This framework based on pure JavaScript and does not need jQuery.

## License
Licensed as Apache License 2.0 by Cubic Creative Company Limited.

## Basic Usage
First, each page should link to a JavaScript and CSS file.

```HTML
<link href="minified/cb-rnr-min.css" rel="stylesheet" media="screen">
<script src="minified/cb-rnr-min.js"></script>
```

Each scrolling effect `div` block should be assigned with `rnr` class. It may also has `rnr-page` or `rnr-page-half` modifier class as well, which will expand its height to viewport size.

```HTML
<div class="rnr rnr-page">
</div>
```

### Background
Inside each block, there should be `div` for background image assigned with `rnr-bg` class. Note that image picture should be described with `style` attribute or any custom CSS.

```HTML
<div class="rnr rnr-page">
  <div class="rnr-bg" style="background-image: url(assets/background.jpg);"></div>
</div>
```

### Effects
To apply one or more scrolling effects each background or any other DOM element inside each block, `rnr-scroll` modifier class should be added alongside with each effect type. Effects will be applied when user scrolled to topmost area of each block.

- Parallax `rnr-para`
- Zoom `rnr-zoom`
- Blur `rnr-blur`
- Fade `rnr-fade`
- Remove `rnr-remove`

Note that multiple effects may be applied, simply assign more class to it.

```HTML
<div class="rnr rnr-page">
  <div class="rnr-bg rnr-scroll rnr-zoom rnr-blur" style="background-image: url(assets/background.jpg);"></div>
</div>
```

### Ratio
To make effects more or less applied to an element compared to scroll amount, assign `rnr-scroll-ratio` attribute to it. Default is `1`.

```HTML
<div class="rnr rnr-page">
  <div class="rnr-bg rnr-scroll rnr-para" rnr-scroll-ratio="0.5" style="background-image: url(assets/background.jpg);"></div>
</div>
```

### Offset
To make effects applied to the element sooner or later after user scrolled to specific location, assign `rnr-scroll-offset` attribute to it. Set it to `1` will delay the effect until the block scrolled to center of the viewport. Default is `0`.

```HTML
<div class="rnr rnr-page">
  <div class="rnr-bg rnr-scroll rnr-para" rnr-scroll-offset="1" style="background-image: url(assets/background.jpg);"></div>
</div>
```
