document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' || e.key === 'Esc') {
    const cartOverlay = document.getElementById('cart-drawer-overlay');
    if (cartOverlay && cartOverlay.classList.contains('open')) {
      cartOverlay.classList.remove('open');
    }
    const sizeModal = document.getElementById('size-modal');
    if (sizeModal && sizeModal.classList.contains('open')) {
      sizeModal.classList.remove('open');
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
