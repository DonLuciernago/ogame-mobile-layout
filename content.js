(() => {
  'use strict';

  document.documentElement.classList.add('ogame-mobile-layout');

  // Move the original OGame menu once. No cloning: existing links/listeners stay intact.
  const pageContent = document.querySelector('#pageContent');
  const menuTable = document.querySelector('#menuTable');
  const middle = document.querySelector('#middle');

  if (pageContent && menuTable && middle && menuTable.parentElement !== pageContent) {
    pageContent.insertBefore(menuTable, middle);
  }
})();
