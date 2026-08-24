(() => {
  'use strict';

  // Keep runtime work intentionally minimal. For now we only expose a
  // root-level activation class that CSS can scope against.
  const root = document.documentElement;

  if (!root.classList.contains('ogame-mobile-layout')) {
    root.classList.add('ogame-mobile-layout');
  }
})();
