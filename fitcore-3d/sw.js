// FitCore 3D — service worker só para o lembrete diário (não guarda cópia do app).
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('push', e => {
  let d = {};
  try { d = e.data ? e.data.json() : {}; } catch { d = { body: e.data && e.data.text() }; }
  e.waitUntil(self.registration.showNotification(d.title || 'Hora de treinar 💪', {
    body: d.body || 'Seu treino de hoje está esperando no FitCore 3D.',
    icon: 'fitcore-icone-192.png',
    badge: 'fitcore-icone-192.png',
    tag: 'fitcore-lembrete',
    renotify: true,
    data: { url: new URL(d.url || './', self.registration.scope).href },
  }));
});
self.addEventListener('notificationclick', e => {
  e.notification.close();
  const alvo = (e.notification.data && e.notification.data.url) || self.registration.scope;
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(lista => {
    for (const c of lista) if (c.url.startsWith(self.registration.scope) && 'focus' in c) return c.focus();
    return self.clients.openWindow(alvo);
  }));
});
