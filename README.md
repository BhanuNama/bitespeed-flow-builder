# BiteSpeed Chatbot Flow Builder

A visual, drag-and-drop chatbot flow builder built with **React**, **React Flow**, **Zustand**, and **Tailwind CSS**.

---

## ✨ Features

- **Drag & Drop Nodes** — Add message nodes from the left panel onto the canvas
- **Connect Nodes** — Draw edges between nodes to define the message sequence
- **Source Handle** — Each node has exactly **one outgoing** edge from its source handle
- **Target Handle** — Each node can receive **multiple incoming** edges on its target handle
- **Settings Panel** — Click any node to open an inline editor that replaces the Nodes Panel; edits reflect on the canvas in real time
- **Save & Validate** — Validates that no more than one node has an empty target handle (when 2+ nodes exist); saves flow to `localStorage`
- **Persistent Flow** — Flow is auto-loaded from `localStorage` on page refresh
- **Premium UI** — Sofia Sans font, teal animated edges, amber selection highlight, empty canvas hint, live character count

---

## 🚀 Getting Started

### Prerequisites
- Node.js ≥ 18
- npm ≥ 9

### Installation

```bash
# Clone the repo
git clone https://github.com/BhanuNama/bitespeed-flow-builder.git
cd bitespeed-flow-builder

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

---

## 🗂️ Project Structure

```
src/
├── components/
│   ├── Canvas.jsx          # React Flow canvas with drag-and-drop
│   ├── TextNode.jsx        # Custom text message node
│   ├── NodesPanel.jsx      # Left panel with draggable node types
│   ├── SettingsPanel.jsx   # Inline editor (replaces NodesPanel on selection)
│   ├── TopBar.jsx          # Header with Save button
│   ├── StatusBar.jsx       # Footer with node/edge count
│   └── Toast.jsx           # Success/error notifications
├── hooks/
│   └── useFlowStore.js     # Zustand global state (nodes, edges, selection)
├── utils/
│   ├── validation.js       # Save flow validation logic
│   └── idGenerator.js      # Unique node ID generation
├── index.css               # Tailwind v4 + global styles
└── App.jsx                 # Root layout
```

---

## 🧠 How It Works

| Concept | Implementation |
|---|---|
| State management | Zustand (`useFlowStore`) |
| Node rendering | Custom `TextNode` registered in `nodeTypes` |
| Adding nodes | `onDragStart` in NodesPanel → `onDrop` in Canvas |
| Source handle limit | `onConnect` filters existing edge from same source before adding new one |
| Validation | `validateFlow()` — counts nodes with empty target handles |
| Persistence | `localStorage.setItem/getItem` on save/load |

---

## 🛠️ Tech Stack

| Library | Purpose |
|---|---|
| [React 19](https://react.dev) | UI framework |
| [React Flow 11](https://reactflow.dev) | Flow diagram engine |
| [Zustand 5](https://zustand-demo.pmnd.rs) | State management |
| [Tailwind CSS 4](https://tailwindcss.com) | Styling |
| [Lucide React](https://lucide.dev) | Icons |
| [Vite 7](https://vitejs.dev) | Build tool |

---

## 📋 Validation Rules

> **Save** will **fail** if:
> - There are **2 or more nodes**, AND
> - **More than one node** has no incoming (target) edge

This ensures your chatbot flow has a single clear entry point.

---

## 📄 License

MIT
