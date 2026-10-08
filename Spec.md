# Maisonvelle WordPress Theme Spec

A custom WooCommerce theme: Yeezy-style shop grid and header, C.E-style single product page on a solid colour background. The shop grid is also the home page, with no separate landing page.

**Legend:** items marked **\[confirmed\]** come from the screenshots and the CSS you copied. Items marked **\[assumed\]** are my best guess and can be changed in one place (CSS variables).

## 1. Goals

- Match the minimal, monospaced, white-space-heavy feel of the Yeezy shop grid.
- Use the C.E layout for product details only (title, price, description, sizing, size select, add to cart, prev/next, thumbnails).
- Work well with coloured products, not just black.
- Stay fully compatible with WooCommerce, payment gateways, Klaviyo and other plugins.
- Categories are managed in WordPress and shown automatically in the header.

## 2. Design tokens

Define these as CSS custom properties on `:root`.

| Token | Value | Status |
| --- | --- | --- |
| `--font-mono` | IBM Plex Mono, weight 400, self-hosted, fallback monospace | confirmed |
| `--font-size-base` | 16px | confirmed |
| `--line-height-base` | 24px | confirmed |
| `--color-text` | #000000 | confirmed |
| `--color-bg` | #ffffff | confirmed |
| `--color-muted` | #c4c4c4 (inactive nav items) | assumed |
| `--color-footer` | #777777 | assumed |
| `--header-height` | 64px | assumed |
| `--grid-gap-x` / `--grid-gap-y` | 24px / 56px | assumed |
| `--page-padding` | 24px desktop, 16px mobile | assumed |
| `--font-panel` | Arial or Helvetica Neue, bold for titles (C.E panel) | assumed |
| `--btn-border` | 2px solid, height 44px, transparent background | assumed |

General rules **\[confirmed\]**: no borders and no outlines on grid items, text is centred, product images use `object-fit: contain` and never crop, and `user-select: none` on grid tiles. Add a visible `:focus-visible` outline for keyboard users, which the original lacks.

## 3. Global layout

### Header (fixed, white background)

- **Left:** grid toggle button. Shows "+" normally and changes to a back arrow "<" when the grid is in its 3-column state **\[confirmed\]**.
- **Centre:** category navigation. Items are your WooCommerce product categories, shown in monospace uppercase. The active item is black, the others are `--color-muted` **\[confirmed pattern\]**. An "ALL" item comes first **\[assumed\]**. With around 6 categories, make the row horizontally scrollable on mobile with no visible scrollbar **\[assumed\]**.
- **Right:** bag icon with a small item count. Clicking it opens a slide-in mini cart **\[assumed\]**.
- On the product page the header icons and text adapt to the page background colour (see section 5).

### Footer

A centred row of small uppercase muted links: Contact, Terms, Privacy, Accessibility, Cookies, Order Status **\[confirmed pattern\]**. Link them to WordPress pages or menu items. "DNSMPI" is a US-specific link and can be dropped.

## 4. Shop page and home page (product archive)

- **Grid:** 6 columns on desktop by default **\[confirmed\]**. The toggle switches to 3 columns **\[confirmed\]**. Save the choice in `localStorage`. On mobile, default to 2 columns and have the toggle switch to 1 **\[assumed\]**.
- **Tile:** a square (1:1) wrapper with the image absolutely positioned to fill it, `object-fit: contain` **\[confirmed\]**. Below it, the SKU as the short label (e.g. TS-03), then the price on the next line **\[your decision\]**. Both are centred, 16px/24px mono.
- **SKU label:** use the WooCommerce SKU field, which is unique per product. If a product has no SKU, fall back to the product title.
- **Category navigation:** each header category links to its normal WooCommerce category URL (`/product-category/bags/`). That keeps URLs clean and compatible with SEO and other plugins. Progressive enhancement with AJAX filtering can come later.
- **Ordering:** use the standard WooCommerce menu order so you can drag products in the admin.
- **Images:** register a square image size (e.g. 800x800). Products should be shot on white or transparent backgrounds so they sit cleanly on the white grid. Coloured items work on white with no changes.
- **Hover:** a very subtle effect, such as swapping to the second gallery image if one exists **\[assumed\]**.

**Home page:** the shop grid is the front page, so visitors see products as soon as they arrive. The theme includes a `front-page.php` that renders the same product archive template, so this works without changing any WordPress reading settings. The "ALL" category item links to the home URL (`/`) and is active there. Every other category links to its standard WooCommerce category URL. The header, bag and footer behave the same on the home page as on any other shop page. The brand name goes in the footer and the browser tab title instead of a hero or logo block **\[assumed\]**.

**Mobile grid \[confirmed\]:** 3 columns by default at phone width, with small product images, 16px mono labels, and larger vertical gaps than horizontal ones. On mobile the "+" toggle switches to a 1-column feed and turns into "<" **\[assumed\]**.

**Mobile feed mode (TikTok-style) \[your decision\]:** in the 1-column state, each product fills the screen below the header, one at a time. Scrolling vertically snaps from one product to the next, like a short-video feed. Each slide shows the square product image centred, with the SKU and price near the bottom, and tapping it opens the product page. The "<" button returns to the grid. Build it with plain CSS scroll snapping (`scroll-snap-type: y mandatory`, `scroll-snap-align: start`, `scroll-snap-stop: always`) and slide height `100dvh` minus the header, so phone browser bars do not break it. Lazy-load every image except the current slide and the next two. Respect `prefers-reduced-motion`. By default slides stay white; using each product's background colour field on its slide is an optional extra **\[assumed\]**.

## 5. Single product page (C.E layout, solid background)

- **Background:** a solid colour from a per-product setting (see "Background colour field" below). Fall back to a neutral default (`#e8e8e8` **\[assumed\]**).
- **Text contrast:** compute luminance of the background in PHP and set text, header and button colours to black or white automatically, so any product colour stays readable.
- **Two-column layout (desktop):**
  - Left: large product image, centred, with room around it.
  - Right: the details panel.
  - A thumbnail strip centred at the bottom of the left side. Clicking a thumbnail swaps the main image, and the active thumbnail has a visible outline **\[confirmed pattern\]**.
- **Details panel, in this order:**
  1. Product title (uppercase, bold) with the price aligned to the right on the same row. The price uses WooCommerce formatting so your rand currency settings apply.
  2. Short description, one line per line break.
  3. An underlined "sizing" link that opens a size guide modal. Its content comes from a product or category field.
  4. A row with the variation select (e.g. size) on the left and an "Add to cart" button on the right, both outlined with `--btn-border`.
  5. Below that, two full-width outlined buttons with left and right arrows that go to the previous and next product in the same category.
- **Mobile:** stack everything. Image on top, then thumbnails, then the details. Keep the buttons full width.
- **Colour variations:** keep the standard dropdown for size. For colour variations, add optional swatches in phase 2.

### Background colour field

Add a native WordPress meta box on the product edit screen with a colour picker, stored as `_mv_bg_color`. No third-party plugin is required.

### Colour variants, sold out and prev/next (from the C.E mobile page)

- **Colour name and swatches:** under the title, show the selected colour name (e.g. "Beige") and a row of small square thumbnails, one per colour, with the active one outlined. Each thumbnail swaps the product photos. Build them from a WooCommerce "Colour" attribute with a variation image per colour. This also makes the page friendly to coloured products. A background colour per colour variation can come in phase 2.
- **Sold out:** when a product or variation is out of stock, the Add to cart button becomes a solid white button with bold black text reading "Sold out", and it is not clickable.
- **Prev/next buttons:** two equal-width outlined buttons side by side under the add-to-cart row, one left arrow and one right arrow, no text. They go to the previous and next product in the same category and wrap from the last product to the first.
- **Mobile layout:** full-width product photo on top with a thin chevron on its right edge for the next photo. The details sit in a rounded, slightly translucent card below it. The header is a floating rounded bar with a blurred translucent background.
- **Gallery chevron (desktop and mobile):** a thin ">" at the right edge of the main photo moves to the next gallery image.

## 6. Cart and checkout

- Keep the standard WooCommerce cart and checkout templates so every payment gateway works. Do not rewrite the checkout markup.
- Restyle only: mono font, black and white, outlined buttons, generous spacing.
- The mini cart drawer uses WooCommerce cart fragments so the count updates without a reload.

## 7. Technical requirements

- Classic PHP theme with `add_theme_support( 'woocommerce' )`.
- Override templates in `/woocommerce/` only where needed: `archive-product.php`, `content-product.php`, `single-product.php`, and the `single-product/` parts.
- Keep every standard WooCommerce action and filter hook (for example `woocommerce_before_add_to_cart_form`, `woocommerce_after_single_product_summary`) so plugins such as Klaviyo and payment gateways still work.
- Never hard-code categories. Always read them from the `product_cat` taxonomy.
- Self-host the IBM Plex Mono font files.
- Lazy-load images, and use proper `alt` text, ARIA labels on the toggle and bag buttons, and visible focus states.
- Keep JavaScript small and plain (no frameworks): grid toggle, thumbnail swap, size guide modal, mini cart drawer.
- Escape and sanitise all output and meta values.

## 8. Build phases

1. **Scaffold:** theme files, fonts, tokens, header, footer.
2. **Shop grid:** tiles, category nav, grid toggle with persistence.
3. **Single product:** layout, gallery, variations, prev/next, background colour field, contrast logic.
4. **Cart and checkout:** mini cart drawer and styling.
5. **Polish:** mobile, hover states, accessibility, performance.

## 9. Prompt for Stitch (design)

Stitch produces generic stores when it is given style words such as "modern" or "sleek". These prompts use exact values instead.

1. Do one screen per prompt, in the order below.
2. Paste the global block at the start of every prompt, because Stitch does not carry details between screens.
3. Attach the matching reference screenshot and add: "Match the layout of the attached image exactly. Only change what is written below."
4. Fix problems with one-change follow-ups (listed at the end of this section), not by rewriting the whole prompt.

### Global block (paste first, every time)

> Design for an online clothing store. Rules for every screen: page background pure white #FFFFFF, all text pure black #000000, one typeface only: IBM Plex Mono, regular weight, 16px size, 24px line height. No borders, shadows, rounded corners, gradients, banners, hero images, promo text, ratings, badges or quick-add buttons unless a screen below says so. Products are cut-out photos on a transparent background, each inside a square area, scaled to fit without cropping. Use varied placeholder products (a red hoodie, navy trousers, an olive jacket, a cream tote bag, a black t-shirt, white sneakers), not only black items. Use placeholder product codes like TS-03 and prices in rand like R1 299. Screens 3 and 4 override the background and font rules as they state.

### Screen 1: shop and home page, desktop (attach the Yeezy desktop screenshot)

> Desktop shop grid, 1440px wide. Fixed header, 64px high, white. At the left edge (24px in): a thin "+" icon, 20px. In the centre: category names in a single row, uppercase, 24px apart: ALL, BAGS, SHIRTS, T-SHIRTS, PANTS, SHOES, ACCESSORIES. ALL is black and the others are light grey #C4C4C4. At the right edge (24px in): a small shopping bag outline icon. Below the header, a grid of 6 equal columns with 24px side padding, 24px between columns and 56px between rows; the first row starts 32px below the header. Each cell is a square product area, then an 8px gap, then the product code centred (e.g. TS-03), then the price centred on the next line. Show 3 rows (18 products). At the bottom, 64px below the last row, one centred row of small links in uppercase 12px grey #777777, 32px apart: CONTACT, TERMS, PRIVACY, ACCESSIBILITY, COOKIES, ORDER STATUS. No logo, no search, no filters, no sort dropdown, no page title.

### Screen 2: shop and home page, mobile (attach the Yeezy mobile screenshot)

> Mobile shop grid, 390px wide, same rules as screen 1. Header 56px high: "+" icon at the left (16px in), bag icon at the right (16px in), and between them the category names in one row that scrolls sideways, cut off at the edge so it is clear it scrolls: ALL (black), BAGS, SHIRTS, T-SHIRTS, PANTS (grey). Grid: 3 equal columns, 16px side padding, 12px between columns, 40px between rows. Each cell: square product area, 8px gap, product code, price on the next line, all centred. Show 4 rows. Footer links in two centred rows.

### Screen 2b: mobile feed mode (no reference screenshot, text only)

> Mobile single-product feed, 390px wide, same global rules. Header 56px high: a "<" back arrow at the left (16px in) and a bag icon at the right (16px in), no category names. Below the header, one product fills the screen: the product photo in a square area as wide as the screen (390px), vertically centred in the remaining space; at the bottom, 48px above the screen edge, the product code (e.g. TS-03) centred and the price on the next line. Nothing else on screen. Show two frames side by side: the first shows one product; the second shows the same screen scrolled a little, with the top of the next product's photo entering from the bottom edge.

### Screen 3: product page, desktop (attach the C.E desktop screenshot)

> Desktop product page, 1440px wide. Override: the background is one solid colour, brick red #8E2B1C, with no pattern, texture or gradient. All text and lines are white. Header 64px high with no background: a "<" back arrow at the left (24px in), the category names centred in white, a bag icon at the right. Content is two columns, vertically centred below the header. Left column (58% width): one large product photo of a cream hoodie, about 560px tall, centred; below it a centred row of 5 square thumbnails, 56px each, 8px apart, the first with a 2px white outline; a thin ">" chevron at the right edge of the photo area. Right column (42% width, content up to 480px wide), 16px between rows. Row 1: the title SEPARATE TRACK HOODY in bold uppercase Arial 26px on the left, and the price R1 299 in bold 26px on the right. Row 2: the colour name "Beige", 16px. Row 3: two square colour thumbnails, 64px each, 8px apart, the first with a 2px white outline. Row 4: four lines of description, 16px with 24px line height: "100% cotton." "Panelled pullover top." "Wide silhouette." "Made in Japan." Row 5: the word "sizing", underlined, 14px. Row 6: two controls side by side, 8px apart: a size dropdown showing "Small" with a down caret, and an "Add to cart" button; both 48px high, 2px white border, transparent background, bold white text. Row 7: two buttons of the same size and style, half width each, 8px apart: one with a thin left arrow and one with a thin right arrow, no text. Square corners everywhere. Arrows are thin line arrows.

### Screen 4: product page, mobile (attach the C.E mobile screenshot)

> Mobile product page, 390px wide, same colour override as screen 3. A floating header bar 12px from the top and sides, 56px high, 12px rounded corners, translucent dark with background blur: a "<" back arrow at the left and a bag icon at the right. Below it, a full-width product photo area 390px by 500px with the cream hoodie centred and a thin ">" chevron at the right edge, 16px in. Below the photo, a details card with a 12px margin around it, 16px padding, 12px rounded corners and a translucent dark blurred background. Inside it, top to bottom with 12px between items: the title SEPARATE TRACK HOODY (bold uppercase Arial 22px) on the left and the price R1 299 on the right of the same row; the colour name "Beige" at 16px; two square colour thumbnails, 64px, 8px apart, the first outlined 2px white; four description lines at 16px; underlined "sizing" at 14px; a full-width size dropdown showing "Small", 48px high, 2px white border; a full-width "Add to cart" button, 48px high, 2px white border; then two buttons side by side, 12px apart, equal width, 44px high, 2px white border, with left and right arrows. Also generate a second version where the Add to cart button reads "Sold out", filled solid white with bold black text and no outline.

### Follow-up fixes to keep ready

- "Remove all shadows, borders and rounded corners from the product grid."
- "Use IBM Plex Mono regular at 16px everywhere on this screen."
- "Remove the page title, banner and any hero section."
- "Make the product images smaller and add more white space between rows."
- "Make all buttons square-cornered, 2px border, no fill."

## 10. Prompt for Jules (WordPress conversion)

> Convert the approved Stitch designs into a custom classic WordPress theme named "maisonvelle" for WooCommerce. Follow the attached spec document exactly. Requirements: `add_theme_support('woocommerce')`; template overrides in `/woocommerce/` for archive, product loop item and single product; keep all WooCommerce hooks intact so payment gateway and Klaviyo plugins work; header category navigation generated dynamically from the `product_cat` taxonomy (no hard-coded categories); grid toggle between 6 and 3 columns with the choice saved in localStorage and the "+" icon switching to "<"; shop tiles show the product SKU (fall back to title) and the price; single product page with solid background taken from a `_mv_bg_color` meta box (colour picker) and automatic black or white text contrast; thumbnail gallery, variation select, add to cart, size guide modal, and prev/next product buttons within the same category; mini cart drawer using WooCommerce cart fragments; self-hosted IBM Plex Mono; plain JavaScript only; CSS variables for all design tokens listed in the spec. Build in the phases listed in the spec and stop after each phase for review.

> Additional requirements: the shop grid is the site's front page, so add a `front-page.php` that renders the same product archive template (no separate landing page), and make the "ALL" nav item link to the home URL. The mobile grid is 3 columns by default. The "+" toggle goes from 6 to 3 columns on desktop and from 3 columns to a 1-column full-screen feed on mobile, and the icon becomes "<" in the toggled state. On the single product page add: a colour name and square colour swatches built from a WooCommerce "Colour" attribute with variation images; a "Sold out" state (solid white button, bold black text, disabled) for out-of-stock items; and two equal-width outlined previous and next product buttons (arrows only) that navigate within the same category and wrap around. On the mobile product page use a full-width photo, the details in a rounded translucent card, and a floating rounded translucent header.

> Mobile feed mode: when the toggle is on, show one product per screen (height `100dvh` minus the header) in a vertical scroll container using CSS `scroll-snap-type: y mandatory`, `scroll-snap-align: start` and `scroll-snap-stop: always`, so scrolling snaps from product to product like a short-video feed. Each slide shows the square product image centred, with the SKU and price near the bottom, and tapping it opens the product page. The back arrow returns to the grid. Use plain CSS scroll snap, lazy-load every image except the current slide and the next two, honour `prefers-reduced-motion`, and keep the toggle state in localStorage.

## 11. Open items

- Mobile grid behaviour and the exact spacing values are assumed. Adjust the CSS variables if you check the real site later.
- Decide the two extra categories.
- Decide whether the size guide content lives on each product or on each category.
