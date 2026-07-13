# Window Scene — AI Mockup Prompts

Prompts for generating photoreal product mockups to fill the pitch deck and the site's "See the Scene" gallery. Goal: prove the **year-round** story (winter warmth **and** summer cooling) and the **interchangeable** scene system.

## How to use these
- **Best results (your own window):** Use an *image-edit / inpainting* model so the room stays real and only the window glass changes:
  - **Photoshop → Generative Fill** (select the glass, paste a prompt).
  - **Midjourney** (use your photo as an image reference / `--cref` for consistency, or the inpaint "Vary Region" tool).
  - **DALL·E 3 / Bing Image Creator**, **Adobe Firefly**, or **Leonardo.ai** for from-scratch scenes.
- **Consistency tip:** generate every scene on the *same* window photo so the before/after and scene-swaps line up. Keep camera angle, framing, and lighting identical.
- **Aspect ratio:** shoot/generate at 4:3 to match the site's demo frames. Add `--ar 4:3` in Midjourney.
- **Always generate a matching "before"** (bare, slightly drab window) for each "after" so the comparison slider has a clean pair.

---

## 1. Residential — Winter (warmth)
> Photorealistic interior of a cozy living room in winter, a single large window as the focal point. Inside the window is a decorative insulating panel printed with a serene snowy forest scene at golden hour, soft frost glow. Warm interior lighting, throw blankets, plant in frame. The panel looks like a premium printed art piece sealing the window. Eye-level, natural depth of field, 4:3.

## 2. Residential — Summer (cooling, hot-climate)
> Photorealistic interior of a bright Southern-style living room on a hot summer day, large window as focal point. The window holds a decorative insulating panel printed with a cool ocean / palm scene that visibly blocks harsh sun and glare, casting soft even light into the room. Air-conditioned, crisp, comfortable feel. The panel reads as both decor and a sun barrier. Eye-level, 4:3.

## 3. Commercial — Storefront exterior (branding)
> Photorealistic street-level exterior of a small boutique storefront, large display window fitted with a custom-printed Window Scene panel showing branded artwork and reduced glare. Daytime, clean modern signage, pedestrians blurred in background. The panel looks professionally printed, flush, and premium — turning the glass into a branded canvas. 4:3.

## 4. Workspace — Interior office
> Photorealistic modern home office / co-working nook, window fitted with a decorative insulating panel printed with a calming minimal nature scene that adds privacy and softens daylight. Clean desk, laptop, warm task lighting. The panel feels like intentional interior design, not a temporary fix. Eye-level, 4:3.

## 5. Interchangeability hero (the system)
> Product concept image: the same window shown in a row of four, each with a different decorative insulating Window Scene panel — winter frost, summer ocean, autumn forest, holiday theme — to show panels swapped like seasonal art. Consistent window, consistent angle, premium catalog lighting. Wide 16:9.

## 6. Before (bare window, for comparison pairs)
> Photorealistic ordinary residential window with a plain, slightly dull outdoor view, no decoration, neutral daylight. Realistic, unremarkable — the "before" state. Match the camera angle and framing of the corresponding "after" scene. 4:3.

---

## Negative / avoid
- No visible wrinkles, plastic-shrink-film look, tape, or bubbles (that's the *competitor* we beat).
- No heavy drapes blocking the window.
- Keep it looking like a **printed premium panel**, not a sticker or a poster taped on.
- Avoid text/watermarks baked into the art.

## After generating
- Drop residential winter + summer into the site's `See the Scene` gallery and the `demo.html` scene switcher (replace the `WSPT4.x` placeholders).
- Keep one clean before/after pair for the demo's drag slider.
