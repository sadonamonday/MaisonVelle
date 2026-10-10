function initShopGrid() {
  const toggleBtn = document.getElementById('grid-toggle-btn');
  const shopGrid = document.getElementById('shop-grid');
  const feedView = document.getElementById('mobile-feed-view');
  const iconPlus = document.getElementById('toggle-icon-plus');
  const iconBack = document.getElementById('toggle-icon-back');

  if (!toggleBtn || !shopGrid) return;

  let isToggled = localStorage.getItem('mv_grid_state') === 'toggled';

  function updateView() {
    const isMobile = window.innerWidth <= 768;

    if (isToggled) {
      if (iconPlus) iconPlus.style.display = 'none';
      if (iconBack) iconBack.style.display = 'inline-block';

      if (isMobile) {
        shopGrid.style.display = 'none';
        if (feedView) feedView.style.display = 'block';
        document.body.classList.add('feed-active');
      } else {
        shopGrid.style.display = 'grid';
        shopGrid.classList.remove('cols-6');
        shopGrid.classList.add('cols-3');
        if (feedView) feedView.style.display = 'none';
        document.body.classList.remove('feed-active');
      }
    } else {
      if (iconPlus) iconPlus.style.display = 'inline-block';
      if (iconBack) iconBack.style.display = 'none';

      if (isMobile) {
        shopGrid.style.display = 'grid';
        shopGrid.classList.remove('cols-6');
        shopGrid.classList.add('cols-3');
        if (feedView) feedView.style.display = 'none';
        document.body.classList.remove('feed-active');
      } else {
        shopGrid.style.display = 'grid';
        shopGrid.classList.remove('cols-3');
        shopGrid.classList.add('cols-6');
        if (feedView) feedView.style.display = 'none';
        document.body.classList.remove('feed-active');
      }
    }
  }

  toggleBtn.addEventListener('click', function() {
    isToggled = !isToggled;
    localStorage.setItem('mv_grid_state', isToggled ? 'toggled' : 'default');
    updateView();
  });

  window.addEventListener('resize', updateView);
  updateView();
}

document.addEventListener('partialsLoaded', initShopGrid);
document.addEventListener('DOMContentLoaded', initShopGrid);
