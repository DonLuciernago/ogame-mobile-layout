chrome.runtime.sendMessage({ type: 'APPLY_OGAME_ZOOM' });

(() => {
  const content = 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, interactive-widget=resizes-content';
  let viewport = document.querySelector('meta[name="viewport"]');

  if (!viewport) {
    viewport = document.createElement('meta');
    viewport.name = 'viewport';
    document.head.appendChild(viewport);
  }

  viewport.setAttribute('content', content);
})();
