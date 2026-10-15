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
  red-accent: '#b52e37'
  red-accent-soft: '#f7e4e6'
  dark-red-accent-soft: '#42272a'
typography:
  brand:
    fontFamily: JetBrains Mono, monospace
    fontWeight: 700
  display:
    fontFamily: Chivo Variable, sans-serif
    fontWeight: 750
  body:
    fontFamily: Chivo Variable, sans-serif
  mono:
    fontFamily: Azeret Mono Variable, monospace
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

The reference is a considered desktop keyboard: tactile keys, a quiet work surface, legible measurement, and deliberate type. Preserve the original [Type.Shift] wordmark: JetBrains Mono, white brackets, #39ff14 Type and dot, #ff3b3b Shift, on the page background. Preserve the original logo.png asset, exact tagline, and author credit. This is an operating tool, so the passage and controls take priority over decoration. The single signature is the small type/shift key composition, under the original bracketed brand. Avoid ornamental gradients, glass panels, dashboard cards, and marketing claims. The user explicitly required preservation of the original branding after the initial redesign; that takes precedence over the earlier rose palette.

The user delegated this redesign and requested accessible desktop and mobile layouts. The language is English, with no market-specific assumptions. Existing passage content, attribution, author credit, legal text, and the credited Matrix effect remain.

Runtime ownership is Model B: `src/App.css :root` and `[data-theme='dark']` own all semantic values. The frontmatter mirrors accepted light values. The original dark identity is the default; light mode is optional. The light wordmark uses an accessible green/ink variant without a background; dark mode retains the original brand colors. Components consume variables; there is no separate theme library or generated adapter. Dark values are defined alongside light values in that same stylesheet. The runtime CSS is the full token manifest.

## Colors

Cool paper is the background, near-white is the workspace, blue-black is the primary text. Green indicates the cursor, current duration, focus, and passage progress. Errors also use underlining, never color alone. Body and pending text target 4.5:1 contrast. Dark mode uses #101514 ground, #181f1e surface, #e6ede9 text, #a5b3aa secondary text, #99aaa0 pending text, and the original #39ff14 accent. Light mode uses a transparent wordmark background, a darker green Type for contrast, the existing red Shift, and ink-colored brackets. Dark mode retains the original neon-green Type, red Shift, and white brackets. Forced colors retain system colors and selected-state outlines.

## Typography

JetBrains Mono 700 preserves the original wordmark. Chivo Variable carries headings at 750 and prose/controls at 400–600; Azeret Mono Variable carries passages, shortcuts, and measurements at 400–500. All fonts are self-hosted through Fontsource. Disable ligatures on the passage and transparent textarea so character highlighting and native selection remain aligned. The standalone recovery page deliberately uses Courier New for its wordmark and system sans for copy so it remains usable when app assets fail. Passage text ranges from 18px on phones to 22px on desktop; data uses tabular figures. Display tracking never falls below -0.04em. Avoid uppercase decorative labels.

## Layout

A two-row header at 760px and below keeps Typing test, How it works, GitHub, and theme switching visible. A 1160px document shell contains a 1000px workspace. The desktop composition is header, brief introduction, setup controls, passage, statistics, keyboard help, footer. At 760px controls reflow; at 520px difficulty fills its own row and duration becomes a separate row. Keep natural document scrolling. No fixed-height page clipping, horizontal scroll, or sticky obstruction. Safe-area padding and virtual-keyboard visibility are required for mobile.

## Elevation & Depth

The workspace uses a single soft downward shadow without a border. Keycaps alone have a hard base shadow because it depicts key travel. Dialogs use the browser top layer and a dark translucent backdrop. No blur or glowing elements.

## Shapes

Work surfaces and dialogs use 14px radii. Segments and action controls use 6–9px radii. Theme control is circular. Small shortcut keys have a subtle base and 4px radius.

## Components

The original tagline reads “There Is Something Wrong With You, And I Love It.” The footer reads “By Junaid”. Native buttons own difficulty and duration, exposing aria-pressed. Shared `Dialog` owns help and legal surfaces with native showModal, Escape, focus containment, scroll lock, and opener restoration. The typing textarea owns input semantics; its visual per-character representation is hidden from screen readers and the complete passage is associated through aria-describedby. `LiveStats` and `Result` use definition lists. The global stylesheet owns scrollbars, focus, text selection, and motion preferences. The 12px custom scrollbar uses the accent for its thumb, surface-soft for its track, and separate hover/active colors; Firefox uses its native thin geometry with those same colors. Scrollbars respond to light/dark themes and Shift accent changes. HeaderNavigation owns one measured underline spanning the active text label; it moves between Typing test and How it works over 360ms and returns when the dialog closes. A header GitHub button links to the repository. Result book covers are 128×192px on desktop and 96×144px on mobile.

Enabled actions have hover, pressed, and visible focus states. Errors state a recovery action. Legal fetching has loading, failure, and successful content states. Timer starts on the first input, finishes at the deadline or passage end, and never auto-pauses on blur. Backspace edits final text; accuracy describes that exact calculation. Paste and drop are blocked only for the speed test, with a visible explanation.

Feather outline icons are used for interface actions, with the existing Font Awesome GitHub/globe icons retained in the footer. Icons without text have names and tooltips. Footer social targets are adjacent, and the globe links to Junaid's personal site.

The cursor is the main motion. The caret is visible only while the typing box contains focus. Reduced motion stops cursor blinking and Matrix animation. The background effect pauses when the document is hidden. Matrix trails erase to transparency, with canvas opacity 0.18 in dark mode and 0.24 in light mode. Canvas sizing follows viewport changes and device pixel ratio, capped at 2. The isolated application stacking context keeps rain above the page background and behind readable content. No entry-animation cascade or permanent WebGL rendering.

Metadata artwork uses the same dark ground and original green/red branding. The 1200×630px share image carries the full wordmark, headline, and keyboard motif. Square icons use a padded `[T.S]` monogram so the identity remains readable at small sizes and fits a maskable crop. Keep the original logo asset available. `scripts/prepare-metadata-artwork.js` owns this composition.

Holding Shift changes green accents, including the Type wordmark, to red; releasing it restores green. On viewports up to 760px or coarse touch pointers, the same accent alternates every five seconds. Registered semantic color properties interpolate together over 700ms with cubic-bezier(.22, 1, .36, 1). The small shift key depresses by 3px over 200ms. Reduced motion removes both transitions; automatic color cycling pauses while the document is hidden. Window blur clears a held Shift so the color never sticks accidentally. The default branding remains the original green/red combination.

## Do's and Don'ts

- Keep the typing test available immediately and keyboard instructions close to it.
- Retain normal Tab navigation outside an active typing input; Escape and Shift+Tab let users leave it.
- Keep prose readable, errors underlined, and controls reachable at 320px and at zoom.
- Do not add fictional progress history, benchmarks, or account features.
- Preserve all source comments and third-party credits.
