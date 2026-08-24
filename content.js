(() => {
  'use strict';

  const root = document.documentElement;
  root.classList.add('ogame-mobile-layout');

  const KEYWORDS = [
    'resource', 'resources', 'metal', 'crystal', 'deuterium', 'energy',
    'menu', 'left', 'navigation', 'nav',
    'planet', 'planets', 'planetlist', 'planet-list',
    'content', 'middle', 'center', 'page', 'wrapper', 'main',
    'infinity', 'ogame'
  ];

  const clean = (value) => String(value || '').replace(/\s+/g, ' ').trim();

  const selectorHint = (el) => {
    if (el.id) return `#${CSS.escape(el.id)}`;

    const classes = [...el.classList]
      .filter(Boolean)
      .slice(0, 4)
      .map((name) => `.${CSS.escape(name)}`)
      .join('');

    return `${el.tagName.toLowerCase()}${classes}`;
  };

  const describe = (el) => ({
    selector: selectorHint(el),
    tag: el.tagName.toLowerCase(),
    id: el.id || '',
    classes: [...el.classList].slice(0, 8),
    parent: el.parentElement ? selectorHint(el.parentElement) : '',
    text: clean(el.textContent).slice(0, 180),
    rect: (() => {
      const r = el.getBoundingClientRect();
      return {
        x: Math.round(r.x),
        y: Math.round(r.y),
        width: Math.round(r.width),
        height: Math.round(r.height)
      };
    })()
  });

  const scan = () => {
    const nodes = [...document.querySelectorAll('[id], [class]')];
    const matches = [];

    for (const el of nodes) {
      const haystack = clean(`${el.id} ${el.className}`).toLowerCase();
      if (!haystack) continue;

      const matchedKeywords = KEYWORDS.filter((word) => haystack.includes(word));
      if (!matchedKeywords.length) continue;

      const info = describe(el);
      info.keywords = matchedKeywords;
      matches.push(info);

      if (matches.length >= 160) break;
    }

    const report = {
      extension: 'OGame Mobile Layout',
      version: '0.2.0',
      url: location.href,
      title: document.title,
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight,
        devicePixelRatio: window.devicePixelRatio
      },
      body: {
        id: document.body?.id || '',
        classes: document.body ? [...document.body.classList] : []
      },
      candidates: matches
    };

    return JSON.stringify(report, null, 2);
  };

  const panel = document.createElement('div');
  panel.id = 'ogame-mobile-layout-diagnostic';

  const button = document.createElement('button');
  button.type = 'button';
  button.textContent = 'Copiar diagnóstico';

  const status = document.createElement('span');
  status.textContent = 'v0.2';

  button.addEventListener('click', async () => {
    const report = scan();

    try {
      await navigator.clipboard.writeText(report);
      status.textContent = 'Copiado';
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = report;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'fixed';
      textarea.style.left = '-9999px';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      textarea.remove();
      status.textContent = 'Copiado';
    }

    window.setTimeout(() => {
      status.textContent = 'v0.2';
    }, 1500);
  });

  panel.append(button, status);
  document.body.appendChild(panel);
})();
