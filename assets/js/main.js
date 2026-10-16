document.addEventListener('keydown', function(e) {
  const openOverlay = document.querySelector('.cart-drawer-overlay.open, .modal-overlay.open');

  if (e.key === 'Escape' || e.key === 'Esc') {
    const cartOverlay = document.getElementById('cart-drawer-overlay');
    if (cartOverlay && cartOverlay.classList.contains('open')) {
      cartOverlay.classList.remove('open');
      cartOverlay.setAttribute('aria-hidden', 'true');
      const bagBtn = document.getElementById('bag-btn');
      if (bagBtn) {
        bagBtn.setAttribute('aria-expanded', 'false');
        bagBtn.focus();
      }
    }
    const sizeModal = document.getElementById('size-modal');
    if (sizeModal && sizeModal.classList.contains('open')) {
      sizeModal.classList.remove('open');
      sizeModal.setAttribute('aria-hidden', 'true');
      const sizingTrigger = document.getElementById('sizing-modal-trigger');
      if (sizingTrigger) sizingTrigger.focus();
    }
  }

  if (e.key === 'Tab' && openOverlay) {
    const focusables = openOverlay.querySelectorAll(
      'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    if (focusables.length === 0) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
});

function initHeaderNav() {
  const categoryLinks = document.querySelectorAll('.category-nav a');
  categoryLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      if (this.getAttribute('href') === '#') {
        e.preventDefault();
      }
      categoryLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
    });
  });

  if (document.body.classList.contains('page-product') || document.body.classList.contains('page-404')) {
    const toggleBtn = document.getElementById('grid-toggle-btn');
    const backBtn = document.getElementById('header-back-btn');
    if (toggleBtn) toggleBtn.style.display = 'none';
    if (backBtn) backBtn.style.display = 'inline-flex';
  }
}

document.addEventListener('partialsLoaded', function() {
  initHeaderNav();
});

document.addEventListener('DOMContentLoaded', function() {
  initHeaderNav();
});
