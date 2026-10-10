# Maisonvelle Prototype

A minimalist e-commerce web application prototype for Maisonvelle.

## Local Server Requirement

To run and preview the site locally, you must serve the files using a local web server (such as Python's HTTP server) so that fetch-based partial inclusions works correctly without CORS restrictions on local file URIs:

```bash
python3 -m http.server 8000
```

Then open your browser and navigate to `http://localhost:8000`.

## File Structure

- `/index.html` - Shop and home page (responsive)
- `/product.html` - Single product page (responsive)
- `/404.html` - Error page (responsive)
- `/assets/css/` - Custom CSS stylesheets (`tokens.css`, `base.css`, `header.css`, `footer.css`, `shop.css`, `product.css`, `cart-drawer.css`, `modal.css`, `error-page.css`)
- `/assets/js/` - Modular JavaScript files (`include.js`, `main.js`, `shop.js`, `product.js`, `cart-drawer.js`)
- `/assets/fonts/` - Self-hosted IBM Plex Mono woff2 font files
- `/assets/images/` - Local product image assets
- `/partials/` - HTML partials (`header.html`, `footer.html`, `mini-cart.html`, `size-guide-modal.html`)
- `/reference/` - Prototype reference screenshots
- `/SPEC.md` - Technical specification document
- `/README.md` - Documentation
- `/.gitignore` - Git ignore configuration
