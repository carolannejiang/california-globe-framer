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
//   relief      0–1: faint grayscale terrain laid over the imagery, for texture on land
// detail      map sharpness: 1 = normal, higher loads finer imagery tiles (slower), lower is softer
// globeColor  colour of the globe surface under the imagery
// fills       flat surface colours instead of globeColor: { ocean, land, california (hex colours),
//               oceanTone, landTone, californiaTone (1 = as given, <1 darker, >1 lighter) } or null
// background  colour of space, or [top, bottom] for a vertical gradient
// stars, atmosphere (blue rim glow), groundHaze (atmospheric haze + fog on the surface)
// atmosphereBrightness   -1 to 1, brightens or darkens the blue rim glow
// outline     California outline: color, width (px), glow (0 = flat line, ~0.3 = soft neon)
// borders     coastlines, country and state borders: { color, width } or null
// graticule   lat/lon grid: { step (degrees), color, width }, a list of up to 3 of those (e.g. fine + bold), or null
// gridOpacity multiplies the grid's opacity, 1 = as specified
// showGrid    whether the grid starts switched on (the "Lat/long grid" checkbox toggles it)
// gridRegions per-area grid multipliers: { california, land, ocean }, each { opacity, width } (1 = as specified)
// mask        tint over everything outside California: { color, alpha }
// limb        line drawn along the edge of the globe: { color, width, glow (soft halo radius in px, 0 = none) } or null
// sheen       diagonal light across the globe, brightest top-left: { color, alpha } or null
// dots        dot-matrix land, dots grow where NASA night lights are bright (western hemisphere only):
//               { color, alpha, size (px) — both for California; outsideAlpha, outsideSize for other land (default to alpha, size),
//                 spacing (km between dots in California), outsideSpacing (km between dots elsewhere;
//                 larger = sparser, darker land around a brighter California), lights (how much bright cities enlarge dots in California: 0 = uniform dots),
//                 outsideLights (the same for other land; defaults to lights) } or null
// horizonLines  fine lines exactly parallel to the horizon, tightest at the horizon and widening outward
//               in a strict geometric progression (each gap is a fixed multiple of the one before):
//               { color, alpha, count (number of lines), extent (how far above the horizon the last line sits, in frame heights),
//                 growth (last gap ÷ first gap, e.g. 10), overGlobe (0–1 strength over the globe vs. space),
//                 glow (0–3 extra brightness at the horizon), glowHeight (how far up the glow fades out, in frame heights) } or null
// oceanTexture, landTexture   relief/bathymetry shading as darkness only (no colour), each
//               { strength (0–1), contrast (1 = normal) } or null. Switch on in any style under Layers.
// shells      stepped translucent layers above the horizon, each with a hairline edge, like overlapping glass rings:
//               { color, alpha (fill of the innermost layer; 0 = edges only), count, spacing (fraction of frame height), edge (hairline strength),
//                 glow (0–3 extra light in the layers nearest the horizon), glowHeight (how far up the glow fades out, in frame heights) } or null
// pattern     faint interlaced-circle lattice over the whole frame: { color, alpha, scale (circles per frame height) } or null
// paper       mottled tone with faint fibres, like uneven printed stock: { amount (0–0.2), scale (blotches per frame height) } or null
// vignette    darken toward the corners, 0–1
// grain       film/paper noise, 0–0.2
// bloom       glow around bright areas, 0–4
window.DEFAULT_STYLE = {
  imagery: null,
  detail: 1,
  globeColor: '#000000',
  fills: null,
  background: '#000000',
  stars: false,
  atmosphere: false,
  groundHaze: false,
  atmosphereBrightness: 0,
  outline: { color: '#ffffff', width: 2, glow: 0 },
  borders: null,
  graticule: null,
  gridOpacity: 1,
  showGrid: true,
  gridRegions: { california: { opacity: 1, width: 1 }, land: { opacity: 1, width: 1 }, ocean: { opacity: 1, width: 1 } },
  mask: { color: '#000000', alpha: 0 },
  limb: null,
  sheen: null,
  dots: null,
  oceanTexture: null,
  landTexture: null,
  horizonLines: null,
  shells: null,
  pattern: null,
  paper: null,
  vignette: 0,
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

  // After a navy architectural-blueprint annual-report cover: flat navy, thin white linework, faint relief,
  // on mottled cyanotype paper with a fine drafting grid and drafting arcs above the horizon.
  blueprint: {
    name: 'Blueprint',
    imagery: { layer: 'day', saturation: 0, brightness: 1.3, contrast: 1.6, alpha: 0.2 },
    globeColor: '#2d4d84',
    background: '#24416f',
    outline: { color: '#ffffff', width: 3, glow: 0 },
    borders: { color: 'rgba(255,255,255,0.55)', width: 1 },
    graticule: [
      { step: 1, color: 'rgba(255,255,255,0.06)', width: 1 },
      { step: 5, color: 'rgba(255,255,255,0.22)', width: 1 },
    ],
    mask: { color: '#1d365f', alpha: 0.2 },
    limb: { color: '#ffffff', width: 1.5 },
    shells: { color: '#ffffff', alpha: 0, count: 3, spacing: 0.07, edge: 0.3 },
    paper: { amount: 0.09, scale: 3 },
    vignette: 0.35,
    grain: 0.05,
  },

  // After a deep ultramarine government-report cover: glowing electric blue, overlapping glass layers,
  // hairline strokes and a faint interlaced-circle pattern.
  ultramarine: {
    name: 'Ultramarine',
    imagery: { layer: 'night', saturation: 0, brightness: 1.5, contrast: 1.2, alpha: 0.6, relief: 0.12 },
    globeColor: '#2a36ff',
    background: ['#16249a', '#050b33'],
    outline: { color: 'rgba(230,234,255,0.9)', width: 1.5, glow: 0 },
    borders: { color: 'rgba(190,200,255,0.22)', width: 1 },
    graticule: { step: 10, color: 'rgba(190,200,255,0.1)', width: 1 },
    mask: { color: '#070d55', alpha: 0.35 },
    limb: { color: 'rgba(210,218,255,0.7)', width: 1, glow: 60 },
    sheen: { color: '#8f9cff', alpha: 0.3 },
    shells: { color: '#6f7dff', alpha: 0.16, count: 4, spacing: 0.06, edge: 0.35, glow: 0.8, glowHeight: 0.05 },
    pattern: { color: '#a3adff', alpha: 0.11, scale: 5 },
    paper: { amount: 0.07, scale: 1.5 },
    vignette: 0.4,
    grain: 0.015,
    bloom: 0.5,
  },

  // After a cornflower-blue research-report cover: flat periwinkle, a fine lat/long grid, and a field
  // of hairlines following the horizon, packed tight at the horizon and opening up into space.
  // Defaults tuned in the tool; dots start off, with their previous settings kept for the Dots toggle.
  halftone: {
    name: 'Halftone',
    globeColor: '#3a56a4',
    fills: { ocean: '#3a56a4', land: '#3a56a4', california: '#3a56a4', oceanTone: 0.77, landTone: 0.94, californiaTone: 1 },
    background: ['#4867b6', '#3f5dab'],
    outline: { color: 'rgba(240,242,255,1)', width: 1.5, glow: 0 },
    borders: { color: 'rgba(214,220,250,0.59)', width: 1.25 },
    graticule: [
      { step: 1, color: 'rgba(223,227,251,0.07)', width: 1 },
      { step: 5, color: 'rgba(223,227,251,0.28)', width: 1 },
    ],
    gridOpacity: 1,
    showGrid: true,
    dots: null,
    _stash: { dots: { color: '#cfd5f5', alpha: 0.5, outsideAlpha: 0.5, size: 1.5, outsideSize: 1.5, spacing: 11, outsideSpacing: 22, lights: 0.6, outsideLights: 0.6 } },
    horizonLines: { color: '#dfe3fb', alpha: 0.5, count: 130, extent: 0.45, growth: 60, glow: 1.2, glowHeight: 0.04, overGlobe: 0 },
    limb: { color: 'rgba(225,230,255,0.8)', width: 1 },
    paper: { amount: 0, scale: 0.5 },
    grain: 0.165,
  },
};
