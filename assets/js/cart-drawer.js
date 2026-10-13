function initCartDrawer() {
  const bagBtns = [document.getElementById('bag-btn'), document.getElementById('bag-icon')].filter(Boolean);
  const cartOverlay = document.getElementById('cart-drawer-overlay');
  const closeBtn = document.getElementById('cart-close-btn');

  if (!cartOverlay) return;

  function openDrawer() {
    cartOverlay.classList.add('open');
    cartOverlay.setAttribute('aria-hidden', 'false');
    bagBtns.forEach(btn => btn.setAttribute('aria-expanded', 'true'));
    if (closeBtn) closeBtn.focus();
  }

  function closeDrawer() {
    cartOverlay.classList.remove('open');
    cartOverlay.setAttribute('aria-hidden', 'true');
    bagBtns.forEach(btn => btn.setAttribute('aria-expanded', 'false'));
    const bagBtn = document.getElementById('bag-btn');
    if (bagBtn && document.activeElement && cartOverlay.contains(document.activeElement)) {
      bagBtn.focus();
    }
  }

  bagBtns.forEach(btn => btn.addEventListener('click', openDrawer));

  document.addEventListener('click', function(e) {
    if (e.target.id === 'cart-close-btn' || e.target.closest('#cart-close-btn') || e.target === cartOverlay) {
      closeDrawer();
    }
  });
}

document.addEventListener('partialsLoaded', initCartDrawer);
document.addEventListener('DOMContentLoaded', initCartDrawer);
