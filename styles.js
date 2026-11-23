// Render styles for the globe. Each entry shows up in the Style menu.
// To add a style, copy an entry, rename its key, and change values; anything left out falls back to DEFAULT_STYLE.
//
// imagery     which NASA texture to drape on the globe, or null for none
//   layer       'night' (Black Marble city lights) or 'day' (Blue Marble)
//   brightness, contrast, gamma   1 = unchanged
//   saturation  0 = grayscale, 1 = unchanged
//   hue         rotation in degrees
//   alpha       0–1; below 1 the imagery blends over globeColor (grayscale + low alpha = tinted relief)
//   colorToAlpha, colorToAlphaThreshold   make one colour see-through, e.g. '#000000' keeps only the city lights
// globeColor  colour of the globe surface under the imagery
// background  colour of space, or [top, bottom] for a vertical gradient
// stars, atmosphere (blue rim glow), groundHaze (atmospheric haze + fog on the surface)
// outline     California outline: color, width (px), glow (0 = flat line, ~0.3 = soft neon)
// borders     coastlines, country and state borders: { color, width } or null
// graticule   lat/lon grid: { step (degrees), color, width } or null
// mask        tint over everything outside California: { color, alpha }
// limb        line drawn along the edge of the globe: { color, width, glow (soft halo radius in px, 0 = none) } or null
// sheen       diagonal light across the globe, brightest top-left: { color, alpha } or null
// dots        dot-matrix land, dots grow where NASA night lights are bright (western hemisphere only):
//               { color, alpha, size (px), spacing (km between dots), lights (0 = uniform dots, 1 = full city boost) } or null
// ribbons     flowing bands of fine lines across the frame:
//               { color, alpha, density (lines per band), overGlobe (0–1 strength over the globe vs. space) } or null
// grain       film/paper noise, 0–0.2
// bloom       glow around bright areas, 0–4
window.DEFAULT_STYLE = {
  imagery: null,
  globeColor: '#000000',
  background: '#000000',
  stars: false,
  atmosphere: false,
  groundHaze: false,
  outline: { color: '#ffffff', width: 2, glow: 0 },
  borders: null,
  graticule: null,
  mask: { color: '#000000', alpha: 0 },
  limb: null,
  sheen: null,
  dots: null,
  ribbons: null,
  grain: 0,
  bloom: 0,
};

window.GLOBE_STYLES = {
  night: {
    name: 'Night lights',
    imagery: { layer: 'night', brightness: 1.6, contrast: 1.3 },
    stars: true,
    atmosphere: true,
    groundHaze: true,
    outline: { color: '#ffcf6b', width: 4, glow: 0.3 },
    mask: { color: '#000000', alpha: 0.45 },
  },

  day: {
    name: 'Daylight',
    imagery: { layer: 'day', brightness: 1, contrast: 1.1 },
    stars: true,
    atmosphere: true,
    groundHaze: true,
    outline: { color: '#ffe7a8', width: 4, glow: 0.25 },
    mask: { color: '#000000', alpha: 0.3 },
  },

  // After a navy architectural-blueprint annual-report cover: flat navy, thin white linework, faint relief.
  blueprint: {
    name: 'Blueprint',
    imagery: { layer: 'day', saturation: 0, brightness: 1.3, contrast: 1.5, alpha: 0.16 },
    globeColor: '#2d4d84',
    background: '#24416f',
    outline: { color: '#ffffff', width: 3, glow: 0 },
    borders: { color: 'rgba(255,255,255,0.55)', width: 1 },
    graticule: { step: 5, color: 'rgba(255,255,255,0.2)', width: 1 },
    mask: { color: '#1d365f', alpha: 0.2 },
    limb: { color: '#ffffff', width: 1.5 },
    grain: 0.05,
  },

  // After a deep ultramarine government-report cover: glowing electric blue, glassy light, hairline strokes.
  ultramarine: {
    name: 'Ultramarine',
    imagery: { layer: 'night', saturation: 0, brightness: 1.5, contrast: 1.2, alpha: 0.6 },
    globeColor: '#2a36ff',
    background: ['#16249a', '#050b33'],
    outline: { color: 'rgba(230,234,255,0.9)', width: 1.5, glow: 0 },
    borders: { color: 'rgba(190,200,255,0.22)', width: 1 },
    graticule: { step: 10, color: 'rgba(190,200,255,0.1)', width: 1 },
    mask: { color: '#070d55', alpha: 0.35 },
    limb: { color: 'rgba(210,218,255,0.7)', width: 1, glow: 60 },
    sheen: { color: '#8f9cff', alpha: 0.3 },
    grain: 0.015,
    bloom: 0.5,
  },

  // After a cornflower-blue research-report cover: flat periwinkle, dot-matrix texture, flowing ribbons of hairlines.
  halftone: {
    name: 'Halftone ribbons',
    globeColor: '#3a56a4',
    background: ['#4867b6', '#3f5dab'],
    outline: { color: 'rgba(240,242,255,1)', width: 2, glow: 0 },
    borders: { color: 'rgba(214,220,250,0.3)', width: 1 },
    dots: { color: '#cfd5f5', alpha: 0.5, size: 1.5, spacing: 14, lights: 0.6 },
    ribbons: { color: '#dfe3fb', alpha: 0.45, density: 32, overGlobe: 0.35 },
    limb: { color: 'rgba(225,230,255,0.8)', width: 1 },
  },
};
