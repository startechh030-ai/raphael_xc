# Raphael — Full-Stack Engineer Portfolio

A single-page personal portfolio for Raphael: fast marketing site, hand-built real-time 3D hero,
and a contact flow with email, phone and WhatsApp.

**Stack:** Vite + React 19 + TypeScript · three.js / @react-three/fiber · Motion · CSS (no UI kit)

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build into dist/
npm run preview  # serve the production build
```

## Editing content

Almost everything lives in **`src/data/site.ts`**:

| Export      | What it controls                                                        |
| ----------- | ----------------------------------------------------------------------- |
| `contact`   | Email, phone, WhatsApp link, location, timezone, response-time promise   |
| `stats`     | The four numbers under the hero                                          |
| `services`  | The four service cards                                                   |
| `projects`  | Selected work — title, copy, stack, image, headline metric                |
| `process`   | The four "how we work" steps                                             |
| `stack`     | Tech names in the scrolling marquee                                      |
| `socials`   | Footer links                                                             |

Project images live in `public/work/` — drop in your own and point `image` at the new path.

## Performance notes

- The WebGL scene is **lazy-loaded** after first paint, and the render loop is **paused whenever
  the hero is scrolled out of view** (`frameloop="never"` via IntersectionObserver).
- Scene quality degrades automatically: lower `dpr`, fewer subdivisions and no particle field on
  phones, low-core machines, or when `prefers-reduced-motion` is set (in which case a static
  gradient orb renders instead of the canvas).
- Geometry is deliberately small — one ~10k-triangle icosahedron, a wireframe shell, three rings
  and ~520 points. No textures, no HDRIs, no post-processing.
- `three` is code-split into its own chunk so the page shell paints before the 3D lands.

## Contact

Reach Raphael at **raphaelphp000@gmail.com** or **+234 703 976 8931** (WhatsApp).
