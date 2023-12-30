// service-worker.js
self.addEventListener("message", function (event) {
  if (event.data && event.data.type === "newMessage") {
    const messageData = event.data.data;
    const title = "New Chat Message";
    const options = {
      body: messageData.decrypted,
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
  }
});
