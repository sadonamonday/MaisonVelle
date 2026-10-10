function initCartDrawer() {
  const bagBtns = [document.getElementById('bag-btn'), document.getElementById('bag-icon')].filter(Boolean);
  const cartOverlay = document.getElementById('cart-drawer-overlay');

  if (cartOverlay) {
    bagBtns.forEach(btn => {
      btn.addEventListener('click', () => cartOverlay.classList.add('open'));
    });

    document.addEventListener('click', function(e) {
      if (e.target.id === 'cart-close-btn' || e.target.closest('#cart-close-btn')) {
        cartOverlay.classList.remove('open');
      }
      if (e.target === cartOverlay) {
        cartOverlay.classList.remove('open');
      }
    });
  }
}

document.addEventListener('partialsLoaded', initCartDrawer);
document.addEventListener('DOMContentLoaded', initCartDrawer);
