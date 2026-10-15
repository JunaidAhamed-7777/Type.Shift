---
version: alpha
name: Type.Shift
description: A quiet typing desk, with tactile keycaps and rose ink on cool paper.
colors:
  background: '#eef1f5'
  surface: '#fcfdff'
  ink: '#25303b'
  muted: '#616b78'
  pending: '#73808f'
  border: '#d5dce5'
  accent: '#a84259'
  accent-soft: '#f4e7ec'
  success: '#31745b'
  danger: '#b5334a'
typography:
  display:
    fontFamily: Bricolage Grotesque, sans-serif
    fontWeight: 600
  body:
    fontFamily: DM Sans, sans-serif
  mono:
    fontFamily: IBM Plex Mono, monospace
rounded:
  DEFAULT: 14px
  control: 7px
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

The reference is a considered desktop keyboard on a cool writing desk: tactile keys, a quiet work surface, legible measurement, and deliberate type. This is an operating tool, so the passage and controls take priority over decoration. The single signature is the small type/shift key composition, paired with a shift-key brand mark. Avoid neon terminals, ornamental gradients, glass panels, dashboard cards, and marketing claims.

The user delegated this redesign and requested accessible desktop and mobile layouts. The language is English, with no market-specific assumptions. Existing passage content, attribution, dedication, legal text, and the credited Matrix effect remain.

Runtime ownership is Model B: `src/App.css :root` and `[data-theme='dark']` own all semantic values. This document mirrors accepted light values. Components consume variables; there is no separate theme library or generated adapter. Dark values are defined alongside light values in that same stylesheet. The runtime CSS is the full token manifest.

## Colors

Cool paper is the background, near-white is the workspace, blue-black is the primary text. Rose indicates the cursor, current duration, focus, and passage progress. Errors also use underlining, never color alone. Body and pending text target 4.5:1 contrast. Dark mode uses blue graphite and pale rose with the same component semantics. Forced colors retain system colors and selected-state outlines.

## Typography

Bricolage Grotesque 600 carries the wordmark and headings; DM Sans 400/500/600 carries controls and prose; IBM Plex Mono 400/500 carries the passage and measurements. All fonts are self-hosted through Fontsource Latin subsets. Font fallback is usable offline. Passage text ranges from 18px on phones to 22px on desktop; data uses tabular figures. Display tracking never falls below -0.04em. Avoid uppercase decorative labels.

## Layout

A 1160px document shell contains a 1000px workspace. The desktop composition is header, brief introduction, setup controls, passage, statistics, keyboard help, footer. At 760px controls reflow; at 520px difficulty fills its own row and duration becomes a separate row. Keep natural document scrolling. No fixed-height page clipping, horizontal scroll, or sticky obstruction. Safe-area padding and virtual-keyboard visibility are required for mobile.

## Elevation & Depth

The workspace uses a single soft downward shadow without a border. Keycaps alone have a hard base shadow because it depicts key travel. Dialogs use the browser top layer and a dark translucent backdrop. No blur or glowing elements.

## Shapes

Work surfaces and dialogs use 14px radii. Segments and action controls use 6–9px radii. Theme control is circular. Small shortcut keys have a subtle base and 4px radius.

## Components

Native buttons own difficulty and duration, exposing aria-pressed. Shared `Dialog` owns help and legal surfaces with native showModal, Escape, focus containment, scroll lock, and opener restoration. The typing textarea owns input semantics; its visual per-character representation is hidden from screen readers and the complete passage is associated through aria-describedby. `LiveStats` and `Result` use definition lists. The global stylesheet owns scrollbars, focus, text selection, and motion preferences.

Enabled actions have hover, pressed, and visible focus states. Errors state a recovery action. Legal fetching has loading, failure, and successful content states. Timer starts on the first input, finishes at the deadline or passage end, and never auto-pauses on blur. Backspace edits final text; accuracy describes that exact calculation. Paste and drop are blocked only for the speed test, with a visible explanation.

Feather outline icons are used for interface actions, with the existing Font Awesome GitHub/globe icons retained in the footer. Icons without text have names and tooltips. Footer social targets are adjacent, and the globe links to Junaid's personal site.

The cursor is the main motion. Reduced motion stops cursor blinking and Matrix animation. The background effect pauses when the document is hidden. No entry-animation cascade or permanent WebGL rendering.

## Do's and Don'ts

- Keep the typing test available immediately and keyboard instructions close to it.
- Retain normal Tab navigation outside an active typing input; Escape and Shift+Tab let users leave it.
- Keep prose readable, errors underlined, and controls reachable at 320px and at zoom.
- Do not add fictional progress history, benchmarks, or account features.
- Preserve all source comments and third-party credits.
