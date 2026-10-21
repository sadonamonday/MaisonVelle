function initCartDrawer() {
  const bagBtns = [document.getElementById('bag-btn'), document.getElementById('bag-icon')].filter(Boolean);
  const cartOverlay = document.getElementById('cart-drawer-overlay');
  const closeBtn = document.getElementById('cart-close-btn');

  if (!cartOverlay || cartOverlay.dataset.initialized) return;
  cartOverlay.dataset.initialized = 'true';

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

  cartOverlay.addEventListener('keydown', function(e) {
    if (e.key !== 'Tab' || !cartOverlay.classList.contains('open')) return;

    const focusableSelector = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const focusables = Array.from(cartOverlay.querySelectorAll(focusableSelector)).filter(
      el => !el.disabled && el.getAttribute('tabindex') !== '-1' && el.offsetParent !== null
    );

    if (focusables.length === 0) return;

    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === first || !cartOverlay.contains(document.activeElement)) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last || !cartOverlay.contains(document.activeElement)) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  function updateCartTotals() {
    const items = cartOverlay.querySelectorAll('.cart-item');
    const cartCountEl = document.getElementById('cart-count');
    const subtotalEl = document.getElementById('cart-subtotal');
    const itemsList = document.getElementById('cart-items-list');
    const footer = cartOverlay.querySelector('.cart-drawer-footer');

    let total = 0;
    items.forEach(item => {
      const priceText = item.querySelector('.cart-item-price')?.textContent || '';
      const match = priceText.match(/R([\d\s]+)/);
      if (match) {
        total += parseInt(match[1].replace(/\s/g, ''), 10);
      }
    });

    if (cartCountEl) cartCountEl.textContent = items.length;
    if (subtotalEl) {
      subtotalEl.textContent = 'R' + total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    }

    if (items.length === 0 && itemsList) {
      itemsList.innerHTML = `
        <div class="cart-empty-state">
          <p class="cart-empty-text">YOUR BAG IS EMPTY</p>
          <button type="button" class="cart-action-btn secondary" id="continue-shopping-btn">CONTINUE SHOPPING</button>
        </div>`;
      if (footer) footer.style.display = 'none';
      const continueBtn = document.getElementById('continue-shopping-btn');
      if (continueBtn) continueBtn.addEventListener('click', closeDrawer);
    }
  }

  cartOverlay.addEventListener('click', function(e) {
    if (e.target.id === 'cart-close-btn' || e.target.closest('#cart-close-btn') || e.target === cartOverlay) {
      closeDrawer();
      return;
    }

    const removeBtn = e.target.closest('.cart-item-remove');
    if (removeBtn) {
      const item = removeBtn.closest('.cart-item');
      if (item) {
        const title = item.querySelector('.cart-item-title')?.textContent.trim() || 'Item';
        const remainingBtns = Array.from(cartOverlay.querySelectorAll('.cart-item-remove'));
        const removeIdx = remainingBtns.indexOf(removeBtn);

        item.remove();
        updateCartTotals();

        const statusEl = document.getElementById('cart-status');
        if (statusEl) {
          statusEl.textContent = `${title} removed from bag`;
        }

        const newRemoveBtns = cartOverlay.querySelectorAll('.cart-item-remove');
        if (newRemoveBtns.length > 0) {
          const nextFocus = newRemoveBtns[Math.min(removeIdx, newRemoveBtns.length - 1)];
          nextFocus.focus();
        } else {
          const continueBtn = document.getElementById('continue-shopping-btn');
          if (continueBtn) {
            continueBtn.focus();
          } else if (closeBtn) {
            closeBtn.focus();
          }
        }
      }
    }
  });
}

document.addEventListener('partialsLoaded', initCartDrawer);
document.addEventListener('DOMContentLoaded', initCartDrawer);
