# DarkVeil 404 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

## Goal
Integrate DarkVeil animated background into the Vercel 404 page as a standalone self-contained JavaScript bundle using the already-installed `ogl` package. The main React application must remain unchanged.

## Architecture
The 404 page is a static HTML page with a `<canvas>` element. A standalone JavaScript bundle (created with `esbuild`) will import `ogl` from `node_modules` and render the DarkVeil effect. The CSS and HTML are minimal — only enough to cover the viewport and load the bundle.

## Tech Stack
- `ogl` v1.0.11 (already installed in `node_modules`)
- `esbuild` for bundling (standard React project build tooling)
- Plain browser HTML / Canvas / GLSL

## Files Created/Modified

| File | Action | Description |
|------|--------|-------------|
| `src/darkveil-404-source.js` | Create | Source file with OGL initialization, shaders, and animation loop |
| `public/darkveil-404.css` | Create | Full-viewport styles for the canvas |
| `public/404.html` | Update | Load bundled script and CSS |
| `package.json` | Modify | Add `build:404` script, update `build` script |
| `public/darkveil-404.js` | Generate (by build) | Bundled output — OGL + DarkVeil code |

---

### Task 1: Install esbuild and set up build scripts
**Files to modify:**
- `package.json`

**Steps:**
- [ ] **Step 1.1:** Add `esbuild` as a dev dependency.
  Run: `npm install esbuild --save-dev`
- [ ] **Step 1.2:** Verify `esbuild` was installed successfully.
  Run: `npx esbuild --version` (should print a version number)
- [ ] **Step 1.3:** Add `build:404` script to `package.json`.
  `"build:404": "esbuild src/darkveil-404-source.js --bundle --outfile=public/darkveil-404.js"`
- [ ] **Step 1.4:** Update the existing `build` script to also trigger the 404 bundle.
  Change from: `"build": "react-scripts build"` to: `"build": "react-scripts build && npm run build:404"`
- [ ] **Step 1.5:** Verify `package.json` changes are valid JSON.

---

### Task 2: Create the DarkVeil source file
**Files to create:**
- `src/darkveil-404-source.js`

**Content:**
- Define the authoritative vertex and fragment shaders (exact text from request).
- Initialize `ogl` Renderer with `dpr: Math.min(window.devicePixelRatio, 2)`.
- Create `Triangle` geometry and `Program` with uniforms.
- Set up initial uniform values: `uTime: 0`, `uResolution: new Vec2()`, `uHueShift: 253`, `uNoise: 0`, `uScan: 0`, `uScanFreq: 0.5`, `uWarp: 1.3`, `uLightMode: 0`.
- Implement `requestAnimationFrame` loop: `program.uniforms.uTime.value = ((performance.now() - start) / 1000) * 3`.
- Implement `resize` handler: recalc `w`/`h` from `parent.clientWidth/Height`, call `renderer.setSize(w, h)` and `program.uniforms.uResolution.value.set(w, h)`.
- Handle WebGL failure gracefully: on error, apply `background: #000` and remove JS-caused rendering.
- Do NOT add any text/buttons/navigation.

**Requirements to satisfy:**
- hueShift = 253
- noiseIntensity = 0
- scanlineIntensity = 0
- speed = 3
- scanlineFrequency = 0.5
- warpAmount = 1.3
- resolutionScale = 1
- lightMode = false

---

### Task 3: Create the CSS file
**Files to create:**
- `public/darkveil-404.css`

**Content:**
```css
html,
body {
  margin: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #000;
}

body {
  position: relative;
}

#darkveil-canvas {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  display: block;
}
```

---

### Task 4: Create the 404 HTML page
**Files to update:**
- `public/404.html` (modify if it exists, otherwise create)

**Content:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Type.Shift</title>
  <link rel="stylesheet" href="/darkveil-404.css">
</head>
<body>
  <canvas id="darkveil-canvas"></canvas>
  <script src="/darkveil-404.js"></script>
</body>
</html>
```

Do NOT add any text, buttons, navigation, links, error messages, or other UI.

---

### Task 5: Verify production build succeeds
**Steps:**
- [ ] **Step 5.1:** Run `npm run build` and confirm it completes without errors.
- [ ] **Step 5.2:** Confirm `public/darkveil-404.js` exists after the build.
- [ ] **Step 5.3:** Confirm the bundled file does NOT reference an external OGL CDN (check it contains references to `node_modules` or inline code, not a CDN URL).
- [ ] **Step 5.4:** Confirm `public/404.html` is unchanged or correctly generated.

---

### Task 6: Test the 404 page
**Steps:**
- [ ] **Step 6.1:** Start the dev server: `npm start`.
- [ ] **Step 6.2:** Request a definitely invalid route, e.g., `http://localhost:3000/this-route-does-not-exist`.
- [ ] **Step 6.3:** Confirm the DarkVeil animated background appears.
- [ ] **Step 6.4:** Confirm the animation uses the requested settings (visual confirmation of hue shift, scanlines, etc.).
- [ ] **Step 6.5:** Confirm the canvas is full-screen with no scrolling.
- [ ] **Step 6.6:** Confirm there is NO text or button on the 404 page.
- [ ] **Step 6.7:** Exit dev server.

---

### Task 7: Confirm main application unchanged
**Steps:**
- [ ] **Step 7.1:** Verify the main app still loads at `http://localhost:3000/`.
- [ ] **Step 7.2:** Verify typing functionality works as expected.
- [ ] **Step 7.3:** Confirm no files were modified under `src/App.js`, `src/App.css`, `src/paragraphs.js`.

---

## Exit Criteria
All tasks complete, build succeeds, 404 page shows DarkVeil animation, main app is untouched.