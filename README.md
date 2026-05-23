# The Chalant Society

Website for The Chalant Society: a community and coaching project around rejection therapy, social courage, charisma, and care.

The site uses a fixed WebGL particle-crowd background as the central metaphor: one standout figure surrounded by a crowd. Foreground copy scrolls over the scene while the camera slowly pulls back to reveal the wider social context.

## Stack

- React 19
- Vite 6
- TypeScript
- Three.js
- @react-three/fiber
- @react-three/drei
- @react-three/postprocessing
- Tailwind CSS

## Requirements

- Node.js 20 or newer
- A browser with WebGL 2 support and floating-point or half-float color buffer render targets

No API key or backend service is required.

## Run Locally

```bash
npm install
npm run dev
```

The Vite server defaults to port 3000. If that port is busy, Vite will choose the next available port.

## Scripts

```bash
npm run dev      # Start the development server
npm run build    # Build the production bundle
npm run preview  # Preview the production build locally
npm run lint     # Run TypeScript without emitting files
npm run clean    # Remove generated build/server artifacts
```

## Project Structure

```text
src/
  App.tsx                         # Website foreground, copy, CTAs, scroll progress
  components/
    Scene.tsx                     # React Three Fiber canvas and scroll-driven camera rig
    GPGPUParticles.tsx            # GPGPU simulation setup and particle render loop
  shaders/
    simulationShader.ts           # Position simulation and curl-noise motion
    renderShader.ts               # Particle rendering, coloring, sizing, alpha
  utils/
    proceduralHuman.ts            # Procedural crowd and figure target generation
  workers/
    crowdTextureWorker.ts         # Off-main-thread particle texture generation
```

## Build

```bash
npm run build
```

The production build is emitted to `dist/`.
