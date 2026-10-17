document.addEventListener('keydown', function(e) {
  const activeOverlay = document.querySelector('.cart-drawer-overlay.open, .modal-overlay.open');

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
    return;
  }

  if (e.key === 'Tab' && activeOverlay) {
    const focusables = Array.from(
      activeOverlay.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
    ).filter(el => {
      if (el.disabled) return false;
      const style = window.getComputedStyle(el);
      return style.display !== 'none' && style.visibility !== 'hidden' && (el.offsetWidth > 0 || el.offsetHeight > 0 || el.getClientRects().length > 0);
    });

    if (focusables.length === 0) {
      e.preventDefault();
      return;
    }

    const firstEl = focusables[0];
    const lastEl = focusables[focusables.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === firstEl || !activeOverlay.contains(document.activeElement)) {
        e.preventDefault();
        lastEl.focus();
      }
    } else {
      if (document.activeElement === lastEl || !activeOverlay.contains(document.activeElement)) {
        e.preventDefault();
        firstEl.focus();
      }
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
