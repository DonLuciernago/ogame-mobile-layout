(() => {
  'use strict';

  document.documentElement.classList.add('ogame-mobile-layout');

  // OGame ships a desktop-sized mobile viewport. Our layout is fixed at
  // 670 CSS px, so tell Chromium/Kiwi to fit that exact width instead.
  let viewport = document.querySelector('meta[name="viewport"]');

  if (!viewport) {
    viewport = document.createElement('meta');
    viewport.name = 'viewport';
    document.head.appendChild(viewport);
  }

  viewport.content = 'width=670, initial-scale=1';
})();
