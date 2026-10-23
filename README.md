# Cipherbound: The Shadow Archive 🔮

A modern, responsive, mobile-first Web-based Narrative RPG built with modular JavaScript (ES Modules), HTML5 Canvas, and CSS3. Designed for high performance, smooth mobile touch interactions, and portfolio presentation.

---

## 🛠️ Tech Stack & Architecture Highlights

1. **Modular Architecture (ES Modules)**
   - Clean separation of concerns (HTML, CSS, JS Engine, Audio, Renderers, Story Tree).
   - Easy to extend with new chapters, enemies, or items.

2. **Mobile-First & Android Touch Optimizations**
   - Implements `100dvh` (Dynamic Viewport Height) to eliminate unwanted vertical scrollbars on mobile browsers.
   - Designed with safe-area insets, 48px+ touch targets, and touch-action handling.

3. **HTML5 Canvas Particle System**
   - High-performance 60 FPS atmospheric background particle engine that dynamically shifts themes based on game state.

4. **Web Audio API Procedural Synthesizer**
   - Generates retro & spell audio effects on-the-fly without needing external `.mp3`/`.wav` assets.

5. **Branching Story & Turn-Based Combat FSM**
   - Finite State Machine handling story choices, state updates, combat loops, and LocalStorage save/load.

---

## 📁 Project Structure

```
cipherbound-shadow-archive/
├── index.html            # Main entry file
├── README.md             # Technical documentation
├── css/
│   ├── main.css          # Design system & variables
│   ├── game.css          # Game layout, HUD, dialogue, drawer, modals
│   └── mobile.css        # Android & mobile touch optimization
└── js/
    ├── app.js            # Main bootstrapper & event controller
    ├── data/
    │   └── storyData.js  # Branching story nodes & enemy stats
    ├── engine/
    │   ├── audio.js      # Web Audio API sound generator
    │   └── state.js      # Game state, inventory, & persistence
    └── ui/
        ├── canvas.js     # Canvas particle background
        ├── renderer.js   # Typewriter effect & DOM updates
        └── sprites.js    # SVG vector character & enemy sprites
```

---

## 🚀 How to Run

1. Extract the `.zip` archive.
2. Open `index.html` using a web browser (or serve via a local web server / VS Code Live Server / GitHub Pages).
