# Puzzle App

A small Vite + React puzzle application. This repository contains a simple sliding/tile puzzle UI implemented with React components and minimal styling.

## Quick overview
- **Stack:** Vite, React (JSX), plain CSS
- **Purpose:** Small demo puzzle game component for learning and integration

## Prerequisites
- Node.js (v16+ recommended)
- npm or yarn

## Install
Run from the project root:

```bash
npm install
# or
yarn
```

## Development
Start the dev server (Vite):

```bash
npm run dev
# or
yarn dev
```

Open the browser at the URL printed by Vite (usually http://localhost:5173).

## Build for production

```bash
npm run build
# or
yarn build
```

## Project structure

- [index.html](index.html) — App entry HTML used by Vite
- [package.json](package.json) — project scripts and dependencies
- [vite.config.js](vite.config.js) — Vite config
- public/ — static assets served as-is
- src/ — main application source
  - App.css — application styles
  - App.jsx — root React component
  - index.css — global CSS
  - main.jsx — React entry file that mounts the app
  - assets/ — images and other static imports
  - components/
    - PuzzleGame.jsx — main puzzle game component

## Key files

- The puzzle UI and logic live in `src/components/PuzzleGame.jsx`.
- App entry and wiring: `src/main.jsx` and `src/App.jsx`.
- Global and component styles are in `src/index.css` and `src/App.css`.

See the component to modify puzzle behaviour or add features.

## How to use / extend

- Open `src/components/PuzzleGame.jsx` to inspect and modify the puzzle logic or UI.
- Add images or assets to `src/assets/` and reference them from components.
- Use React state/hooks for additional game state (score, timer, moves history).

## Testing and validation
This project does not include automated tests by default. To add tests, consider adding Jest or React Testing Library and creating a `test` script in `package.json`.

## Deployment
The built output is in `dist/` after `npm run build`. Deploy the `dist/` contents to any static host (Netlify, Vercel, GitHub Pages, S3, etc.).

## Contributing
- Fork the repo, create a feature branch, and open a pull request.
- Keep changes focused and include short descriptions of new behavior.

## Next steps / ideas
- Add unit and integration tests for puzzle logic
- Make the puzzle size configurable (3x3, 4x4, ...)
- Add animations and accessibility improvements
- Persist best scores in localStorage or remote backend

## License
Include a license of your choice (e.g., MIT) or leave unlicensed if this is a private demo.

---
Generated README for the Puzzle App project.
# Autism Puzzle Helper

An interactive, calm, and supportive puzzle game designed for children with Autism Spectrum Disorder (ASD). The application focuses on improving visual reasoning, problem-solving skills, and motor coordination through a structured drag-and-drop jigsaw puzzle experience.

## 1. Project Objectives

* Help children with autism understand how puzzle pieces fit together, rather than only matching shapes
* Encourage logical placement and visual sequencing
* Provide positive reinforcement without creating pressure or stress
* Maintain a minimal, distraction-free, and predictable user interface

## 2. Features

* Drag-and-drop image-based puzzle with multiple difficulty levels (2×2, 3×3, 4×4)
* Built-in timer with best-time tracking
* Optional numerical hints for guided assistance
* Full image hint modal for visual reference
* Completion feedback with simple celebration animation
* Persistent storage of best times using localStorage
* Responsive layout suitable for desktop and tablet devices

## 3. Tech Stack

### Frontend

* React 18 – Component-based user interface development
* Vite – Fast development server and build tool
* JavaScript (ES6+)
* JSX – Declarative UI syntax

### Styling

* Tailwind CSS (CDN) – Utility-first styling framework
* Custom CSS – Animations and visual feedback effects

### Icons

* Lucide React – Lightweight and consistent icon library

### State Management and Storage

* React Hooks: useState, useEffect, useRef
* localStorage – Persistent storage for best completion times

### APIs and Browser Features

* HTML5 Drag and Drop API
* Date.now() for timer implementation

---

## 4. Project Structure

```
autism-puzzle-app/
│
├── package.json              # Project dependencies and scripts
├── vite.config.js            # Vite configuration file
├── README.md                 # Project documentation
│
├── public/
│   └── index.html            # HTML entry point
│
├── src/
│   ├── main.jsx              # React application entry point
│   ├── App.jsx               # Root application component
│   ├── App.css               # Application-level styles
│   ├── index.css             # Global styles
│   │
│   └── components/
│       └── PuzzleGame.jsx    # Core puzzle logic and UI
│
└── node_modules/             # Installed dependencies
```

---

## 5. Application Workflow (High Level)

1. The application loads and initializes the game state
2. A random image is selected and divided into tiles
3. Puzzle tiles are shuffled and displayed to the user
4. The user drags and drops tiles onto the puzzle board
5. The application validates placements and updates state
6. React re-renders the interface based on state changes
7. Upon completion, the timer stops and results are stored

---

## 6. Accessibility and Autism-Friendly Design Considerations

* Calm color palette with minimal visual clutter
* Limited and non-intrusive animations
* No enforced time pressure; the timer is informational
* Clear visual cues and supportive feedback messages
* Optional hints that can be enabled or disabled by the user
* Encouraging feedback instead of negative error prompts

---

## 7. How to Run the Project

### Prerequisites

* Node.js (version 16 or higher)
* npm

### Installation

```bash
npm install
```

### Run the Development Server

```bash
npm run dev
```

Open a web browser and navigate to:

```
http://localhost:5173
```

---

## 8. Future Improvements

* Audio-based positive reinforcement
* Adaptive difficulty based on user performance
* Touch-screen optimization for mobile and tablet devices
* Guided or assisted play mode
* Parent or therapist configuration panel