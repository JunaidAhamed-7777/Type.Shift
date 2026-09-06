# DarkVeil 404 Integration Design

**Goal:** Integrate the DarkVeil visual effect into a standalone Vercel 404 page without modifying the main React application.

**Architecture:**
- A static `public/404.html` page.
- A bundled JavaScript asset `public/darkveil-404.js` created from `src/darkveil-404-source.js` using `esbuild`.
- A CSS file `public/darkveil-404.css` for full-viewport styling.
- `ogl` dependency bundled locally into the JS asset.

**Technical Specifications:**

1. **Files:**
    - `public/404.html`: Static entry point.
    - `public/darkveil-404.css`: Styles for full-screen, non-scrolling canvas.
    - `src/darkveil-404-source.js`: Source code using `ogl` and the provided shaders.
    - `public/darkveil-404.js`: Bundled output.

2. **DarkVeil Configuration:**
    - `hueShift`: 253
    - `noiseIntensity`: 0
    - `scanlineIntensity`: 0
    - `speed`: 3
    - `scanlineFrequency`: 0.5
    - `warpAmount`: 1.3
    - `resolutionScale`: 1
    - `lightMode`: false

3. **Visual Requirements:**
    - Canvas must cover 100vw/100vh.
    - No margins, no scrolling.
    - No text, buttons, or other UI elements.
    - Black background fallback if WebGL fails.

4. **Build Process:**
    - New npm script `build:404` using `esbuild` to bundle `src/darkveil-404-source.js` $\rightarrow$ `public/darkveil-404.js`.
    - Update `npm run build` to trigger `npm run build:404`.

5. **Shaders:**
    - Use the authoritative vertex and fragment shaders provided in the request.

**Success Criteria:**
- `public/404.html` exists and is correctly served by Vercel.
- `public/darkveil-404.js` is a self-contained bundle containing `ogl`.
- Invalid routes show the animated DarkVeil background.
- Main application remains untouched and functional.
