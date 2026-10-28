## 2026-10-13 - Focus and ARIA State Management with Dynamic HTML Partials
**Learning:** In applications using fetch-based dynamic partial loading, ARIA control relationships (like `aria-controls` and `aria-expanded` on header elements targeting drawer partials) must be synchronized when partials load and updated dynamically on state transitions to keep screen readers aware of overlay visibility and trap/restore keyboard focus properly.
**Action:** Ensure dynamic overlay triggers update `aria-expanded` and `aria-hidden` attributes in tandem with CSS class toggles, and shift focus to close buttons upon overlay open and back to trigger upon overlay close.

## 2026-10-28 - ARIA Pressed States for Dynamic Swatches and Gallery Navigation Visibility
**Learning:** Dynamically rendered UI controls (like color swatches, image thumbnails, and gallery chevrons) must reflect selection state via `aria-pressed` or `aria-selected` attributes and hide non-functional controls when only a single item is available.
**Action:** Always bind `aria-pressed` dynamically during render loops for interactive selector buttons, and conditionally toggle gallery navigation controls based on image array length.
