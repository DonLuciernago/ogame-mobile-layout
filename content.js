(() => {
  'use strict';

  document.documentElement.classList.add('ogame-mobile-layout');

  const describe = (el) => {
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return {
      tag: el.tagName.toLowerCase(),
      id: el.id || '',
      classes: [...el.classList].slice(0, 8),
      parentId: el.parentElement?.id || '',
      width: Math.round(r.width),
      height: Math.round(r.height),
      x: Math.round(r.x),
      y: Math.round(r.y)
    };
  };

  const scan = () => {
    const pageContent = document.querySelector('#pageContent');
    const planetCandidates = [...document.querySelectorAll('[id*="planet"], [class*="planet"]')]
      .filter((el) => {
        const r = el.getBoundingClientRect();
        return r.width > 0 && r.height > 0;
      })
      .slice(0, 20)
      .map(describe);

    return JSON.stringify({
      version: '0.3.0',
      known: {
        resources: describe(document.querySelector('#resourcesbarcomponent')),
        left: describe(document.querySelector('#left')),
        middle: describe(document.querySelector('#middle')),
        right: describe(document.querySelector('#right'))
      },
      pageContentChildren: pageContent ? [...pageContent.children].map(describe) : [],
      planetCandidates
    }, null, 2);
  };

  const panel = document.createElement('div');
  panel.id = 'ogame-mobile-layout-diagnostic';

  const button = document.createElement('button');
  button.type = 'button';
  button.textContent = 'Copiar diagnóstico';

  const status = document.createElement('span');
  status.textContent = 'v0.3';

  button.addEventListener('click', async () => {
    const report = scan();
    await navigator.clipboard.writeText(report);
    status.textContent = 'Copiado';
    setTimeout(() => { status.textContent = 'v0.3'; }, 1500);
  });

  panel.append(button, status);
  document.body.appendChild(panel);
})();
