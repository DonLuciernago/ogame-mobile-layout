# OGame Mobile Layout

Minimal Chromium extension that reorders the existing OGame interface without rebuilding it.

## Design target

1. Resources at the top.
2. Main OGame content below.
3. Two-column area below that:
   - left: original main menu
   - right: original planet list

The extension is intentionally not responsive. It preserves OGame's original sizing and behavior and only changes layout order.

## Technical principles

- Manifest V3.
- No frameworks or third-party dependencies.
- No network requests.
- No polling or recurring timers.
- Prefer CSS-only reordering.
- Use JavaScript only where CSS cannot safely achieve the layout.
- Avoid duplicating OGame DOM nodes.
- Preserve compatibility with OGame Infinity where possible.

## Current state

Version 0.1.0 only loads a scoped CSS hook and a minimal content script. No OGame elements are rearranged yet. The next step is to identify the real DOM containers produced by OGame with OGame Infinity enabled.
