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
  localStorage.setItem("fs-lite-session", JSON.stringify(session));
}, 3000);
