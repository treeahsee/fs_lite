# Simple Session Replay Tracker

This is a minimal browser-based session replay tool, inspired by how tools like [FullStory](https://www.fullstory.com/).

It captures a snapshot of the DOM, records user interactions (clicks, text input), and replays them in a simulated environment, all client-side currently.

## Features

- Captures DOM snapshot at page load (`document.body.outerHTML`)
- Tracks user `click` and `input` events
- Stores events with timestamps in `localStorage`
- Replays session in an `iframe`
- Highlights clicked elements
- Simulates text input events

##  Files

| File | Purpose |
|------|---------|
| `index.html` | Sample page with tracker and UI |
| `tracker.js` | Code to capture DOM + user events |
| `replay.js` | Code to replay DOM and simulate interactions |

## How It Works

### Tracking (in `tracker.js`)
- On page load, we grab `document.body.outerHTML` and store it as the snapshot.
- We listen for `click` and `input` events:
  - Each event is saved with: `type`, `targetId`, `value`, and `timestamp`
- All data is saved in `localStorage` for simplicity.

### Replaying (in `replay.js`)
- Loads the saved snapshot into an `<iframe>`
- Simulates events using `setTimeout` and the original event timings
- Inputs are simulated by setting `.value`
- Clicks are shown by adding an outline to the clicked element

## Limitations

- Elements must have an `id` to be tracked and replayed properly.
- Only `click` and `input` events are supported for now.
- Dynamic DOM updates after page load aren’t captured (yet).
- Timing is approximate (based on `Date.now()`).

## Future Improvements (TODOs)

- [ ] Automatically generate stable IDs for elements without one
- [ ] Track scroll events and simulate scroll during replay
- [ ] Support `mouseover`, `keypress`, and more interactions
- [ ] Use a `MutationObserver` to track dynamic changes
- [ ] Add ghost cursor animation
- [ ] Export session to file / backend
- [ ] Replace `outerHTML` with a virtual DOM diff system

## Usage

Clone this repo or copy the files, then open `index.html` in your browser:

```bash
git clone https://github.com/your-username/session-replay-demo
cd session-replay-demo
open index.html and make changes
open replay.html and observe the changes automatically replaying
