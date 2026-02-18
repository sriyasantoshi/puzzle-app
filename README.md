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