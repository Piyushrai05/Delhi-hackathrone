<div align="center">
  <img src="https://upload.wikimedia.org/wikipedia/commons/b/bd/Indian_Space_Research_Organisation_Logo.svg" alt="ISRO Logo" width="80" height="80" />
  <h1>Route Resilience</h1>
  <p><strong>Futuristic Geospatial Analytics & Urban Mobility Intelligence Platform</strong></p>
</div>

<br />

## Table of Contents
- [Problem Statement](#problem-statement)
- [Solution](#solution)
- [Key Features](#key-features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Modules Overview](#modules-overview)
- [Target Users](#target-users)
- [Future Scope](#future-scope)
- [License](#license)

---

## Problem Statement

| Challenge | Impact Context |
| :--- | :--- |
| **Vulnerable Infrastructure** | Rapid urbanization leads to undocumented network bottlenecks. |
| **Disaster Response Delays** | Lack of real-time rerouting capabilities during floods or earthquakes. |
| **Outdated Road Networks** | Satellite imagery exists, but manual extraction of road networks is slow and tedious. |
| **Siloed Analytics** | Disconnected tools prevent unified geospatial decision-making. |

---

## Solution

**Route Resilience** is an ISRO-inspired, enterprise-grade geospatial intelligence dashboard designed for proactive urban planning and disaster management. 

By unifying **AI-powered road segmentation**, **topological graph analysis**, and **live disaster simulation** into a single glassmorphism-themed command center, the platform enables authorities to identify structural vulnerabilities before crises occur and dynamically reroute traffic during emergencies.

---

## Key Features

🛰️ **AI Road Extraction** — Simulates high-fidelity satellite imagery segmentation (DeepLabV3+, U-Net) to map undocumented urban roads.

🕸️ **Network Graph Analysis** — Interactive topology mapping utilizing React Flow to identify connected components and structural bottlenecks.

🎯 **Criticality Assessment** — Calculates Betweenness Centrality to rank gatekeeper nodes and highlight vulnerable intersections via heatmaps.

🌪️ **Disaster Simulation** — Real-time stress testing engine (Flood, Earthquake, Road Closure) showing instant impact on travel time and connectivity.

📊 **Executive Reports** — Auto-generated ISRO-styled PDF reports containing vulnerability scores, geo-masks, and predictive analytics.

---

## Architecture

```text
┌─────────────────────────────────────────────────────────┐
│                   FRONTEND COMMAND CENTER               │
│  Dashboard │ Extraction │ Graph │ Simulation │ Reports  │
└───────────────────────┬─────────────────────────────────┘
                        │ Data & State Flow
┌───────────────────────┴─────────────────────────────────┐
│                   GEOSPATIAL ENGINE                     │
│   Leaflet Maps │ React Flow Topology │ Recharts KPIs    │
└───────────────────────┬─────────────────────────────────┘
                        │
┌───────────────────────┴─────────────────────────────────┐
│                  ANALYTICS LAYER (Mocked)               │
│ Betweenness Centrality │ Inference Pipeline │ Rerouting │
└─────────────────────────────────────────────────────────┘
```

---

## Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Core Framework** | Next.js 15 (App Router), React 19, TypeScript |
| **Styling** | Tailwind CSS v4, Custom Glassmorphism System |
| **Animations** | Framer Motion |
| **Mapping & GIS** | Leaflet, React-Leaflet |
| **Data Visualization** | Recharts (Area, Bar, Line) |
| **Topology** | React Flow |
| **Icons** | Lucide React |

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm, yarn, or pnpm

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Piyushrai05/Delhi-hackathrone.git
cd Delhi-hackathrone

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

---

## Modules Overview

1. **Dashboard Overview**: Macro-level KPIs (Total Road Length, Connectivity Score, Resilience Index) with real-time tracking.
2. **Road Extraction**: Before/After interactive slider demonstrating AI model inference on satellite feeds.
3. **Network Graph**: Node-and-edge visualization representing intersections and critical corridors.
4. **Criticality Analysis**: Heatmap overlays displaying nodes with high betweenness centrality and failure impact.
5. **Disaster Simulation**: Sandbox environment to disable nodes and observe connectivity degradation.
6. **Report Center**: Data export hub for PDFs, GeoJSONs, and structural CSVs.

---

## Target Users

- 🇮🇳 **ISRO / NNRMS** (National Natural Resources Management System)
- 🏙️ **Smart Cities Mission Authorities**
- 🚨 **NDMA** (National Disaster Management Authority)
- 🚗 **Urban Transportation & Traffic Departments**

---

## Future Scope

- 🌍 **Live API Integration**: Connect to actual ISRO Bhuvan or Sentinel satellite APIs.
- 🧠 **Backend Inference Pipeline**: Deploy Python/FastAPI microservices running actual PyTorch segmentation models.
- 🚦 **Real-Time Traffic Feeds**: Integrate dynamic weightings for graph edges based on live traffic congestion.
- 📱 **Field Ops Mobile App**: A companion app for ground personnel to verify road extractions.

---

## License

MIT License — see `LICENSE` for details.

---

<div align="center">
  <p>Built for the Delhi Hackathon. 🚀</p>
</div>
