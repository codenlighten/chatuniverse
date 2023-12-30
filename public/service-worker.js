// service-worker.js
self.addEventListener("push", function (event) {
  const data = event.data.json();
  const options = {
    body: data.body,
    icon: "satochat.png",
    badge: "satochat.png",
    image: "satochat.png",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
    actions: [
      {
        action: "explore",
        title: "New Message",
        icon: "satochat.png",
      },
      { action: "close", title: "Close", icon: "satochat.png" },
    ],
  };
  event.waitUntil(self.registration.showNotification(data.title, options));
});
