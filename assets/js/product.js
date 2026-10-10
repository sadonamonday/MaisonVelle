(function() {
  const products = [
    {
      title: 'SEPARATE TRACK HOODY',
      price: 'R1 299',
      description: ['100% cotton.', 'Panelled pullover top.', 'Wide silhouette.', 'Made in Japan.'],
      variants: [
        {
          colorName: 'Beige',
          swatchImg: 'assets/images/hd-03.jpg',
          images: [
            'assets/images/hd-03.jpg',
            'assets/images/hd-03-beige-2.jpg'
          ],
          inStock: true
        },
        {
          colorName: 'Navy',
          swatchImg: 'assets/images/hd-03-navy.jpg',
          images: [
            'assets/images/hd-03-navy.jpg'
          ],
          inStock: false
        }
      ]
    },
    {
      title: 'WINDBREAKER JACKET',
      price: 'R2 899',
      description: ['100% nylon.', 'Weather resistant zipper.', 'Adjustable cuffs.', 'Made in Japan.'],
      variants: [
        {
          colorName: 'Olive',
          swatchImg: 'assets/images/wb-01.jpg',
          images: [
            'assets/images/wb-01.jpg'
          ],
          inStock: true
        }
      ]
    }
  ];

  let currentProdIdx = 0;
  let currentVarIdx = 0;
  let currentImgIdx = 0;

  function updateProductDisplay() {
    const p = products[currentProdIdx];
    const v = p.variants[currentVarIdx];

    const titleEl = document.getElementById('p-title');
    const priceEl = document.getElementById('p-price');
    const colorNameEl = document.getElementById('p-color-name');
    const descBox = document.getElementById('p-desc');
    const mainImg = document.getElementById('main-product-img');

    if (titleEl) titleEl.textContent = p.title;
    if (priceEl) priceEl.textContent = p.price;
    if (colorNameEl) colorNameEl.textContent = v.colorName;

    if (descBox) {
      descBox.innerHTML = p.description.map(d => `<p>${d}</p>`).join('');
    }

    if (mainImg) {
      mainImg.src = v.images[currentImgIdx] || v.images[0];
      mainImg.alt = p.title;
    }

    // Render Thumbnails
    const thumbStrip = document.getElementById('thumbnail-strip');
    if (thumbStrip) {
      thumbStrip.innerHTML = v.images.map((img, idx) => `
        <button type="button" class="thumb-btn ${idx === currentImgIdx ? 'active' : ''}" data-idx="${idx}" aria-label="Thumbnail ${idx + 1}">
          <img src="${img}" alt="Thumbnail ${idx + 1}">
        </button>
      `).join('');

      thumbStrip.querySelectorAll('.thumb-btn').forEach(btn => {
        btn.addEventListener('click', function() {
          currentImgIdx = parseInt(this.dataset.idx);
          updateProductDisplay();
        });
      });
    }

    // Render Swatches
    const swatchContainer = document.getElementById('p-swatches');
    if (swatchContainer) {
      swatchContainer.innerHTML = p.variants.map((vItem, idx) => `
        <button type="button" class="swatch-btn ${idx === currentVarIdx ? 'active' : ''}" data-vidx="${idx}" aria-label="${vItem.colorName}">
          <img src="${vItem.swatchImg}" alt="${vItem.colorName}">
        </button>
      `).join('');

      swatchContainer.querySelectorAll('.swatch-btn').forEach(btn => {
        btn.addEventListener('click', function() {
          currentVarIdx = parseInt(this.dataset.vidx);
          currentImgIdx = 0;
          updateProductDisplay();
        });
      });
    }

    // Stock state: Solid black button with white bold text when out of stock
    const addToCartBtn = document.getElementById('add-to-cart-btn');
    if (addToCartBtn) {
      if (!v.inStock) {
        addToCartBtn.textContent = 'Sold out';
        addToCartBtn.classList.add('sold-out');
        addToCartBtn.disabled = true;
      } else {
        addToCartBtn.textContent = 'Add to cart';
        addToCartBtn.classList.remove('sold-out');
        addToCartBtn.disabled = false;
      }
    }
  }

  function initProductListeners() {
    const nextPhotoBtn = document.getElementById('next-photo-btn');
    if (nextPhotoBtn) {
      nextPhotoBtn.addEventListener('click', function() {
        const p = products[currentProdIdx];
        const v = p.variants[currentVarIdx];
        currentImgIdx = (currentImgIdx + 1) % v.images.length;
        updateProductDisplay();
      });
    }

    const prevProdBtn = document.getElementById('prev-prod-btn');
    if (prevProdBtn) {
      prevProdBtn.addEventListener('click', function() {
        currentProdIdx = (currentProdIdx - 1 + products.length) % products.length;
        currentVarIdx = 0;
        currentImgIdx = 0;
        updateProductDisplay();
      });
    }

    const nextProdBtn = document.getElementById('next-prod-btn');
    if (nextProdBtn) {
      nextProdBtn.addEventListener('click', function() {
        currentProdIdx = (currentProdIdx + 1) % products.length;
        currentVarIdx = 0;
        currentImgIdx = 0;
        updateProductDisplay();
      });
    }

    // Sizing Modal trigger
    const sizingTrigger = document.getElementById('sizing-modal-trigger');
    if (sizingTrigger) {
      sizingTrigger.addEventListener('click', function() {
        const modal = document.getElementById('size-modal');
        if (modal) modal.classList.add('open');
      });
    }

    // Modal close inside partial
    document.addEventListener('click', function(e) {
      if (e.target.id === 'size-modal-close' || e.target.closest('#size-modal-close')) {
        const modal = document.getElementById('size-modal');
        if (modal) modal.classList.remove('open');
      }
      const modal = document.getElementById('size-modal');
      if (modal && e.target === modal) {
        modal.classList.remove('open');
      }
    });

    updateProductDisplay();
  }

  document.addEventListener('partialsLoaded', initProductListeners);
  document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('p-title')) {
      initProductListeners();
    }
  });
})();
