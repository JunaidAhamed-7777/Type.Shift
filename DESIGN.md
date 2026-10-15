---
version: alpha
name: Type.Shift
description: A precise typing desk that preserves Type.Shift’s green and red identity.
colors:
  background: '#eef1f5'
  surface: '#fcfdff'
  ink: '#25303b'
  muted: '#616b78'
  pending: '#687585'
  border: '#d5dce5'
  accent: '#276f1a'
  accent-soft: '#e2eedf'
  success: '#31745b'
  danger: '#b5334a'
  brand-green: '#39ff14'
  brand-red: '#ff3b3b'
  brand-white: '#ffffff'
  dark-background: '#101514'
  dark-surface: '#181f1e'
  dark-text: '#e6ede9'
  dark-muted: '#a5b3aa'
  dark-pending: '#99aaa0'
  dialog-shadow: '#101d3840'
  dialog-backdrop: '#18243580'
typography:
  brand:
    fontFamily: JetBrains Mono, monospace
    fontWeight: 700
  display:
    fontFamily: Bricolage Grotesque, sans-serif
    fontWeight: 600
  body:
    fontFamily: DM Sans, sans-serif
  mono:
    fontFamily: IBM Plex Mono, monospace
  recovery:
    fontFamily: Courier New, monospace
rounded:
  DEFAULT: 14px
  control: 7px
  cursor: 1px
  indicator: 2px
  shortcut: 4px
  segment: 6px
  action: 8px
  group: 9px
  keycap: 10px
spacing:
  page-max: 1160px
  workspace-max: 1000px
components:
  button: {}
  dialog: {}
  typing-input: {}
  statistics: {}
---

# Type.Shift Design System

## Overview

The reference is a considered desktop keyboard: tactile keys, a quiet work surface, legible measurement, and deliberate type. Preserve the original [Type.Shift] wordmark: JetBrains Mono, white brackets, #39ff14 Type and dot, #ff3b3b Shift, on a dark ground. Preserve the original logo.png favicon, exact tagline, and exact dedication. This is an operating tool, so the passage and controls take priority over decoration. The single signature is the small type/shift key composition, under the original bracketed brand. Avoid ornamental gradients, glass panels, dashboard cards, and marketing claims. The user explicitly required preservation of the original branding after the initial redesign; that takes precedence over the earlier rose palette.

The user delegated this redesign and requested accessible desktop and mobile layouts. The language is English, with no market-specific assumptions. Existing passage content, attribution, dedication, legal text, and the credited Matrix effect remain.

Runtime ownership is Model B: `src/App.css :root` and `[data-theme='dark']` own all semantic values. The frontmatter mirrors accepted light values. The original dark identity is the default; light mode is optional. Brand values remain identical in both themes. Components consume variables; there is no separate theme library or generated adapter. Dark values are defined alongside light values in that same stylesheet. The runtime CSS is the full token manifest.

## Colors

Cool paper is the background, near-white is the workspace, blue-black is the primary text. Green indicates the cursor, current duration, focus, and passage progress. Errors also use underlining, never color alone. Body and pending text target 4.5:1 contrast. Dark mode uses #101514 ground, #181f1e surface, #e6ede9 text, #a5b3aa secondary text, #99aaa0 pending text, and the original #39ff14 accent. Light mode uses a darker green for contrast, preserving exact neon brand colors inside the dark wordmark. Forced colors retain system colors and selected-state outlines.

## Typography

JetBrains Mono 700 preserves the original wordmark; Bricolage Grotesque 600 carries headings; DM Sans 400/500/600 carries controls and prose; IBM Plex Mono 400/500 carries the passage and measurements. All fonts are self-hosted through Fontsource Latin subsets. The standalone recovery page deliberately uses Courier New for its wordmark and system sans for copy so it remains usable when app assets fail. Passage text ranges from 18px on phones to 22px on desktop; data uses tabular figures. Display tracking never falls below -0.04em. Avoid uppercase decorative labels.

## Layout

A 1160px document shell contains a 1000px workspace. The desktop composition is header, brief introduction, setup controls, passage, statistics, keyboard help, footer. At 760px controls reflow; at 520px difficulty fills its own row and duration becomes a separate row. Keep natural document scrolling. No fixed-height page clipping, horizontal scroll, or sticky obstruction. Safe-area padding and virtual-keyboard visibility are required for mobile.

## Elevation & Depth

The workspace uses a single soft downward shadow without a border. Keycaps alone have a hard base shadow because it depicts key travel. Dialogs use the browser top layer and a dark translucent backdrop. No blur or glowing elements.

## Shapes

Work surfaces and dialogs use 14px radii. Segments and action controls use 6–9px radii. Theme control is circular. Small shortcut keys have a subtle base and 4px radius.

## Components

The original tagline reads “There Is Something Wrong With You, And I Love It.” The footer reads “With Love · For My Cheeku · By Junaid”. Native buttons own difficulty and duration, exposing aria-pressed. Shared `Dialog` owns help and legal surfaces with native showModal, Escape, focus containment, scroll lock, and opener restoration. The typing textarea owns input semantics; its visual per-character representation is hidden from screen readers and the complete passage is associated through aria-describedby. `LiveStats` and `Result` use definition lists. The global stylesheet owns scrollbars, focus, text selection, and motion preferences.

Enabled actions have hover, pressed, and visible focus states. Errors state a recovery action. Legal fetching has loading, failure, and successful content states. Timer starts on the first input, finishes at the deadline or passage end, and never auto-pauses on blur. Backspace edits final text; accuracy describes that exact calculation. Paste and drop are blocked only for the speed test, with a visible explanation.

Feather outline icons are used for interface actions, with the existing Font Awesome GitHub/globe icons retained in the footer. Icons without text have names and tooltips. Footer social targets are adjacent, and the globe links to Junaid's personal site.

The cursor is the main motion. Reduced motion stops cursor blinking and Matrix animation. The background effect pauses when the document is hidden. No entry-animation cascade or permanent WebGL rendering.

## Do's and Don'ts

- Keep the typing test available immediately and keyboard instructions close to it.
- Retain normal Tab navigation outside an active typing input; Escape and Shift+Tab let users leave it.
- Keep prose readable, errors underlined, and controls reachable at 320px and at zoom.
- Do not add fictional progress history, benchmarks, or account features.
- Preserve all source comments and third-party credits.
