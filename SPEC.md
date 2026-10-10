# Maisonvelle Specification

A custom minimalist apparel e-commerce prototype: Yeezy-style shop grid and header, C.E-style single product page on a white background. The shop grid is also the home page, with no separate landing page.

## 1. Goals

- Match the minimal, monospaced, white-space-heavy feel of the Yeezy shop grid.
- Use the C.E layout for product details on a solid white (#FFFFFF) background with black text.
- Stay fully compatible with WooCommerce, payment gateways, Klaviyo and other plugins.
- Categories are shown automatically in the header.

## 2. Design Tokens

Defined as CSS custom properties on `:root` (`/assets/css/tokens.css`):

| Token | Value | Description |
| --- | --- | --- |
| `--font-mono` | IBM Plex Mono, weight 400 & 700, self-hosted | Monospace font family |
| `--font-panel` | Arial, Helvetica Neue, sans-serif | Title & price font family |
| `--font-size-base` | 16px | Base font size |
| `--line-height-base` | 24px | Base line height |
| `--color-text` | #000000 | Primary text color |
| `--color-bg` | #ffffff | Page background color |
| `--color-muted` | #c4c4c4 | Inactive category nav links |
| `--color-footer` | #777777 | Footer links color |
| `--header-height` | 64px desktop / 56px mobile | Header bar height |
| `--grid-gap-x` | 24px desktop / 12px mobile | Shop grid horizontal column gap |
| `--grid-gap-y` | 56px desktop / 40px mobile | Shop grid vertical row gap |
| `--page-padding` | 24px desktop / 16px mobile | Page edge padding |
| `--btn-border` | 2px solid #000000 | Outlined button border style |

General rules: no shadows or rounded corners anywhere. Text is monospaced except for panel titles/prices. Product images use `object-fit: contain` and never crop.

## 3. Global Layout & Components

### Header (`/partials/header.html`)

- Fixed white background (`#ffffff`).
- **Left:** Grid toggle button on shop page ("+" normally, switching to "<" arrow in 3-column desktop mode or 1-column mobile feed mode). On subpages (`product.html`, `404.html`), displays a back arrow ("<") linking to `index.html`.
- **Center:** Category navigation (`ALL`, `BAGS`, `SHIRTS`, `T-SHIRTS`, `PANTS`, `SHOES`, `ACCESSORIES`). Active link is black (`#000000`), inactive links are muted (`#c4c4c4`). Scrollable sideways on mobile for all pages (shop, product, 404). Hidden in header when mobile feed mode is active.
- **Right:** Shopping bag icon opening the mini cart drawer.

### Footer (`/partials/footer.html`)

- Centered row of uppercase muted links (`CONTACT`, `TERMS`, `PRIVACY`, `ACCESSIBILITY`, `COOKIES`, `ORDER STATUS`). Stacks vertically on mobile viewports under 768px.

### Mini Cart Drawer (`/partials/mini-cart.html`)

- Slide-in overlay from the right, with black borders and white background.
- Can be closed by clicking the close "✕" button, clicking the overlay background, or pressing the `Escape` key.

### Size Guide Modal (`/partials/size-guide-modal.html`)

- Centered modal dialog showing measurement table.
- Can be closed by clicking the close "✕" button, clicking the modal overlay background, or pressing the `Escape` key.

## 4. Pages and Responsive Behavior

Exactly three HTML pages:

1. **`index.html` (Shop / Home):**
   - **Desktop Grid:** 6 columns by default. Toggle button switches to 3 columns. Choice persisted in `localStorage`.
   - **Mobile Grid (<768px):** 3 columns by default. Toggle button switches to 1-column full-screen TikTok-style feed view with CSS scroll snap (`scroll-snap-type: y mandatory`).
   - Category navigation in header hidden when feed view is active.

2. **`product.html` (Single Product):**
   - **Background:** Always white (`#FFFFFF`) with black text for every product. No per-product background color field or contrast logic.
   - **Desktop (>=768px):**
     - Left column (58% width): main photo (up to 560px high) with chevron for next image, and a centered thumbnail strip below. Active thumbnail has 2px solid black outline; inactive thumbnails have 1px solid `rgba(0,0,0,0.2)` outline.
     - Right column (42% width): details panel containing title & price row, color label, color swatches (active 2px solid black outline, inactive 1px solid `rgba(0,0,0,0.2)` outline), description, underlined "sizing" link, size dropdown with thin down caret & Add to cart button, and prev/next product navigation buttons.
   - **Title & Price Row:** Aligned to `flex-start` with a 16px gap. Price styled with `white-space: nowrap; flex-shrink: 0;` and title with `min-width: 0; overflow-wrap: break-word;` so long titles wrap onto extra lines while price stays on one line at top right.
   - **Mobile (<768px):** Single column with the same fixed white header as shop, photo (500px high), then details directly on white background with square corners (no floating header or rounded cards).
   - **Sold Out State:** Solid black button with bold white text reading "Sold out", disabled.

3. **`404.html` (Error Page):**
   - Centered error code and message with a return button. Category navigation in header scrolls sideways on mobile like on the shop page.

## 5. File & Directory Structure

```
/index.html
/product.html
/404.html
/assets/
  /css/
    tokens.css
    base.css
    header.css
    footer.css
    shop.css
    product.css
    cart-drawer.css
    modal.css
    error-page.css
  /js/
    include.js
    main.js
    shop.js
    product.js
    cart-drawer.js
  /fonts/
    ibm-plex-mono-v20-latin-400.woff2
    ibm-plex-mono-v20-latin-700.woff2
  /images/
    (product placeholder image files)
/partials/
  header.html
  footer.html
  mini-cart.html
  size-guide-modal.html
/reference/
  (prototype reference screenshots)
/SPEC.md
/README.md
/.gitignore
```

Inline `<style>` and `<script>` blocks are removed from HTML files. Partials are loaded via fetch in `/assets/js/include.js`. All fonts and images are self-hosted.
