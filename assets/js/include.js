document.addEventListener('DOMContentLoaded', function() {
  const includeElements = document.querySelectorAll('[data-include]');
  if (includeElements.length === 0) {
    document.dispatchEvent(new CustomEvent('partialsLoaded'));
    return;
  }

  const promises = Array.from(includeElements).map(el => {
    const file = el.getAttribute('data-include');
    return fetch(file)
      .then(res => {
        if (!res.ok) throw new Error(`Failed to load ${file}`);
        return res.text();
      })
      .then(data => {
        el.insertAdjacentHTML('afterend', data);
        el.remove();
      })
      .catch(err => console.error(err));
  });

  Promise.all(promises).then(() => {
    document.dispatchEvent(new CustomEvent('partialsLoaded'));
  });
});
