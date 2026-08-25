chrome.runtime.onMessage.addListener((message, sender) => {
  if (message?.type !== 'APPLY_OGAME_ZOOM') return;
  if (!sender.tab?.id) return;

  chrome.tabs.setZoom(sender.tab.id, 3.2);
});
