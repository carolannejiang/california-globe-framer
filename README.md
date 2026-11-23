# California Globe Framer

Frame an oblique, from-orbit view of California on a 3D globe and export it at print resolution, for magazine cover work.

**Live:** https://carolannejiang.github.io/california-globe-framer/

- Drag to orbit, scroll to zoom, shift-drag to move the target, alt-drag to roll.
- Switchable render styles (Night lights, Daylight, Blueprint, Ultramarine, Halftone), defined in [`styles.js`](styles.js). Add a style by copying an entry there; the file documents every option.
- Each style shows its own sliders (map, glow, linework, dots, horizon lines, texture). Adjustments are saved in your browser and survive reloads and new versions. "Copy settings" copies your tuned values in `styles.js` format; "Reset style" restores the defaults.
- Frame: pick a page ratio or type any W : H. "Frame size" widens or tightens the crop from the same camera, so perspective is unchanged; "Fit whole globe" finds the size that shows the entire globe (backing the camera away along its line of sight when part of the globe would be behind it).
- Export PNG at any height (3300 px = 8.5 × 11 in at 300 dpi).
- "Copy Google Earth view" puts a KML camera on the clipboard; paste it into Google Earth Pro's Places panel to fly to the same view.

Built with [CesiumJS](https://cesium.com/platform/cesiumjs/). Imagery: NASA GIBS (public domain; credit NASA). State boundary: [us-atlas](https://github.com/topojson/us-atlas).
